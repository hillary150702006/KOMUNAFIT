import React from 'react'
import { GetData } from '../services/fetch';
import { useState, useEffect } from 'react';
import { FaDribbble, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import '../styles/Entrenadores.css';

const imagenesEntrenadores = [
  "https://images.pexels.com/photos/3776149/pexels-photo-3776149.jpeg", // Ana Paola
  "https://i.pinimg.com/736x/69/11/bb/6911bb7eeec8a623e0af6947fc21ec6c.jpg", // Angelo Sanchez
  "https://i.pinimg.com/736x/3b/89/28/3b89280c690a7eb89bdc2f52a4a54afa.jpg", // Miriam
  "https://i.pinimg.com/1200x/90/f4/eb/90f4ebec33a13a05fbe878b805e35d84.jpg", // Daniel
  "https://i.pinimg.com/736x/e4/5e/78/e45e7865b06e83f4081faff564e76e53.jpg", // Miranda
  "https://images.pexels.com/photos/8373566/pexels-photo-8373566.jpeg", // Camila
  "https://i.pinimg.com/1200x/81/37/11/8137117a775c524f2d94ebe0b93012c3.jpg", // Byron
  "https://images.pexels.com/photos/14039255/pexels-photo-14039255.jpeg", // Pamela
  "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg", // Gabriela (Gaby)
  "https://images.pexels.com/photos/7951666/pexels-photo-7951666.jpeg", // Lucia
  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg", // Alex Rodolfo
  "https://i.pinimg.com/1200x/1c/9a/f2/1c9af20e150ee3a659354c9d328d0284.jpg", // Yanssy
  "https://i.pinimg.com/1200x/de/9c/fc/de9cfcb63502e8cbb8720374b5aa19b1.jpg", // Sebastián
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
