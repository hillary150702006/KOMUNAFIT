import React, { useEffect, useState } from 'react';
import '../styles/comunidad.css';
import { GetData, postData } from '../services/fetch'; 

// Este componente se encarga de mostrar y permitir la creación de publicaciones en la comunidad.
const Comunidad = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [likes, setLikes] = useState({});
  
  
  const [nuevaPublicacion, setNuevaPublicacion] = useState('');

  const handlePublish = async () => {
    // Obtenemos el ID del usuario que está logueado desde el localStorage.
    const idAutor = localStorage.getItem('id');
    if (!idAutor) {
      alert('Debes iniciar sesión para publicar.');
      return;
    }
    if (nuevaPublicacion.trim()) {
       // Creamos el objeto que se enviará a la API.
      const publicacionParaEnviar = {
        comentario: nuevaPublicacion,
        usuario: idAutor,
        usuario_comentario: idAutor
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
    async function traerComentarios() {
      const peticion = await GetData('api/comentario/');
      if (peticion) {
        setComentarios(peticion);
      }
    }
    traerComentarios();
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

     
      {comentarios.map((comentario) => (
        <div key={comentario.id} className="tarjeta-usuario">
        {/* Mostramos el nombre del autor y el contenido del comentario */}
          <h3>comentario hecho por {comentario.nombre_usuario}</h3>
          <p>{comentario.comentario}</p>
          <div className="acciones-usuario">
            <button
              className={`like-btn ${likes[comentario.id] ? 'liked' : ''}`}
              onClick={() => manejarLike(comentario.id)}
            >
              {likes[comentario.id] ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comunidad;