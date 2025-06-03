import React, { useState, useEffect } from "react";

const PregnancyTimeline = () => {
  const [activeWeek, setActiveWeek] = useState(8);
  const [showMilestoneInfo, setShowMilestoneInfo] = useState(null);
  const [showTrimesterChange, setShowTrimesterChange] = useState(false);
  const [previousTrimester, setPreviousTrimester] = useState(null);
  const [milestoneReached, setMilestoneReached] = useState(false);

  // Define milestones
  const milestones = [
    {
      week: 4,
      title: "Heart Begins Beating",
      description:
        "The heart begins to form and starts beating. The neural tube (future brain and spinal cord) is developing.",
    },
    {
      week: 8,
      title: "End of Embryonic Period",
      description:
        "All major organs have begun forming. The embryo now has recognizable facial features and limb buds.",
    },
    {
      week: 12,
      title: "End of First Trimester",
      description:
        "Risk of miscarriage decreases. Genitals formed. Baby can move but mother cannot feel it yet.",
    },
    {
      week: 16,
      title: "Gender Determination",
      description:
        "Gender can be determined by ultrasound. Facial muscles developing. Baby can make facial expressions.",
    },
    {
      week: 20,
      title: "Halfway Point",
      description:
        "Mother may feel movement (quickening). Ultrasound can detect anomalies. Baby develops sleep-wake cycles.",
    },
    {
      week: 24,
      title: "Viability",
      description:
        "Baby could potentially survive outside the womb with intensive medical care. Lungs begin producing surfactant.",
    },
    {
      week: 28,
      title: "Third Trimester Begins",
      description:
        "Rapid brain development. Baby opens eyes and can sense light. Survival rate outside womb increases significantly.",
    },
    {
      week: 32,
      title: "Lung Development",
      description:
        "Lungs continue to mature. Baby gaining weight rapidly. Most babies born at this stage survive.",
    },
    {
      week: 37,
      title: "Full Term",
      description:
        "Baby is considered full term. All organs are developed. Final preparations for birth.",
    },
    {
      week: 40,
      title: "Due Date",
      description: "Average time of delivery. Baby is ready to be born.",
    },
  ];

  // Check if current week is a milestone
  const isCurrentWeekMilestone = () => {
    return milestones.some((milestone) => milestone.week === activeWeek);
  };

  // Get current milestone if available
  const getCurrentMilestone = () => {
    return milestones.find((milestone) => milestone.week === activeWeek);
  };

  // Get current trimester
  const getCurrentTrimester = () => {
    if (activeWeek <= 13) return 1;
    if (activeWeek <= 27) return 2;
    return 3;
  };

  // Effect to detect trimester changes and milestones
  useEffect(() => {
    const currentTrimester = getCurrentTrimester();

    // Check if milestone week
    if (isCurrentWeekMilestone()) {
      setMilestoneReached(true);
      // Auto-clear milestone notification after 3 seconds
      const timer = setTimeout(() => setMilestoneReached(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setMilestoneReached(false);
    }
  }, [activeWeek]);

  // Effect to detect trimester changes
  useEffect(() => {
    const currentTrimester = getCurrentTrimester();

    if (previousTrimester && previousTrimester !== currentTrimester) {
      setShowTrimesterChange(true);
      // Auto-clear trimester change notification after 3 seconds
      const timer = setTimeout(() => setShowTrimesterChange(false), 3000);
      return () => clearTimeout(timer);
    }

    setPreviousTrimester(currentTrimester);
  }, [activeWeek, previousTrimester]);

  // Calculate position along timeline (0-100%)
  const calculatePosition = (week) => {
    return ((week - 4) / 36) * 100;
  };

  // Function to handle milestone hover/click
  const handleMilestoneClick = (index) => {
    setShowMilestoneInfo(showMilestoneInfo === index ? null : index);
    setActiveWeek(milestones[index].week);
  };

  // Week slider change handler
  const handleSliderChange = (e) => {
    setActiveWeek(parseInt(e.target.value));
    setShowMilestoneInfo(null);
  };

  // Find the current developmental stage
  const getDevelopmentalStage = () => {
    if (activeWeek <= 8) return "Embryonic Period";
    if (activeWeek <= 12) return "First Trimester Fetus";
    if (activeWeek <= 27) return "Second Trimester Fetus";
    return "Third Trimester Fetus";
  };

  // Get fetal size information
  const getFetalSize = () => {
    const sizes = {
      4: {
        length: "0.25 inches (6mm)",
        weight: "Less than 0.04 oz",
        comparison: "Poppy seed",
      },
      8: {
        length: "1 inch (2.5cm)",
        weight: "0.04 oz",
        comparison: "Kidney bean",
      },
      12: { length: "3 inches (7.5cm)", weight: "0.5 oz", comparison: "Lime" },
      16: {
        length: "6-7 inches (15-18cm)",
        weight: "3 oz",
        comparison: "Avocado",
      },
      20: { length: "10 inches (25cm)", weight: "10 oz", comparison: "Banana" },
      24: {
        length: "12 inches (30cm)",
        weight: "1.5 lbs",
        comparison: "Corn on the cob",
      },
      28: {
        length: "14-15 inches (35-38cm)",
        weight: "2.5 lbs",
        comparison: "Eggplant",
      },
      32: {
        length: "16-17 inches (40-43cm)",
        weight: "4 lbs",
        comparison: "Pineapple",
      },
      36: {
        length: "18-19 inches (45-48cm)",
        weight: "6 lbs",
        comparison: "Honeydew melon",
      },
      40: {
        length: "20 inches (50cm)",
        weight: "7.5 lbs",
        comparison: "Watermelon",
      },
    };

    // Find the closest week that has size data
    const closestWeek = Object.keys(sizes)
      .map(Number)
      .reduce((prev, curr) =>
        Math.abs(curr - activeWeek) < Math.abs(prev - activeWeek) ? curr : prev
      );

    return sizes[closestWeek];
  };

  // Get key developmental points for current week
  const getDevelopmentalPoints = () => {
    const developmentByWeek = {
      4: [
        "Neural tube forming",
        "Heart begins to beat",
        "Arm and leg buds appear",
        "Primitive digestive system",
      ],
      5: [
        "Eyes begin to develop",
        "Brain hemispheres forming",
        "Heart chambers forming",
        "Umbilical cord developing",
      ],
      6: [
        "Nose, mouth and ears beginning to take shape",
        "Intestines developing",
        "Lungs begin to form",
        "Hand plates forming",
      ],
      7: [
        "Digits (fingers and toes) beginning to form",
        "Liver producing red blood cells",
        "Brain growing rapidly",
        "Kidneys formed",
      ],
      8: [
        "All essential organs begun to form",
        "Tail disappearing",
        "Facial features continue to develop",
        "Beginning of primitive brain activity",
      ],
      9: [
        "External genitalia begin to form",
        "Muscles developing",
        "Hair follicles forming",
        "Arms grow and elbows develop",
      ],
      10: [
        "Vital organs continue to develop",
        "Fingers and toes fully separated",
        "Brain development rapid",
        "Eyelids and outer ears formed",
      ],
      11: [
        "Tooth buds for baby teeth appear",
        "Nasal passages open",
        "Many blood vessels visible through thin skin",
        "Spontaneous limb movements",
      ],
      12: [
        "Vocal cords forming",
        "Liver and kidneys producing waste products",
        "Reflexes developing",
        "Fingers and toes have distinct nails",
      ],
      13: [
        "Fetus begins to make active movements",
        "Fingerprints forming",
        "Bone tissue hardening",
        "Can swallow amniotic fluid",
      ],
      14: [
        "Gender can be distinguished",
        "Can make facial expressions",
        "Lanugo (fine hair) covers body",
        "Liver and spleen produce blood cells",
      ],
      15: [
        "Bones becoming harder",
        "Scalp hair pattern established",
        "Legs growing longer than arms",
        "Makes coordinated limb movements",
      ],
      16: [
        "Facial muscles better developed (can grimace)",
        "Heart pumps 25 quarts of blood daily",
        "Active movement (not yet felt by mother)",
        "Develops sucking reflex",
      ],
      17: [
        "Fat stores beginning to develop",
        "Skeleton ossifying (hardening)",
        "Stronger movements",
        "Sweat glands forming",
      ],
      18: [
        "Beginning of myelin formation (nerve insulator)",
        "Mother may feel movement (quickening)",
        "Ears stand out from head",
        "Reach and grasp reflexes developing",
      ],
      19: [
        "Vernix caseosa (waxy coating) covers skin",
        "Body proportions more like a newborn",
        "Hearing developed enough to hear mother's heartbeat",
        "Regular sleep/wake cycles",
      ],
      20: [
        "Can hear sounds outside mother's body",
        "Has definite sleeping pattern",
        "Produces meconium (first stool)",
        "Skin thickening",
      ],
      21: [
        "Rapid eye movements (REM) begin",
        "Eyebrows and eyelids fully formed",
        "Skin wrinkly, translucent",
        "Digestive system developing",
      ],
      22: [
        "Eyes formed but iris lacks pigmentation",
        "Sense of touch well developed",
        "Can recognize mother's voice",
        "Grip strong enough to support weight momentarily",
      ],
      23: [
        "Substantial weight gain begins",
        "Lungs developing rapidly",
        "Bone marrow begins making blood cells",
        "Has fingerprints and footprints",
      ],
      24: [
        "Considered viable (chances of survival outside womb with medical help)",
        "Lung cells begin producing surfactant",
        "Taste buds forming",
        "Real hair begins to grow",
      ],
      25: [
        "Blood vessels in lungs developing",
        "Has a strong grasp",
        "Responds to sounds consistently",
        "Brain waves show rapid eye movement (REM) sleep",
      ],
      26: [
        "Eyes open",
        "Eyelashes formed",
        "Inhaling and exhaling amniotic fluid",
        "Can respond to sounds with increased pulse",
      ],
      27: [
        "Brain growing rapidly",
        "Retinas become sensitive to light",
        "Recognizes mother's voice",
        "Shows distinct patterns of activity and rest",
      ],
      28: [
        "Rapid brain development",
        "Begins storing vital minerals",
        "Can distinguish between light and dark",
        "Significant increase in body fat",
      ],
      29: [
        "Begins to regulate body temperature",
        "Head grows larger to accommodate brain",
        "Can detect and process more complex sounds",
        "More coordinated movements",
      ],
      30: [
        "Bone marrow now controls red blood cell production",
        "More body fat accumulating",
        "Blood circulation well established",
        "Stronger immune system",
      ],
      31: [
        "Lungs more developed but not fully mature",
        "Central nervous system now regulating rhythmic breathing movements",
        "More consistent sleep-wake patterns",
        "Responds to light",
      ],
      32: [
        "Fingernails reach fingertips",
        "Rapid brain development continues",
        "More subcutaneous fat",
        "Less transparency to skin",
      ],
      33: [
        "Lungs continue to mature",
        "Coordination improving",
        "Can detect light and dark",
        "Pupils can constrict and dilate",
      ],
      34: [
        "Immune system developing",
        "Most systems well developed",
        "Brain connections increasing",
        "Fat accumulating for temperature regulation",
      ],
      35: [
        "Kidney function mature",
        "Liver processing waste products",
        "Hearing fully developed",
        "Ready for directional hearing",
      ],
      36: [
        "Firm grasp",
        "Sleeps 85-90% of the time",
        "Head usually positioned down into pelvis",
        "Skin smooth and pink",
      ],
      37: [
        'Considered "early term"',
        "Organs capable of functioning outside the womb",
        "Toenails reach toe tips",
        "Most reflexes present",
      ],
      38: [
        "Lungs considered mature",
        "Ready for life outside the womb",
        "Strong sucking reflex",
        "Coordinated swallowing and breathing",
      ],
      39: [
        "Full brain development continues",
        "Chest becomes more prominent",
        "Baby gains about half a pound a week",
        "Immune system strengthening",
      ],
      40: [
        "Average time of delivery (though normal range is 37-42 weeks)",
        "Average newborn: 7.5 lbs, 20 inches",
        "Most body systems ready for outside world",
        "Brain development continues after birth",
      ],
    };

    // Get development points for the current week
    return developmentByWeek[activeWeek] || [];
  };

  const fetalSize = getFetalSize();
  const currentTrimester = getCurrentTrimester();
  const currentMilestone = getCurrentMilestone();

  // Get trimester color
  const getTrimesterColor = () => {
    switch (currentTrimester) {
      case 1:
        return "from-blue-500 to-indigo-600";
      case 2:
        return "from-indigo-500 to-purple-600";
      case 3:
        return "from-purple-500 to-pink-600";
      default:
        return "from-indigo-500 to-purple-600";
    }
  };

  // Get trimester badge color
  const getTrimesterBadgeColor = () => {
    switch (currentTrimester) {
      case 1:
        return "bg-blue-600";
      case 2:
        return "bg-indigo-600";
      case 3:
        return "bg-purple-600";
      default:
        return "bg-indigo-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-6xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
        Interactive Pregnancy Timeline
      </h2>

      {/* Notification banners for trimester transitions and milestones */}
      {showTrimesterChange && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg bg-gradient-to-r ${getTrimesterColor()} text-white font-bold animate-bounce`}
        >
          Now entering Trimester {currentTrimester}!
        </div>
      )}

      {milestoneReached && currentMilestone && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg bg-yellow-400 text-gray-800 font-bold animate-pulse">
          Milestone Reached: {currentMilestone.title}
        </div>
      )}

      {/* Current week information */}
      <div
        className={`bg-gradient-to-r ${getTrimesterColor()} text-white p-3 sm:p-4 rounded-lg mb-6 transition-all duration-700`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <h3 className="text-xl font-semibold mb-2 sm:mb-0">
            Week {activeWeek}: {getDevelopmentalStage()}
          </h3>
          <span
            className={`${getTrimesterBadgeColor()} text-white px-4 py-1 rounded-full text-sm self-start sm:self-auto font-bold shadow-md`}
          >
            {activeWeek <= 13
              ? "1st Trimester"
              : activeWeek <= 27
              ? "2nd Trimester"
              : "3rd Trimester"}
          </span>
        </div>

        {isCurrentWeekMilestone() && (
          <div className="mt-2 mb-3 bg-white bg-opacity-20 rounded-md p-2 border-l-4 border-yellow-400">
            <span className="font-bold text-yellow-300">Milestone:</span>{" "}
            {currentMilestone?.title}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4">
          <div className="bg-white p-3 rounded shadow text-gray-800">
            <h4 className="font-semibold text-indigo-600">Size</h4>
            <p>Length: {fetalSize.length}</p>
            <p>Weight: {fetalSize.weight}</p>
            <p>Size comparison: {fetalSize.comparison}</p>
          </div>

          <div className="bg-white p-3 rounded shadow md:col-span-2 text-gray-800">
            <h4 className="font-semibold text-indigo-600">
              Development this week
            </h4>
            <ul className="list-disc pl-5 mt-1">
              {getDevelopmentalPoints().map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mb-8 mt-12 px-3">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-2 bg-gradient-to-r ${getTrimesterColor()} rounded-full transition-all duration-500`}
            style={{ width: `${calculatePosition(activeWeek)}%` }}
          ></div>
        </div>

        {/* Trimester markers */}
        <div className="absolute -top-3 left-0 h-8 border-l-2 border-blue-400"></div>
        <div
          className="absolute -top-3 h-8 border-l-2 border-indigo-500"
          style={{ left: "calc(25% - 1px)" }}
        ></div>
        <div
          className="absolute -top-3 h-8 border-l-2 border-purple-500"
          style={{ left: "calc(65% - 1px)" }}
        ></div>

        {/* Week markers */}
        <div className="absolute left-0 -bottom-6 text-xs font-semibold">
          4w
        </div>
        <div
          className="absolute -bottom-6 text-xs font-semibold"
          style={{ left: "25%" }}
        >
          14w
        </div>
        <div
          className="absolute -bottom-6 text-xs font-semibold"
          style={{ left: "50%" }}
        >
          24w
        </div>
        <div
          className="absolute -bottom-6 text-xs font-semibold"
          style={{ left: "75%" }}
        >
          34w
        </div>
        <div className="absolute right-0 -bottom-6 text-xs font-semibold">
          40w
        </div>

        {/* Milestone markers */}
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="absolute -top-4 transition-all duration-300"
            style={{
              left: `${calculatePosition(milestone.week)}%`,
            }}
          >
            <div
              className={`h-8 w-8 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center text-xs font-bold border-2 ${
                activeWeek >= milestone.week
                  ? "bg-yellow-400 text-gray-800 border-yellow-500"
                  : "bg-gray-200 text-gray-600 border-gray-300"
              } ${
                activeWeek === milestone.week ? "animate-pulse shadow-lg" : ""
              }`}
              style={{
                transform: "translateX(-50%)",
              }}
              onClick={() => handleMilestoneClick(index)}
            >
              {milestone.week}
            </div>

            {/* Milestone info popup */}
            {showMilestoneInfo === index && (
              <div
                className="absolute z-10 bg-white shadow-lg rounded-lg p-3 w-64 text-sm mt-2"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <h4 className="font-bold text-indigo-700">{milestone.title}</h4>
                <p className="mt-1">{milestone.description}</p>
              </div>
            )}
          </div>
        ))}

        {/* Trimester labels */}
        <div className="absolute top-5 left-[12%] transform -translate-x-1/2 text-xs font-bold text-blue-600">
          First Trimester
        </div>
        <div className="absolute top-5 left-[45%] transform -translate-x-1/2 text-xs font-bold text-indigo-600">
          Second Trimester
        </div>
        <div className="absolute top-5 left-[82%] transform -translate-x-1/2 text-xs font-bold text-purple-600">
          Third Trimester
        </div>
      </div>

      {/* Week slider */}
      <div className="mt-10 px-3">
        <label
          htmlFor="week-slider"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Slide to explore different weeks of pregnancy
        </label>
        <input
          type="range"
          min="4"
          max="40"
          value={activeWeek}
          onChange={handleSliderChange}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer`}
          id="week-slider"
          style={{
            background: `linear-gradient(to right, 
              #3b82f6 0%, #3b82f6 ${25}%, 
              #4f46e5 ${25}%, #4f46e5 ${65}%, 
              #8b5cf6 ${65}%, #8b5cf6 100%)`,
          }}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs font-medium text-blue-600">Embryo</span>
          <span className="text-xs font-medium text-blue-600">
            1st Trimester
          </span>
          <span className="text-xs font-medium text-indigo-600">
            2nd Trimester
          </span>
          <span className="text-xs font-medium text-purple-600">
            3rd Trimester
          </span>
          <span className="text-xs font-medium text-purple-600">Full Term</span>
        </div>
      </div>

      <div className="mt-8 p-3 sm:p-4 bg-indigo-50 rounded-lg">
        <h3 className="font-semibold text-indigo-700">Key Milestones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <div className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-yellow-400 text-gray-800 flex items-center justify-center text-xs font-bold mr-2 mt-1">
              5
            </div>
            <div>
              <p className="font-medium">Heart Tone (5 weeks)</p>
              <p className="text-sm text-gray-600">
                Heart tone can be seen/heard on Doppler ultrasound
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-yellow-400 text-gray-800 flex items-center justify-center text-xs font-bold mr-2 mt-1">
              20
            </div>
            <div>
              <p className="font-medium">Kick Count (18-20 weeks)</p>
              <p className="text-sm text-gray-600">
                Mother begins to feel movement consistently
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-yellow-400 text-gray-800 flex items-center justify-center text-xs font-bold mr-2 mt-1">
              24
            </div>
            <div>
              <p className="font-medium">Viability (24 weeks)</p>
              <p className="text-sm text-gray-600">
                Baby could potentially survive outside the womb with intensive
                care
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-yellow-400 text-gray-800 flex items-center justify-center text-xs font-bold mr-2 mt-1">
              34
            </div>
            <div>
              <p className="font-medium">Lung Maturity (34 weeks)</p>
              <p className="text-sm text-gray-600">
                Lungs are mature enough that baby has good chance of surviving
                without respiratory support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyTimeline;