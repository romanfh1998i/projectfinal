import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

// Mock product data (in a real app, this would come from an API)
const mockProducts = [
  {
    id: '1',
    name: 'Audífono Digital Avanzado',
    description: 'Audífono digital con tecnología de reducción de ruido y conectividad Bluetooth.',
    price: 1299.99,
    image: 'https://placehold.co/400x200/4a6de5/ffffff?text=Audífono+Digital',
    category: 'hearing-aids',
    specs: [
      { name: 'Tipo', value: 'Digital' },
      { name: 'Conectividad', value: 'Bluetooth' },
      { name: 'Batería', value: 'Recargable' },
      { name: 'Duración de batería', value: 'Hasta 24 horas' },
      { name: 'Resistencia al agua', value: 'IP57' },
      { name: 'Garantía', value: '2 años' }
    ],
    features: [
      'Reducción de ruido avanzada',
      'Conectividad Bluetooth para streaming de audio',
      'Control mediante aplicación móvil',
      'Ajustes automáticos según el entorno',
      'Batería recargable de larga duración'
    ]
  },
  {
    id: '2',
    name: 'Implante Coclear Moderno',
    description: 'Implante coclear con procesador de sonido avanzado y resistencia al agua.',
    price: 2499.99,
    image: 'https://placehold.co/400x200/ff6b6b/ffffff?text=Implante+Coclear',
    category: 'implants',
    specs: [
      { name: 'Tipo', value: 'Implante coclear' },
      { name: 'Procesador', value: 'Digital avanzado' },
      { name: 'Conectividad', value: 'Bluetooth y WiFi' },
      { name: 'Batería', value: 'Recargable' },
      { name: 'Resistencia al agua', value: 'IP68' },
      { name: 'Garantía', value: '5 años' }
    ],
    features: [
      'Procesamiento de sonido de alta definición',
      'Resistente al agua para uso en actividades acuáticas',
      'Conectividad inalámbrica para streaming directo',
      'Múltiples programas para diferentes entornos',
      'Compatible con accesorios inalámbricos'
    ]
  },
  {
    id: '3',
    name: 'Micrófono Remoto',
    description: 'Micrófono remoto para mejorar la captación de sonido en entornos ruidosos.',
    price: 349.99,
    image: 'https://placehold.co/400x200/23d160/ffffff?text=Micrófono+Remoto',
    category: 'accessories',
    specs: [
      { name: 'Tipo', value: 'Micrófono remoto' },
      { name: 'Conectividad', value: 'Bluetooth' },
      { name: 'Alcance', value: 'Hasta 25 metros' },
      { name: 'Batería', value: 'Recargable' },
      { name: 'Duración de batería', value: 'Hasta 10 horas' },
      { name: 'Garantía', value: '1 año' }
    ],
    features: [
      'Mejora la captación de voz en entornos ruidosos',
      'Conexión directa con audífonos compatibles',
      'Diseño discreto y portátil',
      'Fácil de usar con un solo botón',
      'Incluye clip para sujetar a la ropa'
    ]
  },
  {
    id: '4',
    name: 'Audífono Recargable',
    description: 'Audífono con batería recargable de larga duración y cargador incluido.',
    price: 899.99,
    image: 'https://placehold.co/400x200/ffd166/ffffff?text=Audífono+Recargable',
    category: 'hearing-aids',
    specs: [
      { name: 'Tipo', value: 'Digital recargable' },
      { name: 'Conectividad', value: 'Bluetooth' },
      { name: 'Batería', value: 'Recargable de litio' },
      { name: 'Duración de batería', value: 'Hasta 30 horas' },
      { name: 'Resistencia al agua', value: 'IP57' },
      { name: 'Garantía', value: '2 años' }
    ],
    features: [
      'Batería recargable de larga duración',
      'Cargador rápido incluido',
      'Tecnología de reducción de ruido',
      'Ajustes personalizables',
      'Diseño discreto y cómodo'
    ]
  }
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    // Find the product by ID
    const foundProduct = mockProducts.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category, excluding current product)
      const related = mockProducts
        .filter(p => p.category === foundProduct.category && p.id !== id)
        .slice(0, 3); // Limit to 3 related products
      
      setRelatedProducts(related);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Add product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      // Reset quantity
      setQuantity(1);
      
      // Show success message (in a real app, this would be a toast or notification)
      alert('Producto añadido al carrito');
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Producto no encontrado</h2>
            <p>Lo sentimos, el producto que estás buscando no existe.</p>
            <Link to="/productos" className="btn">
              <FaArrowLeft /> Volver a Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/productos">Productos</Link> / {product.name}
        </div>

        <div className="product-detail">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">€{product.price.toFixed(2)}</p>
            
            <div className="product-actions">
              <div className="quantity-control">
                <label htmlFor="quantity">Cantidad:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              
              <button className="btn" onClick={handleAddToCart}>
                <FaShoppingCart /> Añadir al Carrito
              </button>
            </div>
          </div>
        </div>

        <div className="product-details-tabs">
          <div className="tab-content">
            <div className="specifications">
              <h2>Especificaciones</h2>
              <table className="specs-table">
                <tbody>
                  {product.specs.map((spec: any, index: number) => (
                    <tr key={index}>
                      <th>{spec.name}</th>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="features">
              <h2>Características</h2>
              <ul className="features-list">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Productos Relacionados</h2>
            <div className="product-grid">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="product-card">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="card-img" 
                  />
                  <div className="card-content">
                    <h3 className="card-title">{relatedProduct.name}</h3>
                    <p className="card-text">{relatedProduct.description}</p>
                    <p className="card-price">€{relatedProduct.price.toFixed(2)}</p>
                    <Link 
                      to={`/productos/${relatedProduct.id}`} 
                      className="btn-small"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;