// types/gtag.d.ts
interface Window {
  gtag?: (command: string, eventName: string, params?: Record<string, any>) => void;
}