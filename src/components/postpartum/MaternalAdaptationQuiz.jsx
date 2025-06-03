import React, { useState } from 'react';

const MaternalAdaptationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "During which phase of maternal adaptation does the mother focus on herself and integrates the birth experience?",
      options: ["Taking-in", "Taking-hold", "Letting-go", "Bonding"],
      correctAnswer: 0,
      explanation: "The taking-in phase occurs during the first 1-2 days postpartum when the mother is focused on her own needs and integrating the birth experience."
    },
    {
      id: 2,
      question: "What characterizes the 'taking-hold' phase of maternal adaptation?",
      options: [
        "Mother is passive and dependent",
        "Mother increases independence and learns infant care",
        "Mother mourns pre-maternal identity",
        "Mother experiences postpartum blues"
      ],
      correctAnswer: 1,
      explanation: "During the taking-hold phase (days 2-10), the mother becomes more independent and actively learns infant care skills."
    },
    {
      id: 3,
      question: "Postpartum blues typically:",
      options: [
        "Require immediate psychiatric intervention",
        "Last up to 2 weeks and are self-limiting",
        "Occur in less than 10% of women",
        "Always progress to postpartum depression"
      ],
      correctAnswer: 1,
      explanation: "Postpartum blues are mild mood disturbances affecting 50-80% of new mothers, lasting up to 2 weeks and resolving without intervention."
    },
    {
      id: 4,
      question: "What is 'engrossment' in the context of postpartum adaptation?",
      options: [
        "Mother's preoccupation with her appearance",
        "Infant's response to mother's voice",
        "Father's absorption and bonding with the infant",
        "Grandparents' involvement in care"
      ],
      correctAnswer: 2,
      explanation: "Engrossment refers to the father's absorption, preoccupation, and interest in the infant - a key component of paternal bonding."
    },
    {
      id: 5,
      question: "Which maternal behavior indicates successful progression to the 'letting-go' phase?",
      options: [
        "Asking many questions about infant care",
        "Focusing on birth story details",
        "Accepting new maternal identity and role",
        "Requiring assistance with all infant care"
      ],
      correctAnswer: 2,
      explanation: "The letting-go phase involves accepting the new maternal identity and mourning the loss of the pre-maternal self."
    },
    {
      id: 6,
      question: "Signs of impaired maternal-infant bonding include:",
      options: [
        "Mother makes eye contact during feeding",
        "Mother refers to baby as 'it' or 'the baby'",
        "Mother responds to infant cues",
        "Mother holds infant close to body"
      ],
      correctAnswer: 1,
      explanation: "Referring to the baby impersonally ('it' or 'the baby') rather than by name or 'my baby' can indicate bonding difficulties."
    },
    {
      id: 7,
      question: "Which factor promotes positive maternal role attainment?",
      options: [
        "Social isolation",
        "Unrealistic expectations",
        "Support from partner and family",
        "Previous negative birth experience"
      ],
      correctAnswer: 2,
      explanation: "Social support from partners, family, and healthcare providers is crucial for successful maternal role attainment."
    },
    {
      id: 8,
      question: "Sibling reaction to a new baby may include:",
      options: [
        "Only positive excitement",
        "Regression in developmental milestones",
        "Always improved behavior",
        "Complete indifference"
      ],
      correctAnswer: 1,
      explanation: "Siblings often show regression (like bedwetting or thumb sucking) as they adjust to the new family dynamic."
    }
  ];

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">
          Quiz Results: Maternal Adaptation
        </h2>
        
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-indigo-600 mb-2">
            {score} / {questions.length}
          </div>
          <div className="text-lg text-gray-600">
            {Math.round((score / questions.length) * 100)}% Correct
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {questions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <div key={q.id} className={`border rounded-lg p-4 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                <div className="font-medium mb-2">{index + 1}. {q.question}</div>
                <div className="text-sm mb-2">
                  Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {q.options[userAnswer]}
                  </span>
                </div>
                {!isCorrect && (
                  <div className="text-sm text-gray-700">
                    Correct answer: <span className="text-green-600">{q.options[q.correctAnswer]}</span>
                  </div>
                )}
                <div className="text-sm text-gray-600 mt-2 italic">
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Maternal Psychosocial Adaptation Quiz
      </h2>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            {Object.keys(answers).length} answered
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                answers[currentQuestion] === index
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[currentQuestion] === index
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                {option}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={answers[currentQuestion] === undefined}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default MaternalAdaptationQuiz;
