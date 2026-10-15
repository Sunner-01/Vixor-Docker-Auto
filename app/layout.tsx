import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import Script from "next/script";
import CookieConsentWrapper from "@/components/CookieConsentWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vixor - Descarga Videos de TikTok sin Marca de Agua en HD Gratis",
  description:
    "Descarga videos, audios e imágenes de TikTok sin marca de agua y en alta definición (HD) con Vixor. Nuestra herramienta online es rápida, segura y gratuita, permitiéndote guardar contenido de TikTok en MP4 o MP3 sin complicaciones ni aplicaciones. ¡Obtén tus videos favoritos en segundos!",
  keywords: [
    // Español
    "descargar videos tiktok sin marca de agua",
    "descargar tiktok HD",
    "descargar audios tiktok",
    "descargar imágenes tiktok",
    "tiktok downloader sin marca de agua",
    "descargar tiktok gratis HD",
    "tiktok video downloader HD",
    "tiktok audio downloader",
    "vixor tiktok",
    "descargar tiktok online sin marca de agua",
    // Inglés
    "download TikTok without watermark",
    "download TikTok HD",
    "TikTok video downloader",
    "TikTok audio downloader",
    "TikTok image downloader",
    "download TikTok free",
    "TikTok downloader no watermark",
    "vixor TikTok downloader",
    "download TikTok online",
    "TikTok downloader HD",
  ],
  authors: [
    { name: "Vixor" },
    { name: "DeeperCode.dev", url: "https://deepercode.dev" },
  ],
  icons: {
    icon: "/favicon.png", // Favicon en public/favicon.png
  },
  openGraph: {
    title: "Vixor - Descarga Videos de TikTok sin Marca de Agua en HD Gratis",
    description:
      "Con Vixor, descarga videos, audios e imágenes de TikTok sin marca de agua y en HD de forma rápida y gratuita. Guarda tu contenido favorito en alta calidad en solo unos clics.",
    type: "website",
    locale: "es_ES",
    siteName: "Vixor",
    url: "https://vixor.pro",
    images: [
      {
        url: "/images/Logo_Vixor_5.png",
        width: 630,
        height: 630,
        alt: "Vixor - Descarga Videos de TikTok sin Marca de Agua en HD",
      },
    ],
  },
  generator: "DeeperCode.dev", 
  robots: "index, follow", // Optimizado para indexación
  metadataBase: new URL("https://vixor.pro"), // URLs absolutas
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google Analytics con ID G-1QEE5EV5GX */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1QEE5EV5GX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-78N8NTNRGY');
          `}
        </Script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <CookieConsentWrapper />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}