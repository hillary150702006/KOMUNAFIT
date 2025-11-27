import React from 'react'
import { GetData } from '../services/fetch';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import '../styles/Entrenadores.css';

const Entrenadores = () => {
  const [entrenador, setEntrenador] = useState ([]);

  useEffect(()=>{
    async function traerEntrenador() {
      const peticion = await GetData('api/api/usuario/')
      const filtroEntrenadores = peticion.filter((entrenador)=>entrenador.rol === "entrenador")
      setEntrenador(filtroEntrenadores)
      console.log(filtroEntrenadores);
      
    }
    traerEntrenador()
  },[])

  return(
    <>
      {entrenador.map((entrenador)=>{
        return(
          <div key={entrenador.id}>
            <h2>{entrenador.first_name}</h2>
            <p>{entrenador.email}</p>
          </div>
        )
      })}
    </>
  )
}



export default Entrenadores
