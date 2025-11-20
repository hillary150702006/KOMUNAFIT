import '../styles/Inicio.css';
import Testimonials from './TestimonialCard';
import { useState } from 'react';
const   Inicio = () => {
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
    if (peticion.mensaje === "usuario valido"){
      navigate("/perfil")
    }else{
      alert("acceso incorrecto")
    }
  }

  return (
    <>
      <div className="contenedor-principal">
        <div className="fondo-gimnasio">

        </div>

        <div className="contenedor-login">
          <div className="logo-komunafit">
            <img src="/ruta-del-logo.png" alt="Logo Komuna" />
            <h1>KomunaFit</h1>
          </div>

          <h2 className="mensaje-bienvenida">Bienvenido de nuevo a KomunaFit</h2>

          <form className="formulario-login">
            <label htmlFor="usuario">Email o Nombre de Usuario</label>
            <input type="text" id="usuario" name="usuario" placeholder="Ingresa tu usuario" className="campo-texto" onChange={(e) => setNombreUsuario(e.target.value)} />


            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password" id="contraseña" name="contraseña" placeholder="Ingresa tu contraseña" className="campo-texto" onChange={(e) => setClaveUsuario(e.target.value)} />

            <a href="/recuperar" className="enlace-olvido">
              ¿Olvidaste tu contraseña?
            </a>

            <button type="button"
              onClick={InicioUsuario}
              className="boton-iniciar"> Iniciar Sesión </button>
          </form>


        </div>
      </div>
      <Testimonials />

    </>
  )
}

export default Inicio;

