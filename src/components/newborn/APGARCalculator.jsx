import React, { useState } from "react";

const APGARCalculator = () => {
  const [scores, setScores] = useState({
    appearance: 0,
    pulse: 0,
    grimace: 0,
    activity: 0,
    respiration: 0
  });

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        APGAR Score Calculator
      </h2>
      <div className="text-2xl font-bold text-center mb-4">
        Total Score: {totalScore}/10
      </div>
    </div>
  );
};

export default APGARCalculator;
