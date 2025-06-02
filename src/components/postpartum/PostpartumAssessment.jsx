import React, { useState } from "react";

const PostpartumAssessment = () => {
  const [currentAssessment, setCurrentAssessment] = useState("reeda");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Postpartum Assessment Tools
      </h2>
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setCurrentAssessment("reeda")}
          className={`px-3 py-2 rounded-md ${currentAssessment === "reeda" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          REEDA Scale
        </button>
        <button 
          onClick={() => setCurrentAssessment("fundal")}
          className={`px-3 py-2 rounded-md ${currentAssessment === "fundal" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Fundal Assessment
        </button>
      </div>
      <div>
        {currentAssessment === "reeda" && <div>REEDA Assessment Tool</div>}
        {currentAssessment === "fundal" && <div>Fundal Height Assessment</div>}
      </div>
    </div>
  );
};

export default PostpartumAssessment;
