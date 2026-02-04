import { Header } from "@/components/header"
import { ViaCard } from "@/components/via-card"
import { SectionTitle } from "@/components/section-title"
import Image from "next/image"

const galeriaImagenes = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.02%20PM%20%281%29-oIlL40SMXYQJtt9YHf9FzJqbHMI3zq.jpeg",
    alt: "Preparación de suero IV con jeringa",
    caption: "Preparación de suero IV"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.03%20PM%20%283%29-gGrwRWWrC3H9Am5PVwGBZQc7Le7hQ2.jpeg",
    alt: "Inserción de aguja intravenosa",
    caption: "Técnica de inserción IV"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.03%20PM%20%285%29-wuVllcV2soxTVsh4F1V5jPGCi8dcD8.jpeg",
    alt: "Extracción de sangre venosa",
    caption: "Punción venosa"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.03%20PM%20%284%29-ymJmky1nl0nNvrICvX6TVoWtVbWrQ4.jpeg",
    alt: "Inyección subcutánea abdominal",
    caption: "Inyección subcutánea"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.04%20PM%20%281%29-JFkB8cEpel98NRphupzjDRsYY222Ss.jpeg",
    alt: "Material médico para administración",
    caption: "Materiales de preparación"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.04%20PM-302W7LDfS7fQTcwyio00swSqAOgoSR.jpeg",
    alt: "Jeringa estéril empacada",
    caption: "Jeringa estéril"
  },
]

const tiposDeVias = [
  {
    title: "Vía Intradérmica",
    description: "Se aplica entre las capas de la piel. Uso frecuente en pruebas diagnósticas.",
    href: "/via-intradermica",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.03%20PM%20%283%29-gGrwRWWrC3H9Am5PVwGBZQc7Le7hQ2.jpeg",
  },
  {
    title: "Vía Subcutánea",
    description: "Se aplica en el tejido graso. Absorción lenta y controlada.",
    href: "/via-subcutanea",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.03%20PM%20%284%29-ymJmky1nl0nNvrICvX6TVoWtVbWrQ4.jpeg",
  },
  {
    title: "Vía Intramuscular",
    description: "Aplicación en el músculo. Absorción rápida.",
    href: "/via-intramuscular",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.04%20PM%20%281%29-JFkB8cEpel98NRphupzjDRsYY222Ss.jpeg",
  },
  {
    title: "Vía Intravenosa",
    description: "Ingreso directo al torrente sanguíneo. Acción inmediata.",
    href: "/via-intravenosa",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.03%20PM%20%285%29-wuVllcV2soxTVsh4F1V5jPGCi8dcD8.jpeg",
  },
]

const materialesGenerales = [
  "Bandeja o riñonera",
  "Guantes desechables (no estériles)",
  "Jeringas (1 ml, 3 ml, 5 ml o 10 ml según el medicamento)",
  "Agujas (calibre y longitud según la vía y el paciente)",
  "Medicamento prescrito",
  "Algodón o gasas estériles",
  "Antiséptico (alcohol al 70 % o clorhexidina)",
  "Recipiente para desechos cortopunzantes (guardián)",
  "Recipiente para desechos biológicos",
  "Etiqueta o rotulador (si se prepara previamente el medicamento)",
]

const procedimientosBasicos = [
  "Lavado de manos",
  "Preparación del material",
  "Identificación del paciente",
  "Aplicación según la vía correspondiente",
  "Registro y monitoreo",
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Vías Parenterales" 
        subtitle="Aprende de forma Interactiva los tipos, técnicas y cuidados."
      />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Qué son las vías parenterales */}
        <section className="mb-16">
          <SectionTitle>¿Qué son las vías parenterales?</SectionTitle>
          <p className="mt-5 text-base text-foreground/70 leading-relaxed max-w-4xl">
            Son métodos de administración de medicamentos mediante inyección directa, evitando el sistema digestivo. Se utilizan para una acción rápida, precisión en la dosis o cuando el paciente no puede ingerir medicamentos por vía oral.
          </p>
        </section>

        {/* Tipos de vías parenterales */}
        <section className="mb-16">
          <SectionTitle>Tipos de Vías Parenterales</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-8">
            {tiposDeVias.map((via) => (
              <ViaCard 
                key={via.title}
                title={via.title}
                description={via.description}
                href={via.href}
                image={via.image}
              />
            ))}
          </div>
        </section>

        {/* Galería de Procedimientos */}
        <section className="mb-16">
          <SectionTitle>Galería de Procedimientos</SectionTitle>
          <p className="mt-3 mb-8 text-sm text-foreground/60">
            Imágenes reales de técnicas y procedimientos de administración parenteral
          </p>
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

        {/* Materiales Generales */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <SectionTitle color="green">Materiales Generales</SectionTitle>
              <ul className="mt-5 space-y-2.5">
                {materialesGenerales.map((material, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                    <span className="text-primary mt-0.5 text-lg">•</span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <SectionTitle color="green">Procedimientos Básicos</SectionTitle>
              <ol className="mt-5 space-y-3">
                {procedimientosBasicos.map((procedimiento, index) => (
                  <li key={index} className="flex items-center gap-4 text-sm text-foreground/75">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </span>
                    {procedimiento}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        </main>
      
      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          Material educativo sobre administración de medicamentos parenterales
        </div>
      </footer>
    </div>
  )
}
