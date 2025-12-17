import React, { useState, useEffect } from 'react';
import { GetDataAutenticado } from '../services/fetch';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Retos.css';

const Retos = () => {
  const [retos, setRetos] = useState([]);
  const [likedRetos, setLikedRetos] = useState(new Set());
  const [reactions, setReactions] = useState({});
  const [completedRetos, setCompletedRetos] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('todos');
  const navigate = useNavigate();

  const userNames = ['Alex', 'Maria', 'Carlos', 'Sofia', 'Juan', 'Laura', 'Pedro', 'Ana', 'Luis', 'Carmen'];

  // Categorías y dificultades para los retos
  const categories = ['Fuerza', 'Cardio', 'HIIT', 'Resistencia', 'Flexibilidad'];
  const difficulties = ['Fácil', 'Medio', 'Difícil', 'Extremo'];

  useEffect(() => {
    async function traerRetos() {
      try {
        const peticion = await GetDataAutenticado('api/reto/');
        setRetos(peticion);
        console.log(peticion);
      } catch (error) {
        console.error("Error al obtener los retos:", error);
        if (error.message.includes('401')) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    }
    traerRetos();
  }, [navigate]);

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

  const handleComplete = (retoId) => {
    setCompletedRetos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(retoId)) {
        newSet.delete(retoId); // Deshacer si ya está completado
      } else {
        newSet.add(retoId); // Marcar como completado
      }
      return newSet;
    });
  };

  // Asignar categoría y dificultad basado en el índice
  const getRetoCategory = (index) => categories[index % categories.length];
  const getRetoDifficulty = (index) => difficulties[index % difficulties.length];
  const getRetoPoints = (difficulty) => {
    const pointsMap = { 'Fácil': 80, 'Medio': 150, 'Difícil': 200, 'Extremo': 300 };
    return pointsMap[difficulty] || 100;
  };

  // Filtrar retos por categoría
  const filteredRetos = activeCategory === 'todos'
    ? retos
    : retos.filter((_, index) => getRetoCategory(index).toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="retos-page">
      {/* Header */}
      <div className="retos-header">
        <div className="header-content">
          <div className="header-stats">
            <div className="stat-item">
              <div className="stat-value stat-streak">12</div>
              <div className="stat-label">Días seguidos</div>
            </div>
            <div className="stat-item">
              <div className="stat-value stat-points">2450</div>
              <div className="stat-label">Puntos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-card">
          <div className="progress-header">
            <span className="progress-title">Progreso Semanal</span>
            <span className="progress-percentage">65%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '65%' }}></div>
          </div>
          <div className="progress-message">
            <span>¡Vas por buen camino! Solo faltan 350 puntos para el próximo nivel</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card stat-active">
          <div className="stat-icon-wrapper stat-icon-pink">
            <i className="fas fa-fire"></i>
          </div>
          <div className="stat-info">
            <div className="stat-number">{retos.length - completedRetos.size}</div>
            <div className="stat-text">Retos activos</div>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon-wrapper stat-icon-purple">
            <i className="fas fa-trophy"></i>
          </div>
          <div className="stat-info">
            <div className="stat-number">{completedRetos.size}</div>
            <div className="stat-text">Completados</div>
          </div>
        </div>

        <div className="stat-card stat-pr">
          <div className="stat-icon-wrapper stat-icon-green">
            <i className="fas fa-weight"></i>
          </div>
          <div className="stat-info">
            <div className="stat-number">45Kg</div>
            <div className="stat-text">PR Personal</div>
          </div>
        </div>

        <div className="stat-card stat-ranking">
          <div className="stat-icon-wrapper stat-icon-yellow">
            <i className="fas fa-ranking-star"></i>
          </div>
          <div className="stat-info">
            <div className="stat-number">#24</div>
            <div className="stat-text">Ranking</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-section">
        <button
          className={`category-btn ${activeCategory === 'todos' ? 'category-active' : ''}`}
          onClick={() => setActiveCategory('todos')}
        >
          <i className="fas fa-fire"></i>
          <span>Todos los Retos</span>
        </button>
        <button
          className={`category-btn ${activeCategory === 'fuerza' ? 'category-active' : ''}`}
          onClick={() => setActiveCategory('fuerza')}
        >
          <i className="fas fa-dumbbell"></i>
          <span>Fuerza</span>
        </button>
        <button
          className={`category-btn ${activeCategory === 'cardio' ? 'category-active' : ''}`}
          onClick={() => setActiveCategory('cardio')}
        >
          <i className="fas fa-running"></i>
          <span>Cardio</span>
        </button>
        <button
          className={`category-btn ${activeCategory === 'hiit' ? 'category-active' : ''}`}
          onClick={() => setActiveCategory('hiit')}
        >
          <i className="fas fa-fire"></i>
          <span>HIIT</span>
        </button>
        <button
          className={`category-btn ${activeCategory === 'resistencia' ? 'category-active' : ''}`}
          onClick={() => setActiveCategory('resistencia')}
        >
          <i className="fas fa-heart"></i>
          <span>Resistencia</span>
        </button>
      </div>

      {/* Challenges Grid */}
      <div className="challenges-container">
        {filteredRetos.length > 0 ? (
          <div className="challenges-grid">
            {filteredRetos.map((reto, index) => {
              const category = getRetoCategory(index);
              const difficulty = getRetoDifficulty(index);
              const points = getRetoPoints(difficulty);
              const isCompleted = completedRetos.has(reto.id);
              const isLiked = likedRetos.has(reto.id);

              return (
                <div
                  key={reto.id}
                  className={`challenge-card ${isCompleted ? 'challenge-completed' : ''} challenge-${category.toLowerCase()}`}
                >
                  <div className="challenge-header">
                    <div className={`challenge-icon-wrapper icon-${category.toLowerCase()}`}>
                      <i className={`fas fa-${category === 'Fuerza' ? 'dumbbell' : category === 'Cardio' ? 'running' : category === 'HIIT' ? 'fire' : 'heart'}`}></i>
                    </div>
                    <div className={`difficulty-badge difficulty-${difficulty.toLowerCase()}`}>                    {isCompleted ? <><i className="fas fa-check"></i> Completado</> : difficulty}                  </div>
                  </div>

                  <h3 className="challenge-title">{reto.nombre_reto}</h3>
                  <p className="challenge-description">
                    Compartido por {userNames[index % userNames.length]}
                  </p>

                  <div className="challenge-meta">
                    <div className="meta-item">
                      <i className="fas fa-clock"></i>
                      <span>{Math.floor(Math.random() * 48) + 24}h restantes</span>
                    </div>
                    <div className="meta-item meta-points">
                      <i className="fas fa-trophy"></i>
                      <span>{points} pts</span>
                    </div>
                  </div>

                  <div className="challenge-footer">
                    <span className={`category-badge badge-${category.toLowerCase()}`}>         {category}                   </span>
                    <div className="challenge-actions">
                      <button
                        className={`like-button ${isLiked ? 'liked' : ''}`}
                        onClick={() => handleLike(reto.id)}
                        title="Me gusta"
                      >
                        <i className={`fas fa-heart`}></i>
                      </button>
                      <button
                        className={`complete-button ${isCompleted ? 'completed' : ''}`}
                        onClick={() => handleComplete(reto.id)}

                      >
                        <i className="fas fa-check"></i>
                        {isCompleted ? 'Deshacer' : 'Completar'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-retos">
            {activeCategory === 'todos'
              ? 'No hay retos disponibles en este momento.'
              : `No hay retos de ${activeCategory} disponibles.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Retos;
