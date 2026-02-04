"use client"

import { Header } from "@/components/header"
import { SectionTitle } from "@/components/section-title"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

const galeriaImagenes = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.02%20PM%20%281%29-oIlL40SMXYQJtt9YHf9FzJqbHMI3zq.jpeg",
    alt: "Preparación de suero",
    caption: "Preparación del medicamento"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.04%20PM%20%281%29-JFkB8cEpel98NRphupzjDRsYY222Ss.jpeg",
    alt: "Materiales para inyección IM",
    caption: "Bandeja de materiales"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-01-28%20at%207.43.04%20PM-302W7LDfS7fQTcwyio00swSqAOgoSR.jpeg",
    alt: "Jeringa estéril",
    caption: "Jeringa estéril empacada"
  },
]

const ventajas = [
  "Absorción rápida",
  "Permite mayor volumen",
  "Adecuada para medicamentos irritantes",
  "Útil cuando la vía oral no es posible",
]

const desventajas = [
  "Más dolorosa",
  "Requiere personal capacitado",
  "Riesgo de lesiones si se aplica mal",
  "No ideal para autoadministración frecuente",
]

const tiposDeAgujas = [
  "Jeringa de 3 a 5 ml",
  "Aguja calibre 21-23 G (1 a 1½ pulgadas)",
]

const lugaresMasUtilizados = [
  "Deltoides (brazo)",
  "Vasto lateral (muslo)",
  "Ventroglúteo (cadera) – recomendado por seguridad",
  "Dorsoglúteo (glúteo) – uso limitado por riesgo del nervio ciático",
]

const procedimiento = [
  {
    titulo: "Preparación del material",
    items: [
      "Medicamento prescrito",
      "Algodón o gasa estéril",
      "Antiséptico (alcohol al 70 %)",
      "Guantes",
      "Recipiente para material cortopunzante",
    ],
  },
  {
    titulo: "Higiene y seguridad",
    items: [
      "Lavado de manos",
      "Colocación de guantes",
      "Verificación de los 5 correctos",
    ],
  },
  {
    titulo: "Preparación del medicamento",
    items: [
      "Cargar la dosis indicada",
      "Eliminar burbujas de aire",
    ],
  },
  {
    titulo: "Selección del sitio de inyección",
    items: [
      "Elegir zona adecuada según edad, masa muscular y medicamento",
    ],
  },
  {
    titulo: "Antisepsia",
    items: [
      "Limpieza circular del sitio",
      "Dejar secar",
    ],
  },
  {
    titulo: "Técnica de inyección",
    items: [
      "Colocar la piel tensa",
      "Introducir la aguja en ángulo de 90°",
      "Aspirar solo si el protocolo lo indica",
      "Inyectar lentamente",
      "Retirar la aguja con firmeza",
    ],
  },
  {
    titulo: "Retiro de la aguja",
    items: [
      "Retirar la aguja rápidamente y en el mismo ángulo de inserción (90°)",
      "Aplicar presión suave con una gasa o algodón estéril",
      "No masajear el sitio, salvo indicación específica del medicamento",
      "Observar si hay sangrado, dolor intenso o reacción inmediata",
    ],
  },
  {
    titulo: "Eliminación del material",
    items: [
      "Desechar la aguja y la jeringa sin recapuchar en el recipiente para material cortopunzante",
      "Eliminar gasas y algodones contaminados según normas de bioseguridad",
      "Retirar los guantes y realizar lavado de manos",
    ],
  },
  {
    titulo: "Registro y observación",
    items: [
      "Registrar en la historia clínica:",
      "Fecha y hora de administración",
      "Medicamento administrado",
      "Dosis",
      "Vía intramuscular",
      "Sitio de aplicación",
      "Nombre y firma del profesional",
    ],
  },
]

export default function ViaIntramuscularPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Vía Intramuscular" />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Qué es */}
        <section className="mb-12">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
            <SectionTitle color="cyan">¿Qué es?</SectionTitle>
            <p className="mt-5 text-base text-foreground/75 leading-relaxed">
              La vía intramuscular (IM) es un método de administración de medicamentos en el cual el fármaco se inyecta directamente en el tejido muscular, que posee una abundante irrigación sanguínea, lo que permite una absorción más rápida y eficaz que las vías intradérmica y subcutánea.
            </p>
          </div>
        </section>

        {/* Ventajas y Desventajas */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Ventajas
              </h3>
              <ul className="space-y-3">
                {ventajas.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                    <span className="text-primary mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <h3 className="text-xl font-bold text-rose-500 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Desventajas
              </h3>
              <ul className="space-y-3">
                {desventajas.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                    <span className="text-rose-500 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tipos de Agujas y Lugares */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <SectionTitle color="cyan">Tipos de Agujas Y material</SectionTitle>
              <ul className="mt-5 space-y-3">
                {tiposDeAgujas.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <SectionTitle color="cyan">Lugares más Utilizados</SectionTitle>
              <ul className="mt-5 space-y-3">
                {lugaresMasUtilizados.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Galería de imágenes */}
        <section className="mb-12">
          <SectionTitle color="cyan" className="mb-8">Galería de Procedimientos</SectionTitle>
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

        {/* Procedimiento */}
        <section className="mb-12">
          <SectionTitle color="green" className="mb-8">Procedimiento de administración por vía intramuscular</SectionTitle>
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {procedimiento.map((paso, index) => (
                <AccordionItem key={index} value={`paso-${index}`} className="border-border/50 px-6">
                  <AccordionTrigger className="text-emerald-400 font-semibold text-base hover:no-underline py-5">
                    <span className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-400/10 text-emerald-400 font-bold text-sm">
                        {index + 1}
                      </span>
                      {paso.titulo}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <ul className="space-y-2 ml-11">
                      {paso.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-muted-foreground">
          Material educativo sobre administración de medicamentos parenterales
        </div>
      </footer>
    </div>
  )
}
