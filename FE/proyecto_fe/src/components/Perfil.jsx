import React, { useState, useEffect } from 'react';
import '../styles/Perfil.css';
import { useLocation } from "react-router-dom";

function Perfil() {
   const location = useLocation();
  const usuario = location.state;
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Información Personal');
  const [mostrarEdicion,setMostrarEdicion] = useState(false)
  const [profileData, setProfileData] = useState({


    nombre: '',
    email: '',
    altura: '',
    peso: '',
    fechaNacimiento: '',
    genero: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setProfileData(prev => ({
        ...prev,
        nombre: userData.username,
        email: userData.email
      }));
    }
  }, []);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('/ruta/a/foto.jpg');
  const [objetivos, setObjetivos] = useState([
    'Bajar 11 kilos en 4 meses',
    'Hacer la dieta carnivora ',
    'Dormir 8hras diarias y levantarme temprano'
  ]);
  const [preferencias, setPreferencias] = useState([
    'Usar la caminadora en casa ',
    'Ir al gimnasio 3 veces por semana y alternar en casa',
    'Usar más peso y lograr la recomposición corporal'
  ]);
  const [seguridad, setSeguridad] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [actividades, setActividades] = useState([
    'Entrenamiento de fuerza 3 veces a la semana',
    'Caminar unos 10.000 pasos diarios',
    'Consumir proteína magra ',
    'Levantarme temprano ir al gym y tomarme el preentreno',
    'Romper el ayuno a medio dia con proteína y grasa saludable'
  ]);
  const [newObjetivo, setNewObjetivo] = useState('');
  const [newPreferencia, setNewPreferencia] = useState('');
  const [newActividad, setNewActividad] = useState('');

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
    if (photoFile) {
      console.log('Foto subida:', photoFile);
    }
    setIsEditing(false);
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

  const handleAddActividad = () => {
    if (newActividad.trim()) {
      setActividades([newActividad, ...actividades]);
      setNewActividad('');
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
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <div className="perfil-usuario">
      <div className="fondo-gimnasio" />

      <div className="contenedor-perfil">
        <div className="encabezado-perfil">
          <img src={photoPreview} alt="Foto de perfil" className="foto-perfil" />
          {isEditing && (
            <div className="foto-upload">
              <label className="upload-label">
                Cambiar Foto
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="upload-input" />
              </label>
            </div>
          )}
          <h2 className="nombre-usuario">{profileData.nombre}</h2>
          <p className="miembro-desde">Miembro desde enero 2023</p>
        </div>

        <div className="estadisticas-usuario">
          <div className="dato"><span>Amigos</span></div>
          <div className="dato"><span>Asistencias</span></div>
          <div className="dato"><span>Completadas</span></div>
        </div>

        <nav className="navegacion-perfil">
          <button
            className={activeTab === 'Información Personal' ? 'tab-activo' : ''}
            onClick={() => setActiveTab('Información Personal')}
          >
            Información Personal
          </button>
          <button
            className={activeTab === 'Objetivos y Preferencias' ? 'tab-activo' : ''}
            onClick={() => setActiveTab('Objetivos y Preferencias')}
          >
            Objetivos y Preferencias
          </button>
          <button
            className={activeTab === 'Seguridad' ? 'tab-activo' : ''}
            onClick={() => setActiveTab('Seguridad')}
          >
            Seguridad
          </button>
          <button
            className={activeTab === 'Actividad Reciente' ? 'tab-activo' : ''}
            onClick={() => setActiveTab('Actividad Reciente')}
          >
            Actividad Reciente
          </button>
        </nav>
          <button onClick={()=>setMostrarEdicion(!mostrarEdicion)}>Mostrar edicion</button>
          {mostrarEdicion == true && (
             <>
             {activeTab === 'Información Personal' && (
          <form className="formulario-informacion" onSubmit={handleSubmit}>
            <label>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={profileData.nombre}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />

            <label>Altura</label>
            <input
              type="text"
              name="altura"
              value={profileData.altura}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />

            <label>Peso</label>
            <input
              type="text"
              name="peso"
              value={profileData.peso}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />

            <label>Fecha de Nacimiento</label>
            <input
              type="text"
              name="fechaNacimiento"
              value={profileData.fechaNacimiento}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />

            <label>Género</label>
            <select
              name="genero"
              value={profileData.genero}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>

            <div className="botones-formulario">
              {isEditing && <button type="submit">Guardar Cambios</button>}
              <button type="button" onClick={handleEditToggle}>
                {isEditing ? 'Cancelar' : 'Editar Perfil'}
              </button>
            </div>
          </form>
        )}
             </>
          )}
        

        {activeTab === 'Objetivos y Preferencias' && (
          <div className="contenido-tab">
            <h3>Objetivos</h3>
            <ul>
              {objetivos.map((obj, index) => <li key={index}>{obj}</li>)}
            </ul>
            {isEditing && (
              <div>
                <input
                  type="text"
                  value={newObjetivo}
                  onChange={(e) => setNewObjetivo(e.target.value)}
                  placeholder="Agregar nuevo objetivo"
                />
                <button onClick={handleAddObjetivo}>Agregar Objetivo</button>
              </div>
            )}
            <h3>Preferencias</h3>
            <ul>
              {preferencias.map((pref, index) => <li key={index}>{pref}</li>)}
            </ul>
            {isEditing && (
              <div>
                <input
                  type="text"
                  value={newPreferencia}
                  onChange={(e) => setNewPreferencia(e.target.value)}
                  placeholder="Agregar nueva preferencia"
                />
                <button onClick={handleAddPreferencia}>Agregar Preferencia</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Seguridad' && (
          <div className="contenido-tab">
            <h3>Configuración de Seguridad</h3>
            {isEditing ? (
              <div>
                <label>Contraseña Actual</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={seguridad.currentPassword}
                  onChange={handleSeguridadChange}
                  placeholder="Contraseña actual"
                />
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  name="newPassword"
                  value={seguridad.newPassword}
                  onChange={handleSeguridadChange}
                  placeholder="Nueva contraseña"
                />
                <label>Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={seguridad.confirmPassword}
                  onChange={handleSeguridadChange}
                  placeholder="Confirmar nueva contraseña"
                />
                <button onClick={handleChangePassword}>Cambiar Contraseña</button>
              </div>
            ) : (
              <p>Cambiar contraseña, activar autenticación de dos factores, etc.</p>
            )}
            <button onClick={() => alert('Funcionalidad de 2FA no implementada')}>Activar 2FA</button>
          </div>
        )}

        {activeTab === 'Actividad Reciente' && (
          <div className="contenido-tab">
            <h3>Actividad Reciente</h3>
            <ul>
              {actividades.map((act, index) => <li key={index}>{act}</li>)}
            </ul>
            {isEditing && (
              <div>
                <input
                  type="text"
                  value={newActividad}
                  onChange={(e) => setNewActividad(e.target.value)}
                  placeholder="Agregar nueva actividad"
                />
                <button onClick={handleAddActividad}>Agregar Actividad</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;
