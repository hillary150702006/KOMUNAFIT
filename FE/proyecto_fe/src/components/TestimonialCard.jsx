import React, { useState, useEffect } from 'react';
import '../styles/Testimonials.css';


const TestimonialCard = ({ name, text, image }) => {
  return (
    <div className="testimonial-card">
      <img src={image} alt={`Testimonio de ${name}`} className="testimonial-image" />
      <p className="testimonial-text">"{text}"</p>
      <h4 className="testimonial-name">- {name}</h4>
    </div>
  );
};

const testimonials = [
  {
    id: 1,
    name: 'Lucía Figueroa',
    text: 'Me encanta la experiencia, el gimnasio es muy accesible, los entrenadores son super profesionales!',
    image: 'https://i.pinimg.com/736x/7b/16/96/7b1696f3de87398d97897de9070f6e38.jpg',
  },
  {
    id: 2,
    name: 'Daniel Suarez',
    text: 'Una experiencia fluida y sin complicaciones. El equipo de Komuna demostró un gran conocimiento técnico y obtuve increíbles resultados en 3 meses.',
    image: 'https://i.pinimg.com/736x/7b/84/2e/7b842e2f8206b392ace55109da2139c5.jpg',
  },
  {
    id: 3,
    name: 'Luisa Rodríguez',
    text: 'He estado en Komuna durante 6 meses y no puedo creer lo bien que he mejorado. El personal es super amable y siempre dispuesto a ayudar.',
    image: 'https://i.pinimg.com/736x/75/15/2c/75152c604ae755019fc49fccadf63fae.jpg',
  },
  {
    id: 4,
    name: 'Pablo Garmendia',
    text: 'Llevo 3 años desde que empecé mi cambio físico con Komuna y ha sido la mejor decisión que he tomado.',
    image: 'https://i.pinimg.com/1200x/13/d2/45/13d245b1dda008acc1e34dc7bd0ac458.jpg',
  },
  {
    id: 5,
    name: 'Alexandra Jimenez',
    text: 'Estoy muy emocionada , estoy viendo resultados en poco tiempo llevoo 4 meses y ya me siento más lijera y segura.',
    image: 'https://i.pinimg.com/736x/7f/57/6a/7f576aa1933732d4c5289c0cd80d054d.jpg',
  },
   {
    id: 6,
    name: 'Jennifer Salas ',
    text: 'Voy 3 veces a la semana y llevo la alimentación adecuada con mi coach de nutrición y voy viendo cambios en solo 6 meses',
    image: 'https://i.pinimg.com/736x/68/3c/56/683c56aaaa38db1b12d860f2b4d12fa6.jpg',
  },
  {
    id: 7,
    name: 'Sofía Martínez ',
    text: 'Voy 3 veces a la semana y llevo la alimentación adecuada con mi coach de nutrición y voy viendo cambios en solo 6 meses',
    image: 'https://i.pinimg.com/1200x/41/07/83/41078312984dfbfe6985b60c641efc5f.jpg',
  },
    {
    id: 8,
    name: 'Leonor Morales',
    text: 'Voy a hacer zumba los fines de semana y entreno 3 veces y me siento muy bien',
    image: 'https://i.pinimg.com/1200x/80/a2/de/80a2de0b842abc1afddcf37bbfaa3e56.jpg',
  },
     {
    id: 9,
    name: 'Jessica Aguilar',
    text: 'El gimnasio es hermoso, tiene un excelente servicio y un ambiente cálido',
    image: 'https://i.pinimg.com/736x/71/d4/f4/71d4f46553e29b83f31f9d3a8c58077e.jpg',
  },
    {
    id: 10,
    name: 'Brayan Müller',
    text: 'Desde que se inaguró quise probar y fué lo mejor que hice , sin duda el mejor gimnasio',
    image: 'https://i.pinimg.com/1200x/7c/74/2f/7c742fe99844704782a65a5c5f6eb47f.jpg',
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
              {/* Ahora esto funciona porque TestimonialCard está definido arriba */}
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