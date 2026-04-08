import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find((item) => item.id === product.id)

      if (existingItem) {
        return previousItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...previousItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId),
    )
  }

  const updateQuantity = (productId, nextQuantity) => {
    if (nextQuantity < 1) {
      removeFromCart(productId)
      return
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
