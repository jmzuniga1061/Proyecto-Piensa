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
  explanation: string
}

const questions: Question[] = [
  // Preguntas Intradérmica
  {
    id: 1,
    question: "¿Cuál es el ángulo de inserción para la vía intradérmica?",
    options: ["45° a 90°", "5° a 15°", "30° a 45°", "90°"],
    correctAnswer: 1,
    category: "intradermica",
    explanation: "El ángulo de 5° a 15° es el correcto para la vía intradérmica porque permite que la aguja penetre solo en la capa más superficial de la piel (dermis), sin llegar al tejido subcutáneo. Este ángulo tan pequeño asegura que el medicamento se deposite correctamente y forme la pápula característica."
  },
  {
    id: 2,
    question: "¿Cuál es el volumen máximo que se puede administrar por vía intradérmica?",
    options: ["1 ml", "0.5 ml", "0.1 ml", "2 ml"],
    correctAnswer: 2,
    category: "intradermica",
    explanation: "El volumen máximo es 0.1 ml (100 microlitros) porque la dermis es una capa muy delgada con espacio limitado. Volúmenes mayores causarían ruptura del tejido, dolor excesivo y distribución inadecuada del medicamento, además de dificultar la lectura de reacciones como en las pruebas de alergia o PPD."
  },
  {
    id: 3,
    question: "¿Qué debe formarse al aplicar correctamente una inyección intradérmica?",
    options: ["Un hematoma", "Una pápula o habón", "Una ampolla", "Nada visible"],
    correctAnswer: 1,
    category: "intradermica",
    explanation: "La formación de una pápula o habón (elevación blanquecina de 6-10mm con aspecto de piel de naranja) es el indicador de que la inyección se realizó correctamente en la dermis. Si no se forma la pápula, significa que el medicamento se depositó demasiado profundo en el tejido subcutáneo."
  },
  {
    id: 4,
    question: "¿Cuál es el calibre de aguja recomendado para la vía intradérmica?",
    options: ["18-20 G", "21-23 G", "26-27 G", "14-16 G"],
    correctAnswer: 2,
    category: "intradermica",
    explanation: "Se utilizan agujas de calibre 26-27 G (muy finas) porque la dermis es una capa delgada y superficial. Agujas más gruesas causarían trauma innecesario, dolor y dificultarían la técnica de inserción a un ángulo tan pequeño. La longitud recomendada es de 1/4 a 5/8 de pulgada."
  },
  {
    id: 5,
    question: "¿Cuánto tiempo después se realiza la lectura del PPD?",
    options: ["24 horas", "48-72 horas", "1 semana", "Inmediatamente"],
    correctAnswer: 1,
    category: "intradermica",
    explanation: "La lectura del PPD (prueba de tuberculina) se realiza entre 48-72 horas porque este es el tiempo que tarda la reacción inmunológica de hipersensibilidad retardada (tipo IV) en desarrollarse completamente. Lecturas antes de 48 horas pueden dar falsos negativos, y después de 72 horas la reacción comienza a disminuir."
  },
  // Preguntas Subcutánea
  {
    id: 6,
    question: "¿En qué tejido se deposita el medicamento en la vía subcutánea?",
    options: ["Músculo", "Dermis", "Tejido graso subcutáneo", "Torrente sanguíneo"],
    correctAnswer: 2,
    category: "subcutanea",
    explanation: "El medicamento se deposita en el tejido graso subcutáneo (hipodermis), ubicado debajo de la dermis y encima del músculo. Este tejido tiene menor vascularización que el músculo, lo que permite una absorción lenta y sostenida del medicamento, ideal para fármacos como la insulina y las heparinas."
  },
  {
    id: 7,
    question: "¿Cuál es el ángulo de inserción para personas delgadas en la vía subcutánea?",
    options: ["90°", "45°", "15°", "30°"],
    correctAnswer: 1,
    category: "subcutanea",
    explanation: "En personas delgadas se usa un ángulo de 45° porque tienen menor cantidad de tejido graso subcutáneo. Un ángulo de 90° en personas delgadas podría atravesar el tejido subcutáneo y llegar al músculo. En personas con mayor tejido adiposo sí se puede usar 90°, siempre haciendo un pliegue cutáneo."
  },
  {
    id: 8,
    question: "¿Qué tipo de absorción caracteriza a la vía subcutánea?",
    options: ["Inmediata", "Lenta y sostenida", "Variable", "Muy rápida"],
    correctAnswer: 1,
    category: "subcutanea",
    explanation: "La absorción es lenta y sostenida debido a la menor vascularización del tejido graso subcutáneo comparado con el músculo. Esta característica es ventajosa para medicamentos que requieren liberación prolongada como la insulina, vacunas y anticoagulantes, proporcionando niveles terapéuticos más estables."
  },
  {
    id: 9,
    question: "¿Cuál es el calibre de aguja recomendado para la vía subcutánea?",
    options: ["18-20 G", "25-27 G", "14-16 G", "21-22 G"],
    correctAnswer: 1,
    category: "subcutanea",
    explanation: "Se recomiendan agujas de calibre 25-27 G porque son lo suficientemente finas para minimizar el dolor y el trauma tisular, pero permiten la administración de volúmenes de hasta 2 ml. La longitud típica es de 1/2 a 5/8 de pulgada, adecuada para alcanzar el tejido subcutáneo sin penetrar el músculo."
  },
  {
    id: 10,
    question: "¿Cuál NO es un lugar recomendado para inyección subcutánea?",
    options: ["Abdomen", "Cara anterior del muslo", "Glúteo mayor", "Cara externa del brazo"],
    correctAnswer: 2,
    category: "subcutanea",
    explanation: "El glúteo mayor NO es un sitio recomendado para inyección subcutánea porque es el sitio tradicional para inyecciones intramusculares. Los sitios correctos para subcutánea son: abdomen (excepto área periumbilical), cara externa del brazo, cara anterior del muslo y área subescapular, donde hay suficiente tejido graso accesible."
  },
  // Preguntas Intramuscular
  {
    id: 11,
    question: "¿Cuál es el ángulo de inserción para la vía intramuscular?",
    options: ["45°", "15°", "90°", "30°"],
    correctAnswer: 2,
    category: "intramuscular",
    explanation: "El ángulo de 90° (perpendicular a la piel) es el correcto porque permite que la aguja atraviese todas las capas de la piel y el tejido subcutáneo para llegar directamente al músculo. Este ángulo asegura que el medicamento se deposite en el tejido muscular, donde hay mayor vascularización para una absorción más rápida."
  },
  {
    id: 12,
    question: "¿Cuál es el sitio más recomendado por seguridad para inyección intramuscular?",
    options: ["Deltoides", "Dorsoglúteo", "Ventroglúteo", "Vasto lateral"],
    correctAnswer: 2,
    category: "intramuscular",
    explanation: "El ventroglúteo es el sitio más seguro porque está alejado de nervios importantes y vasos sanguíneos grandes, tiene una capa gruesa de músculo glúteo medio, menor tejido adiposo que el dorsoglúteo, y es fácil de localizar usando referencias anatómicas. Es ideal para adultos y niños mayores de 7 meses."
  },
  {
    id: 13,
    question: "¿Por qué se limita el uso del dorsoglúteo?",
    options: ["Es muy doloroso", "Riesgo del nervio ciático", "Poca absorción", "Difícil acceso"],
    correctAnswer: 1,
    category: "intramuscular",
    explanation: "El uso del dorsoglúteo se limita principalmente por el riesgo de lesionar el nervio ciático, que pasa por esa zona. Una inyección mal colocada puede causar parálisis del nervio ciático, dolor intenso y daño permanente. También tiene más tejido adiposo, lo que puede resultar en inyecciones subcutáneas accidentales."
  },
  {
    id: 14,
    question: "¿Cuál es el volumen de jeringa recomendado para vía intramuscular?",
    options: ["1 ml", "3 a 5 ml", "10 ml", "0.5 ml"],
    correctAnswer: 1,
    category: "intramuscular",
    explanation: "Las jeringas de 3 a 5 ml son las recomendadas porque permiten administrar los volúmenes típicos para esta vía: hasta 3 ml en deltoides, hasta 5 ml en ventroglúteo o dorsoglúteo, y hasta 5 ml en vasto lateral en adultos. Volúmenes mayores causan dolor y mala absorción."
  },
  {
    id: 15,
    question: "¿Qué se debe hacer con la piel antes de la inyección intramuscular?",
    options: ["Pellizcarla", "Estirarla/tensarla", "Masajearla", "Humedecerla"],
    correctAnswer: 1,
    category: "intramuscular",
    explanation: "La piel debe estirarse o tensarse para facilitar la inserción de la aguja a través de los tejidos y llegar al músculo. Esta técnica, a diferencia del pellizco usado en subcutánea, permite una penetración más directa y profunda. Además, reduce el dolor y facilita la administración con técnica en Z cuando es necesaria."
  },
  // Preguntas Intravenosa
  {
    id: 16,
    question: "¿Cuál es la biodisponibilidad de la vía intravenosa?",
    options: ["50%", "75%", "90%", "100%"],
    correctAnswer: 3,
    category: "intravenosa",
    explanation: "La biodisponibilidad es del 100% porque el medicamento se administra directamente en el torrente sanguíneo, evitando el proceso de absorción. No hay pérdida por efecto de primer paso hepático ni variabilidad en la absorción intestinal. Esto permite un efecto farmacológico inmediato y predecible."
  },
  {
    id: 17,
    question: "¿Cuál es el ángulo de inserción del catéter en la vía intravenosa?",
    options: ["5° a 10°", "15° a 30°", "45° a 60°", "90°"],
    correctAnswer: 1,
    category: "intravenosa",
    explanation: "El ángulo de 15° a 30° es el adecuado porque permite que el catéter entre en la vena de forma paralela a su trayecto, reduciendo el riesgo de atravesar la pared posterior del vaso. Un ángulo muy pronunciado puede perforar ambas paredes de la vena, causando hematoma e infiltración."
  },
  {
    id: 18,
    question: "¿Qué calibre de catéter se usa para la vía intravenosa periférica?",
    options: ["14-16 G", "18-24 G", "26-28 G", "10-12 G"],
    correctAnswer: 1,
    category: "intravenosa",
    explanation: "Los catéteres de calibre 18-24 G son los estándar para vía IV periférica. El 18-20 G se usa para infusiones rápidas, sangre o emergencias; el 22 G es el más versátil para la mayoría de tratamientos; y el 24 G se reserva para venas pequeñas, pediatría o pacientes con accesos difíciles."
  },
  {
    id: 19,
    question: "¿Qué se debe observar para confirmar la correcta punción intravenosa?",
    options: ["Formación de pápula", "Retorno sanguíneo", "Enrojecimiento", "Dolor intenso"],
    correctAnswer: 1,
    category: "intravenosa",
    explanation: "El retorno sanguíneo (reflujo de sangre en la cámara del catéter) es el indicador de que la aguja ha penetrado correctamente en la luz de la vena. Sin retorno sanguíneo, el catéter podría estar en tejido subcutáneo o haber atravesado la vena. Siempre se debe verificar antes de iniciar la infusión."
  },
  {
    id: 20,
    question: "¿Cuál NO es una vena comúnmente usada para acceso intravenoso?",
    options: ["Vena cefálica", "Vena basílica", "Vena yugular", "Venas del dorso de la mano"],
    correctAnswer: 2,
    category: "intravenosa",
    explanation: "La vena yugular NO se usa para acceso intravenoso periférico porque es una vena central del cuello que requiere técnicas especiales, equipo específico y mayor entrenamiento. Se considera acceso venoso central, no periférico. Las venas periféricas comunes son: cefálica, basílica, mediana cubital y las del dorso de la mano."
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

  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completed
      const finalScore = selectedAnswer === questions[currentQuestion].correctAnswer ? score + 1 : score
      if (user) {
        await addQuizResult(finalScore, questions.length)
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

          {/* Explicación */}
          {showResult && (
            <div className={cn(
              "mt-6 p-4 rounded-xl border-2",
              selectedAnswer === question.correctAnswer
                ? "bg-primary/5 border-primary/30"
                : "bg-red-500/5 border-red-500/30"
            )}>
              <div className="flex items-start gap-3">
                {selectedAnswer === question.correctAnswer ? (
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className={cn(
                    "font-semibold mb-2",
                    selectedAnswer === question.correctAnswer ? "text-primary" : "text-red-400"
                  )}>
                    {selectedAnswer === question.correctAnswer ? "¡Correcto!" : "Incorrecto"}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    <span className="font-medium text-foreground">Respuesta correcta: </span>
                    {question.options[question.correctAnswer]}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
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
