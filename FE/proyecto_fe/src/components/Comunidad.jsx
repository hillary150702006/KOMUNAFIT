import React, { useEffect, useState } from 'react';
import '../styles/comunidad.css';
import { GetData } from '../services/fetch';

const Comunidad = () => {
  const [usuarios,setUsuarios] = useState([])

  const [progresos, setProgresos] = useState({});
  const [comentarios, setComentarios] = useState({});
  const [likes, setLikes] = useState({});


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

  const manejarComentario = (id, valor) => {
    setComentarios((prev) => ({
      ...prev,
      [id]: valor,
    }));
  };

  const enviarComentario = (id) => {
    const comentario = comentarios[id];
    if (comentario && comentario.trim()) {
      alert('Comentario enviado');
      setComentarios((prev) => ({
        ...prev,
        [id]: '',
      }));
    } else {
      alert('Escribe un comentario antes de enviar');
    }
  };

  const manejarLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          <input
            type="text"
            value={comentarios[usuario.id] || ''}
            onChange={(e) => manejarComentario(usuario.id, e.target.value)}
            placeholder="Escribe un comentario..."
          />
          <div className="acciones-usuario">
            <button onClick={() => enviarComentario(usuario.id)}>
              Enviar comentario
            </button>
            <button
              className={`like-btn ${likes[usuario.id] ? 'liked' : ''}`}
              onClick={() => manejarLike(usuario.id)}
            >
              {likes[usuario.id] ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comunidad;