

import React from 'react';
import '../styles/Testimonials.css';

const TestimonialCard = ({ name, text, image }) => {
  return (
    <article className="testimonial-card">
      {image && (
        <div className="testimonial-image">
          <img src={image} alt={`${name} foto`} />
        </div>
      )}
      <div className="testimonial-body">
        <p className="testimonial-text">{text}</p>
        <p className="testimonial-name">— {name}</p>
      </div>
    </article>
  );
};

export default TestimonialCard;