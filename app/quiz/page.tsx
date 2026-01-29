"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: "intradermica" | "subcutanea" | "intramuscular" | "intravenosa" | "general"
}

const questions: Question[] = [
  // Preguntas Intradérmica
  {
    id: 1,
    question: "¿Cuál es el ángulo de inserción para la vía intradérmica?",
    options: ["45° a 90°", "5° a 15°", "30° a 45°", "90°"],
    correctAnswer: 1,
    category: "intradermica"
  },
  {
    id: 2,
    question: "¿Cuál es el volumen máximo que se puede administrar por vía intradérmica?",
    options: ["1 ml", "0.5 ml", "0.1 ml", "2 ml"],
    correctAnswer: 2,
    category: "intradermica"
  },
  {
    id: 3,
    question: "¿Qué debe formarse al aplicar correctamente una inyección intradérmica?",
    options: ["Un hematoma", "Una pápula o habón", "Una ampolla", "Nada visible"],
    correctAnswer: 1,
    category: "intradermica"
  },
  {
    id: 4,
    question: "¿Cuál es el calibre de aguja recomendado para la vía intradérmica?",
    options: ["18-20 G", "21-23 G", "26-27 G", "14-16 G"],
    correctAnswer: 2,
    category: "intradermica"
  },
  {
    id: 5,
    question: "¿Cuánto tiempo después se realiza la lectura del PPD?",
    options: ["24 horas", "48-72 horas", "1 semana", "Inmediatamente"],
    correctAnswer: 1,
    category: "intradermica"
  },
  // Preguntas Subcutánea
  {
    id: 6,
    question: "¿En qué tejido se deposita el medicamento en la vía subcutánea?",
    options: ["Músculo", "Dermis", "Tejido graso subcutáneo", "Torrente sanguíneo"],
    correctAnswer: 2,
    category: "subcutanea"
  },
  {
    id: 7,
    question: "¿Cuál es el ángulo de inserción para personas delgadas en la vía subcutánea?",
    options: ["90°", "45°", "15°", "30°"],
    correctAnswer: 1,
    category: "subcutanea"
  },
  {
    id: 8,
    question: "¿Qué tipo de absorción caracteriza a la vía subcutánea?",
    options: ["Inmediata", "Lenta y sostenida", "Variable", "Muy rápida"],
    correctAnswer: 1,
    category: "subcutanea"
  },
  {
    id: 9,
    question: "¿Cuál es el calibre de aguja recomendado para la vía subcutánea?",
    options: ["18-20 G", "25-27 G", "14-16 G", "21-22 G"],
    correctAnswer: 1,
    category: "subcutanea"
  },
  {
    id: 10,
    question: "¿Cuál NO es un lugar recomendado para inyección subcutánea?",
    options: ["Abdomen", "Cara anterior del muslo", "Glúteo mayor", "Cara externa del brazo"],
    correctAnswer: 2,
    category: "subcutanea"
  },
  // Preguntas Intramuscular
  {
    id: 11,
    question: "¿Cuál es el ángulo de inserción para la vía intramuscular?",
    options: ["45°", "15°", "90°", "30°"],
    correctAnswer: 2,
    category: "intramuscular"
  },
  {
    id: 12,
    question: "¿Cuál es el sitio más recomendado por seguridad para inyección intramuscular?",
    options: ["Deltoides", "Dorsoglúteo", "Ventroglúteo", "Vasto lateral"],
    correctAnswer: 2,
    category: "intramuscular"
  },
  {
    id: 13,
    question: "¿Por qué se limita el uso del dorsoglúteo?",
    options: ["Es muy doloroso", "Riesgo del nervio ciático", "Poca absorción", "Difícil acceso"],
    correctAnswer: 1,
    category: "intramuscular"
  },
  {
    id: 14,
    question: "¿Cuál es el volumen de jeringa recomendado para vía intramuscular?",
    options: ["1 ml", "3 a 5 ml", "10 ml", "0.5 ml"],
    correctAnswer: 1,
    category: "intramuscular"
  },
  {
    id: 15,
    question: "¿Qué se debe hacer con la piel antes de la inyección intramuscular?",
    options: ["Pellizcarla", "Estirarla/tensarla", "Masajearla", "Humedecerla"],
    correctAnswer: 1,
    category: "intramuscular"
  },
  // Preguntas Intravenosa
  {
    id: 16,
    question: "¿Cuál es la biodisponibilidad de la vía intravenosa?",
    options: ["50%", "75%", "90%", "100%"],
    correctAnswer: 3,
    category: "intravenosa"
  },
  {
    id: 17,
    question: "¿Cuál es el ángulo de inserción del catéter en la vía intravenosa?",
    options: ["5° a 10°", "15° a 30°", "45° a 60°", "90°"],
    correctAnswer: 1,
    category: "intravenosa"
  },
  {
    id: 18,
    question: "¿Qué calibre de catéter se usa para la vía intravenosa periférica?",
    options: ["14-16 G", "18-24 G", "26-28 G", "10-12 G"],
    correctAnswer: 1,
    category: "intravenosa"
  },
  {
    id: 19,
    question: "¿Qué se debe observar para confirmar la correcta punción intravenosa?",
    options: ["Formación de pápula", "Retorno sanguíneo", "Enrojecimiento", "Dolor intenso"],
    correctAnswer: 1,
    category: "intravenosa"
  },
  {
    id: 20,
    question: "¿Cuál NO es una vena comúnmente usada para acceso intravenoso?",
    options: ["Vena cefálica", "Vena basílica", "Vena yugular", "Venas del dorso de la mano"],
    correctAnswer: 2,
    category: "intravenosa"
  },
]

