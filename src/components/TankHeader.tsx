import React from "react";

const TankHeader = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <img 
        src="/fish-tank-logo.png" 
        alt="calculate fish tank volume" 
        className="w-24 h-24 mb-4"
      />
      <h1 className="text-3xl font-bold text-center mb-6">
        Calculate Fish Tank Volume
      </h1>
    </div>
  );
};

export default TankHeader;