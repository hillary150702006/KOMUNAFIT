import React from 'react'
import { GetData } from '../services/fetch';
import { useState, useEffect } from 'react';
import { FaDribbble, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import '../styles/Entrenadores.css';

const imagenesEntrenadores = [
  "https://images.pexels.com/photos/39721/woman-sport-fitness-gym-39721.jpeg", // Ana Paola
  "https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg", // Angelo Sanchez
  "https://images.pexels.com/photos/4662433/pexels-photo-4662433.jpeg", // Miriam
  "https://images.pexels.com/photos/674020/pexels-photo-674020.jpeg", // Daniel
  "https://images.pexels.com/photos/3823059/pexels-photo-3823059.jpeg", // Miranda
  "https://images.pexels.com/photos/8373566/pexels-photo-8373566.jpeg", // Camila
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg", // Byron
  "https://images.pexels.com/photos/3757374/pexels-photo-3757374.jpeg", // Pamela
  "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg", // Gabriela (Gaby)
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg", // Lucia
  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg", // Alex Rodolfo
  "https://images.pexels.com/photos/1323705/pexels-photo-1323705.jpeg", // Yanssy
  "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg", // Sebastián
];


const Entrenadores = () => {
  const [entrenador, setEntrenador] = useState([]);

  useEffect(() => {
    async function traerEntrenador() {
      try {
        const peticion = await GetData('api/usuario/')
        const filtroEntrenadores = peticion.filter(
          (entrenador) => entrenador.rol === "entrenador"
        );

        setEntrenador(filtroEntrenadores);
      } catch (error) {
        console.error('Error fetching trainers:', error);
        setEntrenador([]);
      }
    }

    traerEntrenador();
  }, []);

  return (
    <div className="entrenadores-container">
      <h1 className="entrenadores-title">Nuestros Entrenadores</h1>

      <div className="entrenadores-grid">
        {entrenador.map((ent, index) => (
          <div key={ent.id} className="entrenador-card">

            {/* Imagen tomada de internet */}
            <img
              src={imagenesEntrenadores[index % imagenesEntrenadores.length]}
              alt={ent.first_name}
              className="entrenador-img"
            />

            <h2 className="entrenador-name">{ent.first_name}</h2>
            <p className="entrenador-email">{ent.email}</p>

            <div className="entrenador-socials">
              <a href="#"><FaDribbble /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaFacebook /></a>
            </div>

            <div className="entrenador-mensaje">
              <p>"¡Hola! Soy {ent.first_name}, tu entrenador personal.  
              Estoy aquí para ayudarte a alcanzar tus metas fitness.  
              ¡Vamos a trabajar duro juntos!"</p>
            </div>

            <button className="entrenador-btn">Contactar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entrenadores;
