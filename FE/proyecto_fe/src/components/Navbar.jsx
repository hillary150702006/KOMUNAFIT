import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">KomunaFit</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/entrenadores">Entrenadores</Link></li>
        <li><Link to="/retos">Retos</Link></li>
        <li><Link to="/clases">Clases</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
        <li><Link to="/comunidad">Comunidad</Link></li>
      </ul>
      <Link to="/login" className="login-btn">Iniciar Sesión</Link>
      <Link to="/registro" className="register-btn">Registrarse</Link>
    </nav>
  );
};

export default Navbar;