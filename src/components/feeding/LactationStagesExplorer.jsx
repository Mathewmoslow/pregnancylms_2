import React, { useState } from "react";

const LactationStagesExplorer = () => {
  const [currentStage, setCurrentStage] = useState("colostrum");
  const [currentDay, setCurrentDay] = useState(1);

  const lactationStages = {
    colostrum: {
      name: "Colostrum (Lactogenesis I)",
      timing: "Pregnancy through 2-3 days postpartum",
      volume: "2-20 mL per feeding",
      color: "#FFD700",
      characteristics: [
        "High in protein (2-4 g/100mL)",
        "Rich in immunoglobulins (especially IgA)",
        "Low in fat and carbohydrates",
        "High in sodium and chloride",
        "Contains growth factors",
        "Laxative effect helps pass meconium",
        "Perfect volume for newborn stomach"
      ],
      benefits: [
        "Provides passive immunity",
        "Establishes gut microbiome",
        "Promotes meconium passage",
        "Perfect nutrition for first days",
        "Anti-inflammatory properties"
      ]
    },
    transitional: {
      name: "Transitional Milk (Lactogenesis II)",
      timing: "Days 2-3 to day 10-14",
      volume: "150-300 mL per feeding",
      color: "#F0E68C",
      characteristics: [
        "Increased lactose content",
        "Increased fat content",
        "Increased vitamin content",
        "Decreased protein concentration",
        "Decreased immunoglobulins",
        "Increased volume production",
        "Milk 'comes in' - breast fullness"
      ],
      benefits: [
        "Supports rapid newborn growth",
        "Increased caloric density",
        "Enhanced vitamin nutrition",
        "Continued immune protection"
      ]
    },
    mature: {
      name: "Mature Milk (Lactogenesis III)",
      timing: "Day 10+ onwards",
      volume: "500-1000 mL per day",
      color: "#F5F5DC",
      characteristics: [
        "Foremilk: watery, thirst-quenching",
        "Hindmilk: rich in fat and calories",
        "Lactose is primary carbohydrate",
        "Fat content varies during feeding",
        "Protein optimized for human babies",
        "Contains over 200 components",
        "Composition changes with baby's needs"
      ],
      benefits: [
        "Complete nutrition for 6+ months",
        "Continued immune protection",
        "Promotes healthy growth",
        "Supports brain development",
        "Changes composition with infant's needs"
      ]
    }
  };

  const timelineData = [
    { day: 1, stage: "colostrum", volume: "2-10 mL", description: "Small amounts perfect for newborn stomach" },
    { day: 2, stage: "colostrum", volume: "5-15 mL", description: "Stomach capacity increasing" },
    { day: 3, stage: "transitional", volume: "15-30 mL", description: "Milk begins to 'come in'" },
    { day: 5, stage: "transitional", volume: "30-60 mL", description: "Volume increasing rapidly" },
    { day: 7, stage: "transitional", volume: "60-90 mL", description: "Approaching mature volumes" },
    { day: 10, stage: "mature", volume: "90-120 mL", description: "Mature milk established" },
    { day: 14, stage: "mature", volume: "120-150 mL", description: "Full production capacity" }
  ];

  const currentStageData = lactationStages[currentStage];
  const dayData = timelineData.find(d => d.day === currentDay) || timelineData[0];

  const renderStageComparison = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {Object.entries(lactationStages).map(([key, stage]) => (
        <div
          key={key}
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            currentStage === key ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setCurrentStage(key)}
        >
          <div className="flex items-center mb-2">
            <div 
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: stage.color }}
            ></div>
            <h3 className="font-semibold">{stage.name}</h3>
          </div>
          <div className="text-sm text-gray-600">{stage.timing}</div>
          <div className="text-sm font-medium">{stage.volume}</div>
        </div>
      ))}
    </div>
  );

  const renderTimeline = () => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Lactation Timeline</h3>
      <div className="relative">
        <input
          type="range"
          min="1"
          max="14"
          value={currentDay}
          onChange={(e) => setCurrentDay(parseInt(e.target.value))}
          className="w-full mb-4"
        />
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>Day 1</span>
          <span>Day 7</span>
          <span>Day 14</span>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="font-semibold">Day {currentDay}</div>
          <div className="text-sm text-gray-600 capitalize">Stage: {dayData.stage}</div>
          <div className="text-sm">Volume per feeding: {dayData.volume}</div>
          <div className="text-sm text-gray-600 mt-1">{dayData.description}</div>
        </div>
      </div>
    </div>
  );

  const renderDetailedView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Characteristics</h3>
        <ul className="space-y-2">
          {currentStageData.characteristics.map((char, index) => (
            <li key={index} className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              <span className="text-sm">{char}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Benefits</h3>
        <ul className="space-y-2">
          {currentStageData.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-6xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Lactation Stages Explorer
      </h2>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Understanding Lactogenesis</h3>
        <p className="text-gray-700">
          Lactation occurs in three distinct stages, each optimized for the infant's changing needs. 
          Explore how breast milk composition evolves from the concentrated colostrum to mature milk.
        </p>
      </div>

      {renderStageComparison()}
      {renderTimeline()}

      <div className="mb-6">
        <div className="border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded-r-lg">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">{currentStageData.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Timing:</span> {currentStageData.timing}
            </div>
            <div>
              <span className="font-medium">Volume:</span> {currentStageData.volume}
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Color:</span>
              <div 
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: currentStageData.color }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {renderDetailedView()}

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Clinical Pearls</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Colostrum is often called "liquid gold" due to its immune properties</li>
          <li>• Transitional milk period is when many mothers worry about "low supply"</li>
          <li>• Mature milk composition changes throughout the day and during feeds</li>
          <li>• Hindmilk's higher fat content provides satiety and weight gain</li>
        </ul>
      </div>
    </div>
  );
};

export default LactationStagesExplorer;
