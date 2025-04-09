import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header: React.FC = () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>AudiVista</h1>
            <p>Soluciones visuales para productos auditivos</p>
          </Link>
        </div>

        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/productos" onClick={closeMenu}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/visualizador" onClick={closeMenu}>
                Visualizador de Sonido
              </NavLink>
            </li>
            <li>
              <NavLink to="/recursos" onClick={closeMenu}>
                Recursos
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" onClick={closeMenu}>
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/carrito" className="cart-icon">
            <FaShoppingCart />
            {cart.itemCount > 0 && (
              <span className="cart-count">{cart.itemCount}</span>
            )}
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;