import React, { useEffect, useState } from 'react';
import '../styles/Clases.css';
import { GetData } from '../services/fetch';
import { Link } from 'react-router-dom';

/*Este componente tiene como función obtener clases disponibles desde la API del backend*/
const Clases = () => {
    /*Por acá tiene un estado para almacenar la lista de las clases obtenidas de la API, inicializa con una array vacía para evitar errores antes de la carga */
    const [clases, setClases] = useState([]);
    const [entrenadores, setEntrenadores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [reservedClasses, setReservedClasses] = useState(new Set());

    useEffect(() => {
        /*Por acá tiene una función asincrona , es muy útil para traer datos a un servidor  y el await para manejar operaciones como las peticiones de la API*/
        async function traerClases() {
            /*EL try catch es muy importante para manejar errores que puedan ocurrir durante la obtención de datos, en este caso, si hay un error al hacer la petición a la API, se captura y se muestra en la consola*/
            try {
                const peticion = await GetData('api/clase/');
                setClases(peticion);
                console.log(peticion);
            } catch (error) {
                console.error("Error al obtener las clases:", error);
            }
        }

        async function traerEntrenadores() {
            try {
                const peticion = await GetData('api/usuario/');
                const filtroEntrenadores = peticion.filter(
                    (entrenador) => entrenador.rol === "entrenador"
                );
                setEntrenadores(filtroEntrenadores);
                console.log("Entrenadores:", filtroEntrenadores);
            } catch (error) {
                console.error("Error al obtener entrenadores:", error);
            }
        }

        traerClases();
        traerEntrenadores();
    }, []);

    const handleReserve = (claseId) => {
        setReservedClasses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(claseId)) {
                newSet.delete(claseId);
            } else {
                newSet.add(claseId);
            }
            return newSet;
        });
    };

    const getClassStatus = (index) => {
        const statuses = ['available', 'available', 'full', 'available', 'available', 'upcoming'];
        return statuses[index % statuses.length];
    };

    const getStatusText = (status) => {
        const statusMap = {
            'available': 'Disponible',
            'full': 'Lleno',
            'upcoming': 'Próximamente'
        };
        return statusMap[status] || 'Disponible';
    };

    return (
        <div className="clases-page">
            {/* Main Content */}
            <main className="clases-main">
                {/* Page Header con botón */}
                <div className="page-header">
                    <div className="page-header-content">
                        <div>
                            <h2 className="page-title">Clases Disponibles</h2>
                            <p className="page-subtitle">Únete a nuestras clases grupales y entrena con los mejores instructores</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn-create-class"
                        >
                            <i className="fas fa-plus"></i>
                            Crear Clase
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-blue">
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">Clases Hoy</p>
                                <p className="stat-value">{clases.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-green">
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">Inscritos</p>
                                <p className="stat-value">{reservedClasses.size * 15}</p>
                            </div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-purple">
                                <i className="fas fa-user-friends"></i>
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">Entrenadores</p>
                                <p className="stat-value">{entrenadores.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-content">
                            <div className="stat-icon stat-icon-yellow">
                                <i className="fas fa-star"></i>
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">Calificación</p>
                                <p className="stat-value">4.8</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Classes Grid */}
                <div className="classes-grid">
                    {Array.isArray(clases) && clases.map((clase, index) => {
                        const status = getClassStatus(index);
                        const isReserved = reservedClasses.has(clase.id);

                        return (
                            <div key={clase.id} className="class-card">
                                <div className="class-card-content">
                                    <div className="class-header">
                                        <div className="class-title-section">
                                            <h3 className="class-name">{clase.nombre_clase}</h3>
                                            <p className="class-description">{clase.descripcion_clase}</p>
                                        </div>
                                        <span className={`class-status status-${status}`}>
                                            {getStatusText(status)}
                                        </span>
                                    </div>

                                    <div className="class-details">
                                        <div className="detail-item">
                                            <i className="fas fa-user"></i>
                                            <span>{clase.usuario || 'Instructor'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-clock"></i>
                                            <span>{clase.hora_clase || '18:00 - 19:00'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-calendar"></i>
                                            <span>{clase.fecha_clase || 'Lun, Mié, Vie'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-users"></i>
                                            <span>{Math.floor(Math.random() * 15) + 5}/20 participantes</span>
                                        </div>
                                    </div>

                                    <div className="class-footer">
                                        {status === 'full' ? (
                                            <button className="btn-reserve btn-disabled" disabled>
                                                Clase Llena
                                            </button>
                                        ) : status === 'upcoming' ? (
                                            <button className="btn-reserve btn-notify">
                                                Notificarme
                                            </button>
                                        ) : (
                                            <button
                                                className={`btn-reserve ${isReserved ? 'btn-reserved' : ''}`}
                                                onClick={() => handleReserve(clase.id)}
                                            >
                                                <i className={`fas fa-${isReserved ? 'check' : 'calendar-plus'}`}></i>
                                                {isReserved ? 'Reservado' : 'Reservar Lugar'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Create Class Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Crear Nueva Clase</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={(e) => {
                            e.preventDefault();
                            setShowModal(false);
                        }}>
                            <div className="form-group">
                                <label className="form-label">Nombre de la Clase *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Ej: HIIT Quemagrasa"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Instructor *</label>
                                    <select className="form-input" required>
                                        <option value="">Seleccionar instructor</option>
                                        {entrenadores.map(ent => (
                                            <option key={ent.id} value={ent.id}>
                                                {ent.first_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Categoría *</label>
                                    <select className="form-input" required>
                                        <option value="">Seleccionar categoría</option>
                                        <option value="fuerza">Fuerza</option>
                                        <option value="cardio">Cardio</option>
                                        <option value="hiit">HIIT</option>
                                        <option value="yoga">Yoga</option>
                                        <option value="pilates">Pilates</option>
                                        <option value="funcional">Funcional</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Capacidad *</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        className="form-input"
                                        placeholder="20"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Hora Inicio *</label>
                                    <input
                                        type="time"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Hora Fin *</label>
                                    <input
                                        type="time"
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Descripción *</label>
                                <textarea
                                    className="form-input form-textarea"
                                    rows="3"
                                    placeholder="Describe la clase, ejercicios, nivel de dificultad, etc."
                                    required
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-submit">
                                    Crear Clase
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clases;