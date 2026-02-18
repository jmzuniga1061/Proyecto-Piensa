"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"

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
  addQuizResult: (score: number, totalQuestions: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_KEY = "vias_parenterales_users"
const CURRENT_USER_KEY = "vias_parenterales_current_user"

interface StoredUser {
  id: string
  name: string
  email: string
  password: string
  points: number
  quizHistory: QuizResult[]
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const supabase = createClient()
    const getSession = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        setUser({
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email || "",
          email: data.user.email || "",
          points: 0,
          quizHistory: [],
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }
    getSession()
  }, [])



  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return { success: false, error: error.message }
    }
    if (!data.user) {
      return { success: false, error: "No se pudo iniciar sesión" }
    }
    // Puedes mapear el usuario de Supabase a tu estructura si lo deseas
    setUser({
      id: data.user.id,
      name: data.user.user_metadata?.name || data.user.email || "",
      email: data.user.email || "",
      points: 0,
      quizHistory: [],
    })
    return { success: true }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })
    if (error) {
      return { success: false, error: error.message }
    }
    if (!data.user) {
      return { success: false, error: "No se pudo registrar el usuario" }
    }
    setUser({
      id: data.user.id,
      name: name,
      email: data.user.email || "",
      points: 0,
      quizHistory: [],
    })
    return { success: true }
  }

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  // Guarda el resultado del quiz en Supabase
  const addQuizResult = async (score: number, totalQuestions: number) => {
    if (!user) return
    const supabase = createClient()
    const { error } = await supabase.from('quiz_results').insert({
      user_id: user.id,
      date: new Date().toISOString(),
      score,
      total_questions: totalQuestions,
    })
    if (!error) {
      setUser({
        ...user,
        points: user.points + score * 10,
        quizHistory: [
          ...user.quizHistory,
          { date: new Date().toISOString(), score, totalQuestions },
        ],
      })
    }
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
