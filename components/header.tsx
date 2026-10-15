"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLElement>(null)

  // Cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Configurar IntersectionObserver para detectar secciones visibles
  useEffect(() => {
    const sections = ["como-funciona", "faq"]
    const observers = sections.map((section) => {
      const element = document.getElementById(section)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${section}`)
          }
        },
        { threshold: 0.5 }
      )

      observer.observe(element)
      return observer
    })

    const topObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection("/")
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -80% 0px" }
    )

    const topElement = document.createElement("div")
    topElement.style.position = "absolute"
    topElement.style.top = "0"
    topElement.style.height = "10px"
    document.body.prepend(topElement)
    topObserver.observe(topElement)

    return () => {
      observers.forEach((observer) => observer?.disconnect())
      topObserver.disconnect()
    }
  }, [])

  // Cerrar el menú móvil al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target instanceof Element && event.target.closest(".mobile-menu-button"))
      ) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Función para determinar si el enlace está activo
  const isActive = (href: string) => {
    if (pathname !== "/") {
      return pathname === href || pathname.startsWith(href + "/")
    }
    return activeSection === href
  }

  // Función para cerrar el menú móvil al hacer click en un link
  const handleMobileLinkClick = () => setMobileMenuOpen(false)

  // Función para depurar el clic en el botón del menú
  const handleMenuToggle = () => {
    console.log("Botón del menú clicado, mobileMenuOpen:", !mobileMenuOpen)
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-gray-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-gray-900/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 mr-10">
            <Image
              src="/images/Logo_Vixor_5.png"
              alt="Vixor Logo"
              width={32}
              height={32}
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
            />
            <div className="text-4xl font-bold gradient-instagram-text">Vixor</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-xl font-medium transition-all duration-300 ${
                isActive("/") 
                  ? "font-semibold gradient-instagram-text" 
                  : "text-[#e7e7e7] hover:font-semibold hover:gradient-instagram-text"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="#como-funciona"
              className={`text-xl font-medium transition-all duration-300 ${
                isActive("#como-funciona") 
                  ? "font-semibold gradient-instagram-text" 
                  : "text-[#e7e7e7] hover:font-semibold hover:gradient-instagram-text"
              }`}
            >
              Cómo Funciona
            </Link>
            <Link
              href="#faq"
              className={`text-xl font-medium transition-all duration-300 ${
                isActive("#faq") 
                  ? "font-semibold gradient-instagram-text" 
                  : "text-[#e7e7e7] hover:font-semibold hover:gradient-instagram-text"
              }`}
            >
              FAQ
            </Link>
            <a
              href="/archivos/Vixor.apk"
              download
              className="text-xl font-medium transition-all duration-300 text-[#e7e7e7] hover:font-semibold hover:gradient-instagram-text"
            >
              Descargar APK
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#e7e7e7] hover:bg-gray-800/70 rounded-full mobile-menu-button"
            onClick={handleMenuToggle}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            ref={mobileMenuRef}
            className="md:hidden py-4 space-y-4 border-t border-gray-700/50 bg-gray-900/40 backdrop-blur-xl"
          >
            <Link
              href="/"
              onClick={handleMobileLinkClick}
              className={`block text-base font-medium transition-all duration-300 px-4 py-2 rounded-md ${
                isActive("/") 
                  ? "font-semibold gradient-instagram-text" 
                  : "text-[#e7e7e7] hover:bg-gray-800/70"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="#como-funciona"
              onClick={handleMobileLinkClick}
              className={`block text-base font-medium transition-all duration-300 px-4 py-2 rounded-md ${
                isActive("#como-funciona") 
                  ? "font-semibold gradient-instagram-text" 
                  : "text-[#e7e7e7] hover:bg-gray-800/70"
              }`}
            >
              Cómo Funciona
            </Link>
            <Link
              href="#faq"
              onClick={handleMobileLinkClick}
              className={`block text-base font-medium transition-all duration-300 px-4 py-2 rounded-md ${
                isActive("#faq") 
                  ? "font-semibold gradient-instagram-text" 
                  : "text-[#e7e7e7] hover:bg-gray-800/70"
              }`}
            >
              FAQ
            </Link>
            <a
              href="/archivos/Vixor.apk"
              download
              onClick={handleMobileLinkClick}
              className="block text-base font-medium transition-all duration-300 px-4 py-2 rounded-md text-[#e7e7e7] hover:bg-gray-800/70"
            >
              Descargar APK
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}