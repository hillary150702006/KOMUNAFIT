import '../styles/Inicio.css';
import Testimonials from './Testimonials';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <h1>Bienvenido a KomunaFit</h1>
      <p>Tu comunidad para una vida más saludable.</p>
      <Testimonials />
    </div>
  );
};

export default Inicio;