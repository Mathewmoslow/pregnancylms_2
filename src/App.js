    import React, { useState } from "react";

    import PregnancyTimeline from "./components/PregnancyTimeline";
    import DueDateCalculator from "./components/DueDateCalculator";
    import GTPALCalculator from "./components/GTPALCalculator";
    import LaborSimulation from "./components/LaborSimulation";
    import PregnancySignsQuiz from "./components/PregnancySignsQuiz";
    import PregnancyBodyChangesSimulator from "./components/PregnancyBodyChangesSimulator";
    import TeratogenExplorer from "./components/TeratogenExplorer";
    import WomensHealthAssessment from "./components/WomensHealthAssessment";
    import FinalExam from "./components/FinalExam";
    import FinalExamPart2 from "./components/FinalExamPart2";
    import PostpartumAssessment from "./components/postpartum/PostpartumAssessment";
    import InvolutionSimulator from "./components/postpartum/InvolutionSimulator";
    import MaternalAdaptationQuiz from "./components/postpartum/MaternalAdaptationQuiz";
    import NewbornTransitionSimulator from "./components/newborn/NewbornTransitionSimulator";
    import APGARCalculator from "./components/newborn/APGARCalculator";
    import BallardScoreAssessment from "./components/newborn/BallardScoreAssessment";
    import NewbornCareProtocols from "./components/newborn/NewbornCareProtocols";
    import LactationStagesExplorer from "./components/feeding/LactationStagesExplorer";
    import FeedingMethodComparison from "./components/feeding/FeedingMethodComparison";
    import BreastfeedingTroubleshooter from "./components/feeding/BreastfeedingTroubleshooter";
    import ContraceptionSelector from "./components/familyplanning/ContraceptionSelector";
    import MethodEffectivenessChart from "./components/familyplanning/MethodEffectivenessChart";
    import AudioPlayer from "./components/shared/AudioPlayer";

    function App() {
      const [activeModule, setActiveModule] = useState("intro");
      const [completedModules, setCompletedModules] = useState([]);
      const [part1ExamResults, setPart1ExamResults] = useState(null);
      const [part2ExamResults, setPart2ExamResults] = useState(null);
      const [currentPart, setCurrentPart] = useState(1);

      const part1Modules = [
        { id: "intro", name: "Introduction" },
        { id: "womenshealth", name: "Women's Health" },
        { id: "basics", name: "Conception & Dating" },
        { id: "gtpal", name: "GTPAL System" },
        { id: "signs", name: "Pregnancy Signs" },
        { id: "timeline", name: "Pregnancy Timeline" },
        { id: "bodychanges", name: "Body Changes" },
        { id: "complications", name: "Complications" },
        { id: "labor", name: "Labor & Birth" },
        { id: "finalexam", name: "Final Exam Part 1" },
      ];

      const part2Modules = [
        { id: "part2intro", name: "Part 2 Introduction" },
        { id: "postpartum", name: "Postpartum Care" },
        { id: "newbornadaptation", name: "Newborn Adaptation" },
        { id: "newbornassessment", name: "Newborn Assessment" },
        { id: "newborncare", name: "Newborn Care" },
        { id: "feeding", name: "Infant Feeding" },
        { id: "familyplanning", name: "Family Planning" },
        { id: "finalexam2", name: "Final Exam Part 2" },
      ];

      const modules = currentPart === 1 ? part1Modules : part2Modules;
      const currentModuleIndex = modules.findIndex(module => module.id === activeModule);

      const completeModule = (moduleId) => {
        if (!completedModules.includes(moduleId)) {
          setCompletedModules([...completedModules, moduleId]);
        }
      };

      const getProgressPercentage = () => {
        return (completedModules.length / modules.length) * 100;
      };

      const navigateToModule = (moduleId) => {
        setActiveModule(moduleId);
        completeModule(moduleId);
        window.scrollTo(0, 0);
      };

      const navigateToPrevious = () => {
        if (currentModuleIndex > 0) {
          navigateToModule(modules[currentModuleIndex - 1].id);
        }
      };

      const navigateToNext = () => {
        if (currentModuleIndex < modules.length - 1) {
          navigateToModule(modules[currentModuleIndex + 1].id);
        }
      };

      const switchToPart2 = () => {
        setCurrentPart(2);
        setActiveModule("part2intro");
        setCompletedModules([]);
      };

      const switchToPart1 = () => {
        setCurrentPart(1);
        setActiveModule("intro");
      };

      const handlePart1ExamCompletion = (results) => {
        setPart1ExamResults(results);
        completeModule("finalexam");
      };

      const handlePart2ExamCompletion = (results) => {
        setPart2ExamResults(results);
        completeModule("finalexam2");
      };

      return (
        <div className="pregnancy-learning-platform">
          <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-5">
            <div className="container mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
                Pregnancy & Childbirth Learning Platform
              </h1>
              <p className="text-center">
                Interactive learning modules to master obstetric concepts
              </p>
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={switchToPart1}
                  className={`px-4 py-2 rounded-md ${currentPart === 1 ? "bg-white text-indigo-600" : "bg-indigo-500 hover:bg-indigo-400"}`}
                >
                  Part 1: Pregnancy & Birth
                </button>
                <button
                  onClick={switchToPart2}
                  className={`px-4 py-2 rounded-md ${currentPart === 2 ? "bg-white text-indigo-600" : "bg-indigo-500 hover:bg-indigo-400"}`}
                >
                  Part 2: Postpartum & Newborn
                </button>
              </div>
            </div>
          </header>

          <nav className="sticky top-0 bg-white shadow-md z-10 py-3">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={navigateToPrevious}
                  className={`flex items-center justify-center p-2 rounded-full ${
                    currentModuleIndex > 0
                      ? "text-indigo-600 hover:bg-indigo-50"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                  disabled={currentModuleIndex === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="text-lg font-bold text-indigo-700">
                  Part {currentPart} - Module {currentModuleIndex + 1} of {modules.length}: {modules[currentModuleIndex].name}
                </div>

                <button
                  onClick={navigateToNext}
                  className="flex items-center justify-center p-2 rounded-full text-indigo-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="relative">
                <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${getProgressPercentage()}%` }}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                  ></div>
                </div>
                <div className="flex justify-between">
                  {modules.map((module, index) => {
                    const isCurrent = module.id === activeModule;
                    const isCompleted = completedModules.includes(module.id);
                    return (
                      <button
                        key={module.id}
                        onClick={() => navigateToModule(module.id)}
                        className="flex flex-col items-center group"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all
                            ${isCurrent ? "bg-indigo-600 text-white scale-125"
                              : isCompleted ? "bg-indigo-200 text-indigo-700"
                              : "bg-gray-200 text-gray-500"}`}
                        >
                          {index + 1}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          <div className="container mx-auto px-4 py-3">
            {/* Part 1 Modules */}
            {currentPart === 1 && (
              <>
                {activeModule === "intro" && (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">
                    Introduction to Pregnancy & Childbirth
                  </h2>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    Module 1 of 10
                  </span>
                </div>
                
                <div className="mb-6 space-y-4">
                  <p className="text-gray-700">
                    Welcome to the Pregnancy and Childbirth Learning Platform! This interactive environment will help you master essential obstetric concepts through engaging visualizations, calculators, and interactive exercises.
                  </p>
                  <p className="text-gray-700">
                    We'll cover everything from conception basics to labor and delivery, with special focus on terminology, fetal development, prenatal care, and the signs of pregnancy.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-3">How to Use This Platform</h3>
                    <p className="text-gray-700 text-sm">
                      Navigate through different modules using the progress navigation at the top. Each module contains interactive elements to help reinforce your learning. Complete activities to increase your progress bar and track your learning journey.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">Learning Objectives</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Understand the timeline and trimesters of pregnancy</li>
                      <li>• Master pregnancy dating using Naegele's Rule</li>
                      <li>• Learn obstetric terminology (GTPAL system)</li>
                      <li>• Identify the presumptive, probable, and positive signs of pregnancy</li>
                      <li>• Follow fetal development through all stages</li>
                      <li>• Understand the stages and processes of labor and birth</li>
                      <li>• Learn about physiological changes during pregnancy</li>
                      <li>• Recognize complications and their management</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">Features of This Platform</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
                    <div>
                      <li>• Interactive pregnancy timeline</li>
                      <li>• Due date calculator</li>
                      <li>• Fetal development visualization</li>
                      <li>• GTPAL system practice</li>
                      <li>• Body changes simulator</li>
                    </div>
                    <div>
                      <li>• Pregnancy signs quiz</li>
                      <li>• Teratogen explorer</li>
                      <li>• Labor stages interactive simulation</li>
                      <li>• Knowledge check quizzes</li>
                      <li>• Comprehensive final exam</li>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => navigateToModule("womenshealth")}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
                  >
                    Start Part 1
                  </button>
                </div>
              </div>
            )}

                {activeModule === "womenshealth" && <WomensHealthAssessment />}
                {activeModule === "basics" && <DueDateCalculator />}
                {activeModule === "gtpal" && <GTPALCalculator />}
                {activeModule === "signs" && <PregnancySignsQuiz />}
                {activeModule === "timeline" && <PregnancyTimeline />}
                {activeModule === "bodychanges" && <PregnancyBodyChangesSimulator />}
                {activeModule === "complications" && <TeratogenExplorer />}
                {activeModule === "labor" && <LaborSimulation />}

                {activeModule === "finalexam" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Part 1 Final Exam: Pregnancy & Birth
                    </h2>
                    <FinalExam onComplete={handlePart1ExamCompletion} />
                    {part1ExamResults && (
                      <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">
                          Part 1 Exam Complete!
                        </h3>
                        <p className="text-gray-700">
                          Score: {part1ExamResults.totalScore}/{part1ExamResults.totalQuestions} ({part1ExamResults.percentageScore.toFixed(1)}%)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Part 2 Modules */}
            {currentPart === 2 && (
              <>
                {activeModule === "part2intro" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">
                        Postpartum & Newborn Care
                      </h2>
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        Part 2 - Module 1 of {part2Modules.length}
                      </span>
                    </div>

                    <AudioPlayer 
                      audioFile="/audio/part2-intro.mp3"
                      title="Part 2 Introduction Audio Summary"
                    />

                    <div className="mb-6">
                      <p className="text-gray-700 mb-3">
                        Welcome to Part 2! This section covers the critical postpartum period and comprehensive newborn care.
                      </p>
                      <p className="text-gray-700 mb-3">
                        You'll learn postpartum assessment, newborn adaptation, feeding, and family planning.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                      <div className="bg-white border rounded-lg overflow-hidden">
                        <div className="bg-indigo-600 text-white px-4 py-2">Part 2 Learning Objectives</div>
                        <div className="p-4">
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Master postpartum assessment techniques</li>
                            <li>Understand newborn transition and adaptation</li>
                            <li>Perform systematic newborn assessments</li>
                            <li>Provide evidence-based newborn care</li>
                            <li>Support successful infant feeding</li>
                            <li>Counsel on family planning methods</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white border rounded-lg overflow-hidden">
                        <div className="bg-indigo-600 text-white px-4 py-2">Interactive Features</div>
                        <div className="p-4">
                          <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>APGAR score calculator</li>
                            <li>Postpartum assessment tools</li>
                            <li>Newborn care protocols</li>
                            <li>Lactation stages explorer</li>
                            <li>Contraception selector</li>
                            <li>Audio chapter summaries</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => navigateToModule("postpartum")}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
                      >
                        Start Part 2
                      </button>
                    </div>
                  </div>
                )}

                {activeModule === "postpartum" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Postpartum Adaptations & Care
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter17-summary.mp3"
                      title="Chapter 17: Postpartum Adaptations"
                    />

                    <PostpartumAssessment />
                    <InvolutionSimulator />
                    <MaternalAdaptationQuiz />
                  </div>
                )}

                {activeModule === "newbornadaptation" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Newborn Transition & Adaptation
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter20-summary.mp3"
                      title="Chapter 20: Newborn Adaptation"
                    />

                    <NewbornTransitionSimulator />
                  </div>
                )}

                {activeModule === "newbornassessment" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Newborn Assessment
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter21-summary.mp3"
                      title="Chapter 21: Newborn Assessment"
                    />

                    <APGARCalculator />
                    <BallardScoreAssessment />
                  </div>
                )}

                {activeModule === "newborncare" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Newborn Care Protocols
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter22-summary.mp3"
                      title="Chapter 22: Newborn Care"
                    />

                    <NewbornCareProtocols />
                  </div>
                )}

                {activeModule === "feeding" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Infant Feeding
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter23-summary.mp3"
                      title="Chapter 23: Infant Feeding"
                    />

                    <LactationStagesExplorer />
                    <FeedingMethodComparison />
                    <BreastfeedingTroubleshooter />
                  </div>
                )}

                {activeModule === "familyplanning" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Family Planning
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter26-summary.mp3"
                      title="Chapter 26: Family Planning"
                    />

                    <ContraceptionSelector />
                    <MethodEffectivenessChart />
                  </div>
                )}

                {activeModule === "finalexam2" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Part 2 Final Exam: Postpartum & Newborn Care
                    </h2>
                    <FinalExamPart2 onComplete={handlePart2ExamCompletion} />
                    {part2ExamResults && (
                      <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
                        <h3 className="text-lg font-semibold text-green-700 mb-2">
                          Part 2 Exam Complete!
                        </h3>
                        <p className="text-gray-700">
                          Score: {part2ExamResults.totalScore}/{part2ExamResults.totalQuestions} ({part2ExamResults.percentageScore.toFixed(1)}%)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={navigateToPrevious}
                disabled={currentModuleIndex === 0}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 disabled:opacity-50"
              >
                Previous Module
              </button>
              <button
                onClick={navigateToNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
              >
                Next Module
              </button>
            </div>
          </div>

          <footer className="bg-gray-800 text-white py-4 sm:py-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <h3 className="text-lg sm:text-xl font-bold">
                    Pregnancy & Childbirth Learning Platform
                  </h3>
                  <p className="text-gray-400">
                    Interactive education for healthcare students - Part {currentPart}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">
                    © {new Date().getFullYear()} All Rights Reserved
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    }

    export default App;