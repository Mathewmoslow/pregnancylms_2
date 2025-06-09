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
    timeRemaining: 120 * 60,
    totalScore: 0,
    batchesCompleted: 0,
    showFeedback: false, // New state for instant feedback
    feedbackData: null   // Store feedback for current question
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  useEffect(() => {
    let timer;
    if (examState.started && !examState.completed) {
      timer = setInterval(() => {
        setExamState((prevState) => {
          const newTime = prevState.timeRemaining - 1;
          
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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Sample questions - in real implementation, all 200 questions would be here
  const allQuestions = [
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
      rationale: "Tight glycemic control prior to conception is critical for reducing the risk of congenital anomalies in diabetic pregnancies. Poor glycemic control during organogenesis (3-8 weeks) significantly increases the risk of birth defects, especially cardiac and neural tube defects."
    },
    {
      id: "2",
      question: "Which test is used to definitively diagnose pregnancy?",
      options: [
        "Urine pregnancy test",
        "Serum beta-hCG",
        "Transvaginal ultrasound showing fetal heart activity",
        "Pelvic examination findings"
      ],
      correctAnswer: 2,
      rationale: "Transvaginal ultrasound showing fetal heart activity is a positive sign of pregnancy and definitively confirms viability. While serum beta-hCG can detect pregnancy early, ultrasound visualization of the fetus provides definitive confirmation."
    },
    {
      id: "3",
      question: "At what gestational age does the neural tube typically close?",
      options: [
        "Week 2-3",
        "Week 4-5", 
        "Week 6-7",
        "Week 8-9"
      ],
      correctAnswer: 1,
      rationale: "The neural tube typically closes between weeks 4-5 of gestation. This is why folic acid supplementation is crucial before conception and during early pregnancy to prevent neural tube defects like spina bifida."
    }
  ];

  useEffect(() => {
    setExamState(prevState => {
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      return {
        ...prevState,
        shuffledQuestions: shuffled
      };
    });
  }, []);

  useEffect(() => {
    if (examState.shuffledQuestions.length > 0) {
      const startIndex = (examState.currentBatch - 1) * 50;
      const endIndex = startIndex + 50;
      setCurrentQuestions(examState.shuffledQuestions.slice(startIndex, Math.min(endIndex, examState.shuffledQuestions.length)));
      setCurrentQuestionIndex(0);
    }
  }, [examState.shuffledQuestions, examState.currentBatch]);

  const startExam = () => {
    setExamState({
      ...examState,
      started: true,
      timeRemaining: 120 * 60
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

    // Show feedback automatically after 1.5 second delay
    setTimeout(() => {
      const currentQuestion = currentQuestions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      
      setExamState(prevState => ({
        ...prevState,
        showFeedback: true,
        feedbackData: {
          isCorrect,
          userAnswer: selectedOption,
          correctAnswer: currentQuestion.correctAnswer,
          rationale: currentQuestion.rationale,
          question: currentQuestion
        }
      }));
    }, 1500);
  };

  const submitExam = () => {
    let score = 0;
    const incorrect = [];

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

    if (examState.currentBatch === 4) {
      onComplete && onComplete({ 
        totalScore: newTotalScore, 
        totalQuestions: 200,
        percentageScore: (newTotalScore / 200) * 100
      });
    }
  };

  const nextBatch = () => {
    if (examState.currentBatch < 4) {
      setExamState(prevState => ({
        ...prevState,
        currentBatch: prevState.currentBatch + 1,
        completed: false,
        userAnswers: {},
        score: 0,
        timeRemaining: 120 * 60
      }));
      setIncorrectQuestions([]);
    }
  };

  const restartExam = () => {
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
      batchesCompleted: 0,
      showFeedback: false,
      feedbackData: null
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

  const nextQuestion = () => {
    // Hide feedback and move to next question
    setExamState(prevState => ({
      ...prevState,
      showFeedback: false,
      feedbackData: null
    }));
    
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setExamState(prevState => ({
        ...prevState,
        showFeedback: false,
        feedbackData: null
      }));
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

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
            <li>This exam consists of multiple-choice questions with instant feedback.</li>
            <li>Answer each question and click "Next" to see the correct answer and explanation.</li>
            <li>You will have 2 hours to complete each set of questions.</li>
            <li>Your final score will be calculated at the end of each section.</li>
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
              {examState.score} / {currentQuestions.length}
            </div>
            <div className="text-xl text-gray-700">
              {Math.round((examState.score / currentQuestions.length) * 100)}%
            </div>
            
            <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                style={{ width: `${(examState.score / currentQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mb-6 flex justify-center gap-4">
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
      </div>
    );
  }

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
      
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>Progress: {Object.keys(examState.userAnswers).length}/{currentQuestions.length} questions answered</span>
          <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
        </div>
      </div>
      
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
                onClick={() => !examState.showFeedback && handleAnswerChange(currentQuestion.id, optionIndex)}
                className={`p-3 rounded-lg transition-colors ${
                  examState.showFeedback
                    ? optionIndex === currentQuestion.correctAnswer
                      ? "bg-green-100 border-2 border-green-500 text-green-800"
                      : examState.userAnswers[currentQuestion.id] === optionIndex
                      ? "bg-red-100 border-2 border-red-500 text-red-800"
                      : "bg-white border border-gray-300 text-gray-800"
                    : examState.userAnswers[currentQuestion.id] === optionIndex
                    ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-800 cursor-pointer"
                    : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 cursor-pointer"
                }`}
              >
                <div className="flex items-center">
                  <div className={`h-5 w-5 mr-3 rounded-full flex items-center justify-center border ${
                    examState.showFeedback
                      ? optionIndex === currentQuestion.correctAnswer
                        ? "bg-green-500 border-green-500"
                        : examState.userAnswers[currentQuestion.id] === optionIndex
                        ? "bg-red-500 border-red-500"
                        : "border-gray-400"
                      : examState.userAnswers[currentQuestion.id] === optionIndex
                      ? "bg-indigo-500 border-indigo-500"
                      : "border-gray-400"
                  }`}>
                    {(examState.showFeedback && optionIndex === currentQuestion.correctAnswer) && (
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {(examState.showFeedback && examState.userAnswers[currentQuestion.id] === optionIndex && optionIndex !== currentQuestion.correctAnswer) && (
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    {(!examState.showFeedback && examState.userAnswers[currentQuestion.id] === optionIndex) && (
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  {option}
                </div>
              </div>
            ))}
          </div>

          {/* Instant Feedback Display */}
          {examState.showFeedback && examState.feedbackData && (
            <div className={`mt-4 p-4 rounded-lg border-l-4 ${
              examState.feedbackData.isCorrect ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
            }`}>
              <div className="flex items-center mb-2">
                {examState.feedbackData.isCorrect ? (
                  <svg className="h-5 w-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
                <span className={`font-semibold ${examState.feedbackData.isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {examState.feedbackData.isCorrect ? "Correct!" : "Incorrect"}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                <strong>Explanation:</strong> {examState.feedbackData.rationale}
              </div>
            </div>
          )}

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
              disabled={examState.userAnswers[currentQuestion.id] === undefined}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                examState.userAnswers[currentQuestion.id] === undefined
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : currentQuestionIndex === currentQuestions.length - 1
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {currentQuestionIndex === currentQuestions.length - 1 ? "Finish" : "Next Question"}
            </button>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <button
          onClick={restartExam}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
        >
          Cancel Exam
        </button>
        
        <button
          onClick={submitExam}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
        >
          Submit Exam ({Object.keys(examState.userAnswers).length}/{currentQuestions.length} Answered)
        </button>
      </div>

      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-medium text-indigo-700 mb-3">Question Navigator</h3>
        <div className="grid grid-cols-10 gap-2">
          {currentQuestions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => {
                setCurrentQuestionIndex(index);
                setExamState(prev => ({ ...prev, showFeedback: false, feedbackData: null }));
              }}
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