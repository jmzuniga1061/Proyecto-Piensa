import { Header } from "@/components/header"
import { SectionTitle } from "@/components/section-title"
import { VentajasDesventajas } from "@/components/ventajas-desventajas"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

const galeriaImagenes = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.02%20PM%20%281%29-oIlL40SMXYQJtt9YHf9FzJqbHMI3zq.jpeg",
    alt: "Preparación de suero IV con jeringa",
    caption: "Preparación del suero intravenoso"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.03%20PM%20%283%29-gGrwRWWrC3H9Am5PVwGBZQc7Le7hQ2.jpeg",
    alt: "Inserción de aguja intravenosa",
    caption: "Técnica de inserción IV"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.03%20PM%20%285%29-wuVllcV2soxTVsh4F1V5jPGCi8dcD8.jpeg",
    alt: "Extracción de sangre venosa",
    caption: "Punción venosa con torniquete"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.03%20PM%20%284%29-ymJmky1nl0nNvrICvX6TVoWtVbWrQ4.jpeg",
    alt: "Inyección subcutánea abdominal",
    caption: "Administración subcutánea"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.04%20PM%20%281%29-JFkB8cEpel98NRphupzjDRsYY222Ss.jpeg",
    alt: "Material médico para administración IV",
    caption: "Materiales de preparación"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.04%20PM-302W7LDfS7fQTcwyio00swSqAOgoSR.jpeg",
    alt: "Jeringa estéril empacada",
    caption: "Jeringa estéril"
  },
  {
    src: "/images/iv-procedure-1.jpg",
    alt: "Preparación de bolsa IV",
    caption: "Preparación del equipo IV"
  },
  {
    src: "/images/iv-procedure-2.jpg",
    alt: "Localización de vena",
    caption: "Localización de acceso venoso"
  },
  {
    src: "/images/iv-catheter.jpg",
    alt: "Catéter y materiales IV",
    caption: "Material para cateterización"
  },
]

const ventajas = [
  "Acción inmediata",
  "Dosis exacta",
  "Útil en emergencias",
  "Permite infusión continua",
]

const desventajas = [
  "Riesgo elevado si hay errores",
  "Requiere personal capacitado",
  "Mayor riesgo de infección",
  "No apta para autoadministración",
]

const tiposDeAgujas = [
  "Catéter intravenoso periférico (calibre 18-24 G)",
  "Jeringa o equipo de venoclisis",
]

const lugaresMasUtilizados = [
  "Venas del dorso de la mano",
  "Venas del antebrazo",
  "Vena cefálica",
  "Vena basílica",
  "Pliegue antecubital (uso temporal)",
]

const procedimiento = [
  {
    titulo: "1. Preparación del material",
    items: [
      "Solución o medicamento prescrito",
      "Torniquete",
      "Antiséptico (alcohol al 70 %)",
      "Gasas estériles",
      "Guantes",
      "Apósito transparente",
      "Recipiente para material cortopunzante",
    ],
  },
  {
    titulo: "2. Higiene y seguridad",
    items: [
      "Lavado de manos",
      "Colocación de guantes",
      "Verificación de los 5 correctos",
    ],
  },
  {
    titulo: "3. Preparación del medicamento",
    items: [
      "Verificar compatibilidad y dilución",
      "Preparar la dosis indicada",
      "Eliminar burbujas de aire",
      "Rotular la solución si es necesario",
    ],
  },
  {
    titulo: "4. Selección del sitio de punción",
    items: [
      "Colocar el torniquete",
      "Palpar y visualizar la vena",
      "Elegir vena permeable, recta y elástica",
    ],
  },
  {
    titulo: "5. Antisepsia",
    items: [
      "Limpieza del sitio con técnica circular",
      "Dejar secar completamente",
    ],
  },
  {
    titulo: "6. Técnica de Punción",
    items: [
      "Introducir el catéter con bisel hacia arriba",
      "Ángulo de 15° a 30°",
      "Observar retorno sanguíneo",
      "Avanzar el catéter y retirar la aguja",
      "Conectar equipo o jeringa",
      "Iniciar administración según indicación",
    ],
  },
  {
    titulo: "7. Retiro de la aguja",
    items: [
      "Si es bolo: retirar aguja suavemente",
      "Si es catéter: fijar adecuadamente",
      "Presionar con gasa si se retira",
      "Colocar apósito estéril",
    ],
  },
  {
    titulo: "8. Eliminación del material",
    items: [
      "Desechar agujas y catéteres en recipiente de cortopunzantes",
      "Eliminar material contaminado",
      "Retirar guantes",
      "Lavado de manos",
    ],
  },
  {
    titulo: "9. Registro y observación",
    items: [
      "Registrar en historia clínica",
      "Observar al paciente durante y después:",
    ],
    subItems: ["Dolor", "Edema", "Enrojecimiento", "Reacciones adversas"],
  },
]

export default function ViaIntravenosaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Vía Intravenosa" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Qué es */}
        <section className="mb-12">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
            <SectionTitle>¿Qué es?</SectionTitle>
            <p className="mt-5 text-base text-foreground/75 leading-relaxed">
              La vía intravenosa (IV) es un método de administración de medicamentos en el cual el fármaco se introduce directamente en el torrente sanguíneo, a través de una vena. Esto permite una acción inmediata, una biodisponibilidad del 100 % y un control preciso de la dosis administrada.
            </p>
          </div>
        </section>

        {/* Ventajas y Desventajas */}
        <section className="mb-12">
          <VentajasDesventajas ventajas={ventajas} desventajas={desventajas} />
        </section>

        {/* Tipos de Agujas y Lugares */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <SectionTitle>Tipos de Agujas Y material</SectionTitle>
              <ul className="mt-5 space-y-3">
                {tiposDeAgujas.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                    <span className="text-primary mt-0.5 text-lg">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <SectionTitle>Lugares más Utilizados</SectionTitle>
              <ul className="mt-5 space-y-3">
                {lugaresMasUtilizados.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                    <span className="text-primary mt-0.5 text-lg">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Galería de imágenes */}
        <section className="mb-12">
          <SectionTitle className="mb-8">Galería de Procedimientos</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galeriaImagenes.map((imagen, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <Image
                    src={imagen.src}
                    alt={imagen.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium text-center drop-shadow-lg">
                      {imagen.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Procedimiento de administración */}
        <section className="mb-12">
          <SectionTitle className="mb-8">Procedimiento de administración por vía intravenosa</SectionTitle>
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {procedimiento.map((paso, index) => (
                <AccordionItem key={index} value={`paso-${index}`} className="border-border/50 px-6">
                  <AccordionTrigger className="text-primary font-semibold text-base hover:no-underline py-5">
                    <span className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {index + 1}
                      </span>
                      {paso.titulo.replace(/^\d+\.\s*/, '')}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <ul className="space-y-2 ml-11">
                      {paso.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm text-foreground/75">
                          <span className="text-primary mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                      {paso.subItems && (
                        <ul className="ml-4 mt-2 space-y-1">
                          {paso.subItems.map((subItem, subIndex) => (
                            <li key={subIndex} className="flex items-start gap-2 text-sm text-foreground/60">
                              <span className="text-muted-foreground mt-0.5">-</span>
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-muted-foreground">
          Material educativo sobre administración de medicamentos parenterales
        </div>
      </footer>
    </div>
  )
}
