import React, { useState, useEffect } from "react";

const LaborSimulation = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [cervicalDilation, setCervicalDilation] = useState(0);
  const [contractionFrequency, setContractionFrequency] = useState(0);
  const [contractionIntensity, setContractionIntensity] = useState("None");
  const [isAnimating, setIsAnimating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(2); // 1=slow, 2=medium, 3=fast
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [showInfo, setShowInfo] = useState(null);

  // Define labor stages and phases
  const laborStages = [
    {
      stage: 1,
      name: "First Stage: Dilation",
      description:
        "Begins with the onset of true labor and ends when the cervix is fully dilated (10 cm).",
      phases: [
        {
          phase: 1,
          name: "Latent Phase",
          dilation: [0, 3],
          contractions: {
            frequency: [20, 5], // in minutes (from, to)
            duration: [30, 45], // in seconds
            intensity: "Mild to moderate",
          },
          description:
            "The cervix thins out (effaces) and begins to open (dilate). Contractions are typically mild and may be irregular.",
          duration:
            "6-12 hours for first-time mothers, shorter for subsequent pregnancies.",
          nursing: [
            "Assess maternal vital signs",
            "Monitor fetal heart rate intermittently",
            "Encourage ambulation and relaxation",
            "Provide emotional support",
            "Ensure adequate hydration",
          ],
        },
        {
          phase: 2,
          name: "Active Phase",
          dilation: [4, 7],
          contractions: {
            frequency: [5, 2], // in minutes
            duration: [45, 60], // in seconds
            intensity: "Moderate to strong",
          },
          description:
            "Cervical dilation accelerates. Contractions become more regular, stronger, and more frequent.",
          duration:
            "3-5 hours for first-time mothers, shorter for subsequent pregnancies.",
          nursing: [
            "Continue monitoring maternal and fetal status",
            "Offer pain management options",
            "Encourage position changes",
            "Support breathing techniques",
            "Empty bladder regularly",
          ],
        },
        {
          phase: 3,
          name: "Transition Phase",
          dilation: [8, 10],
          contractions: {
            frequency: [2, 1], // in minutes
            duration: [60, 90], // in seconds
            intensity: "Very strong",
          },
          description:
            "The most intense part of labor. The cervix completes dilation. Many women experience increased pain and pressure.",
          duration: "30 minutes to 2 hours.",
          nursing: [
            "Provide intensive support and encouragement",
            "Monitor maternal and fetal status closely",
            "Assist with focused breathing",
            "Prepare for second stage",
            "Alert healthcare provider of imminent delivery",
          ],
        },
      ],
    },
    {
      stage: 2,
      name: "Second Stage: Pushing and Birth",
      description:
        "Begins with full cervical dilation (10 cm) and ends with the birth of the baby.",
      phases: [
        {
          phase: 1,
          name: "Early Second Stage",
          dilation: [10, 10],
          contractions: {
            frequency: [2, 2], // in minutes
            duration: [60, 90], // in seconds
            intensity: "Very strong with urge to push",
          },
          description:
            "The baby descends into the birth canal. The mother begins to feel the urge to push.",
          duration:
            "1-2 hours for first-time mothers, shorter for subsequent pregnancies.",
          nursing: [
            "Coach pushing efforts",
            "Monitor fetal descent",
            "Continuous fetal monitoring",
            "Encourage effective pushing techniques",
            "Provide encouragement and support",
          ],
        },
        {
          phase: 2,
          name: "Late Second Stage",
          dilation: [10, 10],
          contractions: {
            frequency: [2, 2], // in minutes
            duration: [60, 90], // in seconds
            intensity: "Very strong with involuntary pushing",
          },
          description:
            "The baby's head becomes visible (crowning). The perineum stretches to allow passage of the baby's head.",
          duration: "15-30 minutes.",
          nursing: [
            "Prepare for delivery",
            "Support perineum",
            "Assist healthcare provider",
            "Prepare for newborn care",
            "Continue fetal monitoring",
          ],
        },
      ],
    },
    {
      stage: 3,
      name: "Third Stage: Placental Delivery",
      description:
        "Begins after the birth of the baby and ends with the delivery of the placenta.",
      phases: [
        {
          phase: 1,
          name: "Placental Separation",
          dilation: [10, 10],
          contractions: {
            frequency: [0, 0], // in minutes
            duration: [45, 60], // in seconds
            intensity: "Mild",
          },
          description:
            "The placenta separates from the uterine wall. Signs include a small gush of blood, lengthening of the umbilical cord, and a change in uterine shape.",
          duration: "5-30 minutes.",
          nursing: [
            "Observe for signs of placental separation",
            "Monitor maternal vital signs",
            "Administer oxytocic medications if ordered",
            "Provide fundal massage",
            "Observe for excessive bleeding",
          ],
        },
      ],
    },
    {
      stage: 4,
      name: "Fourth Stage: Recovery",
      description:
        "The first 1-2 hours after delivery of the placenta, focused on maternal stabilization.",
      phases: [
        {
          phase: 1,
          name: "Immediate Postpartum",
          dilation: [10, 10],
          contractions: {
            frequency: [0, 0], // no regular contractions
            duration: [0, 0], // in seconds
            intensity: "Mild cramping",
          },
          description:
            "The uterus contracts to control bleeding. Mother and baby begin bonding. Vital signs stabilize.",
          duration: "1-2 hours after delivery.",
          nursing: [
            "Monitor maternal vital signs frequently",
            "Assess uterine firmness and lochia",
            "Assess perineal integrity",
            "Facilitate parent-infant bonding",
            "Assist with breastfeeding initiation",
            "Monitor bladder status",
            "Provide comfort measures",
          ],
        },
      ],
    },
  ];

  // Cardinal movements of labor for second stage visualization
  const cardinalMovements = [
    {
      name: "Engagement",
      description:
        "The widest diameter of the presenting part enters the pelvic inlet. This often happens before labor in first-time mothers.",
    },
    {
      name: "Descent",
      description:
        "The fetus moves downward through the pelvis, typically occurring with each contraction.",
    },
    {
      name: "Flexion",
      description:
        "The fetal chin tucks to chest, presenting the smallest diameter of the head to the pelvis.",
    },
    {
      name: "Internal Rotation",
      description:
        "The fetal head rotates from a transverse position to an anterior position as it descends through the birth canal.",
    },
    {
      name: "Extension",
      description:
        "The fetal head extends (chin moves away from chest) as it passes under the pubic arch.",
    },
    {
      name: "External Rotation",
      description:
        "After delivery of the head, it rotates to align with the shoulders.",
    },
    {
      name: "Expulsion",
      description:
        "Complete birth of the baby as the shoulders and rest of the body are delivered.",
    },
  ];

  // Get current labor phase details
  const getCurrentStageDetails = () => {
    return laborStages.find((stage) => stage.stage === currentStage);
  };

  const getCurrentPhaseDetails = () => {
    const stage = getCurrentStageDetails();
    if (!stage) return null;
    return stage.phases.find((phase) => phase.phase === currentPhase);
  };

  // Start/stop simulation
  const toggleSimulation = () => {
    if (simulationComplete) {
      // Reset simulation
      setCurrentStage(1);
      setCurrentPhase(1);
      setCervicalDilation(0);
      setContractionFrequency(20);
      setContractionIntensity("None");
      setSimulationComplete(false);
      setSimulationRunning(true);
    } else {
      setSimulationRunning(!simulationRunning);
    }
  };

  // Animation for the labor progression
  useEffect(() => {
    let interval;

    if (simulationRunning && !simulationComplete) {
      const speed = 4000 / simulationSpeed; // Adjust the speed of the simulation

      interval = setInterval(() => {
        const currentStageDetails = getCurrentStageDetails();
        const currentPhaseDetails = getCurrentPhaseDetails();

        if (!currentStageDetails || !currentPhaseDetails) {
          clearInterval(interval);
          return;
        }

        // Update cervical dilation
        if (currentStage === 1) {
          setCervicalDilation((prevDilation) => {
            const [minDilation, maxDilation] = currentPhaseDetails.dilation;

            // If reaching the end of the current phase
            if (prevDilation >= maxDilation - 0.5) {
              // Move to next phase or stage
              if (currentPhase < currentStageDetails.phases.length) {
                setCurrentPhase(currentPhase + 1);
              } else {
                setCurrentStage(currentStage + 1);
                setCurrentPhase(1);
              }
            }

            // Increment dilation
            const newDilation = Math.min(prevDilation + 0.5, maxDilation);
            return newDilation;
          });
        } else if (currentStage === 2) {
          // Handle second stage (pushing)
          setTimeout(() => {
            if (currentPhase < currentStageDetails.phases.length) {
              setCurrentPhase(currentPhase + 1);
            } else {
              setCurrentStage(currentStage + 1);
              setCurrentPhase(1);
            }
          }, speed * 4); // Make the second stage last longer
        } else if (currentStage === 3) {
          // Handle third stage (placenta delivery)
          setTimeout(() => {
            setCurrentStage(currentStage + 1);
            setCurrentPhase(1);
          }, speed * 2);
        } else if (currentStage === 4) {
          // End of simulation
          setSimulationComplete(true);
          setSimulationRunning(false);
        }

        // Update contractions
        const [minFreq, maxFreq] = currentPhaseDetails.contractions.frequency;
        if (minFreq !== maxFreq) {
          const freqRange = minFreq - maxFreq;
          const dilationRange =
            currentPhaseDetails.dilation[1] - currentPhaseDetails.dilation[0];
          const dilationProgress =
            (cervicalDilation - currentPhaseDetails.dilation[0]) /
            dilationRange;

          const newFrequency = Math.max(
            minFreq - freqRange * dilationProgress,
            maxFreq
          );
          setContractionFrequency(parseFloat(newFrequency.toFixed(1)));
        } else {
          setContractionFrequency(minFreq);
        }

        setContractionIntensity(currentPhaseDetails.contractions.intensity);

        // Animate contractions
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }, speed);
    }

    return () => clearInterval(interval);
  }, [
    simulationRunning,
    currentStage,
    currentPhase,
    cervicalDilation,
    simulationSpeed,
    simulationComplete,
  ]);

  // Get labor progress as percentage
  const getLaborProgress = () => {
    if (currentStage === 1) {
      // First stage (0-70%)
      const dilationPercentage = (cervicalDilation / 10) * 70;
      return dilationPercentage;
    } else if (currentStage === 2) {
      // Second stage (70-90%)
      return 70 + (currentPhase / 2) * 20;
    } else if (currentStage === 3) {
      // Third stage (90-95%)
      return 90 + (currentPhase / 1) * 5;
    } else if (currentStage === 4) {
      // Fourth stage (95-100%)
      return 95 + (currentPhase / 1) * 5;
    }
    return 0;
  };

  // Render cervix visualization
  const renderCervixVisualization = () => {
    // Calculate the inner circle radius as a percentage of the outer circle
    const dilationPercentage = (cervicalDilation / 10) * 100;

    return (
      <div className="relative mx-auto w-64 h-64 rounded-full border-4 border-indigo-300 flex items-center justify-center bg-indigo-100 overflow-hidden">
        <div className="absolute left-0 right-0 bottom-0 top-0 bg-indigo-100 rounded-full flex items-center justify-center z-10">
          <div
            className="bg-white rounded-full transition-all duration-500"
            style={{
              width: `${dilationPercentage}%`,
              height: `${dilationPercentage}%`,
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            }}
          ></div>
        </div>
        <div className="absolute z-20 text-center">
          <div className="text-3xl font-bold text-indigo-700">
            {cervicalDilation.toFixed(1)} cm
          </div>
          <div className="text-sm text-indigo-600">Cervical Dilation</div>
        </div>
      </div>
    );
  };

  // Render labor timeline
  const renderLaborTimeline = () => {
    const progress = getLaborProgress();

    return (
      <div className="my-6">
        <div className="relative h-10 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Stage markers */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-400"></div>
          <div
            className="absolute top-0 bottom-0 w-px bg-gray-400"
            style={{ left: "70%" }}
          ></div>
          <div
            className="absolute top-0 bottom-0 w-px bg-gray-400"
            style={{ left: "90%" }}
          ></div>
          <div
            className="absolute top-0 bottom-0 w-px bg-gray-400"
            style={{ left: "95%" }}
          ></div>
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gray-400"></div>

          {/* Stage labels */}
          <div
            className="absolute -bottom-6 text-sm font-medium text-gray-700"
            style={{ left: "35%", transform: "translateX(-50%)" }}
          >
            Stage 1
          </div>
          <div
            className="absolute -bottom-6 text-sm font-medium text-gray-700"
            style={{ left: "80%", transform: "translateX(-50%)" }}
          >
            Stage 2
          </div>
          <div
            className="absolute -bottom-6 text-sm font-medium text-gray-700"
            style={{ left: "92.5%", transform: "translateX(-50%)" }}
          >
            Stage 3
          </div>
          <div
            className="absolute -bottom-6 text-sm font-medium text-gray-700"
            style={{ left: "97.5%", transform: "translateX(-50%)" }}
          >
            Stage 4
          </div>

          {/* Current position marker */}
          <div
            className="absolute top-0 bottom-0 w-4 bg-white border-2 border-indigo-700 rounded-full shadow-md transition-all duration-500 transform -translate-x-1/2 z-10"
            style={{ left: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Render contractions visualization
  const renderContractionVisualization = () => {
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-600">
            Contraction Frequency:{" "}
            <span className="font-medium">
              {contractionFrequency > 0
                ? `Every ${contractionFrequency} minutes`
                : "None"}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Intensity:{" "}
            <span className="font-medium">{contractionIntensity}</span>
          </div>
        </div>
        <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-indigo-300 transition-all duration-500 ${
              isAnimating ? "animate-pulse" : ""
            }`}
            style={{
              height: isAnimating ? "100%" : "30%",
              opacity: isAnimating ? "0.8" : "0.5",
            }}
          ></div>
        </div>
      </div>
    );
  };

  // Render second stage visualization
  const renderSecondStageVisualization = () => {
    // Calculate which cardinal movement to display based on the current phase
    const movementIndex =
      currentPhase === 1
        ? Math.floor(contractionFrequency) % 4
        : 4 + (Math.floor(contractionFrequency) % 3);
    const currentMovement = cardinalMovements[movementIndex];

    return (
      <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg mt-6">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">
          Cardinal Movements of Labor:
        </h3>
        <div className="flex items-center">
          <div className="w-16 h-16 flex-shrink-0 rounded-full bg-indigo-200 flex items-center justify-center">
            <span className="text-indigo-700 font-bold">
              {movementIndex + 1}/7
            </span>
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-indigo-600">
              {currentMovement.name}
            </h4>
            <p className="text-sm text-gray-600">
              {currentMovement.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render third stage visualization
  const renderThirdStageVisualization = () => {
    return (
      <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg mt-6">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">
          Placental Delivery:
        </h3>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xs h-32 bg-indigo-100 rounded-lg relative overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 bg-indigo-300 transition-all duration-1000"
              style={{ height: isAnimating ? "90%" : "30%" }}
            ></div>
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
              style={{
                bottom: isAnimating ? "70%" : "10%",
                opacity: isAnimating ? 1 : 0.7,
              }}
            >
              <div className="w-20 h-20 bg-indigo-400 rounded-full"></div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600">
              Signs of placental separation include a small gush of blood,
              lengthening of the umbilical cord, and the uterus becoming firm
              and globular.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render fourth stage visualization
  const renderFourthStageVisualization = () => {
    return (
      <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg mt-6">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">
          Postpartum Recovery:
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-200 flex items-center justify-center">
              <span className="text-indigo-700 font-bold">1</span>
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-indigo-600">
                Uterine Involution
              </h4>
              <p className="text-sm text-gray-600">
                The uterus contracts to control bleeding and begins returning to
                pre-pregnancy size.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-200 flex items-center justify-center">
              <span className="text-indigo-700 font-bold">2</span>
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-indigo-600">
                Vital Signs Stabilization
              </h4>
              <p className="text-sm text-gray-600">
                Blood pressure, pulse, and temperature are closely monitored.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-200 flex items-center justify-center">
              <span className="text-indigo-700 font-bold">3</span>
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-indigo-600">
                Parent-Infant Bonding
              </h4>
              <p className="text-sm text-gray-600">
                Skin-to-skin contact and initiation of breastfeeding if desired.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Get simulation controls
  const renderSimulationControls = () => {
    return (
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Simulation Controls
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSimulationSpeed(1)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                simulationSpeed === 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Slow
            </button>
            <button
              onClick={() => setSimulationSpeed(2)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                simulationSpeed === 2
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setSimulationSpeed(3)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                simulationSpeed === 3
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Fast
            </button>
          </div>
        </div>
        <button
          onClick={toggleSimulation}
          className={`w-full py-2 rounded-md font-medium transition-colors ${
            simulationRunning
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {simulationComplete
            ? "Restart Simulation"
            : simulationRunning
            ? "Pause Simulation"
            : "Start Simulation"}
        </button>
      </div>
    );
  };

  const currentStageDetails = getCurrentStageDetails();
  const currentPhaseDetails = getCurrentPhaseDetails();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-2 sm:mb-0">
          Labor and Birth Simulation
        </h2>
        {simulationComplete && (
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Simulation Complete ✓
          </div>
        )}
      </div>

      {/* Current stage and phase info */}
      <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="mb-2 sm:mb-0">
            <h3 className="text-xl font-semibold text-indigo-700">
              {currentStageDetails?.name}
            </h3>
            <p className="text-gray-600 mt-1">
              {currentStageDetails?.description}
            </p>
          </div>
          <div className="bg-indigo-100 px-3 py-1 rounded-lg text-indigo-700 font-medium self-start">
            {currentPhaseDetails?.name}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2">
          {/* Labor progress timeline */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Labor Progress
            </h3>
            {renderLaborTimeline()}
          </div>

          {/* Current stage visualization */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Stage Visualization
              </h3>
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((stage) => (
                  <button
                    key={stage}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      currentStage === stage
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() =>
                      stage <= currentStage ? setShowInfo(stage) : null
                    }
                    disabled={stage > currentStage}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {currentStage === 1 && renderCervixVisualization()}
            {currentStage === 2 && renderSecondStageVisualization()}
            {currentStage === 3 && renderThirdStageVisualization()}
            {currentStage === 4 && renderFourthStageVisualization()}

            {renderContractionVisualization()}
          </div>
        </div>

        <div>
          {/* Simulation controls */}
          {renderSimulationControls()}

          {/* Current phase information */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Phase Information
            </h3>
            {currentPhaseDetails && (
              <div>
                <p className="text-gray-600 mb-2">
                  {currentPhaseDetails.description}
                </p>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="text-sm mb-2">
                  <span className="font-medium text-gray-700">
                    Typical Duration:
                  </span>{" "}
                  <span className="text-gray-600">
                    {currentPhaseDetails.duration}
                  </span>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg mt-3">
                  <h4 className="font-medium text-indigo-700 mb-1">
                    Nursing Care:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {currentPhaseDetails.nursing.map((care, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{care}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stage information modal */}
      {showInfo !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-indigo-700">
                  {laborStages[showInfo - 1].name}
                </h3>
                <button
                  onClick={() => setShowInfo(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-600 mb-4">
                {laborStages[showInfo - 1].description}
              </p>

              <div className="space-y-4">
                {laborStages[showInfo - 1].phases.map((phase) => (
                  <div
                    key={phase.phase}
                    className="bg-indigo-50 p-3 rounded-lg"
                  >
                    <h4 className="font-medium text-indigo-700 mb-1">
                      {phase.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {phase.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">
                          Cervical Dilation:
                        </span>
                        <span className="text-gray-600 ml-1">
                          {phase.dilation[0]}-{phase.dilation[1]} cm
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Contractions:
                        </span>
                        <span className="text-gray-600 ml-1">
                          Every {phase.contractions.frequency[0]}-
                          {phase.contractions.frequency[1]} min
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Duration:
                        </span>
                        <span className="text-gray-600 ml-1">
                          {phase.duration}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Intensity:
                        </span>
                        <span className="text-gray-600 ml-1">
                          {phase.contractions.intensity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowInfo(null)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaborSimulation;