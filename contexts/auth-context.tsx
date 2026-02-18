"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface User {
  id: string
  name: string
  email: string
  points: number
  quizHistory: QuizResult[]
}

interface QuizResult {
  date: string
  score: number
  totalQuestions: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  addQuizResult: (score: number, totalQuestions: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function getSupabase() {
  return createClient()
}

async function fetchProfile(supabaseUser: SupabaseUser): Promise<User | null> {
  const supabase = getSupabase()

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", supabaseUser.id)
    .single()

  // Fetch quiz history
  const { data: quizResults } = await supabase
    .from("quiz_results")
    .select("*")
    .eq("user_id", supabaseUser.id)
    .order("created_at", { ascending: false })

  if (!profile) return null

  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    points: profile.points || 0,
    quizHistory: (quizResults || []).map((r: { created_at: string; score: number; total_questions: number }) => ({
      date: r.created_at,
      score: r.score,
      totalQuestions: r.total_questions,
    })),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabase()

    // Check current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user)
        setUser(profile)
      }
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const profile = await fetchProfile(session.user)
          setUser(profile)
        } else if (event === "SIGNED_OUT") {
          setUser(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabase()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        return { success: false, error: "Correo o contrasena incorrectos" }
      }
      return { success: false, error: error.message }
    }

    if (data.user) {
      const profile = await fetchProfile(data.user)
      setUser(profile)
    }

    return { success: true }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabase()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      if (error.message.includes("already registered")) {
        return { success: false, error: "Este correo ya esta registrado" }
      }
      return { success: false, error: error.message }
    }

    if (data.user) {
      // Wait a moment for the trigger to create the profile
      await new Promise((resolve) => setTimeout(resolve, 500))
      const profile = await fetchProfile(data.user)
      setUser(profile)
    }

    return { success: true }
  }

  const logout = async () => {
    const supabase = getSupabase()
    await supabase.auth.signOut()
    setUser(null)
  }

  const addQuizResult = async (score: number, totalQuestions: number) => {
    if (!user) return

    const supabase = getSupabase()

    // Insert quiz result
    await supabase.from("quiz_results").insert({
      user_id: user.id,
      score,
      total_questions: totalQuestions,
    })

    // Update points
    const pointsEarned = score * 10
    const newPoints = (user.points || 0) + pointsEarned

    await supabase
      .from("profiles")
      .update({ points: newPoints, updated_at: new Date().toISOString() })
      .eq("id", user.id)

    // Update local state
    const newResult: QuizResult = {
      date: new Date().toISOString(),
      score,
      totalQuestions,
    }

    setUser({
      ...user,
      points: newPoints,
      quizHistory: [newResult, ...user.quizHistory],
    })
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, addQuizResult }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
