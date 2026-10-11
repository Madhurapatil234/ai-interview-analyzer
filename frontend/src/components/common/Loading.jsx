import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({
  variant = 'spinner',
  text,
  className = '',
  count = 1,
}) => {
  if (variant === 'skeleton') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i} 
            className="w-full h-12 bg-gray-200 rounded-lg animate-pulse" 
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      {text && <p className="text-sm text-gray-500 font-medium">{text}</p>}
    </div>
  );
};

Loading.Page = function LoadingPage({ text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

export default Loading;
