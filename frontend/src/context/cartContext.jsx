import { createContext, useContext, useMemo, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const addItem = (product, options = {}) => {
    if ((product.stock ?? 0) <= 0) return
    const id = crypto.randomUUID()
    const colors = Array.isArray(product.colors) ? product.colors : []
    const sizes = Array.isArray(product.sizes) ? product.sizes : []
    const item = {
      cartId: id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      colors,
      sizes,
      selectedColor: options.selectedColor || colors[0] || null,
      selectedSize: options.selectedSize || sizes[0] || null,
      quantity: Math.min(options.quantity || 1, Math.max(1, product.stock || 1)),
      stock: product.stock,
      category: product.category,
      sex: product.sex,
      description: product.description,
    }
    setCartItems((prev) => [...prev, item])
  }

  const removeItem = (cartId) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId))
  }

  const updateItem = (cartId, partial) => {
    setCartItems((prev) =>
      prev.map((i) => {
        if (i.cartId !== cartId) return i
        const next = { ...i, ...partial }
        if (typeof next.quantity === "number") {
          next.quantity = Math.min(Math.max(1, next.quantity), Math.max(1, next.stock || 1))
        }
        return next
      }),
    )
  }

  const clearCart = () => setCartItems([])

  const value = useMemo(
    () => ({ cartItems, setCartItems, cartCount, addItem, removeItem, updateItem, clearCart }),
    [cartItems, cartCount],
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
