import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { AdBanner } from "@/components/ad-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="blur-orb blur-orb-cyan w-[500px] h-[500px] top-0 -left-32" />
      <div className="blur-orb blur-orb-pink w-[600px] h-[600px] top-1/4 -right-48" />
      <div className="blur-orb blur-orb-cyan-light w-[450px] h-[450px] top-2/3 left-1/4" />
      <div className="blur-orb blur-orb-pink-dark w-[550px] h-[550px] bottom-0 right-1/3" />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        <Header />


        <main>
          <Hero />
          <HowItWorks />
          <FAQ />
        </main>

        <Footer />
      </div>
    </div>
  )
}
