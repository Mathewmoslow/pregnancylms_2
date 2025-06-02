import React, { useState } from "react";

const MethodEffectivenessChart = () => {
  const [sortBy, setSortBy] = useState("effectiveness");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Contraceptive Method Effectiveness
      </h2>
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setSortBy("effectiveness")}
          className={`px-3 py-2 rounded-md ${sortBy === "effectiveness" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          By Effectiveness
        </button>
        <button 
          onClick={() => setSortBy("duration")}
          className={`px-3 py-2 rounded-md ${sortBy === "duration" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          By Duration
        </button>
      </div>
    </div>
  );
};

export default MethodEffectivenessChart;
