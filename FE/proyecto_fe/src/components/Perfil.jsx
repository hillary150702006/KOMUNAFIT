import React, { useState, useEffect } from 'react';
import '../styles/Perfil.css';
import { GetDataAutenticado, DeleteData, GetData } from '../services/fetch';

function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Información Personal');
  const [profileData, setProfileData] = useState({});
  const [comentarios, setComentarios] = useState([]);

  // Datos locales para objetivos y preferencias (placeholders o estado local)
  const [objetivos, setObjetivos] = useState(['Ganar masa muscular', 'Mejorar resistencia', 'Entrenar 4 veces por semana']);
  const [preferencias, setPreferencias] = useState(['Entrenamiento matutino', 'Preferencias de dieta alta en proteínas']);
  const [newObjetivo, setNewObjetivo] = useState('');
  const [newPreferencia, setNewPreferencia] = useState('');

  const [seguridad, setSeguridad] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

  // Fetch de comentarios
  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const data = await GetData('api/comentario/');
        const userId = localStorage.getItem('id');
        if (data && userId) {
          const comentariosUsuarios = data.filter(comentario => String(comentario.usuario) === String(userId));
          setComentarios(comentariosUsuarios);
        }
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    };
    fetchComentarios();
  }, [activeTab]);

  // Fetch de datos del usuario
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = localStorage.getItem('id');
        if (userId) {
          const userData = await GetDataAutenticado(`api/usuario/${userId}/`);
          if (userData && userData.length > 0) {
            setProfileData(userData[0]);
            // Si el usuario tiene foto en backend, podrías setearla aquí
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos del perfil:", error);
      }
    }
    fetchUserData();
  }, []);

  const handleDeleteComentario = async (id) => {
    if (window.confirm("¿Eliminar este comentario?")) {
      try {
        await DeleteData(`api/comentario/eliminar/${id}/`);
        setComentarios(comentarios.filter(comentario => comentario.id !== id));
      } catch (error) {
        console.error("Error al eliminar el comentario:", error);
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos guardados:', profileData);
    setIsEditing(false);
    // Aquí iría la lógica para guardar en backend (patchData, etc.)
  };

  const handleAddObjetivo = () => {
    if (newObjetivo.trim()) {
      setObjetivos([...objetivos, newObjetivo]);
      setNewObjetivo('');
    }
  };

  const handleAddPreferencia = () => {
    if (newPreferencia.trim()) {
      setPreferencias([...preferencias, newPreferencia]);
      setNewPreferencia('');
    }
  };

  const handleSeguridadChange = (e) => {
    const { name, value } = e.target;
    setSeguridad(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = () => {
    if (seguridad.newPassword === seguridad.confirmPassword && seguridad.newPassword) {
      console.log('Contraseña cambiada');
      setSeguridad({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert("Contraseña actualizada (simulado)");
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  const formatoFecha = (fecha) => {
    if (!fecha) return "Fecha desconocida";
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, opciones);
  }

  return (
    <div className="perfil-page-container">
      <div className="profile-main-container">

        {/* Header Section */}
        <div className="profile-header-section">
          <h1>MI PERFIL</h1>
        </div>

        <div className="profile-layout">

          {/* Left Column: Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar-section">
              <img src={photoPreview} alt="Avatar" className="profile-avatar" />
              {isEditing && (
                <label className="upload-label">
                  <i className="fas fa-camera"></i> Cambiar Foto
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="upload-input" />
                </label>
              )}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 className="profile-name">{profileData.nombre || 'Usuario'}</h2>
              <div className="profile-username">@{profileData.username || 'username'}</div>
              <p className="profile-member-since">Miembro desde {formatoFecha(profileData.fecha_registro)}</p>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">{comentarios.length}</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{objetivos.length}</div>
                <div className="stat-label">Metas</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Active</div>
                <div className="stat-label">Estado</div>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="detail-text">
                  <div>{profileData.email || 'email@ejemplo.com'}</div>
                  <div className="detail-label">Email</div>
                </div>
              </div>

              {/* Más detalles estáticos o dinámicos */}
              <div className="detail-item">
                <div className="detail-icon">
                  <i className="fas fa-id-card"></i>
                </div>
                <div className="detail-text">
                  <div>{profileData.id || '#'}</div>
                  <div className="detail-label">ID Usuario</div>
                </div>
              </div>

              <div className="action-buttons" style={{ marginTop: '20px' }}>
                <button className="btn btn-secondary" onClick={handleEditToggle}>
                  <i className={`fas ${isEditing ? 'fa-times' : 'fa-edit'}`}></i>
                  {isEditing ? 'Cancelar Edición' : 'Editar Perfil'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Main Content (Tabs) */}
          <div className="main-content">

            {/* Tabs Navigation */}
            <div className="profile-tabs">
              <button
                className={`tab-btn ${activeTab === 'Información Personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('Información Personal')}
              >
                <i className="fas fa-user"></i> Información
              </button>
              <button
                className={`tab-btn ${activeTab === 'Objetivos' ? 'active' : ''}`}
                onClick={() => setActiveTab('Objetivos')}
              >
                <i className="fas fa-bullseye"></i> Objetivos
              </button>
              <button
                className={`tab-btn ${activeTab === 'Seguridad' ? 'active' : ''}`}
                onClick={() => setActiveTab('Seguridad')}
              >
                <i className="fas fa-lock"></i> Seguridad
              </button>
              <button
                className={`tab-btn ${activeTab === 'Actividad' ? 'active' : ''}`}
                onClick={() => setActiveTab('Actividad')}
              >
                <i className="fas fa-history"></i> Actividad
              </button>
            </div>

            {/* Tab Content Area */}
            <div className="content-card">

              {activeTab === 'Información Personal' && (
                <div className="animate-fade-in">
                  <div className="card-header">
                    <h3 className="card-title">Información Personal</h3>
                  </div>
                  <form className="profile-form" onSubmit={handleSubmit}>
                    <label>Nombre Completo</label>
                    <input
                      type="text"
                      name="nombre"
                      value={profileData.nombre || ''}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="Tu nombre completo"
                    />

                    <label>Nombre de Usuario</label>
                    <input
                      type="text"
                      name="username"
                      value={profileData.username || ''}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                    />

                    <label>Correo Electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email || ''}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                    />

                    {isEditing && (
                      <div className="action-buttons">
                        <button type="submit" className="btn btn-primary">
                          <i className="fas fa-save"></i> Guardar Cambios
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {activeTab === 'Objetivos' && (
                <div className="animate-fade-in">
                  <div className="card-header">
                    <h3 className="card-title">Mis Objetivos y Preferencias</h3>
                  </div>

                  <h4 style={{ marginBottom: '10px', color: '#4ecdc4', marginTop: '20px' }}>Objetivos</h4>
                  {objetivos.map((obj, i) => (
                    <div key={i} className="list-item">
                      <span>{obj}</span>
                      {isEditing && <button onClick={() => setObjetivos(prev => prev.filter((_, idx) => idx !== i))}><i className="fas fa-trash"></i></button>}
                    </div>
                  ))}
                  {isEditing && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <input
                        type="text"
                        value={newObjetivo}
                        onChange={(e) => setNewObjetivo(e.target.value)}
                        placeholder="Nuevo objetivo..."
                        className="input-dark"
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                      />
                      <button className="btn btn-primary" style={{ flex: '0 0 auto' }} onClick={handleAddObjetivo}>Agregar</button>
                    </div>
                  )}

                  <h4 style={{ marginBottom: '10px', color: '#ff6b6b', marginTop: '30px' }}>Preferencias</h4>
                  {preferencias.map((pref, i) => (
                    <div key={i} className="list-item">
                      <span>{pref}</span>
                      {isEditing && <button onClick={() => setPreferencias(prev => prev.filter((_, idx) => idx !== i))}><i className="fas fa-trash"></i></button>}
                    </div>
                  ))}
                  {isEditing && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <input
                        type="text"
                        value={newPreferencia}
                        onChange={(e) => setNewPreferencia(e.target.value)}
                        placeholder="Nueva preferencia..."
                        className="input-dark"
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                      />
                      <button className="btn btn-primary" style={{ flex: '0 0 auto' }} onClick={handleAddPreferencia}>Agregar</button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Seguridad' && (
                <div className="animate-fade-in">
                  <div className="card-header">
                    <h3 className="card-title">Configuración de Seguridad</h3>
                  </div>
                  {isEditing ? (
                    <div className="profile-form">
                      <label>Contraseña Actual</label>
                      <input type="password" name="currentPassword" value={seguridad.currentPassword} onChange={handleSeguridadChange} placeholder="••••••••" />

                      <label>Nueva Contraseña</label>
                      <input type="password" name="newPassword" value={seguridad.newPassword} onChange={handleSeguridadChange} placeholder="••••••••" />

                      <label>Confirmar Password</label>
                      <input type="password" name="confirmPassword" value={seguridad.confirmPassword} onChange={handleSeguridadChange} placeholder="••••••••" />

                      <button className="btn btn-primary" onClick={handleChangePassword} style={{ marginTop: '20px' }}>
                        <i className="fas fa-key"></i> Actualizar Contraseña
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                      <i className="fas fa-lock" style={{ fontSize: '40px', marginBottom: '20px', color: '#4ecdc4' }}></i>
                      <p>Habilita el modo edición para cambiar tu contraseña.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'Actividad' && (
                <div className="animate-fade-in">
                  <div className="card-header">
                    <h3 className="card-title">Actividad Reciente en Comunidad</h3>
                  </div>
                  {comentarios.length > 0 ? (
                    <div className="activity-list">
                      {comentarios.map(comentario => (
                        <div key={comentario.id} className="list-item">
                          <div style={{ flex: 1 }}>
                            <div style={{ color: '#4ecdc4', fontSize: '0.9rem', marginBottom: '4px' }}>
                              POST #{comentario.id}
                            </div>
                            <div>{comentario.comentario}</div>
                          </div>
                          <button onClick={() => handleDeleteComentario(comentario.id)} title="Eliminar Comentario">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                      <i className="fas fa-comment-slash" style={{ fontSize: '40px', marginBottom: '20px' }}></i>
                      <p>No has realizado comentarios recientes.</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Perfil;