import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Shield, Database, Cookie, ExternalLink, Lock, FileText, RefreshCw, Info } from "lucide-react"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* SVG Gradient Definition */}
      <svg width="0" height="0" style={{position: 'absolute'}}>
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#00f2ea'}} />
            <stop offset="25%" style={{stopColor: '#25f4ee'}} />
            <stop offset="75%" style={{stopColor: '#fe2c55'}} />
            <stop offset="100%" style={{stopColor: '#ff0050'}} />
          </linearGradient>
        </defs>
      </svg>

      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                  <Shield className="w-16 h-16" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Política de <span className="gradient-instagram-text">Privacidad</span>
              </h1>
              <p className="text-gray-400">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
            </div>

            {/* Content */}
            <Card className="p-8 md:p-10 bg-[#1a1a1a]/80 backdrop-blur-sm border-gray-800/50 space-y-8 shadow-2xl">
              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Database className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">1. Información que Recopilamos</h2>
                    <p className="text-gray-300 leading-relaxed">
                      En Vixor, respetamos tu privacidad. No recopilamos información personal identificable a menos que nos
                      la proporciones voluntariamente a través de nuestro formulario de contacto. Podemos recopilar
                      información no personal como tu dirección IP, tipo de navegador y páginas visitadas para mejorar
                      nuestro servicio.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <FileText className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">2. Uso de la Información</h2>
                    <p className="text-gray-300 leading-relaxed">La información que recopilamos se utiliza para:</p>
                    <ul className="space-y-3 ml-4">
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="gradient-instagram-text text-xs mt-1.5">●</span>
                        <span>Proporcionar y mejorar nuestros servicios</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="gradient-instagram-text text-xs mt-1.5">●</span>
                        <span>Responder a tus consultas y solicitudes de soporte</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="gradient-instagram-text text-xs mt-1.5">●</span>
                        <span>Analizar el uso del sitio web para mejorar la experiencia del usuario</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="gradient-instagram-text text-xs mt-1.5">●</span>
                        <span>Cumplir con obligaciones legales</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Cookie className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">3. Cookies</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Las cookies son pequeños archivos
                      de texto que se almacenan en tu dispositivo. Puedes configurar tu navegador para rechazar cookies,
                      pero esto puede afectar la funcionalidad del sitio.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <ExternalLink className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">4. Publicidad de Terceros</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Trabajamos con redes publicitarias de terceros que pueden utilizar cookies y tecnologías similares
                      para mostrar anuncios relevantes. Estas empresas tienen sus propias políticas de privacidad que te
                      recomendamos revisar.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Lock className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">5. Seguridad</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Implementamos medidas de seguridad razonables para proteger tu información contra acceso no
                      autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por
                      Internet es 100% seguro.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Info className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">6. Enlaces a Sitios de Terceros</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas
                      de privacidad de estos sitios. Te recomendamos leer sus políticas de privacidad.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <RefreshCw className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">7. Cambios a esta Política</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios
                      entrarán en vigor inmediatamente después de su publicación en esta página.
                    </p>
                  </div>
                </div>
              </section>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}