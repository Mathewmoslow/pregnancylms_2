import React from 'react';

const FinalExam = ({ onComplete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Final Exam</h2>
      <p className="text-gray-600">This is a placeholder for the Final Exam component.</p>
      <button 
        onClick={() => onComplete({ score: 0, total: 0 })}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Complete Exam (Placeholder)
      </button>
    </div>
  );
};

export default FinalExam;
