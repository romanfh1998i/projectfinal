import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'postalCode', 'country'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, introduce un correo electrónico válido';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{9,}$/.test(formData.phone)) {
      newErrors.phone = 'Por favor, introduce un número de teléfono válido';
    }
    
    // Postal code validation
    if (formData.postalCode && !/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'El código postal debe tener 5 dígitos';
    }
    
    // Payment method validation
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Este campo es obligatorio';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
      }
      
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Este campo es obligatorio';
      }
      
      if (!formData.cardExpiry.trim()) {
        newErrors.cardExpiry = 'Este campo es obligatorio';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Formato inválido (MM/YY)';
      }
      
      if (!formData.cardCvc.trim()) {
        newErrors.cardCvc = 'Este campo es obligatorio';
      } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
        newErrors.cardCvc = 'El CVC debe tener 3 o 4 dígitos';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send the order to a server
      console.log('Order submitted:', { formData, items: cart.items });
      
      // Show success message
      setOrderPlaced(true);
      
      // Clear cart
      clearCart();
      
      // Redirect to home page after 5 seconds
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  };
  
  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h2>Tu carrito está vacío</h2>
            <p>No puedes proceder al pago sin productos en tu carrito.</p>
            <Link to="/productos" className="btn">
              <FaArrowLeft /> Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h2>¡Pedido Realizado con Éxito!</h2>
            <p>Gracias por tu compra. Hemos enviado un correo electrónico de confirmación a {formData.email}.</p>
            <p>Serás redirigido a la página de inicio en 5 segundos...</p>
            <Link to="/" className="btn">
              Volver a Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Finalizar Compra</h1>
        
        <div className="checkout-container">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2>Información Personal</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Nombre *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'invalid' : ''}
                    />
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Apellidos *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'invalid' : ''}
                    />
                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'invalid' : ''}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'invalid' : ''}
                    />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h2>Dirección de Envío</h2>
                
                <div className="form-group">
                  <label htmlFor="address">Dirección *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'invalid' : ''}
                  />
                  {errors.address && <div className="error-message">{errors.address}</div>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Ciudad *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'invalid' : ''}
                    />
                    {errors.city && <div className="error-message">{errors.city}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="postalCode">Código Postal *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={errors.postalCode ? 'invalid' : ''}
                    />
                    {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">País *</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={errors.country ? 'invalid' : ''}
                  >
                    <option value="España">España</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Francia">Francia</option>
                    <option value="Italia">Italia</option>
                    <option value="Alemania">Alemania</option>
                  </select>
                  {errors.country && <div className="error-message">{errors.country}</div>}
                </div>
              </div>
              
              <div className="form-section">
                <h2>Método de Pago</h2>
                
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="credit-card"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                    />
                    <label htmlFor="credit-card">Tarjeta de Crédito</label>
                  </div>
                  
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleChange}
                    />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'credit-card' && (
                  <div className="credit-card-form">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Número de Tarjeta *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={errors.cardNumber ? 'invalid' : ''}
                      />
                      {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cardName">Nombre en la Tarjeta *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={errors.cardName ? 'invalid' : ''}
                      />
                      {errors.cardName && <div className="error-message">{errors.cardName}</div>}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cardExpiry">Fecha de Expiración *</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className={errors.cardExpiry ? 'invalid' : ''}
                        />
                        {errors.cardExpiry && <div className="error-message">{errors.cardExpiry}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cardCvc">CVC *</label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          placeholder="123"
                          className={errors.cardCvc ? 'invalid' : ''}
                        />
                        {errors.cardCvc && <div className="error-message">{errors.cardCvc}</div>}
                      </div>
                    </div>
                  </div>
                )}
                
                {formData.paymentMethod === 'paypal' && (
                  <div className="paypal-info">
                    <p>Serás redirigido a PayPal para completar el pago después de revisar tu pedido.</p>
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                <Link to="/carrito" className="btn-outline">
                  <FaArrowLeft /> Volver al Carrito
                </Link>
                <button type="submit" className="btn">
                  <FaLock /> Realizar Pedido
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Resumen del Pedido</h2>
            
            <div className="order-items">
              {cart.items.map((item) => (
                <div key={item.product.id} className="order-item">
                  <div className="order-item-info">
                    <h3>{item.product.name}</h3>
                    <p>Cantidad: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="order-total-row">
                <span>Subtotal</span>
                <span>€{cart.total.toFixed(2)}</span>
              </div>
              <div className="order-total-row">
                <span>Envío</span>
                <span>€0.00</span>
              </div>
              <div className="order-total-row total">
                <span>Total</span>
                <span>€{cart.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="secure-checkout">
              <FaLock /> Pago seguro garantizado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;