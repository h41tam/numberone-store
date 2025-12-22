import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductCard from "./productCard"
import { API_BASE_URL } from "../config"

const PLACEHOLDER_PRODUCTS = [
    {
        id: "placeholder-more-1",
        name: "T-shirt Basique",
        description: "T-shirt confortable en coton bio",
        price: 199,
        image: "/placeholder.svg",
        category: "T-shirts",
        sex: "unisex",
        colors: ["Blanc", "Noir", "Gris"],
        stock: 25,
        is_featured: false
    },
    {
        id: "placeholder-more-2",
        name: "Jean Slim",
        description: "Jean coupe slim moderne",
        price: 399,
        image: "/placeholder.svg",
        category: "Jeans",
        sex: "homme",
        colors: ["Bleu", "Noir"],
        stock: 18,
        is_featured: false
    },
    {
        id: "placeholder-more-3",
        name: "Pull Over",
        description: "Pull chaud et elegant",
        price: 449,
        image: "/placeholder.svg",
        category: "Pulls",
        sex: "femme",
        colors: ["Beige", "Rose"],
        stock: 10,
        is_featured: false
    },
    {
        id: "placeholder-more-4",
        name: "Veste Legere",
        description: "Parfaite pour les mi-saisons",
        price: 549,
        image: "/placeholder.svg",
        category: "Vestes",
        sex: "unisex",
        colors: ["Olive", "Marine"],
        stock: 7,
        is_featured: false
    }
]

export default function MoreProducts() {
    const [products, setProducts] = useState(PLACEHOLDER_PRODUCTS)

    useEffect(() => {
        let ignore = false

        async function load() {
            try {
                const response = await fetch(`${API_BASE_URL}/products`)
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

    const moreProducts = products.filter((p) => !p.is_featured).slice(0, 4)

    return (
        <section className="py-16 bg-scnd-gradient">
            <div className="max-w-7xl mx-auto px-6">

                <h3 className="text-2xl font-cinzel mb-8 text-center">
                    Découvrez plus de produits
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {moreProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

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
