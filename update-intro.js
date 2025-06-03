const fs = require('fs');

// Read the App.js file
let content = fs.readFileSync('src/App.js', 'utf8');

// Find and replace the intro section
const oldIntro = `{activeModule === "intro" && (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">
                    Introduction to Pregnancy & Childbirth
                  </h2>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    Part 1 - Module 1 of {part1Modules.length}
                  </span>
                </div>
                <div className="mb-6">
                  <p className="text-gray-700 mb-3">
                    Welcome to Part 1 of the Pregnancy and Childbirth Learning Platform! This section covers pregnancy from conception through delivery.
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
            )}`;

const newIntro = `{activeModule === "intro" && (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">
                    Introduction to Pregnancy & Childbirth
                  </h2>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    Module 1 of 10
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 mb-3">
                    Welcome to the Pregnancy and Childbirth Learning Platform! This interactive environment will help you master essential obstetric concepts through engaging visualizations, calculators, and interactive exercises.
                  </p>
                  <p className="text-gray-700 mb-3">
                    We'll cover everything from conception basics to labor and delivery, with special focus on terminology, fetal development, prenatal care, and the signs of pregnancy.
                  </p>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    How to Use This Platform
                  </h3>
                  <p className="text-gray-700">
                    Navigate through different modules using the progress navigation at the top. Each module contains interactive elements to help reinforce your learning. Complete activities to increase your progress bar and track your learning journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <div className="bg-indigo-600 text-white px-4 py-2">
                      Learning Objectives
                    </div>
                    <div className="p-4">
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Understand the timeline and trimesters of pregnancy</li>
                        <li>Master pregnancy dating using Naegele's Rule</li>
                        <li>Learn obstetric terminology (GTPAL system)</li>
                        <li>Identify the presumptive, probable, and positive signs of pregnancy</li>
                        <li>Follow fetal development through all stages</li>
                        <li>Understand the stages and processes of labor and birth</li>
                        <li>Learn about physiological changes during pregnancy</li>
                        <li>Recognize complications and their management</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg overflow-hidden">
                    <div className="bg-indigo-600 text-white px-4 py-2">
                      Features of This Platform
                    </div>
                    <div className="p-4">
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Interactive pregnancy timeline</li>
                        <li>Due date calculator</li>
                        <li>Fetal development visualization</li>
                        <li>GTPAL system practice</li>
                        <li>Body changes simulator</li>
                        <li>Pregnancy signs quiz</li>
                        <li>Teratogen explorer</li>
                        <li>Labor stages interactive simulation</li>
                        <li>Knowledge check quizzes</li>
                        <li>Comprehensive final exam</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => navigateToModule("womenshealth")}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            )}`;

content = content.replace(oldIntro, newIntro);

// Write back to file
fs.writeFileSync('src/App.js', content);
console.log('Intro updated successfully!');
