import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cartCount } = useCart()

  return (
    <header className="app-header">
      <div className="brand-wrap">
        <NavLink to="/" className="brand">
          Atlas Store
        </NavLink>
        <p>Design-forward daily essentials</p>
      </div>

      <nav className="nav-links">
        <NavLink to="/" end>
          Discover
        </NavLink>
        <NavLink to="/cart">Bag</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>

      <NavLink to="/cart" className="cart-pill">
        <span>Items</span>
        <strong>{cartCount}</strong>
      </NavLink>
    </header>
  )
}

export default Navbar
