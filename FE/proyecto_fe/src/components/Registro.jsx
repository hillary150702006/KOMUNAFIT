import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Registro.css';
import { postData } from '../services/fetch';


const Registro = () => {
    const navigate = useNavigate();
    const [nombreUsuario, setNombreUsuario] = useState("")
    const [correoUsuario, setCorreoUsuario] = useState("")
    const [claveUsuarios, setClaveUsuariio] = useState("")
    const [confirmarClave, setConfirmarClave] = useState("")
    const [error, setError] = useState("");
    const [registroExitoso, setRegistroExitoso] = useState(false);

    async function guardarUsuario(e) {
        e.preventDefault()
        setError("");

        if (claveUsuarios !== confirmarClave) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const objUsuario = {
            username: nombreUsuario,
            email: correoUsuario,
            password: claveUsuarios
        }

        try {
            const peticion = await postData('api/api/usuario/',objUsuario)
            if (peticion && peticion.id) {
                alert('Registro exitoso, bienvenido');
                localStorage.setItem('id', peticion.id);
                localStorage.setItem('user', JSON.stringify({ username: nombreUsuario, email: correoUsuario }));
                navigate('/perfil');
            }
                const errorMessage = peticion.detail || "Error en el registro. Inténtalo de nuevo.";
                setError(errorMessage);
            }
        } catch (err) {
            setError("Ocurrió un error de red. Por favor, revisa tu conexión.");
        }
    }

    return (
        <div className="registro-container">
            <h1>Crea tu cuenta en KomunaFit</h1>
            {registroExitoso ? (
                <div className="mensaje-exito">
                    <h2>¡Registro exitoso!</h2>
                    <p>Ya eres parte de la comunidad. Serás redirigido para iniciar sesión...</p>
                </div>
            ) : (
                <form className="formulario-registro" onSubmit={guardarUsuario}>
                    <label htmlFor="nombre">Nombre de Usuario</label>
                    <input type="text" id="nombre" name="nombre" onChange={(e)=>setNombreUsuario(e.target.value)} required/>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={(e)=>setCorreoUsuario(e.target.value)} required/>

                    <label htmlFor="contraseña">Contraseña</label>
                    <input type="password" id="contraseña" name="contraseña" onChange={(e)=>setClaveUsuariio(e.target.value)} required/> 

                    <label htmlFor="confirmar-contraseña">Confirmar Contraseña</label>
                    <input type="password" id="confirmar-contraseña" name="confirmar-contraseña"onChange={(e)=>setConfirmarClave(e.target.value)} required/>

                    {error && <p className="mensaje-error">{error}</p>}

                    <button onClick={() => {guardarUsuario(); setRegistroExitoso(true);}}className="boton-registrar">Registrarse</button>
                </form>
            )}
            {!registroExitoso && (
                <p className="login-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
            )}
        </div>
    )


export default Registro;