import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  className = '',
  padding = 'medium',
  shadow = 'medium',
  ...props 
}) => {
  return (
    <div
      className={`card card-padding-${padding} card-shadow-${shadow} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;