import React, { useState, useEffect } from 'react';
import { GetData } from '../services/fetch';
import { Link } from 'react-router-dom';
import '../styles/Retos.css';
 
const Retos = () => {
  const [retos, setRetos] = useState([]);
  const [likedRetos, setLikedRetos] = useState(new Set());
  const [reactions, setReactions] = useState({});

  const userNames = ['Alex', 'Maria', 'Carlos', 'Sofia', 'Juan', 'Laura', 'Pedro', 'Ana', 'Luis', 'Carmen'];

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

  const handleLike = (retoId) => {
    setLikedRetos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(retoId)) {
        newSet.delete(retoId);
      } else {
        newSet.add(retoId);
      }
      return newSet;
    });
  };

  const handleReaction = (retoId, emoji) => {
    setReactions(prev => ({
      ...prev,
      [retoId]: emoji
    }));
  };
  
  return (
    <div className="retos-container">
      <h1 className="retos-title">Retos Disponibles</h1>
      {retos.length > 0 ? (
        <div className="retos-grid">
          {retos.map((reto, index) => (
            <div key={reto.id} className="reto-card">
              <div className="reto-header">
                <div className="user-avatar"></div>
                <div className="user-name">Compartido por: {userNames[index % userNames.length]}</div>
              </div>
              <h2 className="reto-name">{reto.nombre_reto}</h2>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-retos">No hay retos disponibles en este momento.</p>
      )}
    </div>
  );
};

export default Retos;
