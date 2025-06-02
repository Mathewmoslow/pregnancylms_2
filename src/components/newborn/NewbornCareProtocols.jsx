import React, { useState } from "react";

const NewbornCareProtocols = () => {
  const [selectedProtocol, setSelectedProtocol] = useState("vitaminK");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Newborn Care Protocols
      </h2>
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setSelectedProtocol("vitaminK")}
          className={`px-3 py-2 rounded-md ${selectedProtocol === "vitaminK" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Vitamin K
        </button>
        <button 
          onClick={() => setSelectedProtocol("eyeProphylaxis")}
          className={`px-3 py-2 rounded-md ${selectedProtocol === "eyeProphylaxis" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Eye Prophylaxis
        </button>
      </div>
    </div>
  );
};

export default NewbornCareProtocols;
