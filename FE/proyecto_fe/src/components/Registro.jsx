import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Registro.css';

function Registro() {
  return (
    <div>
       <nav className="login-navbar">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                </ul>
            </nav>
            <div className="contenedor-principal">
                <div className="fondo-gimnasio"></div>
                <div className="contenedor-login">
                    <div className="logo-komunafit">
                        <h1>KomunaFit</h1>
                    </div>
                    <h2 className="mensaje-bienvenida">Bienvenido de nuevo a KomunaFit</h2>
                    <form className="formulario-login">
                        <label htmlFor="usuario">Email o Nombre de Usuario</label>
                        <input type="text" id="usuario" name="usuario" placeholder="Ingresa tu usuario" className="campo-texto" />
                        <label htmlFor="contraseña">Contraseña</label>
                        <input type="password" id="contraseña" name="contraseña" placeholder="Ingresa tu contraseña" className="campo-texto" />
                        <a href="/recuperar" className="enlace-olvido">¿Olvidaste tu contraseña?</a>
                        <button type="submit" className="boton-iniciar"> Iniciar Sesión </button>
                    </form>
                    
                </div>
            </div>
    
    </div>
  )
}

export default Registro
