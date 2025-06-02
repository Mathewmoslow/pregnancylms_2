import React, { useState } from "react";

const FeedingMethodComparison = () => {
  const [selectedMethod, setSelectedMethod] = useState("breastfeeding");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Feeding Method Comparison
      </h2>
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setSelectedMethod("breastfeeding")}
          className={`px-3 py-2 rounded-md ${selectedMethod === "breastfeeding" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Breastfeeding
        </button>
        <button 
          onClick={() => setSelectedMethod("formula")}
          className={`px-3 py-2 rounded-md ${selectedMethod === "formula" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Formula
        </button>
        <button 
          onClick={() => setSelectedMethod("combination")}
          className={`px-3 py-2 rounded-md ${selectedMethod === "combination" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Combination
        </button>
      </div>
    </div>
  );
};

export default FeedingMethodComparison;
