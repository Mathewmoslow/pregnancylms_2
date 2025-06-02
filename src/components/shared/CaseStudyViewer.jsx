import React, { useState } from "react";

const CaseStudyViewer = ({ caseStudy }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-6">
      <div className="bg-indigo-600 text-white px-4 py-2">
        Case Study: {caseStudy?.title}
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-medium text-indigo-700 mb-2">Scenario</h4>
          <p className="text-gray-700">{caseStudy?.scenario}</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyViewer;
