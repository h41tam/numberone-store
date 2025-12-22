import { useEffect, useState } from "react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import { API_BASE_URL } from "../config"

export default function ProductStory() {
    const [entries, setEntries] = useState([])
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        async function load() {
            const response = await fetch(`${API_BASE_URL}/story-videos`)
            if (!response.ok) {
                return
            }
            const data = await response.json()
            if (Array.isArray(data) && data.length > 0) {
                setEntries(data)
            }
        }

        load()
    }, [])

    if (entries.length === 0) {
        return null
    }

    const currentEntry = entries[current] || null

    if (!currentEntry || !currentEntry.product) {
        return null
    }

    const product = currentEntry.product

    const hasMultiple = entries.length > 1

    const next = () => {
        if (entries.length === 0) {
            return
        }
        setCurrent((c) => (c + 1) % entries.length)
    }

    const prev = () => {
        if (entries.length === 0) {
            return
        }
        setCurrent((c) => (c - 1 + entries.length) % entries.length)
    }

    return (
        <section className="py-16 bg-scnd-gradient">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 lg:gap-10 items-center">

                {/* VIDEO */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-full max-w-[260px] sm:max-w-[240px] lg:max-w-[280px] aspect-[9/16] mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-glass border border-glass">
                        <video
                            key={currentEntry.id}
                            src={currentEntry.video_url}
                            autoPlay
                            muted
                            className="w-full h-full object-cover"
                            onEnded={next}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={prev}
                            className="px-3 py-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
                        >
                            <CaretLeft size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={next}
                            className="px-3 py-2 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
                        >
                            <CaretRight size={20} />
                        </button>
                        {hasMultiple && (
                            <span className="text-xs text-foreground/70">
                                {current + 1}/{entries.length}
                            </span>
                        )}
                    </div>
                </div>

                {/* PRODUCT CARD */}
                <div className="bg-glass p-6 sm:p-8 rounded-2xl border border-glass w-full max-w-xl mx-auto lg:mx-0">
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                        <div className="flex-1">
                            <h3 className="text-2xl font-cinzel-decorative mb-2">{product.name}</h3>
                            <p className="text-foreground/70 mb-4 text-sm sm:text-base">{product.description}</p>
                            <p className="text-xl text-primary mb-6">{product.price} MAD</p>
                            <button className="w-full sm:w-auto px-6 py-3 bg-gold-gradient text-background rounded-xl font-rodfat tracking-wide">
                                Ajouter au panier
                            </button>
                        </div>
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden border border-glass bg-primary/20 flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
