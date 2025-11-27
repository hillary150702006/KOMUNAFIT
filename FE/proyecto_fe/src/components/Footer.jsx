import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Footer.css';


const Footer = ({ 
  logo = "KomunaFit", 
  description = "Tu gimnasio ideal para entrenar fuerte y alcanzar tus metas. ¡Únete a la comunidad!", 
  navLinks = [
    { name: "Acerca de", href: "/about" },
    { name: "Servicios", href: "/services" },
    { name: "Horarios", href: "/schedule" },
    { name: "Contacto", href: "/contact" }
  ],
  contact = {
    address: "San Rafael de Escazú, San José",
    phone: "506+ 8095 7890",
    email: "info@komunafit.com"
  },
  socialLinks = [
    { name: "Facebook", href: "https://facebook.com/komunafit", icon: "fab fa-facebook-f" },
    { name: "Instagram", href: "https://instagram.com/komunafit", icon: "fab fa-instagram" },
    { name: "Twitter", href: "https://twitter.com/komunafit", icon: "fab fa-twitter" }
  ],
  copyright = "© 2025 KomunaFit. Todos los derechos reservados."
}) => {
  return (
    <footer className="footer-section" role="contentinfo">
      <div className="footer-container">
        <div className="footer-grid">
        
          <div>
            <h2 className="footer-logo">{logo}</h2>
            <p className="footer-desc">{description}</p>
          </div>

     
          <div>
            <h3 className="footer-heading">Navegación</h3>
            <ul className="footer-links">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

      
          <div className="contact-info">
            <h3 className="footer-heading">Contacto</h3>
            <p>{contact.address}</p>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
          </div>

     
          <div>
            <h3 className="footer-heading">Síguenos 
              ig: Komnfit_ facebook:KomunaFit
            </h3>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  aria-label={`Visita nuestro ${social.name}`} 
                  className="social-btn"
                >
                  <i className={`${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

 
        <div className="footer-bottom">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

