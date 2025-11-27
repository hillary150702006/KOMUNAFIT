import '../styles/Inicio.css';
import TestimonialCard from './Testimonials';


const Inicio = () => {
  return (
    
    <div className="inicio-container">
      <h1>Bienvenido a KomunaFit</h1>
      <p>Únete a nuestra comunidad y comparte tu progreso!.</p>
      <TestimonialCard/>
    </div>
    
  );
};

export default Inicio;