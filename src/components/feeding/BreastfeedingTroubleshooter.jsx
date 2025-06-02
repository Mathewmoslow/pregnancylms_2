import React, { useState } from "react";

const BreastfeedingTroubleshooter = () => {
  const [selectedIssue, setSelectedIssue] = useState("latch");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Breastfeeding Troubleshooter
      </h2>
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setSelectedIssue("latch")}
          className={`px-3 py-2 rounded-md ${selectedIssue === "latch" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Latch Issues
        </button>
        <button 
          onClick={() => setSelectedIssue("supply")}
          className={`px-3 py-2 rounded-md ${selectedIssue === "supply" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Low Supply
        </button>
        <button 
          onClick={() => setSelectedIssue("engorgement")}
          className={`px-3 py-2 rounded-md ${selectedIssue === "engorgement" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Engorgement
        </button>
      </div>
    </div>
  );
};

export default BreastfeedingTroubleshooter;
