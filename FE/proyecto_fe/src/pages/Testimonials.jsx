

import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Ana Lucía",
    text: "Me encanta la experiencia, el gimnasio es muy accesible , los entrenadores son super profesionales!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Roberto Méndez",
    text: "Una experiencia fluida y sin complicaciones. El equipo de Komuna demostró un gran conocimiento técnico y obtuve increíbles resultados en 3 meses.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "María Garcia",
    text: "Creo que Komuna es el mejor gimasio al que he asistido , soy nueva por acá y me encantaría compartirles mi experiencia con ustedes.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (index) => {
    setActiveIndex(index);
  };

  const active = testimonials[activeIndex];

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">NUESTROS CLIENTES OPINAN</h2>
        <div className="title-accent-line"></div>
      </div>

      <div className="testimonials-container">
        <div className="testimonial-center">
          <TestimonialCard
            key={active.id}
            name={active.name}
            text={active.text}
            image={active.image}
          />
        </div>
      </div>

      <div className="carousel-indicators">
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Mostrar testimonio ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
