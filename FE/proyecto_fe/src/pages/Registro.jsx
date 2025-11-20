import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Registro.css';
import { postData } from '../services/fetch';

const Registro = () => {
    const [nombreUsuario, setNombreUsuario] = useState("")
    const [correoUsuario, setCorreoUsuario] = useState("")
    const [claveUsuarios, setClaveUsuariio] = useState("")
    const [confirmarClave, setConfirmarClave] = useState("")

    async function guardarUsuario(e) {
        e.preventDefault()
        const objUsuario = {
            username: nombreUsuario,
            email: correoUsuario,
            password: claveUsuarios
        }
        console.log(objUsuario);
        
        const peticion = await postData('api/api/usuario/',objUsuario)
        console.log(peticion);
    }

    return (
        <div className="registro-container">
            <h1>Crea tu cuenta en KomunaFit</h1>
            <form className="formulario-registro">
                <label htmlFor="nombre">Nombre de Usuario</label>
                <input type="text" id="nombre" name="nombre" onChange={(e)=>setNombreUsuario(e.target.value)}/>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={(e)=>setCorreoUsuario(e.target.value)}/>

                <label htmlFor="contraseña">Contraseña</label>
                <input type="password" id="contraseña" name="contraseña" onChange={(e)=>setClaveUsuariio(e.target.value)} /> 

                <label htmlFor="confirmar-contraseña">Confirmar Contraseña</label>
                <input type="password" id="confirmar-contraseña" name="confirmar-contraseña"onChange={(e)=>setConfirmarClave(e.target.value)} />

                <button
                    onClick={guardarUsuario}
                type="button" className="boton-registrar">Registrarse</button>
            </form>
            <p className="login-link">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
        </div>
    )
}

export default Registro;