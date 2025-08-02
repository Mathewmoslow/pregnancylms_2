import React, { useState } from "react";
import Introduction from "./components/Introduction";
import CourseLanding from "./components/CourseLanding";
import WomensHealthOverview from "./components/WomensHealthOverview";
import PregnancyBasics from "./components/PregnancyBasics";
import GTPALSystem from "./components/GTPALSystem";
import PregnancySignsQuiz from "./components/PregnancySignsQuiz";
import PregnancyTimeline from "./components/PregnancyTimeline";
import BodyChanges from "./components/BodyChanges";
import PregnancyComplications from "./components/PregnancyComplications";
import LaborAndBirth from "./components/LaborAndBirth";
import FinalExam from "./components/FinalExam";
import Part2Introduction from "./components/Part2Introduction";
import PostpartumCare from "./components/PostpartumCare";
import NewbornAdaptation from "./components/NewbornAdaptation";
import NewbornAssessment from "./components/NewbornAssessment";
import NewbornCareProtocols from "./components/NewbornCareProtocols";
import FeedingMethodComparison from "./components/FeedingMethodComparison";
import FamilyPlanningMethods from "./components/FamilyPlanningMethods";
import FinalExam2 from "./components/FinalExam2";

import DueDateCalculator from "./components/DueDateCalculator";
import GTPALCalculator from "./components/GTPALCalculator";
import LaborSimulation from "./components/LaborSimulation";
import PregnancyBodyChangesSimulator from "./components/PregnancyBodyChangesSimulator";
import TeratogenExplorer from "./components/TeratogenExplorer";
import WomensHealthAssessment from "./components/WomensHealthAssessment";
import FinalExamPart2 from "./components/FinalExamPart2";
import PostpartumAssessment from "./components/postpartum/PostpartumAssessment";
import InvolutionSimulator from "./components/postpartum/InvolutionSimulator";
import MaternalAdaptationQuiz from "./components/postpartum/MaternalAdaptationQuiz";
import NewbornTransitionSimulator from "./components/newborn/NewbornTransitionSimulator";
import APGARCalculator from "./components/newborn/APGARCalculator";
import BallardScoreAssessment from "./components/newborn/BallardScoreAssessment";
import LactationStagesExplorer from "./components/feeding/LactationStagesExplorer";
import BreastfeedingTroubleshooter from "./components/feeding/BreastfeedingTroubleshooter";
import ContraceptionSelector from "./components/familyplanning/ContraceptionSelector";
import MethodEffectivenessChart from "./components/familyplanning/MethodEffectivenessChart";
import AudioPlayer from "./components/shared/AudioPlayer";

