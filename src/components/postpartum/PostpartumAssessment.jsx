import React, { useState } from "react";

const PostpartumAssessment = () => {
  const [currentAssessment, setCurrentAssessment] = useState("reeda");
  const [reedaScores, setReedaScores] = useState({
    redness: 0,
    edema: 0,
    ecchymosis: 0,
    discharge: 0,
    approximation: 0
  });
  const [fundalData, setFundalData] = useState({
    day: 1,
    height: "umbilicus",
    position: "midline",
    consistency: "firm"
  });
  const [lochiaAssessment, setLochiaAssessment] = useState({
    type: "rubra",
    amount: "moderate",
    odor: "normal"
  });

  const reedaCriteria = {
    redness: [
      { score: 0, description: "None" },
      { score: 1, description: "Mild" },
      { score: 2, description: "Moderate" },
      { score: 3, description: "Severe" }
    ],
    edema: [
      { score: 0, description: "None" },
      { score: 1, description: "Mild (<1cm)" },
      { score: 2, description: "Moderate (1-2cm)" },
      { score: 3, description: "Severe (>2cm)" }
    ],
    ecchymosis: [
      { score: 0, description: "None" },
      { score: 1, description: "Mild (<1cm)" },
      { score: 2, description: "Moderate (1-2cm)" },
      { score: 3, description: "Severe (>2cm)" }
    ],
    discharge: [
      { score: 0, description: "None" },
      { score: 1, description: "Serosanguinous" },
      { score: 2, description: "Purulent" },
      { score: 3, description: "Foul-smelling" }
    ],
    approximation: [
      { score: 0, description: "Excellent" },
      { score: 1, description: "Good" },
      { score: 2, description: "Fair" },
      { score: 3, description: "Poor" }
    ]
  };

  const fundalHeights = [
    { day: 1, height: "umbilicus", description: "At or just below umbilicus" },
    { day: 2, height: "1cm below", description: "1 cm below umbilicus" },
    { day: 3, height: "2cm below", description: "2 cm below umbilicus" },
    { day: 7, height: "6cm below", description: "6 cm below umbilicus" },
    { day: 10, height: "8cm below", description: "8 cm below umbilicus" },
    { day: 14, height: "nonpalpable", description: "Below pubic symphysis" }
  ];

  const lochiaTypes = [
    { type: "rubra", days: "1-3", color: "Dark red", description: "Blood and decidual debris" },
    { type: "serosa", days: "4-10", color: "Pink/Brown", description: "Serum, leukocytes, decidua" },
    { type: "alba", days: "10+", color: "Yellow/White", description: "Leukocytes, decidua, epithelial cells" }
  ];

  const totalReedaScore = Object.values(reedaScores).reduce((sum, score) => sum + score, 0);

  const getReedaInterpretation = (score) => {
    if (score <= 5) return { text: "Normal healing", color: "text-green-600", bg: "bg-green-100" };
    if (score <= 10) return { text: "Monitor closely", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { text: "Concerning - notify provider", color: "text-red-600", bg: "bg-red-100" };
  };

  const reedaInterpretation = getReedaInterpretation(totalReedaScore);

  const renderReedaAssessment = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">REEDA Scale Assessment</h3>
        <p className="text-gray-700">Assess healing of perineum, episiotomy, or cesarean incision</p>
      </div>

      {Object.entries(reedaCriteria).map(([category, options]) => (
        <div key={category} className="border rounded-lg p-4">
          <h4 className="text-lg font-semibold capitalize mb-3">{category}</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {options.map((option) => (
              <button
                key={option.score}
                onClick={() => setReedaScores(prev => ({ ...prev, [category]: option.score }))}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  reedaScores[category] === option.score
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-bold text-lg">{option.score}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className={`p-6 rounded-lg ${reedaInterpretation.bg}`}>
        <h3 className="text-lg font-semibold mb-2">REEDA Total Score</h3>
        <div className="text-3xl font-bold text-indigo-600 mb-2">{totalReedaScore}/15</div>
        <div className={`font-semibold ${reedaInterpretation.color}`}>{reedaInterpretation.text}</div>
      </div>
    </div>
  );

  const renderFundalAssessment = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Fundal Assessment</h3>
        <p className="text-gray-700">Assess uterine involution and position</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Postpartum Day</h4>
          <input
            type="range"
            min="1"
            max="14"
            value={fundalData.day}
            onChange={(e) => setFundalData(prev => ({ ...prev, day: parseInt(e.target.value) }))}
            className="w-full mb-2"
          />
          <div className="text-center font-bold">Day {fundalData.day}</div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Expected Fundal Height</h4>
          <div className="space-y-2">
            {fundalHeights.map((item) => (
              <div
                key={item.day}
                className={`p-2 rounded ${
                  fundalData.day === item.day ? "bg-indigo-100 border border-indigo-300" : "bg-gray-50"
                }`}
              >
                <div className="font-medium">Day {item.day}: {item.height}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Position</h4>
          <div className="space-y-2">
            {["midline", "deviated right", "deviated left"].map((pos) => (
              <button
                key={pos}
                onClick={() => setFundalData(prev => ({ ...prev, position: pos }))}
                className={`w-full p-2 rounded border ${
                  fundalData.position === pos ? "bg-indigo-100 border-indigo-300" : "border-gray-200"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Consistency</h4>
          <div className="space-y-2">
            {["firm", "boggy"].map((cons) => (
              <button
                key={cons}
                onClick={() => setFundalData(prev => ({ ...prev, consistency: cons }))}
                className={`w-full p-2 rounded border ${
                  fundalData.consistency === cons ? "bg-indigo-100 border-indigo-300" : "border-gray-200"
                }`}
              >
                {cons}
              </button>
            ))}
          </div>
        </div>
      </div>

      {fundalData.consistency === "boggy" && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h4 className="font-semibold text-red-700 mb-2">⚠️ Boggy Uterus - Immediate Action Required</h4>
          <ul className="text-sm text-red-600 space-y-1">
            <li>• Perform fundal massage</li>
            <li>• Empty bladder if distended</li>
            <li>• Assess lochia for increased bleeding</li>
            <li>• Notify healthcare provider immediately</li>
          </ul>
        </div>
      )}
    </div>
  );

  const renderLochiaAssessment = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Lochia Assessment</h3>
        <p className="text-gray-700">Assess vaginal discharge characteristics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Type</h4>
          <div className="space-y-2">
            {lochiaTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => setLochiaAssessment(prev => ({ ...prev, type: type.type }))}
                className={`w-full p-3 rounded border text-left ${
                  lochiaAssessment.type === type.type ? "bg-indigo-100 border-indigo-300" : "border-gray-200"
                }`}
              >
                <div className="font-medium capitalize">{type.type}</div>
                <div className="text-sm text-gray-600">Days {type.days}</div>
                <div className="text-sm font-medium" style={{color: type.type === 'rubra' ? '#dc2626' : type.type === 'serosa' ? '#d97706' : '#65a30d'}}>{type.color}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Amount</h4>
          <div className="space-y-2">
            {[
              { amount: "scant", description: "<2.5cm on pad" },
              { amount: "light", description: "<10cm on pad" },
              { amount: "moderate", description: "<15cm on pad" },
              { amount: "heavy", description: "Saturated in 1 hour" },
              { amount: "excessive", description: "Saturated in 15 min" }
            ].map((item) => (
              <button
                key={item.amount}
                onClick={() => setLochiaAssessment(prev => ({ ...prev, amount: item.amount }))}
                className={`w-full p-2 rounded border text-left ${
                  lochiaAssessment.amount === item.amount ? "bg-indigo-100 border-indigo-300" : "border-gray-200"
                }`}
              >
                <div className="font-medium capitalize">{item.amount}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">Odor</h4>
          <div className="space-y-2">
            {["normal", "foul", "fishy"].map((odor) => (
              <button
                key={odor}
                onClick={() => setLochiaAssessment(prev => ({ ...prev, odor }))}
                className={`w-full p-2 rounded border ${
                  lochiaAssessment.odor === odor ? "bg-indigo-100 border-indigo-300" : "border-gray-200"
                }`}
              >
                {odor}
              </button>
            ))}
          </div>
        </div>
      </div>

      {(lochiaAssessment.amount === "excessive" || lochiaAssessment.odor === "foul") && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h4 className="font-semibold text-red-700 mb-2">⚠️ Abnormal Findings</h4>
          <ul className="text-sm text-red-600 space-y-1">
            {lochiaAssessment.amount === "excessive" && <li>• Excessive bleeding - assess for hemorrhage</li>}
            {lochiaAssessment.odor === "foul" && <li>• Foul odor suggests possible infection</li>}
            <li>• Notify healthcare provider immediately</li>
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-6xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Postpartum Assessment Tools
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setCurrentAssessment("reeda")}
          className={`px-4 py-2 rounded-md ${currentAssessment === "reeda" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          REEDA Scale
        </button>
        <button 
          onClick={() => setCurrentAssessment("fundal")}
          className={`px-4 py-2 rounded-md ${currentAssessment === "fundal" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Fundal Assessment
        </button>
        <button 
          onClick={() => setCurrentAssessment("lochia")}
          className={`px-4 py-2 rounded-md ${currentAssessment === "lochia" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
        >
          Lochia Assessment
        </button>
      </div>

      {currentAssessment === "reeda" && renderReedaAssessment()}
      {currentAssessment === "fundal" && renderFundalAssessment()}
      {currentAssessment === "lochia" && renderLochiaAssessment()}
    </div>
  );
};

export default PostpartumAssessment;
