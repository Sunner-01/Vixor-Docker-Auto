// components/CookieConsentWrapper.tsx
"use client";

import { useEffect } from "react";
import CookieConsent from "react-cookie-consent";

export default function CookieConsentWrapper() {
  useEffect(() => {
    // Acepta cookies automáticamente después de 5 segundos si no hay interacción
    const timer = setTimeout(() => {
      if (!document.cookie.includes("vixor-consent")) {
        document.cookie = "vixor-consent=true; max-age=12960000; path=/"; // 150 días
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceptar"
      declineButtonText="Rechazar"
      cookieName="vixor-consent"
      expires={150}
      enableDeclineButton // Habilita botón de rechazo
      onDecline={() => {
        // Borra cookies de analíticas si el usuario rechaza
        document.cookie = "vixor-consent=false; max-age=0; path=/";
        // Opcional: Deshabilitar Google Analytics
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("consent", "update", {
            analytics_storage: "denied",
          });
        }
      }}
    >
      Usamos cookies para ofrecerte una mejor experiencia. ¿Aceptas su uso?
    </CookieConsent>
  );
}