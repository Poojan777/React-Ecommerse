import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import apiClient from '../api/client'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${productId}`)
        setProduct(response.data)
      } catch {
        setError('Product details could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return <p className="status-message">Loading product...</p>
  }

  if (error || !product) {
    return <p className="status-message error">{error || 'Product not found.'}</p>
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <section className="product-detail">
      <img src={product.image} alt={product.title} />
      <div>
        <p className="chip">{product.category}</p>
        <h1>{product.title}</h1>
        <p className="description">{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="detail-actions">
          <button type="button" onClick={handleAddToCart}>
            Add to cart
          </button>
          <Link to="/cart" className="button-link secondary">
            Go to cart
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