function App() {
  const [activeModule, setActiveModule] = useState("landing");
  const [completedModules, setCompletedModules] = useState([]);
  const [currentPart, setCurrentPart] = useState(1);
  const [part1ExamResults, setPart1ExamResults] = useState(null);
  const [part2ExamResults, setPart2ExamResults] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const part1Modules = [
    { id: "landing", name: "Course Overview", short: "Overview" },
    { id: "intro", name: "Introduction", short: "Intro" },
    { id: "womenshealth", name: "Women's Health", short: "Women's Health" },
    { id: "basics", name: "Conception & Dating", short: "Conception" },
    { id: "gtpal", name: "GTPAL System", short: "GTPAL" },
    { id: "signs", name: "Pregnancy Signs", short: "Signs" },
    { id: "timeline", name: "Pregnancy Timeline", short: "Timeline" },
    { id: "bodychanges", name: "Body Changes", short: "Changes" },
    { id: "complications", name: "Complications", short: "Complications" },
    { id: "labor", name: "Labor & Birth", short: "Labor" },
    { id: "finalexam", name: "Final Exam Part 1", short: "Exam" },
  ];

  const part2Modules = [
    { id: "part2intro", name: "Part 2 Introduction", short: "Intro" },
    { id: "postpartum", name: "Postpartum Care", short: "Postpartum" },
    { id: "newbornadaptation", name: "Newborn Adaptation", short: "Adaptation" },
    { id: "newbornassessment", name: "Newborn Assessment", short: "Assessment" },
    { id: "newborncare", name: "Newborn Care", short: "Care" },
    { id: "feeding", name: "Infant Feeding", short: "Feeding" },
    { id: "familyplanning", name: "Family Planning", short: "Planning" },
    { id: "finalexam2", name: "Final Exam Part 2", short: "Exam" },
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
    setSidebarOpen(false);
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
    setSidebarOpen(false);
  };

  const switchToPart1 = () => {
    setCurrentPart(1);
    setActiveModule("landing");
    setSidebarOpen(false);
  };

  const handlePart1ExamCompletion = (results) => {
    setPart1ExamResults(results);
    completeModule("finalexam");
  };

  const handlePart2ExamCompletion = (results) => {
    setPart2ExamResults(results);
    completeModule("finalexam2");
  };

  const currentModule = modules[currentModuleIndex];

  return (
    <div className="pregnancy-learning-platform min-h-screen flex flex-col">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 w-80 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:z-auto lg:shadow-none lg:w-64 lg:border-r lg:border-gray-200`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-indigo-600">Navigation</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Part Switcher */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={switchToPart1}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                currentPart === 1 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Part 1
            </button>
            <button
              onClick={switchToPart2}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                currentPart === 2 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Part 2
            </button>
          </div>
          <div className="mt-3">
            <div className="text-xs text-gray-500 mb-1">
              Progress: {completedModules.length}/{modules.length}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Module List */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Part {currentPart} Modules
          </h3>
          <ul className="space-y-1">
            {modules.map((module, index) => {
              const isCurrent = module.id === activeModule;
              const isCompleted = completedModules.includes(module.id);
              
              return (
                <li key={module.id}>
                  <button
                    onClick={() => navigateToModule(module.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-3 ${
                      isCurrent 
                        ? "bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                          isCurrent ? "border-indigo-600 text-indigo-600" : "border-gray-300 text-gray-500"
                        }`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <span className="flex-1">{module.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Compact Header */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white sticky top-0 z-30 shadow-md">
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Hamburger Menu */}
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Title & Current Module */}
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold truncate lg:text-xl">
                  Pregnancy & Childbirth Platform
                </h1>
                <p className="text-sm text-purple-100 truncate">
                  Part {currentPart} • {currentModule?.name}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={navigateToPrevious}
                  disabled={currentModuleIndex === 0}
                  className={`p-2 rounded-md transition-colors ${
                    currentModuleIndex > 0
                      ? "hover:bg-white/10 text-white"
                      : "text-white/30 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="text-sm bg-white/10 px-3 py-1 rounded-full">
                  {currentModuleIndex + 1}/{modules.length}
                </div>

                <button
                  onClick={navigateToNext}
                  disabled={currentModuleIndex === modules.length - 1}
                  className={`p-2 rounded-md transition-colors ${
                    currentModuleIndex < modules.length - 1
                      ? "hover:bg-white/10 text-white"
                      : "text-white/30 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Integrated Progress Bar */}
            <div className="mt-2">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6 max-w-5xl">
            {/* Part 1 Modules */}
            {currentPart === 1 && (
              <>
                {activeModule === "landing" && (
                  <CourseLanding navigateToModule={navigateToModule} />
                )}
                {activeModule === "intro" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">
                        Pregnancy & Birth Learning Module
                      </h2>
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        Part {currentPart} - Module {currentModuleIndex + 1} of {modules.length}
                      </span>
                    </div>

                    <AudioPlayer 
                      audioFile="/audio/part1-intro.mp3"
                      title="Part 1 Introduction Audio Summary"
                    />

                    <div className="mb-6">
                      <p className="text-gray-700 mb-3">
                        Welcome to your comprehensive pregnancy and childbirth learning platform! This interactive module system will guide you through all essential aspects of pregnancy, from conception to delivery.
                      </p>
                      <p className="text-gray-700 mb-3">
                        This section covers pregnancy from conception through delivery.
                      </p>
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

                {activeModule === "womenshealth" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Women's Health Overview
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter1-summary.mp3"
                      title="Chapter 1: Women's Health"
                    />

                    <WomensHealthAssessment />
                  </div>
                )}

                {activeModule === "basics" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Conception & Dating
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter2-summary.mp3"
                      title="Chapter 2: Conception & Dating"
                    />

                    <DueDateCalculator />
                  </div>
                )}

                {activeModule === "gtpal" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      GTPAL System
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter3-summary.mp3"
                      title="Chapter 3: GTPAL System"
                    />

                    <GTPALCalculator />
                  </div>
                )}

                {activeModule === "signs" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Pregnancy Signs & Symptoms
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter4-summary.mp3"
                      title="Chapter 4: Pregnancy Signs"
                    />

                    <PregnancySignsQuiz />
                  </div>
                )}

                {activeModule === "timeline" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Pregnancy Timeline & Development
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter5-summary.mp3"
                      title="Chapter 5: Pregnancy Timeline"
                    />

                    <PregnancyTimeline />
                  </div>
                )}

                {activeModule === "bodychanges" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Maternal Body Changes
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter6-summary.mp3"
                      title="Chapter 6: Body Changes"
                    />

                    <PregnancyBodyChangesSimulator />
                  </div>
                )}

                {activeModule === "complications" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Pregnancy Complications & Teratogens
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter7-summary.mp3"
                      title="Chapter 7: Complications"
                    />

                    <TeratogenExplorer />
                  </div>
                )}

                {activeModule === "labor" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Labor & Birth Process
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter8-summary.mp3"
                      title="Chapter 8: Labor & Birth"
                    />

                    <LaborSimulation />
                  </div>
                )}

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
                        Part {currentPart} - Module {currentModuleIndex + 1} of {modules.length}
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
                      Postpartum Care & Assessment
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter18-summary.mp3"
                      title="Chapter 18: Postpartum Care"
                    />

                    <PostpartumAssessment />
                    <InvolutionSimulator />
                    <MaternalAdaptationQuiz />
                  </div>
                )}

                {activeModule === "newbornadaptation" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Newborn Adaptation to Extrauterine Life
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
                      Family Planning & Contraception
                    </h2>

                    <AudioPlayer 
                      audioFile="/audio/chapter24-summary.mp3"
                      title="Chapter 24: Family Planning"
                    />

                    <ContraceptionSelector />
                    <MethodEffectivenessChart />
                  </div>
                )}

                {activeModule === "finalexam2" && (
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                      Part 2 Final Exam: Postpartum & Newborn
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

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 gap-4">
              <button
                onClick={navigateToPrevious}
                disabled={currentModuleIndex === 0}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={navigateToNext}
                disabled={currentModuleIndex === modules.length - 1}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Module
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <h3 className="text-lg font-bold">
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
    </div>
  );
}

export default App;