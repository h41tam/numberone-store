import { useEffect, useMemo, useState } from "react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

export default function LocalSlideshow() {
  const modules = useMemo(() => {
    const files = import.meta.glob("@/assets/images/*.{mp4,webm,jpg,jpeg,png}", { eager: true })
    return Object.values(files)
      .map((m) => m?.default || "")
      .filter((src) => typeof src === "string")
  }, [])

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (modules.length === 0) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % modules.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [modules.length])

  const next = () => modules.length > 0 && setCurrent((c) => (c + 1) % modules.length)
  const prev = () => modules.length > 0 && setCurrent((c) => (c - 1 + modules.length) % modules.length)

  return (
    <div className="relative h-[480px] rounded-lg overflow-hidden group">
      {modules.map((src, index) => {
        const isVideo = src.endsWith(".mp4") || src.endsWith(".webm")
        return (
          <div
            key={src + index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
          >
            {isVideo ? (
              <video
                key={src}
                src={src}
                autoPlay
                muted
                loop={false}
                playsInline
                onEnded={next}
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={src} alt="slide" className="w-full h-full object-cover" loading={index === 0 ? "eager" : "lazy"} />
            )}
          </div>
        )
      })}

      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/20 hover:bg-primary/40 text-primary p-2 rounded-full transition-colors z-10"
      >
        <CaretLeft size={24} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/20 hover:bg-primary/40 text-primary p-2 rounded-full transition-colors z-10"
      >
        <CaretRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {modules.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === current ? "bg-primary" : "bg-primary/30"}`}
          />
        ))}
      </div>
    </div>
  )
}
