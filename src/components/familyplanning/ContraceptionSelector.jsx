import React, { useState } from "react";

const ContraceptionSelector = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is your primary goal?",
      options: [
        { id: "prevent", text: "Prevent pregnancy", weight: { hormonal: 1, barrier: 1, larc: 1, natural: 1 } },
        { id: "spacing", text: "Space pregnancies", weight: { hormonal: 1, barrier: 0.8, larc: 1, natural: 0.6 } },
        { id: "permanent", text: "Permanent prevention", weight: { permanent: 1, larc: 0.8 } }
      ]
    },
    {
      id: 2,
      question: "How important is ease of use (no daily action required)?",
      options: [
        { id: "very", text: "Very important", weight: { larc: 1, injection: 0.8, implant: 1 } },
        { id: "somewhat", text: "Somewhat important", weight: { patch: 0.8, ring: 0.8, pills: 0.6 } },
        { id: "not", text: "Not important", weight: { pills: 1, barrier: 1, natural: 1 } }
      ]
    },
    {
      id: 3,
      question: "Do you want STI protection?",
      options: [
        { id: "yes", text: "Yes, essential", weight: { barrier: 1, dual: 1 } },
        { id: "helpful", text: "Would be helpful", weight: { barrier: 0.8, dual: 0.8 } },
        { id: "no", text: "Not needed", weight: { hormonal: 1, larc: 1, permanent: 1 } }
      ]
    },
    {
      id: 4,
      question: "How do you feel about hormonal methods?",
      options: [
        { id: "prefer", text: "Prefer hormonal", weight: { pills: 1, patch: 1, ring: 1, injection: 1, implant: 1 } },
        { id: "okay", text: "Okay with hormonal", weight: { pills: 0.8, patch: 0.8, ring: 0.8, larc: 0.8 } },
        { id: "avoid", text: "Prefer to avoid", weight: { barrier: 1, copper_iud: 1, natural: 1, permanent: 1 } }
      ]
    },
    {
      id: 5,
      question: "What is your age and family planning stage?",
      options: [
        { id: "young", text: "Under 25, may want children later", weight: { pills: 1, barrier: 1, ring: 1 } },
        { id: "planning", text: "25-35, planning family", weight: { pills: 0.8, larc: 1, barrier: 0.8 } },
        { id: "complete", text: "Over 35, family complete", weight: { larc: 1, permanent: 1, injection: 0.8 } }
      ]
    }
  ];

  const methods = {
    pills: {
      name: "Combined Oral Contraceptives",
      effectiveness: "91-99%",
      type: "Hormonal",
      pros: ["Regulates periods", "Reduces acne", "Reversible"],
      cons: ["Daily compliance", "VTE risk", "Nausea"],
      cost: "Low-Moderate"
    },
    patch: {
      name: "Contraceptive Patch",
      effectiveness: "91-99%",
      type: "Hormonal",
      pros: ["Weekly application", "Similar benefits to pills"],
      cons: ["Skin irritation", "Visible", "Higher VTE risk"],
      cost: "Moderate"
    },
    ring: {
      name: "Vaginal Ring",
      effectiveness: "91-99%",
      type: "Hormonal",
      pros: ["Monthly insertion", "Lower hormone dose", "User controlled"],
      cons: ["Vaginal insertion required", "May feel ring"],
      cost: "Moderate"
    },
    injection: {
      name: "Depo-Provera",
      effectiveness: ">99%",
      type: "Hormonal",
      pros: ["Every 3 months", "No daily action", "May stop periods"],
      cons: ["Weight gain", "Delayed fertility return", "Bone density"],
      cost: "Moderate"
    },
    implant: {
      name: "Contraceptive Implant",
      effectiveness: ">99%",
      type: "LARC",
      pros: ["3 years duration", "Highly effective", "Reversible"],
      cons: ["Irregular bleeding", "Insertion procedure", "Arm placement"],
      cost: "High upfront, cost-effective long-term"
    },
    hormonal_iud: {
      name: "Hormonal IUD",
      effectiveness: ">99%",
      type: "LARC",
      pros: ["3-7 years", "May reduce periods", "Highly effective"],
      cons: ["Insertion procedure", "Cramping", "Rare perforation"],
      cost: "High upfront, very cost-effective"
    },
    copper_iud: {
      name: "Copper IUD",
      effectiveness: ">99%",
      type: "LARC",
      pros: ["10 years", "Non-hormonal", "Highly effective"],
      cons: ["Heavier periods", "Insertion procedure", "Cramping"],
      cost: "High upfront, most cost-effective"
    },
    barrier: {
      name: "Condoms + Spermicide",
      effectiveness: "85-98%",
      type: "Barrier",
      pros: ["STI protection", "No prescription", "Male/female options"],
      cons: ["Per-use application", "Can interrupt intimacy", "Latex allergy"],
      cost: "Low ongoing"
    },
    diaphragm: {
      name: "Diaphragm",
      effectiveness: "88-94%",
      type: "Barrier",
      pros: ["Reusable", "No hormones", "User controlled"],
      cons: ["Fitting required", "Pre-insertion", "UTI risk"],
      cost: "Moderate"
    },
    natural: {
      name: "Fertility Awareness Methods",
      effectiveness: "76-99%",
      type: "Natural",
      pros: ["No side effects", "Increases body awareness", "No cost"],
      cons: ["High failure rate", "Requires training", "Abstinence periods"],
      cost: "None"
    },
    permanent: {
      name: "Sterilization",
      effectiveness: ">99%",
      type: "Permanent",
      pros: ["Permanent", "No ongoing action", "Cost-effective"],
      cons: ["Surgery required", "Irreversible", "Regret possible"],
      cost: "High one-time"
    }
  };

  const calculateRecommendations = () => {
    const scores = {};
    
    // Initialize scores
    Object.keys(methods).forEach(method => {
      scores[method] = 0;
    });

    // Calculate weighted scores
    Object.values(answers).forEach(answer => {
      if (answer && answer.weight) {
        Object.entries(answer.weight).forEach(([method, weight]) => {
          if (scores[method] !== undefined) {
            scores[method] += weight;
          }
        });
      }
    });

    // Sort by score and return top recommendations
    const sorted = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 4)
      .filter(([,score]) => score > 0)
      .map(([method]) => methods[method]);

    setRecommendations(sorted);
    setShowResults(true);
  };

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateRecommendations();
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(1);
    setAnswers({});
    setRecommendations([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-6xl">
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
          Your Contraception Recommendations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {recommendations.map((method, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">{method.name}</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {method.effectiveness}
                </span>
              </div>
              
              <div className="mb-3">
                <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                  {method.type}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-green-600 mb-1">Advantages</h4>
                  <ul className="space-y-1">
                    {method.pros.map((pro, i) => (
                      <li key={i} className="text-gray-700">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600 mb-1">Considerations</h4>
                  <ul className="space-y-1">
                    {method.cons.map((con, i) => (
                      <li key={i} className="text-gray-700">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <span className="text-sm text-gray-600">Cost: {method.cost}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• These recommendations are based on your preferences and general suitability</li>
            <li>• Always consult with a healthcare provider before starting any contraceptive method</li>
            <li>• Medical history, current medications, and health conditions affect method choice</li>
            <li>• Effectiveness rates include both perfect and typical use scenarios</li>
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={restart}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep - 1];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Contraception Method Selector
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Question {currentStep} of {questions.length}</span>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
            {Math.round((currentStep / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${(currentStep / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(currentQuestion.id, option)}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={restart}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default ContraceptionSelector;
