import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

export default function Hero() {
    const [products, setProducts] = useState([])
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        let ignore = false

        async function load() {
            try {
                const response = await fetch("http://localhost:8000/api/products/featured")
                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
                const data = await response.json()
                if (!ignore && Array.isArray(data)) {
                    setProducts(data)
                }
            } catch (error) {
                console.error(error)
            }
        }

        load()

        return () => {
            ignore = true
        }
    }, [])

    useEffect(() => {
        if (products.length === 0) {
            return
        }

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [products])

    const next = () => {
        if (products.length === 0) {
            return
        }
        setCurrent((prev) => (prev + 1) % products.length)
    }

    const prev = () => {
        if (products.length === 0) {
            return
        }
        setCurrent((prev) => (prev - 1 + products.length) % products.length)
    }

    return (
        <section className="pt-24 pb-8 bg-dark-gradient">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 lg:-mt-10 gap-6 lg:gap-12 items-center min-h-screen">
                    <div className="flex flex-col justify-center space-y-8 order-1 lg:order-1">
                        <div>
                            <div className="max-w-[48ch] lg:max-w-[90ch] mx-auto lg:mx-0 text-center lg:text-left">
                                <h1 className="text-2xl lg:text-4xl font-cinzel-decorative text-center font-semibold mb-4">
                                    Bienvenue Chez
                                    <br />
                                    <span className="bg-clip-text text-transparent bg-gold-gradient text-5xl lg:text-6xl">Numberone</span>
                                </h1>
                                <p className="font-light font-rodfat text-center text-sm lg:text-base text-foreground/80">
                                    Trouvez votre style prefere parmi notre vaste collection de vetements.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 font-cinzel-decorative font-bold max-w-[41ch] lg:max-w-[34ch] text-sm lg:text-lg mx-auto lg:ml-50">
                            <Link
                                to="/collection"
                                className="px-6 py-3 border border-foreground/50 bg-glass rounded-xl text-foreground/80 hover:bg-gold-gradient hover:text-background hover:border-primary transition-colors duration-400 inline-block"
                            >
                                Collection
                            </Link>
                            <Link
                                to="/info"
                                className="px-6 py-3 border border-foreground/50 bg-glass rounded-xl text-foreground/80 hover:bg-gold-gradient hover:text-background hover:border-primary transition-colors duration-400 inline-block"
                            >
                                En Savoir Plus
                            </Link>
                        </div>
                    </div>

                    <div className="relative h-[480px] rounded-lg overflow-hidden group order-2 lg:order-1">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                                <span className="absolute bottom-10 left-5 font-cinzel text-foreground text-lg font-medium">
                                    {product.name}
                                </span>
                            </div>
                        ))}

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
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setCurrent(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === current ? "bg-primary" : "bg-primary/30"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
