import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaInfoCircle, FaBell, FaHands } from 'react-icons/fa';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Bienvenido a AudiVista</h2>
            <p>
              Una aplicación diseñada para ayudar a personas sordas a entender y
              utilizar productos auditivos a través de representaciones visuales.
            </p>
            <Link to="/productos" className="btn">
              Explorar Productos
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://placehold.co/600x400/4a6de5/ffffff?text=AudiVista"
              alt="Representación visual de sonido"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Características Principales</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaEye />
              </div>
              <h3>Visualización de Sonido</h3>
              <p>
                Convierte sonidos en representaciones visuales para ayudarte a
                entender el entorno auditivo.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaInfoCircle />
              </div>
              <h3>Información de Productos</h3>
              <p>
                Catálogo detallado de productos auditivos con explicaciones
                visuales de su funcionamiento.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaBell />
              </div>
              <h3>Alertas Visuales</h3>
              <p>
                Sistema de notificaciones visuales para eventos importantes
                relacionados con dispositivos auditivos.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaHands />
              </div>
              <h3>Recursos de Lenguaje de Señas</h3>
              <p>
                Tutoriales y recursos para aprender términos relacionados con
                productos auditivos en lenguaje de señas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <h2>Productos Destacados</h2>
          <div className="product-grid">
            <div className="product-card">
              <img
                src="https://placehold.co/400x200/4a6de5/ffffff?text=Audífono+Digital"
                alt="Audífono digital"
                className="card-img"
              />
              <div className="card-content">
                <h3 className="card-title">Audífono Digital Avanzado</h3>
                <p className="card-text">
                  Audífono digital con tecnología de reducción de ruido y
                  conectividad Bluetooth.
                </p>
                <p className="card-price">€1,299.99</p>
                <Link to="/productos/1" className="btn-small">
                  Ver Detalles
                </Link>
              </div>
            </div>
            <div className="product-card">
              <img
                src="https://placehold.co/400x200/ff6b6b/ffffff?text=Implante+Coclear"
                alt="Implante coclear"
                className="card-img"
              />
              <div className="card-content">
                <h3 className="card-title">Implante Coclear Moderno</h3>
                <p className="card-text">
                  Implante coclear con procesador de sonido avanzado y
                  resistencia al agua.
                </p>
                <p className="card-price">€2,499.99</p>
                <Link to="/productos/2" className="btn-small">
                  Ver Detalles
                </Link>
              </div>
            </div>
            <div className="product-card">
              <img
                src="https://placehold.co/400x200/23d160/ffffff?text=Micrófono+Remoto"
                alt="Micrófono remoto"
                className="card-img"
              />
              <div className="card-content">
                <h3 className="card-title">Micrófono Remoto</h3>
                <p className="card-text">
                  Micrófono remoto para mejorar la captación de sonido en
                  entornos ruidosos.
                </p>
                <p className="card-price">€349.99</p>
                <Link to="/productos/3" className="btn-small">
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
          <div className="view-all">
            <Link to="/productos" className="btn">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>¿Necesitas ayuda para elegir el producto adecuado?</h2>
            <p>
              Nuestro equipo de expertos está listo para ayudarte a encontrar la
              solución perfecta para tus necesidades auditivas.
            </p>
            <Link to="/contacto" className="btn btn-secondary">
              Contáctanos Ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;