const categoryColors = {
  intradermica: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30",
  subcutanea: "bg-teal-500/20 text-teal-600 border-teal-500/30",
  intramuscular: "bg-green-500/20 text-green-600 border-green-500/30",
  intravenosa: "bg-lime-500/20 text-lime-600 border-lime-500/30",
  general: "bg-gray-500/20 text-gray-600 border-gray-500/30",
}

const categoryNames = {
  intradermica: "Intradérmica",
  subcutanea: "Subcutánea",
  intramuscular: "Intramuscular",
  intravenosa: "Intravenosa",
  general: "General",
}

export default function QuizPage() {
  const { user, addQuizResult } = useAuth()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completed
      const finalScore = selectedAnswer === questions[currentQuestion].correctAnswer ? score + 1 : score
      if (user) {
        addQuizResult(finalScore, questions.length)
      }
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers(new Array(questions.length).fill(null))
    setQuizCompleted(false)
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Quiz de Vías Parenterales" subtitle="Pon a prueba tus conocimientos" />
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 text-center">
            <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Inicia sesión para realizar el quiz</h2>
            <p className="text-muted-foreground mb-6">
              Necesitas una cuenta para guardar tus puntos y ver tu historial de resultados.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/registro">Registrarse</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (quizCompleted) {
    const finalScore = score
    const percentage = Math.round((finalScore / questions.length) * 100)
    const pointsEarned = finalScore * 10

    return (
      <div className="min-h-screen bg-background">
        <Header title="Quiz Completado" subtitle="Resultados de tu evaluación" />
        <main className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
            <div className="text-center mb-8">
              <div className={cn(
                "w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center",
                percentage >= 70 ? "bg-primary/20" : percentage >= 50 ? "bg-yellow-500/20" : "bg-red-500/20"
              )}>
                <Trophy className={cn(
                  "h-12 w-12",
                  percentage >= 70 ? "text-primary" : percentage >= 50 ? "text-yellow-500" : "text-red-500"
                )} />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {percentage >= 70 ? "¡Excelente!" : percentage >= 50 ? "¡Buen trabajo!" : "Sigue practicando"}
              </h2>
              <p className="text-muted-foreground">
                Has completado el quiz de vías parenterales
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-primary">{finalScore}/{questions.length}</p>
                <p className="text-sm text-muted-foreground">Correctas</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-primary">{percentage}%</p>
                <p className="text-sm text-muted-foreground">Porcentaje</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-primary">+{pointsEarned}</p>
                <p className="text-sm text-muted-foreground">Puntos</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-4">Resumen por categoría</h3>
              <div className="space-y-2">
                {(["intradermica", "subcutanea", "intramuscular", "intravenosa"] as const).map((cat) => {
                  const catQuestions = questions.filter(q => q.category === cat)
                  const catCorrect = catQuestions.filter((q, i) => {
                    const qIndex = questions.findIndex(quest => quest.id === q.id)
                    return answers[qIndex] === q.correctAnswer
                  }).length
                  return (
                    <div key={cat} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span className={cn("px-2 py-1 rounded text-xs font-medium border", categoryColors[cat])}>
                        {categoryNames[cat]}
                      </span>
                      <span className="font-medium">{catCorrect}/{catQuestions.length}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleRestartQuiz} variant="outline" className="flex-1 bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Repetir Quiz
              </Button>
              <Button asChild className="flex-1">
                <Link href="/">Volver al inicio</Link>
              </Button>
            </div>
          </div>

          {/* Puntos totales del usuario */}
          <div className="mt-6 bg-card rounded-2xl p-6 shadow-sm border border-border/50 text-center">
            <p className="text-muted-foreground mb-1">Tus puntos totales</p>
            <p className="text-4xl font-bold text-primary">{user.points + pointsEarned}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Quiz de Vías Parenterales" subtitle="20 preguntas sobre todas las vías" />
      
      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border",
              categoryColors[question.category]
            )}>
              {categoryNames[question.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              Puntos actuales: <span className="font-bold text-primary">{user.points}</span>
            </span>
          </div>

          <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correctAnswer
              const showCorrectness = showResult

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-200 border-2",
                    !showResult && isSelected && "border-primary bg-primary/10",
                    !showResult && !isSelected && "border-border hover:border-primary/50 hover:bg-muted/50",
                    showCorrectness && isCorrect && "border-primary bg-primary/10",
                    showCorrectness && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                    showResult && "cursor-default"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "font-medium",
                      showCorrectness && isCorrect && "text-primary",
                      showCorrectness && isSelected && !isCorrect && "text-red-400"
                    )}>
                      {option}
                    </span>
                    {showCorrectness && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                    {showCorrectness && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          {!showResult ? (
            <Button 
              onClick={handleConfirmAnswer} 
              disabled={selectedAnswer === null}
              size="lg"
            >
              Confirmar respuesta
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} size="lg">
              {currentQuestion < questions.length - 1 ? (
                <>
                  Siguiente pregunta
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                "Ver resultados"
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
