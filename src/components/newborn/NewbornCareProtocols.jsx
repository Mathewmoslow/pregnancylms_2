import React, { useState } from 'react';

const NewbornCareProtocols = () => {
  const [activeProtocol, setActiveProtocol] = useState('vitaminK');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  const protocols = {
    vitaminK: {
      title: "Vitamin K Prophylaxis",
      icon: "💉",
      purpose: "Prevent hemorrhagic disease of the newborn",
      medication: {
        drug: "Phytonadione (Vitamin K1)",
        dose: "0.5-1.0 mg",
        route: "Intramuscular (vastus lateralis)",
        timing: "Within 6 hours of birth"
      },
      procedure: [
        "Verify physician order and patient identification",
        "Prepare medication using aseptic technique",
        "Select vastus lateralis muscle (lateral thigh)",
        "Clean injection site with alcohol swab",
        "Insert needle at 90° angle",
        "Aspirate to ensure not in blood vessel",
        "Inject medication slowly",
        "Apply gentle pressure with gauze",
        "Document administration time and site"
      ],
      considerations: [
        "Obtain parental consent before administration",
        "Monitor for bleeding or hematoma at injection site",
        "Educate parents about importance of vitamin K",
        "Document any parental refusal and provide education"
      ]
    },
    eyeProphylaxis: {
      title: "Eye Prophylaxis",
      icon: "👁️",
      purpose: "Prevent ophthalmia neonatorum (gonococcal and chlamydial conjunctivitis)",
      medication: {
        drug: "Erythromycin ophthalmic ointment 0.5%",
        dose: "1-2 cm ribbon",
        route: "Both eyes",
        timing: "Within 1-2 hours of birth"
      },
      procedure: [
        "Verify order and patient identification",
        "Delay until after initial bonding/breastfeeding if stable",
        "Gently clean eyes with sterile water if needed",
        "Pull lower eyelid down to create pocket",
        "Apply 1-2 cm ribbon of ointment in lower conjunctival sac",
        "Start at inner canthus, move to outer canthus",
        "Repeat for other eye",
        "Allow eyes to close naturally to distribute medication",
        "Do not rinse or wipe away excess"
      ],
      considerations: [
        "May cause temporary blurred vision",
        "Mild chemical conjunctivitis may occur (normal)",
        "Document time of administration",
        "Educate parents about purpose and effects"
      ]
    },
    thermoregulation: {
      title: "Thermoregulation",
      icon: "🌡️",
      purpose: "Maintain normal body temperature and prevent cold stress",
      targetTemp: "36.5-37.5°C (97.7-99.5°F) axillary",
      immediate: [
        "Dry infant thoroughly with warm blankets",
        "Remove wet linens immediately",
        "Place skin-to-skin with mother if stable",
        "Cover with warm blankets including head (use cap)",
        "Place under radiant warmer if needed"
      ],
      ongoing: [
        "Monitor temperature every 30 minutes until stable",
        "Keep ambient room temperature 23-25°C",
        "Delay first bath until temperature stable >36.8°C",
        "Bundle infant appropriately",
        "Educate parents about signs of cold stress"
      ],
      coldStressSigns: [
        "Temperature <36.5°C",
        "Cool extremities",
        "Mottled skin",
        "Lethargy",
        "Poor feeding",
        "Hypoglycemia",
        "Respiratory distress"
      ]
    },
    hypoglycemia: {
      title: "Hypoglycemia Screening",
      icon: "🩸",
      purpose: "Identify and treat low blood glucose",
      riskFactors: [
        "Small for gestational age (SGA)",
        "Large for gestational age (LGA)",
        "Infant of diabetic mother (IDM)",
        "Preterm (<37 weeks)",
        "Stress/asphyxia",
        "Cold stress"
      ],
      screening: {
        timing: "30 min, 1hr, 2hr, then before feeds × 24hr",
        method: "Heel stick for bedside glucose",
        threshold: "≥40 mg/dL (first 4 hours), ≥45 mg/dL (4-24 hours)"
      },
      intervention: [
        "If glucose <40 mg/dL: Feed immediately (breast/formula)",
        "Recheck glucose 30 minutes after feeding",
        "If still low or symptomatic: IV dextrose",
        "Document all values and interventions"
      ],
      symptoms: [
        "Jitteriness",
        "Lethargy",
        "Poor feeding",
        "Hypothermia",
        "Apnea",
        "Seizures"
      ]
    },
    identification: {
      title: "Identification & Security",
      icon: "🏷️",
      purpose: "Ensure proper identification and prevent infant abduction",
      components: [
        "Apply matching ID bands to infant (2) and parents",
        "Include: Name, medical record number, date/time of birth",
        "Footprint infant and fingerprint mother",
        "Apply security device per hospital protocol",
        "Take infant photo for medical record"
      ],
      securityMeasures: [
        "Never leave infant unattended",
        "Transport in bassinet, never carry",
        "Verify ID bands before any procedure",
        "Educate parents about security protocols",
        "Report any suspicious activity immediately"
      ]
    }
  };

  const quiz = [
    {
      question: "What is the correct site for vitamin K injection in newborns?",
      options: ["Deltoid muscle", "Vastus lateralis", "Gluteus maximus", "Ventrogluteal"],
      correct: 1
    },
    {
      question: "When should erythromycin eye ointment be administered?",
      options: ["Immediately after birth", "Within 1-2 hours", "Within 6 hours", "Within 24 hours"],
      correct: 1
    },
    {
      question: "What is the target axillary temperature for newborns?",
      options: ["35.5-36.5°C", "36.5-37.5°C", "37.5-38.5°C", "38.5-39.5°C"],
      correct: 1
    },
    {
      question: "Which infants require hypoglycemia screening?",
      options: ["Only preterm infants", "Only LGA infants", "All at-risk infants", "All newborns"],
      correct: 2
    }
  ];

  const currentProtocol = protocols[activeProtocol];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Essential Newborn Care Protocols
      </h2>

      {/* Protocol Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(protocols).map(([key, protocol]) => (
          <button
            key={key}
            onClick={() => setActiveProtocol(key)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              activeProtocol === key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-xl">{protocol.icon}</span>
            <span>{protocol.title}</span>
          </button>
        ))}
      </div>

      {!showQuiz ? (
        <div className="space-y-6">
          {/* Protocol Header */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {currentProtocol.title}
            </h3>
            <p className="text-gray-700">Purpose: {currentProtocol.purpose}</p>
          </div>

          {/* Protocol Content */}
          {activeProtocol === 'vitaminK' && (
            <>
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Medication Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Drug:</span>
                    <p className="font-medium">{currentProtocol.medication.drug}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Dose:</span>
                    <p className="font-medium">{currentProtocol.medication.dose}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Route:</span>
                    <p className="font-medium">{currentProtocol.medication.route}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Timing:</span>
                    <p className="font-medium">{currentProtocol.medication.timing}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Administration Procedure</h4>
                <ol className="space-y-2">
                  {currentProtocol.procedure.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="font-medium text-indigo-600 mr-3">{index + 1}.</span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}

          {activeProtocol === 'eyeProphylaxis' && (
            <>
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Medication Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Drug:</span>
                    <p className="font-medium">{currentProtocol.medication.drug}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Dose:</span>
                    <p className="font-medium">{currentProtocol.medication.dose}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Route:</span>
                    <p className="font-medium">{currentProtocol.medication.route}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Timing:</span>
                    <p className="font-medium">{currentProtocol.medication.timing}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Application Procedure</h4>
                <ol className="space-y-2">
                  {currentProtocol.procedure.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="font-medium text-indigo-600 mr-3">{index + 1}.</span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}

          {activeProtocol === 'thermoregulation' && (
            <>
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Target Temperature</h4>
                <p className="text-2xl font-bold text-indigo-600">{currentProtocol.targetTemp}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Immediate Actions</h4>
                  <ul className="space-y-2">
                    {currentProtocol.immediate.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Cold Stress Signs</h4>
                  <ul className="space-y-2">
                    {currentProtocol.coldStressSigns.map((sign, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">⚠️</span>
                        <span className="text-gray-700">{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeProtocol === 'hypoglycemia' && (
            <>
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Risk Factors</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {currentProtocol.riskFactors.map((factor, index) => (
                    <div key={index} className="bg-red-50 px-3 py-2 rounded text-red-700 text-sm">
                      {factor}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Screening Protocol</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Timing:</span> {currentProtocol.screening.timing}</p>
                  <p><span className="font-medium">Method:</span> {currentProtocol.screening.method}</p>
                  <p><span className="font-medium">Threshold:</span> {currentProtocol.screening.threshold}</p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Symptoms of Hypoglycemia</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {currentProtocol.symptoms.map((symptom, index) => (
                    <div key={index} className="bg-yellow-50 px-3 py-2 rounded text-yellow-700 text-sm">
                      {symptom}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeProtocol === 'identification' && (
            <>
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Identification Components</h4>
                <ul className="space-y-2">
                  {currentProtocol.components.map((component, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 mr-2">✓</span>
                      <span className="text-gray-700">{component}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Security Measures</h4>
                <ul className="space-y-2">
                  {currentProtocol.securityMeasures.map((measure, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-600 mr-2">🔒</span>
                      <span className="text-gray-700">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Considerations */}
          {currentProtocol.considerations && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Considerations</h4>
              <ul className="space-y-1">
                {currentProtocol.considerations.map((consideration, index) => (
                  <li key={index} className="text-yellow-700 text-sm">• {consideration}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => setShowQuiz(true)}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Test Your Knowledge
          </button>
        </div>
      ) : (
        /* Quiz Section */
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-700">Quick Knowledge Check</h3>
          {quiz.map((q, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium mb-3">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optionIndex}
                      onChange={() => setQuizAnswers({ ...quizAnswers, [index]: optionIndex })}
                      className="text-indigo-600"
                    />
                    <span className={`${
                      quizAnswers[index] !== undefined && 
                      (optionIndex === q.correct ? 'text-green-600 font-medium' : 
                       quizAnswers[index] === optionIndex ? 'text-red-600' : '')
                    }`}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              setShowQuiz(false);
              setQuizAnswers({});
            }}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Back to Protocols
          </button>
        </div>
      )}
    </div>
  );
};

export default NewbornCareProtocols;
