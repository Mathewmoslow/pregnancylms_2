import React, { useState } from "react";

const LactationStagesExplorer = () => {
  const [currentStage, setCurrentStage] = useState("colostrum");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Lactation Stages Explorer
      </h2>
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setCurrentStage("colostrum")}
          className={`px-3 py-2 rounded-md ${currentStage === "colostrum" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Colostrum
        </button>
        <button 
          onClick={() => setCurrentStage("transitional")}
          className={`px-3 py-2 rounded-md ${currentStage === "transitional" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Transitional
        </button>
        <button 
          onClick={() => setCurrentStage("mature")}
          className={`px-3 py-2 rounded-md ${currentStage === "mature" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Mature
        </button>
      </div>
    </div>
  );
};

export default LactationStagesExplorer;
