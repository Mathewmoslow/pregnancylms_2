import React, { useState } from "react";

const APGARCalculator = () => {
  const [scores, setScores] = useState({
    appearance: 0,
    pulse: 0,
    grimace: 0,
    activity: 0,
    respiration: 0
  });
  const [timePoint, setTimePoint] = useState("1min");
  const [scenario, setScenario] = useState(null);

  const criteria = {
    appearance: [
      { score: 0, description: "Blue or pale all over", color: "text-red-600" },
      { score: 1, description: "Pink body, blue extremities", color: "text-yellow-600" },
      { score: 2, description: "Pink all over", color: "text-green-600" }
    ],
    pulse: [
      { score: 0, description: "Absent", color: "text-red-600" },
      { score: 1, description: "Less than 100 bpm", color: "text-yellow-600" },
      { score: 2, description: "100 bpm or greater", color: "text-green-600" }
    ],
    grimace: [
      { score: 0, description: "No response", color: "text-red-600" },
      { score: 1, description: "Grimace or weak cry", color: "text-yellow-600" },
      { score: 2, description: "Good cry", color: "text-green-600" }
    ],
    activity: [
      { score: 0, description: "Limp", color: "text-red-600" },
      { score: 1, description: "Some flexion", color: "text-yellow-600" },
      { score: 2, description: "Active motion", color: "text-green-600" }
    ],
    respiration: [
      { score: 0, description: "Absent", color: "text-red-600" },
      { score: 1, description: "Slow or irregular", color: "text-yellow-600" },
      { score: 2, description: "Good cry", color: "text-green-600" }
    ]
  };

  const scenarios = [
    {
      id: 1,
      title: "Healthy Term Newborn",
      description: "Full-term baby born after uncomplicated vaginal delivery",
      expectedScores: { appearance: 2, pulse: 2, grimace: 2, activity: 2, respiration: 2 }
    },
    {
      id: 2,
      title: "Newborn Requiring Intervention",
      description: "Baby with initial respiratory difficulty",
      expectedScores: { appearance: 1, pulse: 1, grimace: 1, activity: 1, respiration: 1 }
    },
    {
      id: 3,
      title: "Emergency Situation",
      description: "Severely depressed newborn requiring immediate resuscitation",
      expectedScores: { appearance: 0, pulse: 0, grimace: 0, activity: 0, respiration: 0 }
    }
  ];

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  const getScoreInterpretation = (score) => {
    if (score >= 7) return { text: "Normal", color: "text-green-600", bg: "bg-green-100" };
    if (score >= 4) return { text: "Requires Intervention", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { text: "Emergency - Immediate Resuscitation", color: "text-red-600", bg: "bg-red-100" };
  };

  const interpretation = getScoreInterpretation(totalScore);

  const handleScoreChange = (category, newScore) => {
    setScores(prev => ({ ...prev, [category]: newScore }));
  };

  const loadScenario = (scenarioData) => {
    setScenario(scenarioData);
    setScores(scenarioData.expectedScores);
  };

  const resetScores = () => {
    setScores({
      appearance: 0,
      pulse: 0,
      grimace: 0,
      activity: 0,
      respiration: 0
    });
    setScenario(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-6xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        APGAR Score Calculator
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setTimePoint("1min")}
              className={`px-4 py-2 rounded-md ${timePoint === "1min" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
            >
              1 Minute
            </button>
            <button
              onClick={() => setTimePoint("5min")}
              className={`px-4 py-2 rounded-md ${timePoint === "5min" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}
            >
              5 Minutes
            </button>
          </div>

          <div className="space-y-6">
            {Object.entries(criteria).map(([category, options]) => (
              <div key={category} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold capitalize mb-3">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {options.map((option) => (
                    <button
                      key={option.score}
                      onClick={() => handleScoreChange(category, option.score)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        scores[category] === option.score
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-bold text-lg">{option.score}</div>
                      <div className={`text-sm ${option.color}`}>{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-lg ${interpretation.bg}`}>
            <h3 className="text-lg font-semibold mb-2">APGAR Score</h3>
            <div className="text-4xl font-bold text-indigo-600 mb-2">{totalScore}/10</div>
            <div className={`font-semibold ${interpretation.color}`}>{interpretation.text}</div>
            <div className="text-sm text-gray-600 mt-2">
              Assessed at {timePoint === "1min" ? "1 minute" : "5 minutes"} after birth
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Practice Scenarios</h4>
            <div className="space-y-2">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => loadScenario(s)}
                  className="w-full text-left p-3 bg-white rounded border hover:bg-gray-50"
                >
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm text-gray-600">{s.description}</div>
                </button>
              ))}
            </div>
            <button
              onClick={resetScores}
              className="w-full mt-3 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Reset
            </button>
          </div>

          {scenario && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Current Scenario</h4>
              <div className="text-sm">
                <div className="font-medium">{scenario.title}</div>
                <div className="text-gray-600">{scenario.description}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-semibold text-indigo-700 mb-2">APGAR Scoring Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-green-600">7-10:</span> Normal newborn, routine care
          </div>
          <div>
            <span className="font-medium text-yellow-600">4-6:</span> Moderately depressed, requires intervention
          </div>
          <div>
            <span className="font-medium text-red-600">0-3:</span> Severely depressed, immediate resuscitation
          </div>
        </div>
      </div>
    </div>
  );
};

export default APGARCalculator;
