import React, { useEffect, useState } from 'react';
import '../styles/comunidad.css';
import { GetData, postData } from '../services/fetch'; 

const Comunidad = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [likes, setLikes] = useState({});
  
  
  const [nuevaPublicacion, setNuevaPublicacion] = useState('');

  const handlePublish = async () => {
    const idAutor = localStorage.getItem('id');
    if (!idAutor) {
      alert('Debes iniciar sesión para publicar.');
      return;
    }
    if (nuevaPublicacion.trim()) {
      const publicacionParaEnviar = {
        contenido: nuevaPublicacion,
        usuario: idAutor,
      };
      const resultado = await postData('api/comentario/', publicacionParaEnviar);
      if (resultado) {
        alert('¡Publicado con éxito!');
        setNuevaPublicacion('');
      } else {
        alert('Hubo un error al publicar.');
      }
    } else {
      alert('Escribe algo para publicar.');
    }
  };
  
  useEffect(() => {
    async function traerUsuarios() {
      const peticion = await GetData('api/usuario/');
      if (peticion) {
        setUsuarios(peticion);
      }
    }
    traerUsuarios();
  }, []);

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

      
      <div className="crear-publicacion" style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
        <h3>Crea una publicación</h3>
        <textarea
          value={nuevaPublicacion}
          onChange={(e) => setNuevaPublicacion(e.target.value)}
          placeholder="¿Qué quieres compartir con la comunidad?"
          style={{ width: '100%', minHeight: '80px', padding: '10px', boxSizing: 'border-box' }}
        />
        <button onClick={handlePublish} style={{ marginTop: '10px' }}>Publicar</button>
      </div>
    


     
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