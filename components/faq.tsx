import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Sparkles } from "lucide-react"

export function FAQ() {
  const faqs = [
    {
      question: "¿Es gratis usar Vixor?",
      answer:
        "Sí, Vixor es completamente gratuito. Puedes descargar tantos videos, audios o imágenes de TikTok como desees sin ningún costo.",
    },
    {
      question: "¿Qué tipo de contenido de TikTok puedo descargar?",
      answer:
        "Con Vixor, puedes descargar videos, audios (en formato MP3) e imágenes de publicaciones de TikTok, siempre que el enlace sea válido.",
    },
    {
      question: "¿Necesito registrarme o crear una cuenta?",
      answer:
        "No, no necesitas registrarte ni crear una cuenta. Simplemente pega el enlace de TikTok y descarga tu contenido.",
    },
    {
      question: "¿En qué calidad puedo descargar los videos de TikTok?",
      answer:
        "Ofrecemos múltiples opciones de calidad, desde SD hasta HD (dependiendo de la disponibilidad del video original en TikTok).",
    },
    {
      question: "¿Puedo descargar solo el audio de un video de TikTok?",
      answer:
        "Sí, puedes extraer y descargar solo el audio de un video de TikTok en formato MP3 de alta calidad.",
    },
    {
      question: "¿Hay límite de descargas en Vixor?",
      answer:
        "No hay límite de descargas. Puedes usar Vixor tantas veces como necesites para descargar contenido de TikTok.",
    },
    {
      question: "¿Es legal descargar contenido de TikTok?",
      answer:
        "Descargar videos, audios o imágenes de TikTok para uso personal generalmente está permitido, pero debes respetar los derechos de autor. No redistribuyas el contenido sin permiso del creador.",
    },
    {
      question: "¿Funciona Vixor en dispositivos móviles?",
      answer:
        "Sí, Vixor está optimizado para funcionar perfectamente en smartphones, tablets y computadoras, permitiendo descargar contenido de TikTok desde cualquier dispositivo.",
    },
  ];

  return (
    <section id="faq" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background con esferas animadas */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#00F2EA] rounded-full blur-[120px] opacity-[0.06] animate-[pulse_15s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] left-[5%] w-[450px] h-[450px] bg-[#FE2C55] rounded-full blur-[120px] opacity-[0.06] animate-[pulse_18s_ease-in-out_infinite]" style={{ animationDelay: '5s' }} />
        <div className="absolute top-[50%] left-[50%] w-[350px] h-[350px] bg-[#FF0050] rounded-full blur-[120px] opacity-[0.04] animate-[pulse_20s_ease-in-out_infinite]" style={{ animationDelay: '10s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Header mejorado */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00F2EA]/10 to-[#FE2C55]/10 border border-[#00F2EA]/20 rounded-full px-4 py-2 mb-4">
              <HelpCircle className="w-5 h-5 text-[#00F2EA]" />
              <span className="text-sm font-semibold text-[#e7e7e7]">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#e7e7e7]">
              Preguntas <span className="gradient-instagram-text">Frecuentes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre Vixor
            </p>
          </div>

          {/* FAQ Accordion mejorado */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl px-6 hover:border-[#00F2EA]/30 transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:text-[#00F2EA] text-[#e7e7e7] font-semibold py-5 hover:no-underline">
                  <span className="flex items-start gap-3">
                   
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          
        </div>
      </div>
    </section>
  )
}