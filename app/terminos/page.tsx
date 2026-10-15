import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { FileCheck, Server, Shield, Copyright, AlertTriangle, Megaphone, Settings, RefreshCw, Scale } from "lucide-react"

export default function TerminosPage() {
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
                  <FileCheck className="w-16 h-16" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Términos y <span className="gradient-instagram-text">Condiciones</span>
              </h1>
              <p className="text-gray-400">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
            </div>

            {/* Content */}
            <Card className="p-8 md:p-10 bg-[#1a1a1a]/80 backdrop-blur-sm border-gray-800/50 space-y-8 shadow-2xl">
              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <FileCheck className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">1. Aceptación de los Términos</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Al acceder y utilizar Vixor, aceptas estar sujeto a estos términos y condiciones. Si no estás de
                      acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Server className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">2. Descripción del Servicio</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Vixor es un servicio gratuito que permite a los usuarios descargar videos y audios de diversas
                      plataformas en línea. El servicio se proporciona "tal cual" sin garantías de ningún tipo.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Shield className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">3. Uso Aceptable</h2>
                    <p className="text-gray-300 leading-relaxed">Al utilizar Vixor, te comprometes a:</p>
                    <ul className="space-y-3 ml-4">
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="gradient-instagram-text text-xs mt-1.5">●</span>
                        <span>Utilizar el servicio solo para fines legales y personales</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="gradient-instagram-text text-xs mt-1.5">●</span>
                        <span>Respetar los derechos de autor y propiedad intelectual</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="gradient-instagram-text text-xs mt-1.5">●</span>
                        <span>No descargar contenido con fines comerciales sin autorización</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="gradient-instagram-text text-xs mt-1.5">●</span>
                        <span>No utilizar el servicio para actividades ilegales o no autorizadas</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <span className="gradient-instagram-text text-xs mt-1.5">●</span>
                        <span>No intentar dañar, sobrecargar o interferir con el funcionamiento del servicio</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Copyright className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">4. Derechos de Autor</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Vixor no aloja ni almacena ningún contenido de video o audio. Solo proporcionamos enlaces a contenido
                      disponible públicamente. Los usuarios son responsables de asegurarse de que tienen el derecho legal de
                      descargar el contenido. Respetamos los derechos de propiedad intelectual y cumplimos con las leyes
                      DMCA.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <AlertTriangle className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">5. Limitación de Responsabilidad</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Vixor no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que
                      resulte del uso o la imposibilidad de usar nuestro servicio. No garantizamos que el servicio esté
                      libre de errores o interrupciones.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Megaphone className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">6. Publicidad</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Nuestro servicio gratuito se financia mediante publicidad. Al utilizar Vixor, aceptas que se muestren
                      anuncios durante tu experiencia. Trabajamos con redes publicitarias de terceros que pueden recopilar
                      información según sus propias políticas de privacidad.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Settings className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">7. Modificaciones del Servicio</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Nos reservamos el derecho de modificar, suspender o discontinuar el servicio en cualquier momento sin
                      previo aviso. No seremos responsables ante ti ni ante terceros por cualquier modificación, suspensión
                      o discontinuación del servicio.
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
                    <h2 className="text-2xl font-semibold text-white">8. Cambios a los Términos</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Podemos actualizar estos términos y condiciones en cualquier momento. El uso continuado del servicio
                      después de cualquier cambio constituye tu aceptación de los nuevos términos.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 group-hover:border-gray-700 transition-colors">
                    <Scale className="w-6 h-6" style={{stroke: 'url(#instagram-gradient)'}} strokeWidth={2} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl font-semibold text-white">9. Ley Aplicable</h2>
                    <p className="text-gray-300 leading-relaxed">
                      Estos términos se regirán e interpretarán de acuerdo con las leyes aplicables, sin tener en cuenta sus
                      disposiciones sobre conflictos de leyes.
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