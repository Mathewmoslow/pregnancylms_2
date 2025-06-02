import React, { useState } from "react";

const ContraceptionSelector = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Contraception Method Selector
      </h2>
      <div className="mb-4">
        <div className="text-center">Step {currentStep} of 5</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ContraceptionSelector;
