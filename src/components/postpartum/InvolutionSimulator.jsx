import React, { useState } from "react";

const InvolutionSimulator = () => {
  const [currentDay, setCurrentDay] = useState(1);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Uterine Involution Simulator
      </h2>
      <input
        type="range"
        min="1"
        max="14"
        value={currentDay}
        onChange={(e) => setCurrentDay(parseInt(e.target.value))}
        className="w-full mb-4"
      />
      <div className="text-center">
        <p>Day {currentDay} Postpartum</p>
      </div>
    </div>
  );
};

export default InvolutionSimulator;
