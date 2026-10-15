import { Copy, Clock, Download } from "lucide-react"
import { Card } from "@/components/ui/card"

export function HowItWorks() {
  const steps = [
    {
      icon: Copy,
      title: "Copia el Enlace",
      description: "Copia la URL del video o audio que deseas descargar desde cualquier plataforma compatible.",
    },
    {
      icon: Clock,
      title: "Espera Unos Segundos",
      description: "Pega el enlace en nuestro buscador y espera mientras procesamos tu solicitud.",
    },
    {
      icon: Download,
      title: "Descarga tu Archivo",
      description: "Elige la calidad deseada y descarga tu video o audio directamente a tu dispositivo.",
    },
  ]

  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00F2EA]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#FE2C55]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-[#000000]">
              ¿Cómo <span className="gradient-instagram-text">Funciona</span>?
            </h2>
            <p className="text-lg text-[#1f1f1f] max-w-2xl mx-auto">
              Descargar tus videos favoritos es muy fácil. Solo sigue estos 3 simples pasos.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group">
                <Card className="relative p-6 bg-black border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 h-full">
                  {/* Efecto de brillo animado en hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00F2EA]/0 via-[#FE2C55]/0 to-[#FF0050]/0 group-hover:from-[#00F2EA]/10 group-hover:via-[#FE2C55]/10 group-hover:to-[#FF0050]/10 rounded-lg transition-all duration-500"></div>
                  
                  {/* Step number badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full gradient-instagram flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>

                  <div className="relative space-y-4 pt-4">
                    {/* Icono y título en la misma línea */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300">
                        <step.icon className="w-6 h-6 text-[#00F2EA] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#e7e7e7] group-hover:text-white transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>

                    {/* Descripción */}
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Línea decorativa inferior animada */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#00F2EA] via-[#FE2C55] to-[#FF0050] group-hover:w-full transition-all duration-700 rounded-b-lg"></div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}