import { useEffect, useMemo, useRef, useState } from "react"
import ProductCard from "../components/productCard"
import API_BASE_URL from "@/lib/api"
import { usePageEnter, useStagger } from "@/lib/anim"

export default function Collection() {
  const [productsState, setProductsState] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sex, setSex] = useState("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [sexOptions, setSexOptions] = useState([])
  const ref = usePageEnter()
  const gridRef = useRef(null)

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

        if (!ignore && Array.isArray(data)) {
          setProductsState(data)
          setError(null)
        }
      } catch {
        if (!ignore) {
          setError("Erreur lors du chargement des produits.")
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
          if (Array.isArray(data.categories)) {
            setCategories(data.categories)
          }
          if (Array.isArray(data.sexes)) {
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

  useStagger(gridRef, ".card-item")

  return (
    <section ref={ref} className="pt-28 pb-20 bg-scnd-gradient">
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
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card-item h-full">
                <ProductCard product={product} />
              </div>
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
