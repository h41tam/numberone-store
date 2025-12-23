import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LocalSlideshow from "./localSlideshow"

export default function Hero() {
    const [products, setProducts] = useState([])
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        setProducts([])
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

    const next = () => {}
    const prev = () => {}

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
                                <p className="font-bold font-cinzel text-center text-sm lg:text-base text-foreground/80">
                                    Trouvez votre style préféré parmi notre vaste collection de vêtements.
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

                    <div className="order-2 lg:order-1">
                        <LocalSlideshow />
                    </div>
                </div>
            </div>
        </section>
    )
}
