"use client"

import { useState, useEffect } from "react"
import { X, Download, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AdModalProps {
  videoUrl: string
  onClose: () => void
}

export function AdModal({ videoUrl, onClose }: AdModalProps) {
  const [countdown, setCountdown] = useState(10)
  const [canDownload, setCanDownload] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanDownload(true)
    }
  }, [countdown])

  const handleDownload = () => {
    // Aquí iría la lógica real de descarga
    console.log("Descargando:", videoUrl)
    alert("¡Descarga iniciada! (Esto es una demo)")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="relative w-full max-w-2xl bg-card border-border p-6 md:p-8">
        {/* Close button */}
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Preparando tu descarga</h2>
            <p className="text-muted-foreground">Por favor, espera mientras preparamos tu archivo</p>
          </div>

          {/* Ad Space - Video placeholder */}
          <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center border border-border">
            <div className="text-center space-y-2">
              <div className="text-4xl">📺</div>
              <p className="text-sm text-muted-foreground">Espacio para anuncio en video</p>
              <p className="text-xs text-muted-foreground">(Google Ad Manager / PropellerAds / Adsterra)</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="text-center space-y-4">
            {!canDownload ? (
              <>
                <div className="flex items-center justify-center gap-2 text-[#00F2EA]">
                  <Clock className="w-5 h-5 animate-pulse" />
                  <span className="text-2xl font-bold">{countdown}s</span>
                </div>
                <p className="text-sm text-gray-400">Tu descarga estará lista en {countdown} segundos</p>
              </>
            ) : (
              <Button
                onClick={handleDownload}
                className="w-full h-12 bg-gradient-to-r from-[#00F2EA] to-[#FE2C55] text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <Download className="w-5 h-5 mr-2" />
                Iniciar Descarga
              </Button>
            )}
          </div>

          {/* Additional ad space */}
          <div className="h-24 bg-secondary rounded-lg flex items-center justify-center border border-border">
            <p className="text-xs text-muted-foreground">Espacio para banner publicitario</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
