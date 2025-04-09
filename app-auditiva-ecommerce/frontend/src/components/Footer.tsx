import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real app, this would send the email to a server
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      
      // Reset the subscribed message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>AudiVista</h2>
            <p>Soluciones visuales para productos auditivos</p>
          </div>
          
          <div className="footer-links">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/visualizador">Visualizador</Link></li>
              <li><Link to="/recursos">Recursos</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h3>Boletín Informativo</h3>
            <p>Suscríbete para recibir noticias y actualizaciones.</p>
            
            {subscribed ? (
              <div className="success-message">
                ¡Te has suscrito correctamente a nuestro boletín!
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="btn-small">Suscribirse</button>
              </form>
            )}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AudiVista. Todos los derechos reservados.</p>
          
          <div className="social-media">
            <a href="#" className="social-icon" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
          
          <div className="footer-bottom-links">
            <Link to="/privacidad">Política de Privacidad</Link>
            <Link to="/terminos">Términos de Uso</Link>
            <Link to="/accesibilidad">Accesibilidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;