import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'p-6',
  hover = false,
  ...rest
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-sm border border-gray-100';
  const hoverStyles = hover ? 'transition-shadow hover:shadow-md' : '';
  
  return (
    <div className={`${baseStyles} ${padding} ${hoverStyles} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;
