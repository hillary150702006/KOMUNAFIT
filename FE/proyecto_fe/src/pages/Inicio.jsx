import '../styles/Inicio.css';
import Testimonials from '../components/TestimonialCard';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate('/registro');
  };

  const handleViewClasses = () => {
    navigate('/clases');
  };

  const handleStartJourney = () => {
    navigate('/registro');
  };

  return (
    <div className="inicio-container">
    
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Transforma tu cuerpo</h1>
          <h2 className="hero-subtitle">Entrenamiento profesional, comunidad motivadora y resultados reales</h2>
          <div className="hero-buttons">
            <button className="cta-button primary" onClick={handleJoinNow}>Únete Ahora</button>
            <button className="cta-button secondary" onClick={handleViewClasses}>Ver Clases</button>
          </div>
        </div>

      </section>

    
      <section className="features-section">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💪</div>
            <h3>Entrenadores Expertos</h3>
            <p>Profesionales certificados para guiarte en tu transformación</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Resultados Comprobados</h3>
            <p>Miles de personas han alcanzado sus metas con nosotros</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Comunidad Apoyadora</h3>
            <p>Comparte tu progreso y motiva a otros miembros</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Clases Variadas</h3>
            <p>Desde yoga hasta crossfit, encuentra tu pasión</p>
          </div>
        </div>
      </section>

      
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Miembros Activos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Clases Semanales</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15</div>
            <div className="stat-label">Entrenadores</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfacción</div>
          </div>
        </div>
      </section>

     
      <section className="testimonials-section">
        <h2 className="section-title">Testimonios de Nuestros Miembros</h2>
        <Testimonials />
      </section>

      <section className="cta-section">
        <h2>¿Listo para comenzar tu transformación?</h2>
        <p>Únete hoy y recibe tu primera clase gratis</p>
        <button className="cta-button primary large" onClick={handleStartJourney}>Comienza Tu Viaje</button>
      </section>
    </div>
  );
};

export default Inicio;
