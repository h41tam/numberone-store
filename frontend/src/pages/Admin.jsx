import { useEffect, useState } from "react"
import API_BASE_URL from "@/lib/api"

export default function Admin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    colors: "",
    sizes: "",
    sex: "female",
    stock: "",
    category: "",
    image: null,
    is_featured: false,
  })
  const [videoForm, setVideoForm] = useState({
    productId: "",
    video: null,
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [storyVideos, setStoryVideos] = useState([])
  const [loadingStories, setLoadingStories] = useState(false)
  const [featuredSelection, setFeaturedSelection] = useState([])
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false)

  const isEditing = editingId !== null

  useEffect(() => {
    async function loadProducts() {
      setLoadingProducts(true)
      try {
        const response = await fetch(`${API_BASE_URL}/products`)
        if (!response.ok) {
          throw new Error("Failed to load products")
        }
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
        const preselected = (Array.isArray(data) ? data : []).filter((p) => p.is_featured).map((p) => p.id).slice(0, 4)
        setFeaturedSelection(preselected)
      } catch {
        setProducts([])
      } finally {
        setLoadingProducts(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    async function loadStories() {
      setLoadingStories(true)
      try {
        const response = await fetch(`${API_BASE_URL}/story-videos`)
        if (!response.ok) {
          throw new Error("Failed to load story videos")
        }
        const data = await response.json()
        setStoryVideos(Array.isArray(data) ? data : [])
      } catch {
        setStoryVideos([])
      } finally {
        setLoadingStories(false)
      }
    }

    loadStories()
  }, [isAuthenticated])

  const authHeader = () =>
    "Basic " + window.btoa(`${username}:${password}`)

  async function handleLogin(e) {
    e.preventDefault()
    setMessage("")
    setError("")
    setCheckingAuth(true)

    try {
      const response = await fetch(`${API_BASE_URL}/admin/ping`, {
        headers: {
          Authorization: authHeader(),
        },
      })

      if (!response.ok) {
        throw new Error("Identifiants admin incorrects")
      }

      setIsAuthenticated(true)
      setMessage("Connected")
    } catch (err) {
      setIsAuthenticated(false)
      setError(err.message || "Impossible de vérifier les identifiants.")
    } finally {
      setCheckingAuth(false)
    }
  }

  function countFeatured(exceptId) {
    return products.filter((p) => p.is_featured && p.id !== exceptId).length
  }

  async function handleSaveProduct(e) {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!isAuthenticated) {
      setError("Veuillez d’abord vous connecter en tant qu’admin.")
      return
    }

    const formData = new FormData()
    formData.append("name", productForm.name)
    formData.append("price", productForm.price)
    formData.append("description", productForm.description)
    formData.append("colors", productForm.colors)
    formData.append("sizes", productForm.sizes)
    formData.append("sex", productForm.sex)
    formData.append("stock", productForm.stock)
    formData.append("category", productForm.category)
    formData.append("is_featured", productForm.is_featured ? "1" : "0")
    if (productForm.image) {
      formData.append("image", productForm.image)
    }

    try {
      if (productForm.is_featured && countFeatured(editingId || undefined) >= 4) {
        throw new Error("Vous ne pouvez sélectionner que 4 produits en vedette.")
      }

      const url = isEditing ? `${API_BASE_URL}/products/${editingId}` : `${API_BASE_URL}/products`
      let response
      if (isEditing && !productForm.image) {
        const jsonPayload = {
          name: productForm.name,
          price: Number(productForm.price),
          description: productForm.description,
          colors: productForm.colors,
          sizes: productForm.sizes,
          sex: productForm.sex,
          stock: Number(productForm.stock),
          category: productForm.category,
          is_featured: Boolean(productForm.is_featured),
        }
        response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
          body: JSON.stringify(jsonPayload),
        })
      } else {
        const method = "POST"
        if (isEditing) {
          formData.append("_method", "PUT")
        }
        response = await fetch(url, {
          method,
          headers: {
            Authorization: authHeader(),
          },
          body: formData,
        })
      }

      if (response.status === 401) {
        throw new Error("Bad admin credentials")
      }

      if (!response.ok) {
        throw new Error("Failed to save product")
      }

      const created = await response.json()

      if (isEditing) {
        setProducts((prev) => prev.map((p) => (p.id === editingId ? created : p)))
        setMessage("Produit modifié avec succès.")
      } else {
        setProducts((prev) => [...prev, created])
        setMessage("Produit créé avec succès.")
      }

      setEditingId(null)
      setProductForm({
        name: "",
        price: "",
        description: "",
        colors: "",
        sizes: "",
        sex: "female",
        stock: "",
        category: "",
        image: null,
        is_featured: false,
      })
    } catch (err) {
      setError(err.message || "Erreur lors de l’enregistrement du produit.")
    }
  }

  async function handleDeleteProduct(id) {
    setMessage("")
    setError("")

    if (!isAuthenticated) {
      setError("Veuillez d’abord vous connecter en tant qu’admin.")
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authHeader(),
        },
      })

      if (response.status === 401) {
        throw new Error("Bad admin credentials")
      }

      if (!response.ok && response.status !== 204) {
        throw new Error("Failed to delete product")
      }

      setProducts((prev) => prev.filter((p) => p.id !== id))

      if (editingId === id) {
        setEditingId(null)
        setProductForm({
          name: "",
          price: "",
          description: "",
          colors: "",
          sizes: "",
          sex: "female",
          stock: "",
          category: "",
          image: null,
          is_featured: false,
        })
      }

      setMessage("Produit supprimé avec succès.")
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression du produit.")
    }
  }

  function handleEditProduct(product) {
    setEditingId(product.id)
    setProductForm({
      name: product.name || "",
      price: String(product.price ?? ""),
      description: product.description || "",
      colors: Array.isArray(product.colors) ? product.colors.join(", ") : product.colors || "",
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes || "",
      sex: product.sex || "female",
      stock: String(product.stock ?? ""),
      category: product.category || "",
      image: null,
      is_featured: Boolean(product.is_featured),
    })
  }

  async function handleUploadVideo(e) {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!isAuthenticated) {
      setError("Veuillez d’abord vous connecter en tant qu’admin.")
      return
    }

    const formData = new FormData()
    formData.append("product_id", videoForm.productId)
    if (videoForm.video) {
      formData.append("video", videoForm.video)
    }

    try {
      const response = await fetch(`${API_BASE_URL}/story-videos`, {
        method: "POST",
        headers: {
          Authorization: authHeader(),
        },
        body: formData,
      })

      if (response.status === 401) {
        throw new Error("Bad admin credentials")
      }

      if (!response.ok) {
        throw new Error("Failed to upload video")
      }

      await response.json()
      setMessage("Vidéo de story ajoutée avec succès.")
      setVideoForm({
        productId: "",
        video: null,
      })
      const refresh = await fetch(`${API_BASE_URL}/story-videos`)
      if (refresh.ok) {
        const data = await refresh.json()
        setStoryVideos(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      setError(err.message || "Erreur lors de l’upload de la vidéo.")
    }
  }

  async function handleDeleteVideo(id) {
    setMessage("")
    setError("")

    if (!isAuthenticated) {
      setError("Veuillez d’abord vous connecter en tant qu’admin.")
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/story-videos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authHeader(),
        },
      })

      if (response.status === 401) {
        throw new Error("Bad admin credentials")
      }

      if (!response.ok && response.status !== 204) {
        throw new Error("Failed to delete video")
      }

      setStoryVideos((prev) => prev.filter((v) => v.id !== id))
      setMessage("Vidéo supprimée avec succès.")
    } catch (err) {
      setError(err.message || "Erreur lors de la suppression de la vidéo.")
    }
  }

  async function handleSaveFeatured(e) {
    e.preventDefault()
    setMessage("")
    setError("")
    if (!isAuthenticated) {
      setError("Veuillez d’abord vous connecter en tant qu’admin.")
      return
    }
    if (!Array.isArray(featuredSelection) || featuredSelection.length === 0) {
      setError("Sélectionnez au moins un produit (max 4).")
      return
    }
    if (featuredSelection.length > 4) {
      setError("Vous ne pouvez sélectionner que 4 produits.")
      return
    }
    try {
      const response = await fetch(`${API_BASE_URL}/products/featured-set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify({ ids: featuredSelection }),
      })
      if (response.status === 401) {
        throw new Error("Bad admin credentials")
      }
      if (!response.ok) {
        throw new Error("Failed to save featured selection")
      }
      const data = await response.json()
      const updatedIds = Array.isArray(data.updated) ? data.updated.map((p) => p.id) : []
      setProducts((prev) =>
        prev.map((p) => ({
          ...p,
          is_featured: updatedIds.includes(p.id),
        })),
      )
      setMessage("Thème de la semaine mis à jour.")
    } catch (err) {
      setError(err.message || "Erreur lors de la mise à jour du thème de la semaine.")
    }
  }

  return (
    <section className="pt-28 pb-20 bg-scnd-gradient min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-rodfat mb-6 text-center">
          Admin
        </h1>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gold-gradient font-ghrathe text-background placeholder:text-background/50 border border-glass outline-none"
          />
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gold-gradient font-ghrathe text-background placeholder:text-background/50 border border-glass outline-none"
          />
          <button
            type="button"
            onClick={handleLogin}
            className="col-span-1 md:col-span-2 px-4 py-2 rounded-xl bg-gold-gradient text-background font-rodfat"
            disabled={checkingAuth || !username || !password}
          >
            {checkingAuth ? "Verification..." : "Se connecter"}
          </button>
        </div>

        {message && (
          <p className="mb-4 text-center text-green-500">
            {message}
          </p>
        )}
        {error && (
          <p className="mb-4 text-center text-red-500">
            {error}
          </p>
        )}

        {isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <form onSubmit={handleSaveProduct} className="bg-glass rounded-2xl border border-glass p-6 space-y-4">
              <h2 className="text-xl font-rodfat mb-2">
                {isEditing ? "Modifier le produit" : "Ajouter un produit"}
              </h2>

              <input
                type="text"
                placeholder="Nom"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-primary placeholder:text-background/50 text-background border border-glass outline-none"
                required
              />

              <input
                type="number"
                placeholder="Prix (MAD)"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-primary placeholder:text-background/50 text-background border border-glass outline-none"
                required
              />

              <textarea
                placeholder="Description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-primary placeholder:text-background/50 text-background border border-glass outline-none"
                rows={3}
              />

              <input
                type="text"
                placeholder="Couleurs (séparées par des virgules)"
                value={productForm.colors}
                onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-primary placeholder:text-background/50 text-background border border-glass outline-none"
              />

              <input
                type="text"
                placeholder="Tailles (séparées par des virgules)"
                value={productForm.sizes}
                onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-primary placeholder:text-background/50 text-background border border-glass outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={productForm.sex}
                  onChange={(e) => setProductForm({ ...productForm, sex: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-primary placeholder:text-background/50 text-background border border-glass outline-none"
                >
                  <option value="female">Femme</option>
                  <option value="male">Homme</option>
                  <option value="unisex">Unisexe</option>
                  <option value="girl">Fille</option>
                  <option value="boy">Garçon</option>
                </select>

                <input
                  type="text"
                  placeholder="Catégorie"
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-primary placeholder:text-background/50 text-background border border-glass outline-none"
                />
              </div>

              <input
                type="number"
                placeholder="Stock"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-primary placeholder:text-background/50 text-background border border-glass outline-none"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProductForm({ ...productForm, image: e.target.files?.[0] || null })}
                className="w-full text-sm text-background"
              />

              <label className="flex items-center gap-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={productForm.is_featured}
                  onChange={(e) => setProductForm({ ...productForm, is_featured: e.target.checked })}
                  className="w-4 h-4"
                />
                Produit en vedette (max 4)
              </label>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gold-gradient text-background font-rodfat"
              >
                {isEditing ? "Mettre à jour le produit" : "Enregistrer le produit"}
              </button>
            </form>

            <form onSubmit={handleUploadVideo} className="bg-glass rounded-2xl border border-glass p-6 space-y-4">
              <h2 className="text-xl font-rodfat mb-2">
                Ajouter une video de story
              </h2>

              <select
                value={videoForm.productId}
                onChange={(e) => setVideoForm({ ...videoForm, productId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-primary text-background border border-glass outline-none"
                required
              >
                <option value="">Choisir un produit</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              {loadingProducts && (
                <p className="text-sm text-foreground/60">
                  Chargement des produits...
                </p>
              )}

              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoForm({ ...videoForm, video: e.target.files?.[0] || null })}
                className="w-full text-sm text-background"
                required
              />

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gold-gradient text-background font-rodfat"
              >
                Enregistrer la vidéo
              </button>
            </form>
          </div>
        )}

        {isAuthenticated && (
          <div className="mt-10 space-y-8">
            <div className="bg-glass rounded-2xl border border-glass p-6">
              <h2 className="text-xl font-rodfat mb-2">Configuration WhatsApp</h2>
              <form onSubmit={handleSaveWhatsapp} className="space-y-4">
                <p className="text-sm text-foreground/70">
                  Ce numéro sera utilisé pour recevoir les commandes. (Format international sans +, ex: 212600000000)
                </p>
                <input
                  type="text"
                  placeholder="212600000000"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-primary placeholder:text-background/50 text-background border border-glass outline-none"
                />
                <button type="submit" className="w-full mt-2 py-3 rounded-xl bg-gold-gradient text-background font-rodfat">
                  Enregistrer le numéro
                </button>
              </form>
            </div>

            <div className="bg-glass rounded-2xl border border-glass p-6">
              <h2 className="text-xl font-rodfat mb-2">Thème de la semaine (sélectionnez 4)</h2>
              <form onSubmit={handleSaveFeatured} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.map((p) => {
                    const checked = featuredSelection.includes(p.id)
                    return (
                      <label key={p.id} className="flex items-center gap-3 border border-glass rounded-xl p-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const c = e.target.checked
                            setFeaturedSelection((prev) => {
                              const set = new Set(prev)
                              if (c) {
                                if (set.size >= 4) return prev
                                set.add(p.id)
                              } else {
                                set.delete(p.id)
                              }
                              return Array.from(set)
                            })
                          }}
                        />
                        <span className="flex-1">{p.name}</span>
                      </label>
                    )
                  })}
                </div>
                <button type="submit" className="w-full mt-2 py-3 rounded-xl bg-gold-gradient text-background font-rodfat">
                  Enregistrer le thème de la semaine
                </button>
              </form>
            </div>
            <div className="bg-glass rounded-2xl border border-glass p-6">
              <h2 className="text-xl font-rodfat mb-4">
                Vidéos de story
              </h2>
              {products.length === 0 ? (
                <p className="text-sm text-foreground/60">
                  Aucun produit pour le moment.
                </p>
              ) : (
                <ul className="space-y-3">
                  {products.map((p) => (
                    <li key={p.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-glass rounded-xl px-4 py-3">
                      <div>
                        <p className="font-ghrathe text-lg">
                          {p.name}
                        </p>
                        <p className="text-sm text-foreground/60">
                          {p.price} MAD · {p.category || "Sans catégorie"} · {p.sex || "Sans sexe"}
                        </p>
                        {p.is_featured && (
                          <p className="text-xs text-primary mt-1">
                            Produit en vedette
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleEditProduct(p)}
                          className="px-3 py-2 rounded-xl bg-primary text-background text-sm font-rodfat"
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p.id)}
                          className="px-3 py-2 rounded-xl bg-red-600/80 text-background text-sm font-rodfat"
                        >
                          Supprimer
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-glass rounded-2xl border border-glass p-6">
              <h2 className="text-xl font-rodfat mb-4">
                Vidéos de story
              </h2>
              {loadingStories && (
                <p className="text-sm text-foreground/60 mb-2">
                  Chargement des vidéos...
                </p>
              )}
              {storyVideos.length === 0 ? (
                <p className="text-sm text-foreground/60">
                  Aucune vidéo pour le moment.
                </p>
              ) : (
                <ul className="space-y-4">
                  {storyVideos.map((v) => (
                    <li key={v.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-glass rounded-xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <video
                          src={v.video_url}
                          className="w-24 h-32 object-cover rounded-lg"
                          muted
                        />
                        <div>
                          <p className="font-ghrathe text-lg">
                            {v.product ? v.product.name : "Sans produit"}
                          </p>
                          {v.product && (
                            <p className="text-sm text-foreground/60">
                              {v.product.price} MAD · {v.product.category || "Sans catégorie"}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteVideo(v.id)}
                        className="px-3 py-2 rounded-xl bg-red-600/80 text-background text-sm font-rodfat"
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
