import { useEffect, useState } from "react"
import ProductCard from "./productCard"
import { API_BASE_URL } from "../config"

const PLACEHOLDER_PRODUCTS = [
    {
        id: "placeholder-1",
        name: "Veste Premium",
        description: "Une veste elegante pour toutes les occasions",
        price: 599,
        image: "/placeholder.svg",
        category: "Vestes",
        sex: "unisex",
        colors: ["Noir", "Beige"],
        stock: 10,
        is_featured: true
    },
    {
        id: "placeholder-2",
        name: "Chemise Classique",
        description: "Chemise en coton de haute qualite",
        price: 349,
        image: "/placeholder.svg",
        category: "Chemises",
        sex: "homme",
        colors: ["Blanc", "Bleu"],
        stock: 15,
        is_featured: true
    },
    {
        id: "placeholder-3",
        name: "Robe Elegante",
        description: "Robe parfaite pour les soirees",
        price: 799,
        image: "/placeholder.svg",
        category: "Robes",
        sex: "femme",
        colors: ["Noir", "Rouge"],
        stock: 8,
        is_featured: true
    },
    {
        id: "placeholder-4",
        name: "Pantalon Moderne",
        description: "Confort et style au quotidien",
        price: 449,
        image: "/placeholder.svg",
        category: "Pantalons",
        sex: "unisex",
        colors: ["Gris", "Marine"],
        stock: 12,
        is_featured: true
    }
]

export default function FeaturedSection() {
    const [products, setProducts] = useState(PLACEHOLDER_PRODUCTS)

    useEffect(() => {
        let ignore = false

        async function load() {
            try {
                const response = await fetch(`${API_BASE_URL}/products/featured`)
                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
                const data = await response.json()
                if (!ignore && Array.isArray(data) && data.length > 0) {
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
