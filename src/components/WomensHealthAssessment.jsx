import React, { useState } from "react";

const WomensHealthAssessment = () => {
  const [assessmentState, setAssessmentState] = useState({
    currentQuestion: 0,
    answers: [],
    showResults: false,
    score: 0,
  });

  const questions = [
    {
      question:
        "Which of the following is NOT a historical trend in childbirth care?",
      options: [
        "Increased medicalization in hospital settings",
        "Greater patient autonomy in decision-making",
        "Reduced family involvement in the birthing process",
        "Evidence-based care practices",
      ],
      correctAnswer: 2,
    },
    {
      question: "Which maternal mortality fact is accurate?",
      options: [
        "The US has lower maternal mortality than most developed countries",
        "Black women face disproportionately higher maternal mortality rates",
        "Poor follow-up care has no impact on maternal mortality",
        "Maternal mortality rates have steadily decreased across all demographics",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Which of the following is a key objective in the Healthy People 2030 initiative?",
      options: [
        "Increasing C-section rates for all pregnant women",
        "Reducing access to prenatal care to cut healthcare costs",
        "Promoting formula feeding over breastfeeding",
        "Reducing infant and maternal mortality rates",
      ],
      correctAnswer: 3,
    },
    {
      question: "What hormone is responsible for triggering ovulation?",
      options: [
        "Follicle Stimulating Hormone (FSH)",
        "Luteinizing Hormone (LH)",
        "Estrogen",
        "Progesterone",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Which of the following is an ethical consideration specific to pregnant women with substance use issues?",
      options: [
        "Mandatory reporting is required in all states",
        "Some states view it as a criminal issue while others approach it as a health issue",
        "Substance use has no impact on pregnancy outcomes",
        "Healthcare providers must refuse care to these patients",
      ],
      correctAnswer: 1,
    },
  ];

  const handleAnswer = (selectedOption) => {
    const { currentQuestion, answers, score } = assessmentState;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;

    const newScore =
      selectedOption === questions[currentQuestion].correctAnswer
        ? score + 1
        : score;

    if (currentQuestion < questions.length - 1) {
      setAssessmentState({
        ...assessmentState,
        currentQuestion: currentQuestion + 1,
        answers: newAnswers,
        score: newScore,
      });
    } else {
      setAssessmentState({
        ...assessmentState,
        showResults: true,
        answers: newAnswers,
        score: newScore,
      });
    }
  };

  const restartAssessment = () => {
    setAssessmentState({
      currentQuestion: 0,
      answers: [],
      showResults: false,
      score: 0,
    });
  };

  const { currentQuestion, showResults, score } = assessmentState;
  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-6">
      <div className="bg-indigo-600 text-white px-4 py-2">
        Women's Health Knowledge Assessment
      </div>
      <div className="p-6">
        {showResults ? (
          <div className="text-center">
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Assessment Results
            </h3>
            <p className="text-lg mb-3">
              You scored {score} out of {questions.length} questions correctly.
            </p>
            <p className="mb-6">
              {score === questions.length
                ? "Excellent! You have a strong understanding of women's health concepts."
                : score >= questions.length / 2
                ? "Good job! You have a solid foundation, but there's room to strengthen your knowledge."
                : "Consider reviewing the women's health module again to strengthen your understanding."}
            </p>
            <button
              onClick={restartAssessment}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
            >
              Retake Assessment
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}
                  % Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                >
                  <span className="inline-block w-6 h-6 mr-3 text-center rounded-full bg-indigo-100 text-indigo-800">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomensHealthAssessment;