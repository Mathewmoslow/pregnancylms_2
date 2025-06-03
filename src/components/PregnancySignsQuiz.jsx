import React, { useState, useEffect } from "react";

const PregnancySignsQuiz = () => {
  const [quizState, setQuizState] = useState({
    started: false,
    completed: false,
    currentQuestion: 0,
    score: 0,
    answers: [],
  });

  const [activityMode, setActivityMode] = useState("selection"); // "selection", "quiz", or "dragdrop"
  const [draggedItem, setDraggedItem] = useState(null);
  const [categories, setCategories] = useState({
    presumptive: [],
    probable: [],
    positive: [],
    unassigned: [
      "Missed menstrual period",
      "Nausea and vomiting",
      "Fatigue",
      "Breast tenderness",
      "Positive home pregnancy test",
      "Chadwick's sign (bluish vagina/cervix)",
      "Goodell's sign (softened cervix)",
      "Fetal heart tones on ultrasound",
      "Fetal movement felt by examiner",
      "Visualization of fetus on ultrasound",
      "Hegar's sign (softened uterine isthmus)",
      "Braxton Hicks contractions",
      "Urinary frequency",
      "Abdominal enlargement",
      "Pigmentation changes (linea nigra)",
    ],
  });

  const correctCategories = {
    presumptive: [
      "Missed menstrual period",
      "Nausea and vomiting",
      "Fatigue",
      "Breast tenderness",
      "Urinary frequency",
      "Braxton Hicks contractions",
    ],
    probable: [
      "Positive home pregnancy test",
      "Chadwick's sign (bluish vagina/cervix)",
      "Goodell's sign (softened cervix)",
      "Hegar's sign (softened uterine isthmus)",
      "Abdominal enlargement",
      "Pigmentation changes (linea nigra)",
    ],
    positive: [
      "Fetal heart tones on ultrasound",
      "Fetal movement felt by examiner",
      "Visualization of fetus on ultrasound",
    ],
  };

  const questions = [
    {
      question: "What are the three categories of pregnancy signs?",
      options: [
        "Confirmatory, suggestive, and indicative",
        "Presumptive, probable, and positive",
        "Primary, secondary, and tertiary",
        "Direct, indirect, and consequential",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which sign is considered a POSITIVE sign of pregnancy?",
      options: [
        "Missed period",
        "Nausea in the morning",
        "Fetal heart tones on ultrasound",
        "Positive home pregnancy test",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is Chadwick's sign?",
      options: [
        "Softening of the cervix",
        "Bluish coloration of the vagina and cervix",
        "Enlargement of the abdomen",
        "Fetal movement felt through the abdomen",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which of the following is a PROBABLE sign of pregnancy?",
      options: [
        "Fetal heart tones detected by Doppler",
        "Morning sickness",
        "Visualization of the fetus on ultrasound",
        "Positive pregnancy test",
      ],
      correctAnswer: 3,
    },
    {
      question: "What is the significance of presumptive signs of pregnancy?",
      options: [
        "They provide definitive proof of pregnancy",
        "They are detected only by healthcare providers",
        "They are subjective symptoms experienced by the woman",
        "They can only be attributed to pregnancy",
      ],
      correctAnswer: 2,
    },
  ];

  // Reset categories when switching to drag and drop mode
  useEffect(() => {
    if (activityMode === "dragdrop") {
      setCategories({
        presumptive: [],
        probable: [],
        positive: [],
        unassigned: [
          "Missed menstrual period",
          "Nausea and vomiting",
          "Fatigue",
          "Breast tenderness",
          "Positive home pregnancy test",
          "Chadwick's sign (bluish vagina/cervix)",
          "Goodell's sign (softened cervix)",
          "Fetal heart tones on ultrasound",
          "Fetal movement felt by examiner",
          "Visualization of fetus on ultrasound",
          "Hegar's sign (softened uterine isthmus)",
          "Braxton Hicks contractions",
          "Urinary frequency",
          "Abdominal enlargement",
          "Pigmentation changes (linea nigra)",
        ],
      });
    }
  }, [activityMode]);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, category) => {
    e.preventDefault();

    if (!draggedItem) return;

    // Remove from previous category
    const updatedCategories = { ...categories };

    Object.keys(updatedCategories).forEach((cat) => {
      updatedCategories[cat] = updatedCategories[cat].filter(
        (item) => item !== draggedItem
      );
    });

    // Add to new category
    updatedCategories[category] = [...updatedCategories[category], draggedItem];

    setCategories(updatedCategories);
    setDraggedItem(null);
  };

  // Handle touch events for mobile
  const handleTouchStart = (item) => {
    setDraggedItem(item);
  };

  const handleTouchEnd = (e, category) => {
    e.preventDefault();

    if (!draggedItem) return;

    // Remove from previous category
    const updatedCategories = { ...categories };

    Object.keys(updatedCategories).forEach((cat) => {
      updatedCategories[cat] = updatedCategories[cat].filter(
        (item) => item !== draggedItem
      );
    });

    // Add to new category
    updatedCategories[category] = [...updatedCategories[category], draggedItem];

    setCategories(updatedCategories);
    setDraggedItem(null);
  };

  const checkAnswers = () => {
    let score = 0;

    // Check each category
    Object.keys(correctCategories).forEach((category) => {
      const currentItems = categories[category];
      const correctItems = correctCategories[category];

      currentItems.forEach((item) => {
        if (correctItems.includes(item)) {
          score++;
        }
      });
    });

    const totalItems =
      correctCategories.presumptive.length +
      correctCategories.probable.length +
      correctCategories.positive.length;

    return Math.round((score / totalItems) * 100);
  };

  const handleAnswer = (selectedOption) => {
    const { currentQuestion, score, answers } = quizState;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;

    const newScore =
      selectedOption === questions[currentQuestion].correctAnswer
        ? score + 1
        : score;

    if (currentQuestion < questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: currentQuestion + 1,
        answers: newAnswers,
        score: newScore,
      });
    } else {
      setQuizState({
        ...quizState,
        completed: true,
        answers: newAnswers,
        score: newScore,
      });
    }
  };

  const startQuiz = () => {
    setActivityMode("quiz");
    setQuizState({
      started: true,
      completed: false,
      currentQuestion: 0,
      score: 0,
      answers: [],
    });
  };

  const restartQuiz = () => {
    setActivityMode("quiz");
    setQuizState({
      started: true,
      completed: false,
      currentQuestion: 0,
      score: 0,
      answers: [],
    });
  };

  const startDragDrop = () => {
    setActivityMode("dragdrop");
    setQuizState({
      started: false,
      completed: false,
      currentQuestion: 0,
      score: 0,
      answers: [],
    });
  };

  const submitDragDrop = () => {
    const accuracy = checkAnswers();

    setQuizState({
      ...quizState,
      completed: true,
      score: accuracy,
    });
  };

  const backToSelection = () => {
    setActivityMode("selection");
    setQuizState({
      started: false,
      completed: false,
      currentQuestion: 0,
      score: 0,
      answers: [],
    });
  };

  const { completed, currentQuestion, score } = quizState;
  const currentQ = questions[currentQuestion];

  const renderQuiz = () => {
    if (completed) {
      return (
        <div className="text-center">
          <h3 className="text-xl font-bold text-indigo-700 mb-4">
            Quiz Results
          </h3>
          <p className="text-lg mb-3">
            You scored {score} out of {questions.length} questions correctly.
          </p>
          <p className="mb-6">
            {score === questions.length
              ? "Excellent! You have a strong understanding of pregnancy signs."
              : score >= questions.length / 2
              ? "Good job! You have a solid foundation, but there's room to strengthen your knowledge."
              : "Consider reviewing the pregnancy signs again to strengthen your understanding."}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={restartQuiz}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
            >
              Retake Quiz
            </button>
            <button
              onClick={startDragDrop}
              className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
            >
              Try Drag & Drop Activity
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
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
    );
  };

  const renderDragDrop = () => {
    if (completed) {
      return (
        <div className="text-center">
          <h3 className="text-xl font-bold text-indigo-700 mb-4">
            Activity Results
          </h3>
          <p className="text-lg mb-3">Your accuracy: {score}%</p>
          <p className="mb-6">
            {score === 100
              ? "Perfect! You correctly categorized all pregnancy signs."
              : score >= 70
              ? "Good job! You have a solid understanding of the different categories of pregnancy signs."
              : "Review the categories again to strengthen your understanding of pregnancy signs."}
          </p>
          <div className="mb-8">
            <h4 className="font-medium text-indigo-700 mb-3">
              Correct Categorization:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <h5 className="font-medium text-indigo-700 mb-2">
                  Presumptive Signs
                </h5>
                <ul className="text-sm text-gray-700 list-disc pl-5">
                  {correctCategories.presumptive.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <h5 className="font-medium text-indigo-700 mb-2">
                  Probable Signs
                </h5>
                <ul className="text-sm text-gray-700 list-disc pl-5">
                  {correctCategories.probable.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <h5 className="font-medium text-indigo-700 mb-2">
                  Positive Signs
                </h5>
                <ul className="text-sm text-gray-700 list-disc pl-5">
                  {correctCategories.positive.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={startQuiz}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
            >
              Take Multiple Choice Quiz
            </button>
            <button
              onClick={startDragDrop}
              className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p className="text-gray-700 mb-4">
          Drag each pregnancy sign to its correct category: Presumptive,
          Probable, or Positive.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div
            className="bg-gray-100 p-3 rounded-lg min-h-32"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "unassigned")}
            onTouchEnd={(e) => handleTouchEnd(e, "unassigned")}
          >
            <h4 className="font-medium text-gray-700 mb-2">Unassigned Signs</h4>
            <div className="flex flex-col gap-2">
              {categories.unassigned.map((item, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onTouchStart={() => handleTouchStart(item)}
                  className="bg-white p-2 rounded border border-gray-300 cursor-move text-sm hover:bg-gray-50"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-blue-50 p-3 rounded-lg min-h-32"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "presumptive")}
            onTouchEnd={(e) => handleTouchEnd(e, "presumptive")}
          >
            <h4 className="font-medium text-blue-700 mb-2">
              Presumptive Signs
            </h4>
            <div className="flex flex-col gap-2">
              {categories.presumptive.map((item, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onTouchStart={() => handleTouchStart(item)}
                  className="bg-white p-2 rounded border border-blue-200 cursor-move text-sm hover:bg-blue-50"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-purple-50 p-3 rounded-lg min-h-32"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "probable")}
            onTouchEnd={(e) => handleTouchEnd(e, "probable")}
          >
            <h4 className="font-medium text-purple-700 mb-2">Probable Signs</h4>
            <div className="flex flex-col gap-2">
              {categories.probable.map((item, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onTouchStart={() => handleTouchStart(item)}
                  className="bg-white p-2 rounded border border-purple-200 cursor-move text-sm hover:bg-purple-50"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-green-50 p-3 rounded-lg min-h-32"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "positive")}
            onTouchEnd={(e) => handleTouchEnd(e, "positive")}
          >
            <h4 className="font-medium text-green-700 mb-2">Positive Signs</h4>
            <div className="flex flex-col gap-2">
              {categories.positive.map((item, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onTouchStart={() => handleTouchStart(item)}
                  className="bg-white p-2 rounded border border-green-200 cursor-move text-sm hover:bg-green-50"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r mb-6">
          <h4 className="font-medium text-indigo-700 mb-2">
            Categories of Pregnancy Signs
          </h4>
          <ul className="text-gray-700 space-y-2">
            <li>
              <strong>Presumptive Signs:</strong> Subjective symptoms
              experienced by the woman, not definitive proof of pregnancy.
            </li>
            <li>
              <strong>Probable Signs:</strong> Objective findings detected by
              healthcare providers, stronger evidence but not absolute
              confirmation.
            </li>
            <li>
              <strong>Positive Signs:</strong> Definitive evidence that can only
              be attributed to pregnancy, providing conclusive confirmation.
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={submitDragDrop}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
            disabled={categories.unassigned.length > 0}
          >
            {categories.unassigned.length > 0
              ? `Assign all items (${categories.unassigned.length} remaining)`
              : "Check My Answers"}
          </button>
        </div>
      </div>
    );
  };

  // Render the component based on the activity mode
  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-6">
      <div className="bg-indigo-600 text-white px-4 py-2">
        Pregnancy Signs Learning Activities
      </div>
      <div className="p-6">
        {activityMode === "selection" && (
          <div className="text-center">
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Choose an Activity
            </h3>
            <p className="text-gray-700 mb-6">
              Test your knowledge of pregnancy signs with one of these
              activities:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="border rounded-lg p-4 bg-indigo-50 max-w-xs">
                <h4 className="font-medium text-indigo-700 mb-2">
                  Multiple Choice Quiz
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Answer questions about the different categories of pregnancy
                  signs and their significance.
                </p>
                <button
                  onClick={startQuiz}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 w-full"
                >
                  Start Quiz
                </button>
              </div>
              <div className="border rounded-lg p-4 bg-green-50 max-w-xs">
                <h4 className="font-medium text-green-700 mb-2">
                  Drag & Drop Activity
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Categorize pregnancy signs as presumptive, probable, or
                  positive by dragging them to the correct category.
                </p>
                <button
                  onClick={startDragDrop}
                  className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 w-full"
                >
                  Start Activity
                </button>
              </div>
            </div>
          </div>
        )}

        {activityMode === "quiz" && renderQuiz()}
        {activityMode === "dragdrop" && renderDragDrop()}
      </div>
    </div>
  );
};

export default PregnancySignsQuiz;