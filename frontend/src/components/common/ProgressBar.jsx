import React from 'react';

const ProgressBar = ({
  value = 0,
  color = 'bg-indigo-600',
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">Progress</span>
          <span className="text-xs font-medium text-gray-700">{normalizedValue}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${sizes[size]} ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
