import React, { useState } from "react";

const NewbornTransitionSimulator = () => {
  const [currentSystem, setCurrentSystem] = useState("circulation");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Newborn Transition Simulator
      </h2>
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setCurrentSystem("circulation")}
          className={`px-3 py-2 rounded-md ${currentSystem === "circulation" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Circulation
        </button>
        <button 
          onClick={() => setCurrentSystem("respiratory")}
          className={`px-3 py-2 rounded-md ${currentSystem === "respiratory" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Respiratory
        </button>
        <button 
          onClick={() => setCurrentSystem("thermal")}
          className={`px-3 py-2 rounded-md ${currentSystem === "thermal" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Thermal
        </button>
      </div>
    </div>
  );
};

export default NewbornTransitionSimulator;
