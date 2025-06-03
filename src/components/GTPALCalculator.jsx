import React, { useState } from "react";

const GTPALCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({
    gravida: "",
    term: "",
    preterm: "",
    abortions: "",
    living: "",
  });
  const [feedback, setFeedback] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [scenarioComplete, setScenarioComplete] = useState(false);

  // Define clinical scenarios for practice
  const scenarios = [
    {
      description:
        "A 28-year-old woman presents for her first prenatal visit. She states this is her third pregnancy. Her first pregnancy resulted in spontaneous abortion at 10 weeks. Her second pregnancy resulted in the birth of full-term twins (now 2 years old).",
      answer: {
        gravida: 3,
        term: 1,
        preterm: 0,
        abortions: 1,
        living: 2,
      },
      explanation:
        "This is her third pregnancy (G3), with one term delivery (T1), no preterm deliveries (P0), one abortion at 10 weeks (A1), and two living children (the twins, L2).",
    },
    {
      description:
        "A 35-year-old woman presents to your clinic. She has had four pregnancies: one ended in miscarriage at 8 weeks, one resulted in preterm delivery at 34 weeks (child living), one resulted in full-term delivery (child living), and she is currently pregnant.",
      answer: {
        gravida: 4,
        term: 1,
        preterm: 1,
        abortions: 1,
        living: 2,
      },
      explanation:
        "This is her fourth pregnancy (G4), with one term delivery (T1), one preterm delivery at 34 weeks (P1), one abortion/miscarriage at 8 weeks (A1), and two living children (L2).",
    },
    {
      description:
        "A 42-year-old woman has had six pregnancies: two ended in elective terminations in her early 20s, one ended in a stillbirth at 38 weeks, two resulted in term deliveries of healthy children, and one resulted in preterm delivery of twins at 32 weeks (both living).",
      answer: {
        gravida: 6,
        term: 2,
        preterm: 1,
        abortions: 3,
        living: 4,
      },
      explanation:
        "This is her sixth pregnancy (G6). She has two term deliveries (T2), one preterm delivery of twins (counts as P1 because it's one delivery event), three abortions (two elective terminations and one stillbirth at 38 weeks counts as an abortion because it did not result in a living birth) (A3), and four living children (two from term deliveries and two from the preterm twin delivery) (L4).",
    },
    {
      description:
        "A 31-year-old woman is pregnant with triplets from IVF. She has previously had one miscarriage at 6 weeks, and one ectopic pregnancy that was treated with methotrexate.",
      answer: {
        gravida: 3,
        term: 0,
        preterm: 0,
        abortions: 2,
        living: 0,
      },
      explanation:
        "This is her third pregnancy (G3). She has no term deliveries (T0), no preterm deliveries (P0), two abortions (one miscarriage and one ectopic pregnancy) (A2), and no living children yet (L0). Note that even though she's pregnant with triplets, this current pregnancy only counts as one for gravida.",
    },
    {
      description:
        "A 37-year-old woman has delivered four children: the first at 40 weeks, the second at 38 weeks, the third at 36 weeks, and the fourth at 32 weeks. All children are living.",
      answer: {
        gravida: 4,
        term: 2,
        preterm: 2,
        abortions: 0,
        living: 4,
      },
      explanation:
        "This is her fourth pregnancy (G4). She has two term deliveries (≥37 weeks, so the 40-week and 38-week deliveries) (T2), two preterm deliveries (36-week and 32-week) (P2), no abortions (A0), and four living children (L4).",
    },
  ];

  // Current scenario
  const currentScenario = scenarios[currentStep];

  // Check the user's answers against the correct answer
  const checkAnswer = () => {
    const correctAnswer = currentScenario.answer;
    const isGravidaCorrect =
      parseInt(userAnswers.gravida) === correctAnswer.gravida;
    const isTermCorrect = parseInt(userAnswers.term) === correctAnswer.term;
    const isPretermCorrect =
      parseInt(userAnswers.preterm) === correctAnswer.preterm;
    const isAbortionsCorrect =
      parseInt(userAnswers.abortions) === correctAnswer.abortions;
    const isLivingCorrect =
      parseInt(userAnswers.living) === correctAnswer.living;

    const allCorrect =
      isGravidaCorrect &&
      isTermCorrect &&
      isPretermCorrect &&
      isAbortionsCorrect &&
      isLivingCorrect;

    setFeedback({
      overall: allCorrect,
      details: {
        gravida: isGravidaCorrect,
        term: isTermCorrect,
        preterm: isPretermCorrect,
        abortions: isAbortionsCorrect,
        living: isLivingCorrect,
      },
    });

    if (allCorrect) {
      setScenarioComplete(true);
    }
  };

  // Reset for next scenario
  const nextScenario = () => {
    if (currentStep < scenarios.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserAnswers({
        gravida: "",
        term: "",
        preterm: "",
        abortions: "",
        living: "",
      });
      setFeedback(null);
      setShowExplanation(false);
      setScenarioComplete(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setUserAnswers({ ...userAnswers, [field]: numericValue });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-2">
        GTPAL Notation Calculator
      </h2>
      <p className="text-gray-600 mb-4">
        Practice determining the correct GTPAL notation for clinical scenarios.
      </p>

      <div className="mb-4 flex items-center">
        <div className="h-8 bg-gray-200 rounded-full flex-grow overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / scenarios.length) * 100}%`,
            }}
          ></div>
        </div>
        <span className="ml-3 font-medium">
          Scenario {currentStep + 1}/{scenarios.length}
        </span>
      </div>

      <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">Clinical Scenario:</h3>
        <p className="text-gray-800">{currentScenario.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">
          Enter the GTPAL Notation:
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          <div
            className={`p-3 rounded-lg ${
              feedback &&
              (feedback.details.gravida
                ? "bg-green-100 border-green-300"
                : "bg-red-100 border-red-300")
            } ${!feedback ? "bg-white border-gray-300" : ""} border`}
          >
            <label className="block text-sm font-medium mb-1">
              G (Gravida)
            </label>
            <input
              type="text"
              value={userAnswers.gravida}
              onChange={(e) => handleInputChange("gravida", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Total pregnancies"
              disabled={scenarioComplete}
            />
            {feedback && !feedback.details.gravida && (
              <p className="text-xs text-red-600 mt-1">
                Correct answer: {currentScenario.answer.gravida}
              </p>
            )}
          </div>

          <div
            className={`p-3 rounded-lg ${
              feedback &&
              (feedback.details.term
                ? "bg-green-100 border-green-300"
                : "bg-red-100 border-red-300")
            } ${!feedback ? "bg-white border-gray-300" : ""} border`}
          >
            <label className="block text-sm font-medium mb-1">T (Term)</label>
            <input
              type="text"
              value={userAnswers.term}
              onChange={(e) => handleInputChange("term", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Term deliveries"
              disabled={scenarioComplete}
            />
            {feedback && !feedback.details.term && (
              <p className="text-xs text-red-600 mt-1">
                Correct answer: {currentScenario.answer.term}
              </p>
            )}
          </div>

          <div
            className={`p-3 rounded-lg ${
              feedback &&
              (feedback.details.preterm
                ? "bg-green-100 border-green-300"
                : "bg-red-100 border-red-300")
            } ${!feedback ? "bg-white border-gray-300" : ""} border`}
          >
            <label className="block text-sm font-medium mb-1">
              P (Preterm)
            </label>
            <input
              type="text"
              value={userAnswers.preterm}
              onChange={(e) => handleInputChange("preterm", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Preterm deliveries"
              disabled={scenarioComplete}
            />
            {feedback && !feedback.details.preterm && (
              <p className="text-xs text-red-600 mt-1">
                Correct answer: {currentScenario.answer.preterm}
              </p>
            )}
          </div>

          <div
            className={`p-3 rounded-lg ${
              feedback &&
              (feedback.details.abortions
                ? "bg-green-100 border-green-300"
                : "bg-red-100 border-red-300")
            } ${!feedback ? "bg-white border-gray-300" : ""} border`}
          >
            <label className="block text-sm font-medium mb-1">
              A (Abortions)
            </label>
            <input
              type="text"
              value={userAnswers.abortions}
              onChange={(e) => handleInputChange("abortions", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Losses <20 weeks"
              disabled={scenarioComplete}
            />
            {feedback && !feedback.details.abortions && (
              <p className="text-xs text-red-600 mt-1">
                Correct answer: {currentScenario.answer.abortions}
              </p>
            )}
          </div>

          <div
            className={`p-3 rounded-lg ${
              feedback &&
              (feedback.details.living
                ? "bg-green-100 border-green-300"
                : "bg-red-100 border-red-300")
            } ${!feedback ? "bg-white border-gray-300" : ""} border`}
          >
            <label className="block text-sm font-medium mb-1">L (Living)</label>
            <input
              type="text"
              value={userAnswers.living}
              onChange={(e) => handleInputChange("living", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Living children"
              disabled={scenarioComplete}
            />
            {feedback && !feedback.details.living && (
              <p className="text-xs text-red-600 mt-1">
                Correct answer: {currentScenario.answer.living}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3 sm:gap-0">
          {!scenarioComplete ? (
            <button
              onClick={checkAnswer}
              className="py-2 px-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={nextScenario}
              className="py-2 px-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              disabled={currentStep === scenarios.length - 1}
            >
              {currentStep === scenarios.length - 1
                ? "All scenarios completed!"
                : "Next Scenario"}
            </button>
          )}

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          >
            {showExplanation ? "Hide Explanation" : "Show Explanation"}
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-3 sm:p-4 rounded-lg mb-6 ${
            feedback.overall ? "bg-green-100" : "bg-yellow-100"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-1 ${
              feedback.overall ? "text-green-700" : "text-yellow-700"
            }`}
          >
            {feedback.overall ? "Correct! 🎉" : "Not quite right yet..."}
          </h3>
          <p className="text-gray-700">
            {feedback.overall
              ? "You have correctly identified the GTPAL notation for this scenario."
              : "Review your answers and try again. Look at the red boxes for corrections."}
          </p>
        </div>
      )}

      {showExplanation && (
        <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">
            Explanation:
          </h3>
          <p className="text-gray-800">{currentScenario.explanation}</p>

          <div className="mt-4 bg-white p-3 rounded border border-indigo-200">
            <h4 className="font-medium text-indigo-700 mb-2">
              GTPAL Notation Reminder:
            </h4>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>
                <strong>G (Gravida):</strong> Total number of pregnancies,
                including current pregnancy
              </li>
              <li>
                <strong>T (Term):</strong> Number of term deliveries (≥37 weeks)
              </li>
              <li>
                <strong>P (Preterm):</strong> Number of preterm deliveries
                (20-36 weeks)
              </li>
              <li>
                <strong>A (Abortions):</strong> Number of pregnancy losses
                before 20 weeks (includes miscarriages, ectopic pregnancies, and
                elective terminations)
              </li>
              <li>
                <strong>L (Living):</strong> Number of currently living children
              </li>
            </ul>

            <div className="mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Multiple births (twins, triplets,
                etc.) count as a single delivery event for T or P, but each
                child counts individually for L.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">
            Common GTPAL Examples:
          </h3>

          <div className="space-y-3">
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="font-medium">G1P0 or G1T0P0A0L0</p>
              <p className="text-sm text-gray-600">
                First pregnancy, no prior deliveries
              </p>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
              <p className="font-medium">G2T1P0A0L1</p>
              <p className="text-sm text-gray-600">
                Second pregnancy, one previous term delivery, one living child
              </p>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
              <p className="font-medium">G3T0P0A2L0</p>
              <p className="text-sm text-gray-600">
                Third pregnancy, two previous miscarriages, no living children
              </p>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
              <p className="font-medium">G4T1P1A1L3</p>
              <p className="text-sm text-gray-600">
                Fourth pregnancy, one term delivery (singleton), one preterm
                delivery (twins), one miscarriage, three living children
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Common Misconceptions:
          </h3>

          <div className="space-y-3">
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="font-medium text-indigo-600">Multiple Births</p>
              <p className="text-sm text-gray-600">
                A twin delivery counts as ONE delivery event (T or P), but TWO
                living children (L).
              </p>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
              <p className="font-medium text-indigo-600">Current Pregnancy</p>
              <p className="text-sm text-gray-600">
                The current pregnancy is included in the Gravida count, but not
                in TPAL until after delivery.
              </p>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
              <p className="font-medium text-indigo-600">Term vs. Preterm</p>
              <p className="text-sm text-gray-600">
                Term is ≥37 weeks, preterm is 20-36 weeks. Births before 20
                weeks are considered abortions.
              </p>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
              <p className="font-medium text-indigo-600">Stillbirths</p>
              <p className="text-sm text-gray-600">
                Stillbirths after 20 weeks count as deliveries (T or P) but not
                as living children (L).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GTPALCalculator;