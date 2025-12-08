import React from 'react'
import { GetData } from '../services/fetch';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import '../styles/Entrenadores.css';


const Entrenadores = () => {
  const [entrenador, setEntrenador] = useState ([]);
  
  useEffect(()=>{
    async function traerEntrenador() {
      const peticion = await GetData('api/usuario/')
      const filtroEntrenadores = peticion.filter((entrenador)=>entrenador.rol === "entrenador")
      setEntrenador(filtroEntrenadores)
      console.log(filtroEntrenadores);
      
    }
    traerEntrenador()
  },[])
  
  return(
    <div className="entrenadores-container">
      <h1 className="entrenadores-title">Nuestros Entrenadores</h1>
      <div className="entrenadores-grid">
        {entrenador.map((entrenador)=>{
          return(
            <div key={entrenador.id} className="entrenador-card">
              <h2 className="entrenador-name">{entrenador.first_name}</h2>
              <p className="entrenador-email">{entrenador.email}</p>
              <div className="entrenador-mensaje">
                <p>"¡Hola! Soy {entrenador.first_name}, tu entrenador personal. Estoy aquí para ayudarte a alcanzar tus metas fitness. ¡Vamos a trabajar duro juntos!"</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
  
}



export default Entrenadores
