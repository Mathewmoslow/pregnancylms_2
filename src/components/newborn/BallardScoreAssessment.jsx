import React, { useState } from "react";

const BallardScoreAssessment = () => {
  const [assessmentType, setAssessmentType] = useState("neuromuscular");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Ballard Score Assessment
      </h2>
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setAssessmentType("neuromuscular")}
          className={`px-3 py-2 rounded-md ${assessmentType === "neuromuscular" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Neuromuscular
        </button>
        <button 
          onClick={() => setAssessmentType("physical")}
          className={`px-3 py-2 rounded-md ${assessmentType === "physical" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Physical Maturity
        </button>
      </div>
    </div>
  );
};

export default BallardScoreAssessment;
