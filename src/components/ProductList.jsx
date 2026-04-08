import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../api/client'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products')
        setProducts(response.data)
      } catch {
        setError('Unable to load products right now. Please retry.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <p className="status-message">Loading products...</p>
  }

  if (error) {
    return <p className="status-message error">{error}</p>
  }

  const [spotlight, ...catalog] = products

  return (
    <section className="product-list">
      <header className="list-hero">
        <p className="eyebrow">Spring 2026 Edit</p>
        <h1>Objects that feel as good as they function</h1>
        <p>
          Explore a curated collection chosen for craft, utility, and visual
          character.
        </p>
      </header>

      {spotlight ? (
        <article className="spotlight-card">
          <img src={spotlight.image} alt={spotlight.title} loading="lazy" />
          <div>
            <p className="eyebrow">Spotlight Product</p>
            <h2>{spotlight.title}</h2>
            <p className="price">${spotlight.price.toFixed(2)}</p>
            <Link to={`/product/${spotlight.id}`} className="button-link">
              Explore spotlight
            </Link>
          </div>
        </article>
      ) : null}

      <div className="grid-heading">
        <h2>Catalog</h2>
        <p>{catalog.length} products ready to explore</p>
      </div>

      <div className="product-grid">
        {catalog.map((product) => (
          <article key={product.id} className="product-card">
            <img src={product.image} alt={product.title} loading="lazy" />
            <h3>{product.title}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <Link to={`/product/${product.id}`} className="button-link secondary">
              View details
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductList
