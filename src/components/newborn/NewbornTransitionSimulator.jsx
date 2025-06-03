import React, { useState, useEffect } from 'react';
import SimpleFetalCirculation from './SimpleFetalCirculation';import FetalCirculationDiagram from './FetalCirculationDiagram';

// Move stages outside the component since it's constant
const CIRCULATION_STAGES = {
  fetal: {
    title: "Fetal Circulation",
    oxygenLevel: 45,
    shunts: {
      foramenOvale: { open: true, flow: "right-to-left" },
      ductusArteriosus: { open: true, flow: "right-to-left" }
    },
    description: "In utero, oxygenated blood from placenta bypasses liver and lungs"
  },
  transition: {
    title: "Transitional Circulation",
    oxygenLevel: 75,
    shunts: {
      foramenOvale: { open: true, flow: "minimal" },
      ductusArteriosus: { open: true, flow: "bidirectional" }
    },
    description: "First breaths trigger dramatic circulatory changes"
  },
  newborn: {
    title: "Newborn Circulation",
    oxygenLevel: 95,
    shunts: {
      foramenOvale: { open: false, flow: "none" },
      ductusArteriosus: { open: false, flow: "none" }
    },
    description: "Adult-type circulation established with closed fetal shunts"
  }
};

const NewbornTransitionSimulator = () => {
  const [currentStage, setCurrentStage] = useState('fetal');
  const [isAnimating, setIsAnimating] = useState(false);
  const [oxygenLevel, setOxygenLevel] = useState(45);

  // Dynamic physiological changes based on current stage
  const getPhysiologicalChanges = () => {
    const changes = {
      fetal: [
        { 
          system: "Respiratory",
          status: "Fluid-filled lungs",
          details: "No gas exchange, surfactant production",
          color: "text-blue-600"
        },
        {
          system: "Pulmonary Blood Flow",
          status: "Minimal (10% cardiac output)",
          details: "High pulmonary vascular resistance",
          color: "text-blue-600"
        },
        {
          system: "Oxygen Source",
          status: "Placenta",
          details: "O₂ via umbilical vein (SpO₂ ~45%)",
          color: "text-blue-600"
        },
        {
          system: "Shunt Flow",
          status: "Right-to-left shunting",
          details: "FO & DA bypass lungs",
          color: "text-blue-600"
        }
      ],
      transition: [
        { 
          system: "Respiratory",
          status: "First breaths taken",
          details: "Lung expansion, fluid clearing",
          color: "text-purple-600"
        },
        {
          system: "Pulmonary Blood Flow",
          status: "Rapidly increasing",
          details: "PVR dropping with O₂ exposure",
          color: "text-purple-600"
        },
        {
          system: "Oxygen Source",
          status: "Switching to lungs",
          details: "Mixed source (SpO₂ ~75%)",
          color: "text-purple-600"
        },
        {
          system: "Shunt Flow",
          status: "Reversing/decreasing",
          details: "FO & DA flow changing direction",
          color: "text-purple-600"
        }
      ],
      newborn: [
        { 
          system: "Respiratory",
          status: "Air-filled lungs",
          details: "Primary gas exchange established",
          color: "text-green-600"
        },
        {
          system: "Pulmonary Blood Flow",
          status: "Full cardiac output",
          details: "Low pulmonary vascular resistance",
          color: "text-green-600"
        },
        {
          system: "Oxygen Source",
          status: "Lungs only",
          details: "Full oxygenation (SpO₂ ~95%)",
          color: "text-green-600"
        },
        {
          system: "Shunt Flow",
          status: "Shunts closed",
          details: "Adult circulation pattern",
          color: "text-green-600"
        }
      ]
    };

    return changes[currentStage] || changes.fetal;
  };

  // Key events for each stage
  const getKeyEvents = () => {
    const events = {
      fetal: [
        "Placenta provides gas exchange",
        "Ductus venosus bypasses liver",
        "Foramen ovale shunts blood L→R",
        "Ductus arteriosus bypasses lungs"
      ],
      transition: [
        "First breath → lung expansion",
        "↑ O₂ → pulmonary vasodilation",
        "Cord clamped → ↑ SVR",
        "Pressure changes reverse shunts"
      ],
      newborn: [
        "Foramen ovale functionally closed",
        "Ductus arteriosus constricting",
        "Full pulmonary blood flow",
        "Established respiratory pattern"
      ]
    };

    return events[currentStage] || events.fetal;
  };

  // Now the effect doesn't need to depend on stages since it's outside the component
  useEffect(() => {
    setOxygenLevel(CIRCULATION_STAGES[currentStage].oxygenLevel);
  }, [currentStage]);

  const handleStageChange = (stage) => {
    setIsAnimating(true);
    setCurrentStage(stage);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const renderHeart = () => {
    return (
      <SimpleFetalCirculation 
        showTransition={currentStage === 'newborn'} 
        oxygenLevel={oxygenLevel}
      />
    );
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mx-auto max-w-7xl">
      <h2 className="text-xl font-bold text-indigo-600 mb-3">
        Newborn Circulatory Transition Simulator
      </h2>
      
      <div className="bg-indigo-50 p-3 rounded-lg mb-4">
        <p className="text-sm text-gray-700">
          Explore the dramatic changes in circulation that occur as a baby transitions from fetal to newborn life.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {Object.entries(CIRCULATION_STAGES).map(([key, stage]) => (
          <button 
            key={key} 
            onClick={() => handleStageChange(key)} 
            className={`px-4 py-1.5 rounded-md transition-all text-sm ${
              currentStage === key 
                ? "bg-indigo-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {stage.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Heart diagram */}
        <div className="lg:col-span-1">
          <div className="relative">
            {renderHeart()}
          </div>
          
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">{CIRCULATION_STAGES[currentStage].description}</p>
          </div>
        </div>

        {/* Dynamic physiological status */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className={`px-3 py-2 text-sm font-semibold text-white ${
              currentStage === 'fetal' ? 'bg-blue-600' : 
              currentStage === 'transition' ? 'bg-purple-600' : 
              'bg-green-600'
            }`}>
              Current Status
            </div>
            <div className="p-3">
              <div className="space-y-3">
                {getPhysiologicalChanges().map((change, index) => (
                  <div key={index} className="border-b last:border-0 pb-2 last:pb-0">
                    <div className={`font-semibold text-sm ${change.color}`}>
                      {change.system}
                    </div>
                    <div className="text-xs text-gray-800 font-medium mt-1">
                      {change.status}
                    </div>
                    <div className="text-xs text-gray-600">
                      {change.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key events and shunt details */}
        <div className="lg:col-span-1 space-y-3">
          {/* Key Events */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className={`px-3 py-2 text-sm font-semibold text-white ${
              currentStage === 'fetal' ? 'bg-blue-600' : 
              currentStage === 'transition' ? 'bg-purple-600' : 
              'bg-green-600'
            }`}>
              Key Events
            </div>
            <div className="p-3">
              <ul className="space-y-1">
                {getKeyEvents().map((event, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start">
                    <span className="text-indigo-600 mr-1">•</span>
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Shunt Status Summary */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded-r-lg">
            <h4 className="font-semibold text-indigo-700 text-sm mb-2">Shunt Status</h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-medium">Foramen Ovale:</span>{' '}
                <span className={CIRCULATION_STAGES[currentStage].shunts.foramenOvale.open ? "text-green-600" : "text-red-600"}>
                  {CIRCULATION_STAGES[currentStage].shunts.foramenOvale.open ? "Open" : "Closed"}
                </span>
                {CIRCULATION_STAGES[currentStage].shunts.foramenOvale.open && (
                  <span className="text-gray-600"> ({CIRCULATION_STAGES[currentStage].shunts.foramenOvale.flow})</span>
                )}
              </div>
              <div>
                <span className="font-medium">Ductus Arteriosus:</span>{' '}
                <span className={CIRCULATION_STAGES[currentStage].shunts.ductusArteriosus.open ? "text-green-600" : "text-red-600"}>
                  {CIRCULATION_STAGES[currentStage].shunts.ductusArteriosus.open ? "Open" : "Closed"}
                </span>
                {CIRCULATION_STAGES[currentStage].shunts.ductusArteriosus.open && (
                  <span className="text-gray-600"> ({CIRCULATION_STAGES[currentStage].shunts.ductusArteriosus.flow})</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-lg">
        <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Clinical Pearls</h4>
        <ul className="text-xs text-yellow-700 space-y-0.5">
          <li>• Patent ductus arteriosus (PDA) is common in preterm infants due to immature response to oxygen</li>
          <li>• Persistent pulmonary hypertension (PPHN) prevents normal transition and requires immediate intervention</li>
          <li>• Delayed cord clamping (30-60 seconds) allows gradual transition and improves outcomes</li>
          <li>• Hypothermia and acidosis can reverse the transition, reopening fetal shunts</li>
        </ul>
      </div>
    </div>
  );
};

export default NewbornTransitionSimulator;
