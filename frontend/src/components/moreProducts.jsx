import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductCard from "./productCard"
import API_BASE_URL from "@/lib/api"

export default function MoreProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        let ignore = false

        async function load() {
            try {
                const response = await fetch(`${API_BASE_URL}/products/latest`)
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

    const moreProducts = products.slice(0, 4)

    return (
        <section className="py-16 bg-scnd-gradient">
            <div className="max-w-7xl mx-auto px-6">

                <h3 className="text-2xl font-cinzel mb-8 text-center">
                    Découvrez plus de produits
                </h3>

                {moreProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {moreProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                <div className="mt-8 flex justify-center">
                    <Link
                        to="/collection"
                        className="px-6 py-3 rounded-xl border border-primary text-primary hover:bg-gold-gradient hover:text-background transition-colors font-cinzel-decorative font-bold"
                    >
                        Voir toute la collection
                    </Link>
                </div>

            </div>
        </section>
    )
}
