import { useMemo, useState } from "react"
import { useCart } from "@/context/cartContext"
import API_BASE_URL from "@/lib/api"
import { usePageEnter, useStagger } from "@/lib/anim"
import { useRef } from "react"
import { Trash } from "@phosphor-icons/react"

export default function Cart() {
  const { cartItems, removeItem, updateItem, clearCart } = useCart()
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const total = useMemo(() => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0), [cartItems])
  const ref = usePageEnter()
  const listRef = useRef(null)
  useStagger(listRef, ".cart-line")

  const checkout = async () => {
    if (!address || !phone || cartItems.length === 0) return
    const payload = {
      address,
      whatsapp: phone,
      items: cartItems.map((i) => ({
        product_id: i.productId,
        color: i.selectedColor,
        size: i.selectedSize,
        quantity: i.quantity,
      })),
    }
    const res = await fetch(`${API_BASE_URL}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) return
    const data = await res.json()
    clearCart()
    if (data.waUrl) {
      window.location.href = data.waUrl
    }
  }

  return (
    <section ref={ref} className="min-h-screen pt-24 px-4 sm:px-6 bg-dark-gradient overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-center font-rodfat">Panier</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-8">
          <div ref={listRef} className="space-y-4">
            {cartItems.map((i) => (
              <div key={i.cartId} className="bg-gold-gradient rounded-xl p-4 border border-glass cart-line w-full">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <img src={i.image} alt={i.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-glass flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-bold tracking-widest text-background font-cinzel-decorative break-words">{i.name}</p>
                    <p className="text-md font-semibold tracking-wide text-background break-words">{i.category}</p>
                    <p className="text-sm text-background font-medium">Stock: {i.stock}</p>
                  </div>
                  <button onClick={() => removeItem(i.cartId)} className="px-3 py-2 rounded-xl bg-black/40 text-background hover:bg-[#780606] hover:text-foreground transition-colors duration-300 border border-glass">
                    <Trash size={20} />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select value={i.selectedColor || ""} onChange={(e) => updateItem(i.cartId, { selectedColor: e.target.value })} className="bg-scnd-gradient border border-glass rounded-lg px-3 py-2 outline-none">
                    {(i.colors || []).map((c) => <option key={c} value={c} className="text-background bg-primary">{c}</option>)}
                  </select>
                  <select value={i.selectedSize || ""} onChange={(e) => updateItem(i.cartId, { selectedSize: e.target.value })} className="bg-scnd-gradient border border-glass rounded-lg px-3 py-2 outline-none">
                    {(i.sizes || []).map((s) => <option key={s} value={s} className="text-background bg-primary">{s}</option>)}
                  </select>
                  <input type="number" min={1} max={i.stock || 1} value={i.quantity} onChange={(e) => updateItem(i.cartId, { quantity: parseInt(e.target.value || "1") })} className="bg-scnd-gradient border border-glass rounded-lg px-3 py-2 outline-none" />
                </div>
                <div className="mt-3 text-right">
                  <span className="text-xl text-background">{i.price * i.quantity} MAD</span>
                </div>
              </div>
            ))}
            {cartItems.length === 0 && <p>Votre panier est vide.</p>}
          </div>
          <div className="bg-black/40 rounded-xl p-4 border border-glass">
            <p className="text-xl">Total: {total} MAD (Payment cash en Livraison)</p>
            <div className="mt-4 space-y-3">
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse exacte" className="outline-none w-full bg-dark-gradient font-karina border border-glass rounded-lg px-3 py-2 placeholder:text-foreground/40" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Num WhatsApp (Maroc)" className="outline-none w-full bg-dark-gradient font-karina border border-glass rounded-lg px-3 py-2 placeholder:text-foreground/40" />
              <button onClick={checkout} className="w-full px-5 py-3 rounded-xl bg-gold-gradient text-background mt-2 hover:bg-dark-gradient hover:text-primary transition-colors">Commander via WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
