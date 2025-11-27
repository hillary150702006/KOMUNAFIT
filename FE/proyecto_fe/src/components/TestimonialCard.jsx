import React, { useState, useEffect } from 'react';
import TestimonialCard from '../components/TestimonialCard';
import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Ana Lucía',
    text: 'Me encanta la experiencia, el gimnasio es muy accesible, los entrenadores son super profesionales!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Roberto Méndez',
    text: 'Una experiencia fluida y sin complicaciones. El equipo de Komuna demostró un gran conocimiento técnico y obtuve increíbles resultados en 3 meses.',
    image: 'https://i.pinimg.com/736x/83/b7/23/83b7230d123c8556bfa6877c506d6e93.jpg',
  },
  {
    id: 3,
    name: 'Luisa Rodríguez',
    text: 'He estado en Komuna durante 6 meses y no puedo creer lo bien que he mejorado. El personal es super amable y siempre dispuesto a ayudar.',
    image: 'https://plus.unsplash.com/premium_photo-1705018501151-4045c97658a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11amVyfGVufDB8fDB8fHww',
  },
  {
    id: 4,
    name: 'Pablo Garmendia',
    text: 'Llevo 3 años desde que empecé mi cambio físico con Komuna y ha sido la mejor decisión que he tomado.',
    image: 'https://i.pinimg.com/736x/e1/1b/78/e11b78d7cbd29115180659028a64ecf3.jpg',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">NUESTROS CLIENTES OPINAN</h2>
        <div className="title-accent-line"></div>
      </div>

      <div className="testimonials-container">
        <div className="carousel-wrapper">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <TestimonialCard
                name={testimonial.name}
                text={testimonial.text}
                image={testimonial.image}
              />
            </div>
          ))}
        </div>

        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
            ></span>
          ))}
        </div>

        <button className="carousel-control prev" onClick={goToPrevious}>&#10094;</button>
        <button className="carousel-control next" onClick={goToNext}>&#10095;</button>
      </div>
    </section>
  );
};

export default Testimonials;