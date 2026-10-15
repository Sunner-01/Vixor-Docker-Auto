interface AdBannerProps {
  position: "top" | "side" | "bottom"
}

export function AdBanner({ position }: AdBannerProps) {
  const heights = {
    top: "h-24",
    side: "h-96",
    bottom: "h-32",
  }

  return (
    <div
      className={`w-full ${heights[position]} bg-zinc-900/50 border-y border-zinc-800 flex items-center justify-center`}
    >
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-400">Espacio Publicitario</p>
        <p className="text-xs text-gray-500">Google Ad Manager / PropellerAds / Adsterra</p>
      </div>
    </div>
  )
}
