import React from 'react';
import '../styles/Testimonials.css';

const TestimonialCard = ({ name, text, image }) => {
  return (
    <article className="testimonial-card">
      {image && (
        <img src={image} alt={`${name} foto`} className="profile-image" />
      )}
      <div className="testimonial-content">
        <p className="testimonial-text">"{text}"</p>
        <p className="testimonial-name">{name}</p>
      </div>
    </article>
  );
};

export default TestimonialCard;