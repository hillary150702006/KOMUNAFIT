import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { postData } from '../services/fetch';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const [nombreUsuario, setNombreUsuario] = useState("")
    const [claveUsuario, setClaveUsuario] = useState("")

    async function InicioUsuario(e) {
        e.preventDefault();
        const DatosUsuario = {
            username: nombreUsuario,
            password: claveUsuario,
        }
        console.log(DatosUsuario);

        const peticion = await postData('api/api/login/', DatosUsuario)
        console.log(peticion);
        if (peticion.mensaje === "usuario valido") {
            navigate("/perfil")
            localStorage.setItem("id",peticion.id)
        } else {
            alert("acceso incorrecto")
        }
    }

    return (
        <>
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
                        <input
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            type="text" id="usuario" name="usuario" placeholder="Ingresa tu usuario" className="campo-texto" />
                        <label htmlFor="contraseña">Contraseña</label>
                        <input
                            onChange={(e) => setClaveUsuario(e.target.value)}
                            type="password" id="contraseña" name="contraseña" placeholder="Ingresa tu contraseña" className="campo-texto" />
                        <a href="/recuperar" className="enlace-olvido">¿Olvidaste tu contraseña?</a>
                        <a href="/" className="enlace-olvido">Crear Cuenta</a>
                        <button
                            onClick={InicioUsuario}
                            type="button" className="boton-iniciar"> Iniciar Sesión </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;