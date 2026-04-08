import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Navbar from './components/Navbar'
import ProductDetail from './components/ProductDetail'
import ProductList from './components/ProductList'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>Atlas Store • Curated goods for your next everyday ritual</p>
      </footer>
    </div>
  )
}

export default App
