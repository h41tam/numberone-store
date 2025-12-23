// src/components/products/ProductCard.jsx
import { ShoppingCart } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"
import AddToCartModal from "./addToCartModal"
import { stripAccents } from "@/lib/text"
import { gsap } from "gsap"

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      )
    }
  }, [])

  return (
    <div ref={cardRef} className="group rounded-2xl overflow-hidden bg-secondary/60 border border-border hover:border-primary hover:bg-gold-gradient transition-colors duration-500">

      {/* IMAGE */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={stripAccents(product.name)}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* SEX BADGE */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs rounded-full bg-glass backdrop-blur-glass text-foreground capitalize">
          {stripAccents(product.sex)}
        </span>

        {/* STOCK */}
        {product.stock === 0 && (
          <span className="absolute inset-0 bg-black/70 flex items-center justify-center text-primary text-lg font-semibold">
            Rupture de stock
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">

        {/* CATEGORY */}
        <p className="text-sm tracking-widest text-primary group-hover:text-background transition-colors duration-300">
          {stripAccents(product.category)}
        </p>

        {/* NAME */}
        <h3 className="text-xl font-cinzel-decorative font-bold group-hover:text-background transition-colors duration-300">
          {stripAccents(product.name)}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-md text-foreground/70 line-clamp-2 group-hover:text-background transition-colors duration-300">
          {stripAccents(product.description)}
        </p>

        {/* COLORS */}
        <div className="flex gap-2 flex-wrap">
          {product.colors.slice(0, 3).map((color) => (
            <span
              key={color}
              className="px-2 py-1 text-xs rounded-full border border-glass bg-gold-gradient text-background group-hover:border-background transition-colors duration-300"
            >
              {stripAccents(color)}
            </span>
          ))}
        </div>

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between pt-4">

          <span className="text-xl font-semibold text-primary group-hover:text-background transition-colors duration-300">
            {product.price} MAD
          </span>

          <button
            disabled={product.stock === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-glass bg-gold-gradient text-background 
            hover:bg-dark-gradient group-hover:border-background hover:text-primary transition-colors duration-300 disabled:opacity-10"
            onClick={() => setOpen(true)}
          >
            <ShoppingCart size={18} />
            Ajouter
          </button>
        </div>
      </div>
      <AddToCartModal product={product} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
