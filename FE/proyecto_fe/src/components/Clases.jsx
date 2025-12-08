import React, { useEffect, useState } from 'react';
import '../styles/Clases.css';
import { GetData } from '../services/fetch';
import { Link } from 'react-router-dom';


const Clases = () => {
    const [clases, setClases] = useState([]);

    useEffect(() => {
        async function traerClases() {
            try {
                const peticion = await GetData('api/clase/');
                setClases(peticion);
                console.log(peticion);
            } catch (error) {
                console.error("Error al obtener las clases:", error);
            }
        }
        traerClases();
    }, []);

    return (
        <div className="clases-container">
            <h1 className="clases-title">Nuestras Clases</h1>
            <div className="clases-grid">
                {Array.isArray(clases) && clases.map((clase) => {
                    return (
                        <div key={clase.id} className="clase-card">
                            <h2 className="clase-name">{clase.nombre_clase}</h2>
                            <p className="clase-descripcion">{clase.descripcion_clase}</p>
                            <p className="clase-horario">Horario: {clase.fecha_clase} a las {clase.hora_clase}</p>
                            <p className="clase-instructor">Entrenador: {clase.usuario}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Clases;