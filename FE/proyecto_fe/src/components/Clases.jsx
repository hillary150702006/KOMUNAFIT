import React, { useEffect, useState } from 'react';
import '../styles/Clases.css';
import { GetData, postDataAutenticado } from '../services/fetch';
import { Link } from 'react-router-dom';

const Clases = () => {
    const [clases, setClases] = useState([]);
    const [entrenadores, setEntrenadores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [reservedClasses, setReservedClasses] = useState(new Set());

    /* ===== ESTADOS DEL MODAL (NUEVOS) ===== */
    const [nombreClase, setNombreClase] = useState('');
    const [descripcionClase, setDescripcionClase] = useState('');
    const [fechaClase, setFechaClase] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [duracionClase, setDuracionClase] = useState('');
    const [categoria, setCategoria] = useState('');

    useEffect(() => {
        traerClases();
        traerEntrenadores();
    }, []);

    const traerClases = async () => {
        try {
            const peticion = await GetData('api/clase/');
            setClases(peticion);
        } catch (error) {
            console.error("Error al obtener las clases:", error);
        }
    };

    const traerEntrenadores = async () => {
        try {
            const peticion = await GetData('api/usuario/');
            const filtroEntrenadores = peticion.filter(
                (entrenador) => entrenador.rol === "entrenador"
            );
            setEntrenadores(filtroEntrenadores);
        } catch (error) {
            console.error("Error al obtener entrenadores:", error);
        }
    };

    const handleReserve = (claseId) => {
        setReservedClasses(prev => {
            const newSet = new Set(prev);
            newSet.has(claseId) ? newSet.delete(claseId) : newSet.add(claseId);
            return newSet;
        });
    };

    const getClassStatus = (index) => {
        const statuses = ['available', 'available', 'full', 'available', 'available', 'upcoming'];
        return statuses[index % statuses.length];
    };

    const getStatusText = (status) => {
        const statusMap = {
            available: 'Disponible',
            full: 'Lleno',
            upcoming: 'Próximamente'
        };
        return statusMap[status];
    };

    /* ===== SUBMIT REAL ===== */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nombre_clase: nombreClase,
            descripcion_clase: descripcionClase,
            usuario: localStorage.getItem('id'),
            fecha_clase: fechaClase,
            hora_clase: horaInicio,
            duracion_clase: duracionClase,
            categoria: categoria
        };

        try {
            await postDataAutenticado('api/clase/', data);
            setShowModal(false);
            traerClases();
            limpiarFormulario();
        } catch (error) {
            console.error('Error al crear clase:', error);
        }
    };

    const limpiarFormulario = () => {
        setNombreClase('');
        setDescripcionClase('');
        setFechaClase('');
        setHoraInicio('');
        setHoraFin('');
        setDuracionClase('');
        setCategoria('');
    };

    return (
        <div className="clases-page">
            <main className="clases-main">

                {/* HEADER */}
                <div className="page-header">
                    <div className="page-header-content">
                        <div>
                            <h2 className="page-title">Clases Disponibles</h2>
                            <p className="page-subtitle">
                                Únete a nuestras clases grupales y entrena con los mejores instructores
                            </p>
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

                {/* GRID */}
                <div className="classes-grid">
                    {clases.map((clase, index) => {
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

                                    <div className="class-footer">
                                        <button
                                            className={`btn-reserve ${isReserved ? 'btn-reserved' : ''}`}
                                            onClick={() => handleReserve(clase.id)}
                                        >
                                            {isReserved ? 'Reservado' : 'Reservar Lugar'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* ===== MODAL (MISMO DISEÑO) ===== */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Crear Nueva Clase</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Nombre de la Clase *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={nombreClase}
                                    onChange={(e) => setNombreClase(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Categoría *</label>
                                <select
                                    className="form-input"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="fuerza">Fuerza</option>
                                    <option value="cardio">Cardio</option>
                                    <option value="hiit">HIIT</option>
                                    <option value="yoga">Yoga</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Fecha *</label>
                                    <input
                                        type="date"
                                        className="form-input"
                                        value={fechaClase}
                                        onChange={(e) => setFechaClase(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Hora Inicio *</label>
                                    <input
                                        type="time"
                                        className="form-input"
                                        value={horaInicio}
                                        onChange={(e) => setHoraInicio(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Hora Fin *</label>
                                    <input
                                        type="time"
                                        className="form-input"
                                        value={horaFin}
                                        onChange={(e) => setHoraFin(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Duración *</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={duracionClase}
                                    onChange={(e) => setDuracionClase(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Descripción *</label>
                                <textarea
                                    className="form-input form-textarea"
                                    value={descripcionClase}
                                    onChange={(e) => setDescripcionClase(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
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
