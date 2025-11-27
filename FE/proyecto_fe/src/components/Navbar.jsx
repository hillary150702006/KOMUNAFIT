import React, { useState } from "react";
import '../styles/Navbar.css';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <nav className="midnight-navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <h1>
            KomunaFit
          </h1>
        </div>


        {/* Menú Desktop */}
        <div className="navbar-center">
          <div className="navbar-search">
            <input type="text" placeholder="Buscar entrenadores, retos, clases" />
          </div>


          <ul className="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="/entrenadores">Entrenadores</a></li>
            <li><a href="/retos">Retos</a></li>
            <li><a href="/clases">Clases</a></li>
            <li><a href="/comunidad">Comunidad</a></li>
          </ul>
        </div>


        {/* Acciones derecha */}
        <div className="navbar-actions">
          <a href="/login" className="btn-ghost">Iniciar sesión</a>
          <a href="/registro" className="btn-primary">Registrarse</a>
        </div>


        {/* Hamburguesa móvil */}
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? 'X' : 'Menú'}
        </button>
      </nav>


      {/* Menú móvil fullscreen */}
      {isOpen && (
        <div className="mobile-overlay">
          <div className="mobile-menu">
            <div className="mobile-search-mobile">
              <input type="text" placeholder="Buscar..." />
            </div>
            <ul className="mobile-links">
              <li><a href="/" onClick={() => setIsOpen(false)}>Home</a></li>
              <li><a href="/entrenadores" onClick={() => setIsOpen(false)}>Entrenadores</a></li>
              <li><a href="/retos" onClick={() => setIsOpen(false)}>Retos</a></li>
              <li><a href="/clases" onClick={() => setIsOpen(false)}>Clases</a></li>
              <li><a href="/comunidad" onClick={() => setIsOpen(false)}>Comunidad</a></li>
            </ul>
            <div className="mobile-actions">
              <a href="/login" className="btn-ghost-mobile">Iniciar sesión</a>
              <a href="/registro" className="btn-primary-mobile">Registrarse</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}