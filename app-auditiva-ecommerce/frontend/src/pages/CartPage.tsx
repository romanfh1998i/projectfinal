import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <FaShoppingCart className="cart-icon" />
            <h2>Tu carrito está vacío</h2>
            <p>Parece que aún no has añadido ningún producto a tu carrito.</p>
            <Link to="/productos" className="btn">
              <FaArrowLeft /> Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Tu Carrito</h1>
        
        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-header">
              <div className="cart-header-product">Producto</div>
              <div className="cart-header-price">Precio</div>
              <div className="cart-header-quantity">Cantidad</div>
              <div className="cart-header-total">Total</div>
              <div className="cart-header-actions"></div>
            </div>
            
            {cart.items.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-product">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.description}</p>
                  </div>
                </div>
                
                <div className="cart-item-price">
                  €{item.product.price.toFixed(2)}
                </div>
                
                <div className="cart-item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="cart-item-total">
                  €{(item.product.price * item.quantity).toFixed(2)}
                </div>
                
                <div className="cart-item-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Eliminar producto"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Resumen del Pedido</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>€{cart.total.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Envío</span>
              <span>Calculado en el checkout</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>€{cart.total.toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <Link to="/productos" className="btn-outline">
                Seguir Comprando
              </Link>
              <Link to="/checkout" className="btn">
                Proceder al Pago
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;