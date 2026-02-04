import { Header } from "@/components/header"
import { SectionTitle } from "@/components/section-title"
import { VentajasDesventajas } from "@/components/ventajas-desventajas"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

const galeriaImagenes = [
  {
    src: "/images/intradermica-1.jpg",
    alt: "Técnica de inyección intradérmica",
    caption: "Inyección intradérmica en antebrazo"
  },
  {
    src: "/images/intradermica-2.jpg",
    alt: "Reacción de prueba cutánea",
    caption: "Formación de pápula (habón)"
  },
  {
    src: "/images/intradermica-3.jpg",
    alt: "Material para inyección intradérmica",
    caption: "Jeringa tuberculina y materiales"
  },
  {
    src: "/images/via-injection-2.jpg",
    alt: "Técnica de inserción de aguja",
    caption: "Técnica de inserción"
  },
  {
    src: "/images/via-injection-6.jpg",
    alt: "Jeringa estéril empacada",
    caption: "Jeringa estéril"
  },
  {
    src: "/images/via-injection-5.jpg",
    alt: "Materiales de preparación",
    caption: "Bandeja de materiales"
  },
]

const ventajas = [
  "Permite observar reacciones locales visibles",
  "Requiere pequeño volumen",
  "Es una técnica económica",
  "Resultados fácilmente evaluables en pruebas diagnósticas",
]

const desventajas = [
  "No sirve para grandes volúmenes",
  "Requiere técnica precisa",
  "Riesgo de error si no se coloca exactamente en la dermis",
]

const tiposDeAgujas = [
  "Jeringa de 1 ml",
  "Aguja calibre 26-27, corta y fina",
  "Volumen máximo: 0.1 ml",
]

const lugaresMasUtilizados = [
  "Cara anterior del antebrazo (zona media)",
  "Región escapular superior",
  "Parte superior del tórax, por debajo de la clavícula",
]

const procedimiento = [
  {
    titulo: "Preparación del material",
    items: [
      "Jeringa de 1 ml (tipo tuberculina)",
      "Aguja fina calibre 26-27 G",
      "Medicamento prescrito",
      "Algodón o gasa estéril",
      "Antiséptico (alcohol al 70 %)",
      "Guantes limpios o estériles",
      "Recipiente para desechos cortopunzantes",
    ],
  },
  {
    titulo: "Higiene y seguridad",
    items: [
      "Lavado de manos según normas de bioseguridad",
      "Colocación de guantes",
      "Verificación de los 5 correctos",
    ],
  },
  {
    titulo: "Preparación del medicamento",
    items: [
      "Cargar la dosis indicada (0.01 a 0.1 ml)",
      "Eliminar burbujas de aire",
      "Mantener la jeringa en posición estéril",
    ],
  },
  {
    titulo: "Selección del sitio de inyección",
    items: [
      "Cara anterior del antebrazo",
      "Región escapular",
      "Parte superior del tórax",
    ],
    nota: "El sitio debe estar limpio, seco y sin lesiones.",
  },
  {
    titulo: "Antisepsia",
    items: [
      "Limpiar con alcohol al 70 % en forma circular, desde el centro hacia afuera. Dejar secar al aire.",
    ],
  },
  {
    titulo: "Técnica de inyección",
    items: [
      "Piel tensa con pulgar e índice",
      "Aguja con bisel hacia arriba",
      "Ángulo de inserción: 5° a 15°",
      "Avanzar solo 2-3 mm",
      "Inyectar lentamente",
    ],
    nota: "Debe formarse una pápula o habón visible",
    notaColor: "green",
  },
  {
    titulo: "Retiro de la aguja",
    items: [
      "Retirar la aguja suavemente",
      "No masajear el sitio",
      "No presionar salvo sangrado leve",
    ],
  },
  {
    titulo: "Eliminación del material",
    items: [
      "Desechar aguja y jeringa en recipiente cortopunzante",
      "Retirar guantes y lavado de manos",
    ],
  },
  {
    titulo: "Registro y observación",
    items: [
      "Registrar el procedimiento y observar la zona (ejemplo: lectura de PPD a las 48-72 horas).",
    ],
  },
]

export default function ViaIntradermicaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Vía Intradérmica" />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Qué es */}
        <section className="mb-12">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
            <SectionTitle>¿Qué es?</SectionTitle>
            <p className="mt-5 text-base text-foreground/75 leading-relaxed">
              La vía intradérmica es una forma de administración de medicamentos en la que el fármaco se deposita directamente en la dermis, es decir, en la capa media de la piel que se encuentra entre la epidermis (capa superficial) y el tejido subcutáneo. Se utiliza principalmente para fines diagnósticos, inmunológicos y de sensibilización, más que para tratamientos de gran volumen.
            </p>
          </div>
        </section>

        {/* Ventajas y Desventajas */}
        <section className="mb-12">
          <VentajasDesventajas ventajas={ventajas} desventajas={desventajas} />
        </section>

        {/* Tipos de Agujas y Lugares */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-10">
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
                  <li key={index} className="flex items-center gap-4 text-sm text-foreground/75">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg">
                Son zonas elegidas porque la piel es fina, accesible y permite observar fácilmente la reacción.
              </p>
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

        {/* Procedimiento */}
        <section className="mb-12">
          <SectionTitle className="mb-8">Procedimiento de administración por vía intradérmica</SectionTitle>
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
                          <span className="text-primary mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {paso.nota && (
                      <p className={`mt-4 ml-11 text-sm italic ${paso.notaColor === "green" ? "text-emerald-400" : "text-muted-foreground"}`}>
                        {paso.notaColor === "green" && "* "}{paso.nota}
                      </p>
                    )}
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
