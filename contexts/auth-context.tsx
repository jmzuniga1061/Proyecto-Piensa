"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
    // Check for existing session
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY)
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        } catch {
          localStorage.removeItem(CURRENT_USER_KEY)
        }
      }
    }
    setIsLoading(false)
  }, [])

  const getUsers = (): StoredUser[] => {
    try {
      const users = localStorage.getItem(USERS_KEY)
      return users ? JSON.parse(users) : []
    } catch {
      return []
    }
  }

  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers()
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    
    if (!foundUser) {
      return { success: false, error: "Correo o contraseña incorrectos" }
    }

    const userWithoutPassword: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      points: foundUser.points || 0,
      quizHistory: foundUser.quizHistory || [],
    }

    setUser(userWithoutPassword)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    
    return { success: true }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers()
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "Este correo ya está registrado" }
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      points: 0,
      quizHistory: [],
    }

    users.push(newUser)
    saveUsers(users)

    const userWithoutPassword: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      points: 0,
      quizHistory: [],
    }

    setUser(userWithoutPassword)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  const addQuizResult = (score: number, totalQuestions: number) => {
    if (!user) return

    const users = getUsers()
    const userIndex = users.findIndex(u => u.id === user.id)
    
    if (userIndex === -1) return

    const newResult: QuizResult = {
      date: new Date().toISOString(),
      score,
      totalQuestions,
    }

    const pointsEarned = score * 10 // 10 puntos por respuesta correcta
    
    users[userIndex].points = (users[userIndex].points || 0) + pointsEarned
    users[userIndex].quizHistory = [...(users[userIndex].quizHistory || []), newResult]
    
    saveUsers(users)

    const updatedUser: User = {
      ...user,
      points: users[userIndex].points,
      quizHistory: users[userIndex].quizHistory,
    }

    setUser(updatedUser)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
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
