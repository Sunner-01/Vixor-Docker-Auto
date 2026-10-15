import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { FaTiktok } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="relative border-t border-[#2a2a2a] bg-[#464646] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#000000] to-transparent opacity-30 hidden lg:block"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#000000] to-transparent opacity-30 hidden lg:block"></div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {/* Brand */}
          <div className="space-y-4 text-center justify-self-center min-w-0 flex-shrink-0 lg:mr-10">
            <div className="text-2xl font-bold gradient-instagram-text">
              <span className="gradient-instagram-text font-semibold">Vixor</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              La forma más rápida y fácil de descargar videos y audios de TikTok.
            </p>
            {/* Decorative gradient line under brand */}
            <div className="w-16 h-1 bg-gradient-to-r from-[#00f2ea] via-[#fe2c55] to-[#ff0050] rounded-full mx-auto"></div>
          </div>

          {/* Links */}
          <div className="space-y-4 text-center sm:text-left justify-self-center min-w-0 flex-shrink-0">
            <h3 className="text-xl font-bold text-white">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-200 hover:text-[#00f2ea] transition-colors duration-300 inline-flex items-center group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#00f2ea] to-[#fe2c55] group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#como-funciona" className="text-gray-200 hover:text-[#25f4ee] transition-colors duration-300 inline-flex items-center group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#25f4ee] to-[#fe2c55] group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-200 hover:text-[#fe2c55] transition-colors duration-300 inline-flex items-center group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#fe2c55] to-[#ff0050] group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4 text-center sm:text-left justify-self-center min-w-0 flex-shrink-0">
            <h3 className="text-xl font-bold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="text-gray-200 hover:text-[#00f2ea] transition-colors duration-300 inline-flex items-center group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#00f2ea] to-[#fe2c55] group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-200 hover:text-[#ff0050] transition-colors duration-300 inline-flex items-center group">
                  <span className="w-0 h-px bg-gradient-to-r from-[#fe2c55] to-[#ff0050] group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4 text-center justify-self-center min-w-0 flex-shrink-0 lg:ml-10">
            <h3 className="text-xl font-bold text-white">Síguenos</h3>
            <div className="flex gap-3 flex-wrap justify-center">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#3a3a3a]/50 border border-[#2a2a2a] flex items-center justify-center text-gray-200 hover:text-[#00f2ea] hover:border-[#00f2ea]/50 hover:bg-[#00f2ea]/10 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#3a3a3a]/50 border border-[#2a2a2a] flex items-center justify-center text-gray-200 hover:text-[#25f4ee] hover:border-[#25f4ee]/50 hover:bg-[#25f4ee]/10 transition-all duration-300"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#3a3a3a]/50 border border-[#2a2a2a] flex items-center justify-center text-gray-200 hover:text-[#fe2c55] hover:border-[#fe2c55]/50 hover:bg-[#fe2c55]/10 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#3a3a3a]/50 border border-[#2a2a2a] flex items-center justify-center text-gray-200 hover:text-[#ff0050] hover:border-[#ff0050]/50 hover:bg-[#ff0050]/10 transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#2a2a2a] text-center">
          <p className="text-sm text-gray-200 mx-auto max-w-max">
            © {new Date().getFullYear()} <span className="">Vixor</span> / Desarrollado por <span className="font-semibold underline">DeeperCode.dev</span> / Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Bottom decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#000000]/30 to-transparent"></div>
    </footer>
  )
}
