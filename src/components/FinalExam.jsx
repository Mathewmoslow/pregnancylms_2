import React, { useState, useEffect } from "react";

const FinalExam = ({ onComplete }) => {
  const [examState, setExamState] = useState({
    started: false,
    completed: false,
    currentBatch: 1,
    shuffledQuestions: [],
    userAnswers: {},
    score: 0,
    reviewMode: false,
    timeRemaining: 120 * 60, // 120 minutes in seconds
    totalScore: 0, // Track cumulative score across all batches
    batchesCompleted: 0 // Track how many batches completed
  });

  // Add current question index state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  useEffect(() => {
    // Initialize timer if exam has started but not completed
    let timer;
    if (examState.started && !examState.completed) {
      timer = setInterval(() => {
        setExamState((prevState) => {
          const newTime = prevState.timeRemaining - 1;
          
          // Auto-submit if time runs out
          if (newTime <= 0) {
            clearInterval(timer);
            submitExam();
            return {
              ...prevState,
              timeRemaining: 0,
              completed: true,
            };
          }
          
          return {
            ...prevState,
            timeRemaining: newTime,
          };
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examState.started, examState.completed]);

  // Format time remaining as MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // All 200 exam questions
  const allQuestions = [
    // For brevity, I'm not including all questions here, but in the real component, 
    // all questions from the original component would be included
    // Section 1: Pregnancy Dating and Conception
    {
      id: "1",
      question: "A 38-year-old G4P2 presents for preconception counseling with a history of type 1 diabetes. Her hemoglobin A1c is 9.2%. What preconception recommendation is most critical for reducing the risk of congenital anomalies?",
      options: [
        "Daily aspirin 81mg",
        "Tight glycemic control with HbA1c <6.5% before conception",
        "Discontinuation of ACE inhibitors after conception is confirmed",
        "Early first-trimester screening for cardiac anomalies"
      ],
      correctAnswer: 1,
      rationale: "Tight glycemic control prior to conception is critical for reducing the risk of congenital anomalies in diabetic pregnancies. Poor glycemic control during organogenesis (3-8 weeks) significantly increases the risk of birth defects, especially cardiac and neural tube defects. While ACE inhibitors should be discontinued before conception and low-dose aspirin may be recommended for some high-risk patients, achieving optimal blood glucose control is the most important intervention for preventing birth defects."
    },
    // More questions would be here...
  ];

  useEffect(() => {
    // Shuffle questions on component mount
    setExamState(prevState => {
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      return {
        ...prevState,
        shuffledQuestions: shuffled
      };
    });
  }, []);

  // Get current batch of questions (50 questions per batch)
  useEffect(() => {
    if (examState.shuffledQuestions.length > 0) {
      const startIndex = (examState.currentBatch - 1) * 50;
      const endIndex = startIndex + 50;
      setCurrentQuestions(examState.shuffledQuestions.slice(startIndex, endIndex));
      // Reset to first question when batch changes
      setCurrentQuestionIndex(0);
    }
  }, [examState.shuffledQuestions, examState.currentBatch]);

  const startExam = () => {
    setExamState({
      ...examState,
      started: true,
      timeRemaining: 120 * 60 // Reset timer to 120 minutes
    });
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setExamState(prevState => ({
      ...prevState,
      userAnswers: {
        ...prevState.userAnswers,
        [questionId]: selectedOption
      }
    }));
  };

  const submitExam = () => {
    let score = 0;
    const incorrect = [];

    // Calculate score and identify incorrect answers
    currentQuestions.forEach(question => {
      const userAnswer = examState.userAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        score++;
      } else {
        incorrect.push(question);
      }
    });

    setIncorrectQuestions(incorrect);

    const newTotalScore = examState.totalScore + score;
    const newBatchesCompleted = examState.batchesCompleted + 1;

    setExamState(prevState => ({
      ...prevState,
      completed: true,
      score: score,
      totalScore: newTotalScore,
      batchesCompleted: newBatchesCompleted
    }));

    // If all batches are completed, call the onComplete callback
    if (examState.currentBatch === 4) {
      onComplete && onComplete({ 
        totalScore: newTotalScore, 
        totalQuestions: 200,
        percentageScore: (newTotalScore / 200) * 100
      });
    }
  };

  const nextBatch = () => {
    if (examState.currentBatch < 4) { // 4 batches of 50 = 200 questions
      setExamState(prevState => ({
        ...prevState,
        currentBatch: prevState.currentBatch + 1,
        completed: false,
        userAnswers: {},
        score: 0,
        timeRemaining: 120 * 60 // Reset timer to 120 minutes
      }));
      setIncorrectQuestions([]);
    }
  };

  const restartExam = () => {
    // Shuffle questions again
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    
    setExamState({
      started: false,
      completed: false,
      currentBatch: 1,
      shuffledQuestions: shuffled,
      userAnswers: {},
      score: 0,
      reviewMode: false,
      timeRemaining: 120 * 60,
      totalScore: 0,
      batchesCompleted: 0
    });
    setIncorrectQuestions([]);
    setCurrentQuestionIndex(0);
  };

  const toggleReviewMode = () => {
    setExamState(prevState => ({
      ...prevState,
      reviewMode: !prevState.reviewMode
    }));
  };

  // New navigation functions
  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  // Calculate progress percentage for the progress bar
  const calculateProgress = () => {
    const answeredCount = Object.keys(examState.userAnswers).length;
    return (answeredCount / currentQuestions.length) * 100;
  };

  if (!examState.started) {
    return (
      <div className="bg-white rounded-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">OB/GYN Final Exam</h2>
        
        <div className="bg-indigo-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">Exam Instructions</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>This exam consists of 200 multiple-choice questions divided into 4 sets of 50 questions.</li>
            <li>You will have 2 hours (120 minutes) to complete each set of 50 questions.</li>
            <li>Questions cover a wide range of obstetric and gynecologic topics.</li>
            <li>Each question has one best answer among the four options provided.</li>
            <li>You can navigate between questions using the previous and next buttons.</li>
            <li>After submission, you will receive immediate feedback on your performance.</li>
            <li>The exam will analyze your incorrect answers to help you identify areas for improvement.</li>
          </ul>
        </div>
        
        <div className="text-center">
          <button
            onClick={startExam}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  if (examState.completed) {
    return (
      <div className="bg-white rounded-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Exam Results - Set {examState.currentBatch}
        </h2>
        
        <div className="mb-6">
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Your Score</h3>
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {examState.score} / 50
            </div>
            <div className="text-xl text-gray-700">
              {Math.round((examState.score / 50) * 100)}%
            </div>
            
            <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                style={{ width: `${(examState.score / 50) * 100}%` }}
              ></div>
            </div>
            
            <div className="mt-4 text-gray-700">
              {examState.score >= 45 ? (
                <p className="text-green-600 font-semibold">Excellent! You have mastered this material.</p>
              ) : examState.score >= 40 ? (
                <p className="text-green-600 font-semibold">Great job! You have a strong understanding of the concepts.</p>
              ) : examState.score >= 35 ? (
                <p className="text-yellow-600 font-semibold">Good work! Review the areas you missed to strengthen your knowledge.</p>
              ) : (
                <p className="text-red-600 font-semibold">You need more review on this material. Focus on understanding the concepts you missed.</p>
              )}
            </div>
          </div>
        </div>
        
        {examState.currentBatch === 4 && (
          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Final Score</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {examState.totalScore} / 200
              </div>
              <div className="text-xl text-gray-700">
                {Math.round((examState.totalScore / 200) * 100)}%
              </div>
              
              <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  style={{ width: `${(examState.totalScore / 200) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-4 text-gray-700">
                {examState.totalScore >= 180 ? (
                  <p className="text-green-600 font-semibold">Outstanding! You have exceptional mastery of obstetric concepts.</p>
                ) : examState.totalScore >= 160 ? (
                  <p className="text-green-600 font-semibold">Excellent! You have demonstrated strong competency in this material.</p>
                ) : examState.totalScore >= 140 ? (
                  <p className="text-yellow-600 font-semibold">Good performance! Continue to review areas of weakness to strengthen your knowledge.</p>
                ) : (
                  <p className="text-red-600 font-semibold">Additional study recommended. Focus on understanding the core concepts you missed.</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={toggleReviewMode}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            {examState.reviewMode ? "Hide Incorrect Answers" : "Review Incorrect Answers"}
          </button>
          
          {examState.currentBatch < 4 ? (
            <button
              onClick={nextBatch}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
            >
              Next Set of Questions
            </button>
          ) : (
            <button
              onClick={restartExam}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all"
            >
              Restart Exam
            </button>
          )}
        </div>
        
        {examState.reviewMode && incorrectQuestions.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-indigo-700 mb-4">Review Incorrect Answers</h3>
            <div className="space-y-6">
              {incorrectQuestions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-800 mb-2">Question {index + 1}</h4>
                    <span className="text-sm text-gray-500">ID: {question.id}</span>
                  </div>
                  <p className="mb-3">{question.question}</p>
                  
                  <div className="grid grid-cols-1 gap-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex}
                        className={`p-3 rounded-lg ${
                          optionIndex === question.correctAnswer
                            ? "bg-green-100 border border-green-300 text-green-800"
                            : examState.userAnswers[question.id] === optionIndex
                            ? "bg-red-100 border border-red-300 text-red-800"
                            : "bg-white border border-gray-300 text-gray-800"
                        }`}
                      >
                        {option}
                        {optionIndex === question.correctAnswer && (
                          <span className="ml-2 text-green-600 font-bold">✓ Correct Answer</span>
                        )}
                        {examState.userAnswers[question.id] === optionIndex && 
                         optionIndex !== question.correctAnswer && (
                          <span className="ml-2 text-red-600 font-bold">✗ Your Answer</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h5 className="font-semibold text-blue-700 mb-1">Explanation:</h5>
                    <p className="text-gray-700">{question.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Display the current question only (instead of all questions)
  const currentQuestion = currentQuestions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-lg p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">
          OB/GYN Final Exam - Set {examState.currentBatch}
        </h2>
        <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg font-bold">
          Time Remaining: {formatTime(examState.timeRemaining)}
        </div>
      </div>
      
      {/* Overall Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>Progress: {Object.keys(examState.userAnswers).length}/50 questions answered</span>
          <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
        </div>
      </div>
      
      {/* Current Question Display */}
      {currentQuestion && (
        <div className="border rounded-lg p-4 bg-gray-50 mb-6">
          <div className="flex justify-between">
            <h3 className="font-bold text-gray-800 mb-2">Question {currentQuestionIndex + 1}</h3>
            <span className="text-sm text-gray-500">ID: {currentQuestion.id}</span>
          </div>
          <p className="mb-4">{currentQuestion.question}</p>
          
          <div className="grid grid-cols-1 gap-2 mb-4">
            {currentQuestion.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                onClick={() => handleAnswerChange(currentQuestion.id, optionIndex)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  examState.userAnswers[currentQuestion.id] === optionIndex
                    ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-800"
                    : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <div className={`h-5 w-5 mr-3 rounded-full flex items-center justify-center border ${
                    examState.userAnswers[currentQuestion.id] === optionIndex
                      ? "bg-indigo-500 border-indigo-500"
                      : "border-gray-400"
                  }`}>
                    {examState.userAnswers[currentQuestion.id] === optionIndex && (
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  {option}
                </div>
              </div>
            ))}
          </div>

          {/* Question Navigation Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentQuestionIndex === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              Previous Question
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === currentQuestions.length - 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentQuestionIndex === currentQuestions.length - 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }`}
            >
              Next Question
            </button>
          </div>
        </div>
      )}
      
      {/* Exam Footer Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={restartExam}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
        >
          Cancel Exam
        </button>
        
        <button
          onClick={submitExam}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            Object.keys(examState.userAnswers).length === currentQuestions.length
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {Object.keys(examState.userAnswers).length === currentQuestions.length
            ? "Submit All Answers"
            : `Submit (${Object.keys(examState.userAnswers).length}/${currentQuestions.length} Answered)`}
        </button>
      </div>

      {/* Question Grid Navigation */}
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-medium text-indigo-700 mb-3">Question Navigator</h3>
        <div className="grid grid-cols-10 gap-2">
          {currentQuestions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium 
                ${currentQuestionIndex === index 
                  ? "bg-indigo-600 text-white" 
                  : examState.userAnswers[question.id] !== undefined
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalExam;