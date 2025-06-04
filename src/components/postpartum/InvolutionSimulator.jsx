import React, { useState } from "react";

const InvolutionSimulator = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const involutionData = [
    {
      day: 1,
      fundalHeight: "At umbilicus",
      heightCm: 12,
      description: "Immediately postpartum - uterus at umbilicus level",
      size: "About the size of a grapefruit",
      weight: "~1000g",
      uterusSize: 120,
      bottomOffset: 50
    },
    {
      day: 2,
      fundalHeight: "1 cm below umbilicus",
      heightCm: 11,
      description: "Beginning involution - slight descent",
      size: "Slightly smaller",
      weight: "~900g",
      uterusSize: 110,
      bottomOffset: 45
    },
    {
      day: 3,
      fundalHeight: "2 cm below umbilicus", 
      heightCm: 10,
      description: "Continued involution",
      size: "Noticeably smaller",
      weight: "~800g",
      uterusSize: 100,
      bottomOffset: 35
    },
    {
      day: 7,
      fundalHeight: "6 cm below umbilicus",
      heightCm: 6,
      description: "Week 1 - significant size reduction",
      size: "About the size of a large orange",
      weight: "~500g",
      uterusSize: 80,
      bottomOffset: 20
    },
    {
      day: 10,
      fundalHeight: "8 cm below umbilicus",
      heightCm: 4,
      description: "Approaching non-palpable state",
      size: "About the size of a tennis ball",
      weight: "~350g",
      uterusSize: 65,
      bottomOffset: 15
    },
    {
      day: 14,
      fundalHeight: "Non-palpable",
      heightCm: 0,
      description: "Week 2 - below pubic symphysis, pre-pregnancy size",
      size: "Pre-pregnancy size (~50-70g)",
      weight: "~60g",
      uterusSize: 50,
      bottomOffset: 8
    }
  ];

  const getCurrentData = () => {
    return involutionData.find(data => data.day === currentDay) || involutionData[0];
  };

  const animateProgression = () => {
    setIsAnimating(true);
    const daySequence = [1, 2, 3, 7, 10, 14];
    let index = 0;
    
    const interval = setInterval(() => {
      setCurrentDay(daySequence[index]);
      index++;
      if (index >= daySequence.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1200);
  };

  const currentData = getCurrentData();

  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-6">
      <div className="bg-indigo-600 text-white px-4 py-2">
        Uterine Involution Simulator
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">
            Interactive Uterine Involution Timeline
          </h3>
          <p className="text-gray-700">
            Observe how the uterus returns to its pre-pregnancy size over 14 days
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-4 text-center">Visual Representation</h4>
            
            <div className="relative bg-gray-50 rounded-lg h-96 mx-auto max-w-sm flex flex-col justify-end items-center p-4">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="text-xs text-gray-600 bg-yellow-100 px-2 py-1 rounded">
                  Umbilicus
                </div>
                <div className="w-12 h-0.5 bg-yellow-300 mt-1"></div>
              </div>

              <div className="absolute left-4 bottom-8">
                <div className="text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded">
                  Pubic Symphysis
                </div>
                <div className="w-12 h-0.5 bg-blue-300 mt-1"></div>
              </div>

              <div 
                className="transition-all duration-1000 ease-in-out"
                style={{
                  position: 'absolute',
                  bottom: `${currentData.bottomOffset}%`,
                  width: `${currentData.uterusSize}px`,
                  height: `${currentData.uterusSize * 1.2}px`
                }}
              >
                <div 
                  className="bg-gradient-to-t from-pink-200 to-pink-100 border-2 border-pink-300"
                  style={{
                    width: `${currentData.uterusSize}px`,
                    height: `${currentData.uterusSize}px`,
                    borderRadius: `${currentData.uterusSize/2}px ${currentData.uterusSize/2}px ${currentData.uterusSize/4}px ${currentData.uterusSize/4}px`,
                    position: 'relative'
                  }}
                >
                  <div 
                    className="bg-gradient-to-t from-pink-400 to-pink-300 border-2 border-pink-500 rounded-full flex items-center justify-center"
                    style={{
                      width: `${currentData.uterusSize * 0.7}px`,
                      height: `${currentData.uterusSize * 0.4}px`,
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <span className="text-xs font-bold text-pink-900">
                      Fundus
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-pink-800">
                      Day {currentData.day}
                    </span>
                  </div>
                </div>
                
                <div 
                  className="bg-pink-300 border border-pink-400 mx-auto"
                  style={{
                    width: `${currentData.uterusSize * 0.3}px`,
                    height: `${currentData.uterusSize * 0.2}px`,
                    borderRadius: '0 0 50% 50%'
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Day Controls</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Day: {currentDay}
                  </label>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {[1, 2, 3, 7, 10, 14].map(day => (
                      <button
                        key={day}
                        onClick={() => setCurrentDay(day)}
                        disabled={isAnimating}
                        className={`px-3 py-2 rounded border ${
                          currentDay === day 
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        } disabled:opacity-50`}
                      >
                        Day {day}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={animateProgression}
                  disabled={isAnimating}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  {isAnimating ? "Animating..." : "Animate Progression"}
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Day {currentDay} Details</h4>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-indigo-700">Fundal Height:</span>
                  <p className="text-gray-700">{currentData.fundalHeight}</p>
                </div>
                <div>
                  <span className="font-medium text-indigo-700">Size:</span>
                  <p className="text-gray-700">{currentData.size}</p>
                </div>
                <div>
                  <span className="font-medium text-indigo-700">Weight:</span>
                  <p className="text-gray-700">{currentData.weight}</p>
                </div>
                <div>
                  <span className="font-medium text-indigo-700">Description:</span>
                  <p className="text-gray-700 text-sm">{currentData.description}</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Key Milestones</h4>
              <div className="space-y-2 text-sm">
                <div className={`p-2 rounded ${currentDay === 1 ? "bg-indigo-100 border border-indigo-300" : "bg-gray-50"}`}>
                  <span className="font-medium">Day 1:</span> At umbilicus (~12-14 cm above symphysis)
                </div>
                <div className={`p-2 rounded ${currentDay === 7 ? "bg-indigo-100 border border-indigo-300" : "bg-gray-50"}`}>
                  <span className="font-medium">Day 7:</span> 6 cm below umbilicus
                </div>
                <div className={`p-2 rounded ${currentDay === 14 ? "bg-indigo-100 border border-indigo-300" : "bg-gray-50"}`}>
                  <span className="font-medium">Day 14:</span> Non-palpable, below pubic symphysis
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
          <h4 className="font-semibold text-blue-800 mb-3">Fundal Assessment Reference</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700 text-sm">
            <div>
              <h5 className="font-medium mb-2">Normal Involution Timeline:</h5>
              <ul className="space-y-1">
                <li>• <strong>Day 1:</strong> At umbilicus</li>
                <li>• <strong>Days 2-3:</strong> 1-2 cm below umbilicus</li>
                <li>• <strong>Day 7:</strong> 6 cm below umbilicus</li>
                <li>• <strong>Day 14:</strong> Non-palpable</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Assessment Considerations:</h5>
              <ul className="space-y-1">
                <li>• <strong>Position:</strong> Should be midline</li>
                <li>• <strong>Consistency:</strong> Should be firm</li>
                <li>• <strong>Boggy uterus:</strong> Immediate massage required</li>
                <li>• <strong>Delayed involution:</strong> May indicate infection or retained products</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvolutionSimulator;