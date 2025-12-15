import React, { useEffect, useState } from 'react';
import '../styles/Clases.css';
import { GetData } from '../services/fetch';
import { Link } from 'react-router-dom';

/*Este componente tiene como función obtener clases disponibles desde la API del backend*/ 
const Clases = () => {
    /*Por acá tiene un estado para almacenar la lista de las clases obtenidas de la API, inicializa con una array vacía para evitar errores antes de la carga */ 
    const [clases, setClases] = useState([]);

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