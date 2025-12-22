import { useEffect, useState } from "react"
import ProductCard from "./productCard"
import { BASE_API_URL } from "@/lib/api"

export default function FeaturedSection() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        let ignore = false

        async function load() {
            try {
                const response = await fetch(`${BASE_API_URL}/products/featured`)
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

    const featured = products.filter((p) => p.is_featured).slice(0, 4)

    return (
        <section className="py-20 bg-dark-gradient">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-cinzel-decorative mb-4">
                        Collection de la semaine
                    </h2>
                    <p className="text-foreground/70 max-w-xl mx-auto">
                        Des pièces sélectionnées pour un style élégant et moderne.
                    </p>
                </div>

                <div className="p-[1px] rounded-2xl bg-gradient-to-br from-primary/60 via-[#f5d76e]/40 to-primary/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            </div>
        </section>
    )
}
