import React, { useEffect, useState } from 'react';
import '../styles/comunidad.css';
import { GetData } from '../services/fetch';

const Comunidad = () => {
  const [usuarios,setUsuarios] = useState([])

  const [progresos, setProgresos] = useState({});


  useEffect(()=>{
     async function traerUsuarios() {
       const peticion = await GetData('api/api/usuario/')
       setUsuarios(peticion)
     }
     traerUsuarios()
  },[])

  const manejarCambio = (id, campo, valor) => {
    setProgresos((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [campo]: valor,
      },
    }));
  };

  const compartirProgreso = (id) => {
    const progreso = progresos[id];
    if (progreso) {
      const usuario = usuarios.find((u) => u.id === id);
      console.log(`Progreso de ${usuario?.nombre}:`, progreso);
      alert('¡Progreso compartido!');
    } else {
      alert('No hay progreso para compartir');
    }
  };

  return (
    <div className="comunidad">
      <h1>Nuestra Comunidad</h1>
      <p>
        Transforma tu vida con Komuna: únete a nuestra comunidad de usuarios
        satisfechos con su cambio físico.
      </p>

      {usuarios.map((usuario) => (
        <div key={usuario.id} className="tarjeta-usuario">
          <h3>{usuario.username}</h3>
            <input type="text" />
               <button onClick={() => enviarcomentario(usuario.id)}>
            enviar comentario
          </button>
          
        </div>
      ))}
    </div>
  );
};

export default Comunidad;