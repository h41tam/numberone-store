import { useEffect, useMemo, useState } from "react"
import ProductCard from "../components/productCard"
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
  },
  {
    id: "placeholder-5",
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
    id: "placeholder-6",
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
    id: "placeholder-7",
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
    id: "placeholder-8",
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

const PLACEHOLDER_CATEGORIES = ["Vestes", "Chemises", "Robes", "Pantalons", "T-shirts", "Jeans", "Pulls"]
const PLACEHOLDER_SEX_OPTIONS = ["homme", "femme", "unisex"]

export default function Collection() {
  const [productsState, setProductsState] = useState(PLACEHOLDER_PRODUCTS)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sex, setSex] = useState("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState(PLACEHOLDER_CATEGORIES)
  const [sexOptions, setSexOptions] = useState(PLACEHOLDER_SEX_OPTIONS)

  useEffect(() => {
    let ignore = false

    async function load() {
      setLoading(true)
      try {
        const response = await fetch(`${API_BASE_URL}/products`)
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()

        if (!ignore && Array.isArray(data) && data.length > 0) {
          setProductsState(data)
          setError(null)
        }
      } catch {
        if (!ignore) {
          setError(null)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false

    async function loadFilters() {
      try {
        const response = await fetch(`${API_BASE_URL}/products/filters`)
        if (!response.ok) {
          return
        }
        const data = await response.json()
        if (!ignore && data) {
          if (Array.isArray(data.categories) && data.categories.length > 0) {
            setCategories(data.categories)
          }
          if (Array.isArray(data.sexes) && data.sexes.length > 0) {
            setSexOptions(data.sexes)
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadFilters()

    return () => {
      ignore = true
    }
  }, [])

  const filteredProducts = useMemo(() => {
    return productsState.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === "all" || p.category === category
      const matchSex = sex === "all" || p.sex === sex

      return matchSearch && matchCategory && matchSex
    })
  }, [productsState, search, category, sex])

  return (
    <section className="pt-28 pb-20 bg-scnd-gradient">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-cinzel-decorative font-bold mb-4">
            Collection
          </h1>
          <p className="text-foreground/70">
            Trouvez la piece parfaite pour votre style.
          </p>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

          {/* Search */}
          <input
            type="text"
            placeholder="Chercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="col-span-2 md:col-span-2 px-4 py-2 font-cinzel font-bold rounded-xl bg-primary placeholder:text-background text-background border border-glass outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-xl bg-primary font-cinzel font-bold text-background border border-glass outline-none"
          >
            <option value="all">Tout</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="px-4 py-2 rounded-xl bg-primary font-cinzel font-bold text-background border border-glass outline-none"
          >
            <option value="all">Tous</option>
            {sexOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-center text-foreground/60 mb-4">
            Chargement des produits...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mb-4">
            {error}
          </p>
        )}

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/60">
            Aucun produit trouve.
          </p>
        )}

      </div>
    </section>
  )
}
