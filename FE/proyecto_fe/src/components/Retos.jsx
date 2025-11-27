import React, { useState, useEffect } from 'react';
import { GetData } from '../services/fetch';
import { Link } from 'react-router-dom';

const Retos = () => {
  const [retos, setRetos] = useState([]);

  useEffect(() => {
    async function traerRetos() {
      try {
        const peticion = await GetData('api/api/reto/');
        setRetos(peticion);
        console.log(peticion);
      } catch (error) {
        console.error("Error al obtener los retos:", error);
      }
    }
    traerRetos();
  }, []);

  return (
    <div>
      <h1>Retos Disponibles</h1>
      {retos.length > 0 ? (
        retos.map((reto) => (
          <div key={reto.id}>
            <h2>{reto.nombre_reto}</h2>
            <p>Dificultad: {reto.dificultad_reto}</p>
          </div>
        ))
      ) : (
        <p>No hay retos disponibles en este momento.</p>
      )}
    </div>
  );
};

export default Retos;
