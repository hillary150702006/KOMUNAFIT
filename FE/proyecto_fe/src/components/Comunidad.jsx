import React, { useState } from 'react';

const Comunidad = () => {
  const [usuarios] = useState([
    { id: 1, nombre: 'Ana' },
    { id: 2, nombre: 'Luis' },
    { id: 3, nombre: 'Carlos' },
  ]);

  const [progresos, setProgresos] = useState({});

  const manejarCambio = (id, campo, valor) => {
    setProgresos((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [campo]: valor,
      },
    }));
  };

  const compartirProgreso = (id) => {
    const progreso = progresos[id];
    if (progreso) {
      const usuario = usuarios.find((u) => u.id === id);
      console.log(`Progreso de ${usuario?.nombre}:`, progreso);
      alert('¡Progreso compartido!');
    } else {
      alert('No hay progreso para compartir');
    }
  };

  return (
    <div className="comunidad">
      <h1>Nuestra Comunidad</h1>
      <p>
        Transforma tu vida con Komuna: únete a nuestra comunidad de usuarios
        satisfechos con su cambio físico.
      </p>

      {usuarios.map((usuario) => (
        <div key={usuario.id} className="tarjeta-usuario">
          <h3>{usuario.nombre}</h3>

          <input
            type="number"
            placeholder="Distancia (km)"
            onChange={(e) => manejarCambio(usuario.id, 'distancia', e.target.value)}
          />

          <input
            type="number"
            placeholder="Tiempo (min)"
            onChange={(e) => manejarCambio(usuario.id, 'tiempo', e.target.value)}
          />

          <input
            type="text"
            placeholder="Tipo de ejercicio"
            onChange={(e) => manejarCambio(usuario.id, 'tipo', e.target.value)}
          />

          <button onClick={() => compartirProgreso(usuario.id)}>
            Compartir progreso
          </button>
        </div>
      ))}
    </div>
  );
};

export default Comunidad;