import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()

  if (!cartItems.length) {
    return (
      <section className="cart-view">
        <h1>Your cart is empty</h1>
        <p>Add items from the product catalog to continue.</p>
        <Link to="/" className="button-link">
          Browse products
        </Link>
      </section>
    )
  }

  return (
    <section className="cart-view">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <article key={item.id} className="cart-row">
            <img src={item.image} alt={item.title} />
            <div className="cart-copy">
              <h2>{item.title}</h2>
              <p>${item.price.toFixed(2)} each</p>
            </div>
            <label className="qty-wrap">
              Qty
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) =>
                  updateQuantity(item.id, Number(event.target.value))
                }
              />
            </label>
            <button
              type="button"
              className="link-button"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>
      <div className="cart-footer">
        <p>Total: ${cartTotal.toFixed(2)}</p>
        <Link to="/checkout" className="button-link">
          Proceed to checkout
        </Link>
      </div>
    </section>
  )
}

export default Cart
