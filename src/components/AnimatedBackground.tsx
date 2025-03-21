
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 animate-float" 
           style={{ animationDelay: "0s" }} />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/5 animate-float"
           style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full bg-primary/5 animate-float"
           style={{ animationDelay: "2s" }} />
           
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(127,127,127,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(127,127,127,.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
};

export default AnimatedBackground;
