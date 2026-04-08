import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    clearCart()
  }

  if (isSubmitted) {
    return (
      <section className="checkout-view">
        <h1>Order confirmed</h1>
        <p>Your order has been placed successfully.</p>
        <Link to="/" className="button-link">
          Continue shopping
        </Link>
      </section>
    )
  }

  if (!cartItems.length) {
    return (
      <section className="checkout-view">
        <h1>No items to checkout</h1>
        <p>Add some products to your cart first.</p>
        <Link to="/" className="button-link">
          Go to products
        </Link>
      </section>
    )
  }

  return (
    <section className="checkout-view">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input type="text" required />
          </label>
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            Address
            <textarea rows="4" required />
          </label>
          <button type="submit">Place order</button>
        </form>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>
                  {item.title} x {item.quantity}
                </span>
                <strong>${(item.quantity * item.price).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
          <p>Total: ${cartTotal.toFixed(2)}</p>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
