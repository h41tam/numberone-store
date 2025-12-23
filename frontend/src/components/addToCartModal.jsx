import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useCart } from "@/context/cartContext"
import { gsap } from "gsap"

export default function AddToCartModal({ product, open, onClose }) {
  const { addItem } = useCart()
  const [color, setColor] = useState(product.colors?.[0] || null)
  const [size, setSize] = useState(product.sizes?.[0] || null)
  const [qty, setQty] = useState(1)
  const overlayRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (open) {
      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(cardRef.current, { scale: 0.9, opacity: 0 })
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 })
      gsap.to(cardRef.current, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" })
    }
  }, [open])

  if (!open) return null

  const submit = () => {
    addItem(product, { selectedColor: color, selectedSize: size, quantity: qty })
    onClose()
  }

  return createPortal(
    <div ref={overlayRef} className="fixed inset-0 bg-glass z-[1000] flex items-center justify-center px-4">
      <div ref={cardRef} className="w-full max-w-lg rounded-2xl bg-scnd-gradient text-background p-6">
        <div className="flex gap-4 items-center">
          <img src={product.image} alt={product.name} className="w-28 h-28 lg:w-[200px] lg:h-[200px] rounded-xl object-cover border border-glass" />
          <div className="flex-1">
            <h3 className="lg:text-7xl font-boston-caps font-bold text-primary">{product.name}</h3>
            <p className="lg:text-2xl text-primary">{product.category}</p>
            <p className="lg:text-3xl text-primary mt-2">{product.price} MAD</p>
            <p className="lg:text-lg mt-1 text-primary">Stock: {product.stock}</p>
          </div>
        </div>
        <div className="mt-6 grid font-cinzel-decorative font-bold grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="lg:text-md text-foreground lg:ml-6">Couleur</label>
            <select value={color || ""} onChange={(e) => setColor(e.target.value)} className="w-full font-rodfat mt-1 bg-gold-gradient border border-glass rounded-lg px-3 py-2 outline-none">
              {(product.colors || []).map((c) => (
                <option key={c} value={c} className="bg-background text-primary hover:bg-primary text-center hover:text-background">{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="lg:text-md text-foreground lg:ml-10">Taille</label>
            <select value={size || ""} onChange={(e) => setSize(e.target.value)} className="w-full font-rodfat mt-1 bg-gold-gradient border border-glass rounded-lg px-3 py-2 outline-none">
              {(product.sizes || []).map((s) => (
                <option key={s} value={s} className="bg-background text-primary hover:bg-primary text-center hover:text-background">{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="lg:text-md text-foreground lg:ml-6">Quantité</label>
            <input type="number" min={1} max={product.stock || 1} value={qty} onChange={(e) => setQty(parseInt(e.target.value || "1"))} className="w-full font-rodfat mt-1 bg-gold-gradient border border-glass text-center rounded-lg px-3 py-[5.1px] lg:py-[5px] outline-none" />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="font-rodfat px-4 py-2 rounded-xl bg-glass text-primary hover:bg-foreground hover:text-background transition-colors duration-300 border border-glass">Annuler</button>
          <button onClick={submit} className="font-rodfat px-5 py-2 rounded-xl bg-primary text-background hover:bg-foreground hover:text-background transition-colors duration-300 border border-glass">Ajouter</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
