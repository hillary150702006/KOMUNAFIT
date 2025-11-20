

import React, { useState, useEffect } from 'react';

import TestimonialCard from '../pages/Testimonials';

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
    name: "Luisa Rodríguez",
    text: "He estado en Komuna durante 6 meses y no puedo creer lo bien que he mejorado. El personal es super amable y siempre dispuesto a ayudar."
    ,
    image: "https://plus.unsplash.com/premium_photo-1705018501151-4045c97658a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11amVyfGVufDB8fDB8fHww"
    
  }, 
{
    id: 4,
    name: "Pablo Garmendia",
    text: "Levo 3 años desde que empecé mi cambio fisico con Komuna y ha sido la mejor desición que he tomado."
    ,
    image: "https://i.pinimg.com/736x/e1/1b/78/e11b78d7cbd29115180659028a64ecf3.jpg"
    
  }, 

]

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