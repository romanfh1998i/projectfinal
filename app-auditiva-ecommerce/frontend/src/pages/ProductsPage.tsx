import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductsPage.css';

// Mock product data (in a real app, this would come from an API)
const mockProducts = [
  {
    id: '1',
    name: 'Audífono Digital Avanzado',
    description: 'Audífono digital con tecnología de reducción de ruido y conectividad Bluetooth.',
    price: 1299.99,
    image: 'https://placehold.co/400x200/4a6de5/ffffff?text=Audífono+Digital',
    category: 'hearing-aids'
  },
  {
    id: '2',
    name: 'Implante Coclear Moderno',
    description: 'Implante coclear con procesador de sonido avanzado y resistencia al agua.',
    price: 2499.99,
    image: 'https://placehold.co/400x200/ff6b6b/ffffff?text=Implante+Coclear',
    category: 'implants'
  },
  {
    id: '3',
    name: 'Micrófono Remoto',
    description: 'Micrófono remoto para mejorar la captación de sonido en entornos ruidosos.',
    price: 349.99,
    image: 'https://placehold.co/400x200/23d160/ffffff?text=Micrófono+Remoto',
    category: 'accessories'
  },
  {
    id: '4',
    name: 'Audífono Recargable',
    description: 'Audífono con batería recargable de larga duración y cargador incluido.',
    price: 899.99,
    image: 'https://placehold.co/400x200/ffd166/ffffff?text=Audífono+Recargable',
    category: 'hearing-aids'
  },
  {
    id: '5',
    name: 'Procesador de Sonido',
    description: 'Procesador de sonido externo para implantes cocleares con múltiples programas.',
    price: 1599.99,
    image: 'https://placehold.co/400x200/4a6de5/ffffff?text=Procesador+de+Sonido',
    category: 'implants'
  },
  {
    id: '6',
    name: 'Adaptador TV',
    description: 'Adaptador para conectar audífonos directamente a la televisión sin interferencias.',
    price: 199.99,
    image: 'https://placehold.co/400x200/23d160/ffffff?text=Adaptador+TV',
    category: 'accessories'
  }
];

const ProductsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { addToCart } = useCart();

  // Filter products based on active filter
  const filteredProducts = activeFilter === 'all'
    ? mockProducts
    : mockProducts.filter(product => product.category === activeFilter);

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>Productos Auditivos</h1>
          <p>Explora nuestra selección de productos auditivos de alta calidad diseñados para mejorar tu experiencia auditiva.</p>
        </div>

        <div className="product-filter">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'hearing-aids' ? 'active' : ''}`}
            onClick={() => setActiveFilter('hearing-aids')}
          >
            Audífonos
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'implants' ? 'active' : ''}`}
            onClick={() => setActiveFilter('implants')}
          >
            Implantes
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'accessories' ? 'active' : ''}`}
            onClick={() => setActiveFilter('accessories')}
          >
            Accesorios
          </button>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="card-img" />
              <div className="card-content">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-text">{product.description}</p>
                <p className="card-price">€{product.price.toFixed(2)}</p>
                <div className="card-actions">
                  <Link to={`/productos/${product.id}`} className="btn-small">
                    Ver Detalles
                  </Link>
                  <button 
                    className="btn-small btn-secondary"
                    onClick={() => addToCart(product)}
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;