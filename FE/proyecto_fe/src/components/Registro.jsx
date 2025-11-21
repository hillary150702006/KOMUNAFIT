import '../styles/Login.css';
import { useState } from 'react';
import { postData } from '../services/fetch';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const navigate = useNavigate();
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [claveUsuario, setClaveUsuario] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        const DatosUsuario = {
            username: nombreUsuario,
            password: claveUsuario,
        };

        const peticion = await postData('api/api/register/', DatosUsuario);
        if (peticion.mensaje === "usuario registrado") {
            navigate("/login");
            alert("Registro exitoso, ahora puedes iniciar sesión.");
        } else {
            alert("Error en el registro");
        }
    }

    return (
        <div className="contenedor-principal">
            <div className="fondo-gimnasio"></div>
            <div className="contenedor-login">
                <div className="logo-komunafit">
                    <h1>KomunaFit</h1>
                </div>
                <h2 className="mensaje-bienvenida">Crea tu cuenta en KomunaFit</h2>
                <form className="formulario-login" onSubmit={handleRegister}>
                    <label htmlFor="usuario">Email o Nombre de Usuario</label>
                    <input
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        type="text" id="usuario" name="usuario" placeholder="Ingresa tu usuario" className="campo-texto" />
                    <label htmlFor="contraseña">Contraseña</label>
                    <input
                        onChange={(e) => setClaveUsuario(e.target.value)}
                        type="password" id="contraseña" name="contraseña" placeholder="Ingresa tu contraseña" className="campo-texto" />
                    <button type="submit" className="boton-iniciar">Registrarse</button>
                </form>
                <a href="/login" className="enlace-olvido">¿Ya tienes cuenta? Inicia sesión</a>
            </div>
        </div>
    );
};

export default Registro;