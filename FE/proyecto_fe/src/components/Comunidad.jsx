import React, { useEffect, useState } from 'react';
import '../styles/comunidad.css';
import { GetData, postData, DeleteData, postDataAutenticado, GetDataAutenticado } from '../services/fetch';

// Este componente se encarga de mostrar y permitir la creación de publicaciones en la comunidad.
const Comunidad = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [likes, setLikes] = useState({});
  const [nuevaPublicacion, setNuevaPublicacion] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isPosting, setIsPosting] = useState(false);

  const categories = [
    { name: 'Todos', color: 'from-purple-500 to-pink-500' },
    { name: 'Logros', color: 'from-green-500 to-emerald-500' },
    { name: 'Transformaciones', color: 'from-blue-500 to-cyan-500' },
    { name: 'Motivación', color: 'from-orange-500 to-red-500' },
    { name: 'Nutrición', color: 'from-amber-500 to-orange-500' },
    { name: 'Rutinas', color: 'from-indigo-500 to-purple-500' }
  ];

  const handlePublish = async () => {
    const idAutor = localStorage.getItem('id');
    if (!idAutor) {
      alert('Debes iniciar sesión para publicar.');
      return;
    }
    if (nuevaPublicacion.trim()) {
      setIsPosting(true);
      const publicacionParaEnviar = {
        comentario: nuevaPublicacion,
        usuario: idAutor,
        usuario_comentario: idAutor
      };
      const resultado = await postDataAutenticado('api/comentario/', publicacionParaEnviar);
      setIsPosting(false);
      if (resultado) {
        alert('¡Publicado con éxito!');
        setNuevaPublicacion('');
        // Recargar comentarios
        const peticion = await GetDataAutenticado('api/comentario/');
        if (peticion) {
          setComentarios(peticion);
        }
      } else {
        alert('Hubo un error al publicar.');
      }
    } else {
      alert('Escribe algo para publicar.');
    }
  };

  useEffect(() => {
    async function traerComentarios() {
      const peticion = await GetDataAutenticado('api/comentario/');
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

  const getTimeAgo = (fecha) => {
    // Función simple para mostrar tiempo relativo
    return "Hace un momento";
  };

  const getInitials = (nombre) => {
    if (!nombre) return "??";
    const words = nombre.split(' ');
    return words.length > 1
      ? words[0][0] + words[1][0]
      : nombre.substring(0, 2);
  };

  const currentUserId = localStorage.getItem('id');

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
      console.log("Intentando eliminar comentario con ID:", id);
      try {
        await DeleteData(`api/comentario/eliminar/${id}/`);
        setComentarios(prev => prev.filter(c => c.id !== id));
        alert("Comentario eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar el comentario");
      }
    }
  };

  return (
    <div className="comunidad-page">
      <div className="comunidad-container">
        {/* Hero Section */}
        <div className="comunidad-hero">
          <div className="hero-icon">
            <div className="hero-icon-inner">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <h1 className="hero-title">
            Comunidad <span className="hero-title-accent">Fitness</span>
          </h1>
          <p className="hero-subtitle">
            Inspira, motiva y crece junto con otros apasionados del fitness. Comparte tus logros,
            aprende de otros y conviértete en la mejor versión de ti mismo.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveTab(category.name === 'Todos' ? 'all' : category.name)}
              className={`category-tab ${(activeTab === 'all' && category.name === 'Todos') || activeTab === category.name
                ? `active gradient-${category.color.split(' ')[0].split('-')[1]}`
                : ''
                }`}
            >
              <i className="fas fa-circle"></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Create Post Card */}
        <div className="create-post-card">
          <div className="create-post-header">
            <i className="fas fa-edit"></i>
            <h3>Crear Publicación</h3>
          </div>
          <textarea
            value={nuevaPublicacion}
            onChange={(e) => setNuevaPublicacion(e.target.value)}
            placeholder="¿Qué quieres compartir con la comunidad? Comparte tus logros, consejos o motivación..."
            className="create-post-textarea"
          />
          <button
            onClick={handlePublish}
            className={`publish-button ${isPosting ? 'posting' : ''}`}
            disabled={isPosting}
          >
            {isPosting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Publicando...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Publicar
              </>
            )}
          </button>
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          {comentarios.map((comentario) => (
            <div key={comentario.id} className="post-card">
              <div className="post-header">
                <div className="post-author-info">
                  <div className="author-avatar">
                    {getInitials(comentario.nombre_usuario)}
                  </div>
                  <div className="author-details">
                    <h3 className="author-name">{comentario.nombre_usuario || 'Usuario'}</h3>
                    <p className="post-time">
                      <i className="fas fa-clock"></i>
                      {getTimeAgo(comentario.fecha)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="post-content">
                <p>{comentario.comentario}</p>
              </div>

              <div className="post-footer">
                <button
                  className={`post-action-btn like-btn ${likes[comentario.id] ? 'liked' : ''}`}
                  onClick={() => manejarLike(comentario.id)}
                >
                  <i className={`${likes[comentario.id] ? 'fas' : 'far'} fa-heart`}></i>
                  <span>{likes[comentario.id] ? 'Te gusta' : 'Me gusta'}</span>
                </button>

                <button className="post-action-btn comment-btn">
                  <i className="far fa-comment"></i>
                  <span>Comentar</span>
                </button>

                <button className="post-action-btn share-btn">
                  <i className="fas fa-share"></i>
                  <span>Compartir</span>
                </button>

                {String(currentUserId) === String(comentario.usuario) && (
                  <button
                    className="post-action-btn delete-btn"
                    onClick={() => handleDelete(comentario.id)}
                  >
                    <i className="fas fa-trash"></i>
                    <span>Eliminar</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {comentarios.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-comments"></i>
            <h3>No hay publicaciones aún</h3>
            <p>Sé el primero en compartir algo con la comunidad</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comunidad;