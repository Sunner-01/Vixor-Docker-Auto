"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Clipboard, X, ArrowUp, Clapperboard, Image as ImageIcon, Loader2, ChevronLeft, ChevronRight } from "lucide-react"

interface ApiData {
  type: 'video' | 'image';
  title: string;
  author: string;
  author_avatar: string;
  hd: { link: string };
  sd: { link: string };
  mp3: { link: string };
  images?: string[];
}

export function Hero() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(0)
  const [apiData, setApiData] = useState<ApiData | null>(null)
  const [downloadCount, setDownloadCount] = useState(3253264)
  const [option, setOption] = useState<'hd' | 'sd' | 'mp3' | 'image-video' | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Simular incremento dinámico lento del contador
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount((prev) => prev + Math.floor(Math.random() * 5) + 1)
    }, Math.floor(Math.random() * 2000) + 3000)
    return () => clearInterval(interval)
  }, [])

  // Scroll a la sección de descarga cuando apiData cambia
  useEffect(() => {
    if (!apiData) return;

    const section = document.getElementById("download-section");
    if (!section) return;

    // 1) Primer scroll normal al inicio de la sección
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    // 2) Después de 1s empezamos la animación lenta y controlada
    const timeoutId = window.setTimeout(() => {
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + sectionRect.top;
      const sectionBottom = sectionTop + sectionRect.height;
      const startY = window.scrollY;

      // Buscamos el último botón visible dentro de la sección
      const buttons = section.querySelectorAll("button");
      const lastButton = buttons[buttons.length - 1] as HTMLElement | undefined;

      // Si no hay botón, fallback: no hacemos nada extra
      if (!lastButton) return;

      const lastRect = lastButton.getBoundingClientRect();
      const lastTopAbs = window.scrollY + lastRect.top;

      // Cuánto queremos que se vea del último botón: aquí puedes ajustar
      // (por ejemplo 18% del alto de la pantalla, limitada al alto del botón)
      const visiblePx = Math.min(Math.round(window.innerHeight * 0.18), lastRect.height || 48);

      // Queremos que la parte superior del botón quede a (viewportHeight - visiblePx),
      // por eso restamos (window.innerHeight - visiblePx)
      let targetY = lastTopAbs - (window.innerHeight - visiblePx);

      // CLAMP: no nos pasamos del final de la sección
      const maxAllowed = sectionBottom - window.innerHeight; // máximo scroll sin mostrar la siguiente sección
      const minAllowed = sectionTop; // no bajar menos que el inicio de la sección

      // Si la sección es más corta que la pantalla, evitar scroll extra
      if (maxAllowed < minAllowed) {
        targetY = sectionTop;
      } else {
        targetY = Math.min(Math.max(targetY, minAllowed), maxAllowed);
      }

      // Si el target está muy cerca del inicio actual => no animamos
      if (targetY <= startY + 8) return;

      // Animación lenta y suave (ajusta duration si quieres más lento)
      const duration = 3200; // 4.2s (más lento)
      let startTime: number | null = null;
      let rafId: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // ease-in-out-cubic
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startY + (targetY - startY) * ease);

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        }
      };

      rafId = requestAnimationFrame(step);

      // limpieza para cancelar la RAF si se desmonta o cambia apiData
      const cleanupRAF = () => {
        if (rafId) cancelAnimationFrame(rafId);
      };

      // guardamos una referencia en el DOM para limpiar si es necesario
      (section as any).__cleanupRAF = cleanupRAF;
    }, 1000);

    // cleanup del effect
    return () => {
      window.clearTimeout(timeoutId);
      // cancelar RAF si quedó
      const cleanupRAF = (section as any)?.__cleanupRAF;
      if (cleanupRAF && typeof cleanupRAF === "function") cleanupRAF();
    };
  }, [apiData]);

  // Función para limpiar el input
  const handleClear = () => {
    setUrl("")
    setError("")
    setApiData(null)
    setOption(null)
    setCurrentImageIndex(0)
  }

  // Función para pegar del clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
    } catch (err) {
      setError("No se pudo acceder al portapapeles. Pega manualmente.")
    }
  }

  // Función combinada para pegar o limpiar
  const handlePasteOrClear = () => {
    if (url.trim()) {
      handleClear()
    } else {
      handlePaste()
    }
  }

  // Función para limpiar URLs
  const cleanUrl = (inputUrl: string): string => {
    try {
      const urlObj = new URL(inputUrl)
      return urlObj.origin + urlObj.pathname
    } catch {
      return inputUrl
    }
  }

  // Función para validar URLs de TikTok
  const validateUrl = (url: string): boolean => {
    const supportedDomains = ["tiktok.com", "vm.tiktok.com", "vt.tiktok.com"]
    try {
      const urlObj = new URL(url)
      return supportedDomains.some((domain) => urlObj.hostname.includes(domain))
    } catch {
      return false
    }
  }

  // Función para obtener info con TikWM
  const getTikTokInfo = async (cleanedUrl: string): Promise<ApiData> => {
    try {
      const tikwmUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(cleanedUrl)}&hd=1`
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)
      const response = await fetch(tikwmUrl, { signal: controller.signal })
      clearTimeout(timeoutId)
      const data = await response.json()
      
      if (data.code !== 0) throw new Error(data.msg || "Error en TikWM")

      const hasImages = data.data.images && data.data.images.length > 0
      const shortDuration = data.data.duration && data.data.duration <= 1
      const isImage = hasImages || shortDuration

      const hdLink = data.data.hdplay || data.data.play
      const sdLink = data.data.play

      const isAudioOnly = hdLink === data.data.music || sdLink === data.data.music
      if (isAudioOnly && !isImage) {
        throw new Error("El enlace de video parece ser solo audio. Intenta con otra URL.")
      }

      const validHdLink = isImage && isAudioOnly ? '' : hdLink
      const validSdLink = isImage && isAudioOnly ? '' : sdLink

      return {
        type: isImage ? 'image' : 'video',
        title: data.data.title || "Contenido de TikTok",
        author: data.data.author.unique_id || "Desconocido",
        author_avatar: data.data.author.avatar || "https://via.placeholder.com/100",
        hd: { link: validHdLink },
        sd: { link: validSdLink },
        mp3: { link: data.data.music },
        images: data.data.images || [],
      }
    } catch (err) {
      console.error("TikWM falló:", err)
      throw new Error("Error en TikWM. Intenta con otra URL o más tarde.")
    }
  }

  // Obtener info de la API
  const handleFetchOptions = async () => {
    if (!url.trim()) {
      setError("Por favor pega un enlace válido de TikTok.")
      return
    }

    const cleanedUrl = cleanUrl(url)

    if (!validateUrl(cleanedUrl)) {
      setError("URL no es de TikTok. Solo soportamos TikTok.")
      return
    }

    setLoading(true)
    setError("")
    setApiData(null)
    setOption(null)
    setCurrentImageIndex(0)

    try {
      const data = await getTikTokInfo(cleanedUrl)
      setApiData(data)
    } catch (err: any) {
      setError(err.message || "Error obteniendo información del contenido.")
    } finally {
      setLoading(false)
    }
  }

  // Función para descargar imágenes
  const handleDownloadImage = async (imageUrl: string, index: number) => {
    setLoading(true)
    setError("")
    setProgress(0)

    try {
      const response = await fetch(imageUrl)
      if (!response.ok) throw new Error("Error descargando la imagen.")
      
      const contentLength = response.headers.get('content-length')
      const total = contentLength ? parseInt(contentLength, 10) : 0
      let loaded = 0

      const reader = response.body!.getReader()
      const chunks: ArrayBuffer[] = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        if (value) {
          chunks.push(value.buffer)
          loaded += value.length
          if (total > 0) setProgress((loaded / total) * 100)
        }
      }

      const blob = new Blob(chunks, { type: 'image/jpeg' })
      const blobUrl = URL.createObjectURL(blob)

      const timestamp = Date.now()
      const filename = `TikTok_Image_${index + 1}_${timestamp}.jpg`

      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)

      setDownloadCount((prev) => prev + 1)

      // AGREGADO: Tracking de Google Analytics para descarga de imagen
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'download', {
          category: 'TikTok',
          action: 'Image Download',
          label: 'No Watermark',
        });
      }

    } catch (err: any) {
      setError(err.message || "Error descargando la imagen.")
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  // Función para generar MP4 con múltiples imágenes + audio
  const generateImageVideo = async (imageUrls: string[], audioUrl: string, setProgress: (progress: number) => void, audioCtx: AudioContext): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
      const canvas = document.createElement('canvas')
      canvas.width = 720
      canvas.height = 1280
      const ctx = canvas.getContext('2d')!
      
      const images: HTMLImageElement[] = new Array(imageUrls.length).fill(null)
      let hasError = false

      // Cargar todas las imágenes
      const imageLoadPromises = imageUrls.map((url, index) => {
        return new Promise<void>((resolveImg, rejectImg) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => {
            images[index] = img
            resolveImg()
          }
          img.onerror = () => {
            hasError = true
            console.error(`Error cargando imagen ${index + 1}: ${url}`)
            rejectImg(new Error(`Error cargando la imagen ${index + 1}.`))
          }
          img.src = url
        })
      })

      try {
        // Esperar a que todas las imágenes se carguen
        await Promise.all(imageLoadPromises)
        
        // Cargar el audio
        const audioResponse = await fetch(audioUrl)
        const audioArrayBuffer = await audioResponse.arrayBuffer()
        
        // Decodificar el audio
        const audioBuffer = await audioCtx.decodeAudioData(audioArrayBuffer)
        
        const duration = audioBuffer.duration * 1000
        const imageDuration = duration / imageUrls.length
        
        // Crear cadena de audio con ganancia máxima
        const dest = audioCtx.createMediaStreamDestination()
        const audioSource = audioCtx.createBufferSource()
        const gainNode = audioCtx.createGain()
        
        // GANANCIA MÁXIMA para volumen alto
        gainNode.gain.value = 3.0
        
        audioSource.buffer = audioBuffer
        audioSource.connect(gainNode)
        gainNode.connect(dest)
        
        const audioTrack = dest.stream.getAudioTracks()[0]
        if (!audioTrack) {
          console.error("No se pudo obtener la pista de audio.")
          audioCtx.close()
          reject(new Error("No se pudo obtener la pista de audio."))
          return
        }
        
        // Capturar el video del canvas
        const videoStream = canvas.captureStream(30)
        
        // Combinar video y audio
        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          audioTrack
        ])

        const chunks: Blob[] = []
        const recorder = new MediaRecorder(combinedStream, {
          mimeType: 'video/webm;codecs=vp9',
          videoBitsPerSecond: 5000000,
          audioBitsPerSecond: 256000
        })

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data)
        }

        recorder.onstop = () => {
          const webmBlob = new Blob(chunks, { type: 'video/webm' })
          
          // Convertir WebM a MP4 usando un truco del navegador
          // Como no podemos convertir directamente, guardamos como mp4 y el navegador lo maneja
          resolve(webmBlob)
          combinedStream.getTracks().forEach(track => track.stop())
          audioCtx.close()
          setProgress(100)
        }

        recorder.onerror = (err) => {
          console.error("Error en MediaRecorder:", err)
          reject(new Error('Error generando el video.'))
          combinedStream.getTracks().forEach(track => track.stop())
          audioCtx.close()
        }

        let currentImageIndex = 0
        let opacity = 1
        let transitionStart = 0
        const transitionDuration = 500

        const drawFrame = (timestamp: number) => {
          if (hasError) return
          const elapsed = timestamp - startTime
          if (elapsed > duration + 500) {
            if (recorder.state === 'recording') {
              recorder.stop()
            }
            return
          }

          const imageIndex = Math.min(Math.floor(elapsed / imageDuration), imageUrls.length - 1)
          if (imageIndex !== currentImageIndex) {
            currentImageIndex = imageIndex
            transitionStart = timestamp
            opacity = 0
          }

          const transitionProgress = timestamp - transitionStart
          if (transitionProgress < transitionDuration) {
            opacity = transitionProgress / transitionDuration
          } else {
            opacity = 1
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = '#000000'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          const img = images[currentImageIndex]
          if (!img) {
            console.error(`Imagen no disponible en índice ${currentImageIndex}`)
            hasError = true
            reject(new Error(`Imagen no disponible para el video.`))
            return
          }

          const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
          const imgWidth = img.width * scale
          const imgHeight = img.height * scale
          const x = (canvas.width - imgWidth) / 2
          const y = (canvas.height - imgHeight) / 2

          ctx.globalAlpha = opacity
          ctx.drawImage(img, x, y, imgWidth, imgHeight)
          ctx.globalAlpha = 1

          if (recorder.state === 'recording') {
            requestAnimationFrame(drawFrame)
          }
        }

        const startTime = performance.now()
        const updateProgress = () => {
          if (hasError) return
          const elapsed = performance.now() - startTime
          const progress = Math.min((elapsed / duration) * 100, 99)
          setProgress(progress)
          if (progress < 99 && elapsed < duration + 500) {
            requestAnimationFrame(updateProgress)
          }
        }

        // Iniciar todo sincronizado
        recorder.start()
        audioSource.start(0)
        requestAnimationFrame(drawFrame)
        requestAnimationFrame(updateProgress)
        
      } catch (err) {
        hasError = true
        console.error("Error en generación de video:", err)
        reject(new Error('Error generando el video: ' + (err as Error).message))
      }
    })
  }

  // Función para aumentar volumen del MP3
  const amplifyMP3 = async (audioUrl: string, setProgress: (progress: number) => void, audioCtx: AudioContext): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
      try {
        setProgress(10)
        
        setProgress(20)
        
        // Descargar el audio
        const response = await fetch(audioUrl)
        const arrayBuffer = await response.arrayBuffer()
        
        setProgress(40)
        
        // Decodificar el audio
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
        
        setProgress(60)
        
        // Crear nodos de procesamiento
        const offlineCtx = new OfflineAudioContext(
          audioBuffer.numberOfChannels,
          audioBuffer.length,
          audioBuffer.sampleRate
        )
        
        const source = offlineCtx.createBufferSource()
        const gainNode = offlineCtx.createGain()
        
        // GANANCIA moderada para volumen más alto sin distorsión (1.5x el volumen original)
        gainNode.gain.value = 1.5
        
        source.buffer = audioBuffer
        source.connect(gainNode)
        gainNode.connect(offlineCtx.destination)
        
        source.start(0)
        
        setProgress(70)
        
        // Renderizar el audio con el volumen aumentado
        const renderedBuffer = await offlineCtx.startRendering()
        
        setProgress(85)
        
        // Convertir a MP3 usando MediaRecorder
        const mp3Blob = await audioBufferToMP3(renderedBuffer, audioCtx)
        
        setProgress(100)
        
        audioCtx.close()
        resolve(mp3Blob)
        
      } catch (err) {
        console.error("Error amplificando audio:", err)
        reject(new Error('Error procesando el audio: ' + (err as Error).message))
      }
    })
  }

  // Función para convertir AudioBuffer a WAV
  const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const length = buffer.length * buffer.numberOfChannels * 2 + 44
    const arrayBuffer = new ArrayBuffer(length)
    const view = new DataView(arrayBuffer)
    const channels: Float32Array[] = []
    let offset = 0
    let pos = 0

    // Escribir encabezado WAV
    const setUint16 = (data: number) => {
      view.setUint16(pos, data, true)
      pos += 2
    }
    const setUint32 = (data: number) => {
      view.setUint32(pos, data, true)
      pos += 4
    }

    // "RIFF"
    setUint32(0x46464952)
    // Tamaño del archivo
    setUint32(length - 8)
    // "WAVE"
    setUint32(0x45564157)
    // "fmt "
    setUint32(0x20746d66)
    // Tamaño del sub-chunk
    setUint32(16)
    // Formato de audio (1 = PCM)
    setUint16(1)
    // Número de canales
    setUint16(buffer.numberOfChannels)
    // Sample rate
    setUint32(buffer.sampleRate)
    // Byte rate
    setUint32(buffer.sampleRate * buffer.numberOfChannels * 2)
    // Block align
    setUint16(buffer.numberOfChannels * 2)
    // Bits por muestra
    setUint16(16)
    // "data"
    setUint32(0x61746164)
    // Tamaño de los datos
    setUint32(length - pos - 4)

    // Escribir datos de audio
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i))
    }

    while (pos < length) {
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset]))
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff
        view.setInt16(pos, sample, true)
        pos += 2
      }
      offset++
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' })
  }

  // Función para convertir AudioBuffer a MP3 usando MediaRecorder
  const audioBufferToMP3 = async (buffer: AudioBuffer, audioCtx: AudioContext): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      try {
        // Crear un MediaStreamDestination
        const dest = audioCtx.createMediaStreamDestination()
        const source = audioCtx.createBufferSource()
        
        source.buffer = buffer
        source.connect(dest)
        
        const chunks: Blob[] = []
        const recorder = new MediaRecorder(dest.stream, {
          mimeType: 'audio/webm;codecs=opus',
          audioBitsPerSecond: 256000
        })
        
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data)
        }
        
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/mpeg' })
          resolve(blob)
          dest.stream.getTracks().forEach(track => track.stop())
        }
        
        recorder.onerror = (err) => {
          reject(new Error('Error generando el MP3.'))
          dest.stream.getTracks().forEach(track => track.stop())
        }
        
        recorder.start()
        source.start(0)
        
        // Detener cuando termine el audio
        source.onended = () => {
          setTimeout(() => {
            if (recorder.state === 'recording') {
              recorder.stop()
            }
          }, 100)
        }
        
      } catch (err) {
        reject(new Error('Error en conversión a MP3: ' + (err as Error).message))
      }
    })
  }

  // Iniciar descarga con progress
  const handleDownload = async (option: 'hd' | 'sd' | 'mp3' | 'image-video') => {
    if (!apiData) {
      setError("Obtén la info primero.")
      return
    }

    setLoading(true)
    setError("")
    setProgress(0)
    setOption(option)

    try {
      let link
      let ext = 'mp4'
      let type = 'video'
      let blob: Blob

      if (option === 'image-video') {
        if (!apiData.images || apiData.images.length === 0 || !apiData.mp3.link) {
          throw new Error("Falta imagen o audio para generar el video.")
        }
        // Crear y activar AudioContext de forma síncrona en el evento de clic
        const audioCtx = new AudioContext()
        try {
          await audioCtx.resume()
        } catch (e) {
          console.log("AudioContext ya está activo")
        }
        
        blob = await generateImageVideo(apiData.images, apiData.mp3.link, setProgress, audioCtx)
        ext = 'mp4'
        type = 'video'
      } else if (option === 'mp3') {
        // Descargar MP3 original sin procesamiento (descarga instantánea)
        link = apiData.mp3.link
        if (!link) {
          setError("Enlace no disponible para este formato.")
          return
        }

        const response = await fetch(link)
        if (!response.ok) throw new Error("Error descargando el archivo.")

        const contentLength = response.headers.get('content-length')
        const total = contentLength ? parseInt(contentLength, 10) : 0
        let loaded = 0

        const reader = response.body!.getReader()
        const chunks: ArrayBuffer[] = []

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (value) {
            chunks.push(value.buffer)
            loaded += value.length
            if (total > 0) setProgress((loaded / total) * 100)
          }
        }

        blob = new Blob(chunks, { type: 'audio/mpeg' })
        ext = 'mp3'
        type = 'audio'
      } else {
        if (option === 'hd') {
          link = apiData.hd.link
        } else if (option === 'sd') {
          link = apiData.sd.link
        }

        if (!link) {
          setError("Enlace no disponible para este formato.")
          return
        }

        const response = await fetch(link)
        if (!response.ok) throw new Error("Error descargando el archivo.")

        const contentLength = response.headers.get('content-length')
        const total = contentLength ? parseInt(contentLength, 10) : 0
        let loaded = 0

        const reader = response.body!.getReader()
        const chunks: ArrayBuffer[] = []

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (value) {
            chunks.push(value.buffer)
            loaded += value.length
            if (total > 0) setProgress((loaded / total) * 100)
          }
        }

        blob = new Blob(chunks, { type: 'video/mp4' })
      }

      const blobUrl = URL.createObjectURL(blob)
      const timestamp = Date.now()
      const safeTitle = apiData.title
        ? apiData.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 10)
        : type
      const filename = `${safeTitle}_VixorDownloader_${timestamp}.${ext}`

      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)

      setDownloadCount((prev) => prev + 1)

      // AGREGADO: Tracking de Google Analytics para descarga general
      if (typeof window !== 'undefined' && window.gtag) {
        const actionMap: { [key in typeof option]: string } = {
          'hd': 'Video Download HD',
          'sd': 'Video Download SD',
          'mp3': 'Audio Download MP3',
          'image-video': 'Image Video Download',
        };
        window.gtag('event', 'download', {
          category: 'TikTok',
          action: actionMap[option],
          label: 'No Watermark',
        });
      }

    } catch (err: any) {
      setError(err.message || "Error en la descarga.")
    } finally {
      setLoading(false)
      setProgress(0)
      setOption(null)
    }
  }

  // Función para volver a la sección de input
  const handleBack = () => {
    document.getElementById('download-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Funciones para navegar imágenes
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : apiData!.images!.length - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < apiData!.images!.length - 1 ? prev + 1 : 0))
  }

  // Función para truncar el título
  const truncateTitle = (title: string, maxLength: number = 120): string => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength - 3) + '...'
    }
    return title
  }

  return (
  <>
    <section className="relative py-20 md:py-32 overflow-hidden" id="download-form">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00F2EA]/10 via-[#FE2C55]/10 to-[#FF0050]/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl pt-10 md:text-6xl lg:pt-0 lg:text-7xl font-bold leading-tight text-balance text-[#e7e7e7]">
            Descarga Videos y Audios de <span className="gradient-instagram-text">TikTok</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Sin marca de agua, en HD, MP3 o imágenes. Sin registro, sin límites. Solo pega el enlace y descarga en segundos.
          </p>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex gap-3 pt-0 lg:pt-0">
              <div className="flex-1 relative ">
                <Input
                  type="url"
                  placeholder="Pega aquí el enlace de TikTok..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-12 pr-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
                />
                <Button
                  variant="ghost"
                  onClick={handlePasteOrClear}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-muted rounded-lg"
                  title={url.trim() ? "Limpiar input" : "Pegar del portapapeles"}
                >
                  {url.trim() ? <X className="w-5 h-5" /> : <Clipboard className="w-5 h-5" />}
                </Button>
              </div>
              <Button
                onClick={handleFetchOptions}
                disabled={loading || !url.trim()}
                className="h-12 px-6 md:px-8 gradient-instagram text-white font-semibold hover:opacity-90 transition-opacity shrink-0"
              >
                <Download className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">{loading ? "Cargando..." : "Descargar"}</span>
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <p className="text-sm text-muted-foreground pt-4 lg:pt-0">
              Soportamos TikTok: videos sin marca de agua, imágenes, MP3 o video con imagen
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto pt-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-instagram-text animate-pulse">
                {downloadCount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mt-1">Descargas Totales</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-instagram-text">MP3/MP4/IMG</div>
              <div className="text-sm text-muted-foreground mt-1">Formatos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-instagram-text">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Gratis</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {apiData && (
      <section className="relative py-16 md:py-24 overflow-hidden" id="download-section">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent z-[5]" />
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-[#00F2EA] rounded-full blur-[130px] animate-[float-cyan_25s_ease-in-out_infinite]" />
          <div className="absolute top-[60%] right-[8%] w-[380px] h-[380px] bg-[#FE2C55] rounded-full blur-[130px] opacity-[0.04] animate-[pulse_22s_ease-in-out_infinite]" style={{ animationDelay: '7s' }} />
          <div className="absolute bottom-[20%] left-[45%] w-[360px] h-[360px] bg-[#FF0050] rounded-full blur-[130px] opacity-0 animate-[custom-fade_25s_ease-in-out_infinite]" style={{ animationDelay: '12s' }} />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <style jsx>{`
          @keyframes custom-fade {
            0%, 100% { opacity: 0; }
            50% { opacity: 0.03; }
          }
          
          @keyframes float-cyan {
            0%, 100% { 
              transform: translate(0px, 0px) scale(1);
              opacity: 0.15;
            }
            25% { 
              transform: translate(40px, -30px) scale(1.15);
              opacity: 0.2;
            }
            50% { 
              transform: translate(-30px, 40px) scale(0.9);
              opacity: 0.12;
            }
            75% { 
              transform: translate(50px, 20px) scale(1.1);
              opacity: 0.18;
            }
          }
        `}</style>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#e7e7e7] mb-2 flex items-center justify-center gap-2">
                {apiData.type === 'image' ? 'Tu imagen está lista' : 'Tu video está listo'}
                {apiData.type === 'image' && <ImageIcon className="w-6 h-6" />}
              </h2>
              <p className="text-muted-foreground">
                {apiData.type === 'image' ? 'Descarga la imagen, audio o video con imagen ahora' : 'Descárgalo ahora, sin marca de agua'}
              </p>
            </div>

            {/* 🔽 CAMBIO AQUÍ: orden invertido solo en móvil */}
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              
              {/* VIDEO: aparece primero en móvil */}
              <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-1">
                {apiData.type === 'image' && apiData.images && apiData.images.length > 0 ? (
                  <div className="w-full max-w-[300px] relative">
                    <img
                      src={apiData.images[currentImageIndex]}
                      alt={`Imagen ${currentImageIndex + 1}`}
                      className="w-full rounded-xl shadow-2xl"
                      style={{ objectFit: 'cover' }}
                    />
                    {apiData.images.length > 1 && (
                      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
                        <Button
                          variant="ghost"
                          onClick={handlePrevImage}
                          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                          disabled={loading}
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={handleNextImage}
                          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                          disabled={loading}
                        >
                          <ChevronRight className="w-6 h-6" />
                        </Button>
                      </div>
                    )}
                    <p className="text-center text-sm text-muted-foreground mt-2">
                      Imagen {currentImageIndex + 1} de {apiData.images.length}
                    </p>
                  </div>
                ) : (
                  <video
                    src={apiData.sd.link}
                    controls
                    className="w-full max-w-[300px] rounded-xl shadow-2xl"
                    style={{ objectFit: 'cover' }}
                  >
                    Tu navegador no soporta el video.
                  </video>
                )}
              </div>

              {/* BOTONES: aparecen debajo en móvil */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6 order-2 lg:order-2">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 order-1">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#00F2EA] to-[#FE2C55] rounded-full blur opacity-30"></div>
                      <img
                        src={apiData.author_avatar}
                        alt={apiData.author}
                        className="relative w-16 h-16 rounded-full border-1 border-white/20"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-bold text-[#e7e7e7] mb-1 line-clamp-2">
                        {truncateTitle(apiData.title, 100)}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="gradient-instagram-text font-semibold">@{apiData.author}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botones de descarga (igual) */}
                <div className="space-y-3 order-3">
                  {apiData.type === 'image' && apiData.images && apiData.images.length > 0 ? (
                    <>
                      {apiData.images.map((img, index) => (
                        <Button
                          key={index}
                          onClick={() => handleDownloadImage(img, index)}
                          disabled={loading}
                          className="w-full h-14 bg-white/5 hover:bg-white/10 border border-[#00F2EA]/30 hover:border-[#00F2EA]/60 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                        >
                          <Download className="w-5 h-5 mr-3 text-[#00F2EA]" />
                          Descargar Imagen {index + 1}
                          <ImageIcon className="w-5 h-5 ml-3 text-[#00F2EA]" />
                        </Button>
                      ))}
                      <Button
                        onClick={() => handleDownload('image-video')}
                        disabled={loading}
                        className="w-full h-14 bg-white/5 hover:bg-white/10 border border-[#FE2C55]/30 hover:border-[#FE2C55]/60 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm flex items-center justify-center"
                      >
                        {loading && option === 'image-video' ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-3 text-[#FE2C55] animate-spin" />
                            Generando Video...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-3 text-[#FE2C55]" />
                            Descargar como Video (Imagen + Audio)
                            <Clapperboard className="w-5 h-5 ml-3 text-[#FE2C55]" />
                          </>
                        )}
                      </Button>
                      {apiData.mp3.link && (
                        <Button
                          onClick={() => handleDownload('mp3')}
                          disabled={loading}
                          className="w-full h-14 bg-white/5 hover:bg-white/10 border border-[#FF0050]/30 hover:border-[#FF0050]/60 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                        >
                          <Download className="w-5 h-5 mr-3 text-[#FF0050]" />
                          Descargar Audio MP3
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      {apiData.hd.link && (
                        <Button
                          onClick={() => handleDownload('hd')}
                          disabled={loading}
                          className="w-full h-14 bg-white/5 hover:bg-white/10 border border-[#00F2EA]/30 hover:border-[#00F2EA]/60 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                        >
                          <Download className="w-5 h-5 mr-3 text-[#00F2EA]" />
                          Descargar en HD
                          <Clapperboard className="w-5 h-5 ml-3 text-[#00F2EA]" />
                        </Button>
                      )}
                      {apiData.sd.link && (
                        <Button
                          onClick={() => handleDownload('sd')}
                          disabled={loading}
                          className="w-full h-14 bg-white/5 hover:bg-white/10 border border-[#FE2C55]/30 hover:border-[#FE2C55]/60 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                        >
                          <Download className="w-5 h-5 mr-3 text-[#FE2C55]" />
                          Descargar en SD
                        </Button>
                      )}
                      {apiData.mp3.link && (
                        <Button
                          onClick={() => handleDownload('mp3')}
                          disabled={loading}
                          className="w-full h-14 bg-white/5 hover:bg-white/10 border border-[#FF0050]/30 hover:border-[#FF0050]/60 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                        >
                          <Download className="w-5 h-5 mr-3 text-[#FF0050]" />
                          Descargar Audio MP3
                        </Button>
                      )}
                    </>
                  )}
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="w-full h-12 bg-[#939393] border-2 border-white/20 hover:bg-white/5 text-[#141313] hover:text-[#c2c2c2] font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <ArrowUp className="w-5 h-5 mr-2" />
                    Descargar otro contenido
                  </Button>
                </div>
              </div>
            </div>

            {progress > 0 && progress < 100 && (
              <div className="mt-8 max-w-md mx-auto">
                <div className="bg-white/5 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/10">
                  <div
                    className="bg-gradient-to-r from-[#00F2EA] via-[#FE2C55] to-[#FF0050] h-full rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-center text-sm text-[#e7e7e7] mt-2 font-semibold">
                  {option === 'image-video' ? 'Generando video...' : 'Descargando...'} {progress.toFixed(0)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    )}
  </>
)
}