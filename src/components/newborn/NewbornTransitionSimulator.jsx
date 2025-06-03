import React, { useState, useEffect } from 'react';

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
    const stage = CIRCULATION_STAGES[currentStage];
    
    return (
      <svg viewBox="0 0 500 400" className="w-full h-full">
        {/* Background */}
        <rect width="500" height="400" fill="#f8f9fa" />
        
        {/* Title at top */}
        <text x="250" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1a1a1a">
          {stage.title}
        </text>
        
        {/* Major Vessels - drawn first so they appear behind */}
        <g id="vessels">
          {/* Superior Vena Cava */}
          <path 
            d="M150 80 L150 120" 
            fill="none" 
            stroke="#5C6BC0" 
            strokeWidth="12"
          />
          <text x="130" y="70" fontSize="11" fill="#5C6BC0" fontWeight="500">SVC</text>
          
          {/* Inferior Vena Cava */}
          <path 
            d="M150 220 L150 260" 
            fill="none" 
            stroke="#5C6BC0" 
            strokeWidth="12"
          />
          <text x="130" y="275" fontSize="11" fill="#5C6BC0" fontWeight="500">IVC</text>
          
          {/* Pulmonary Trunk splitting into arteries */}
          <path 
            d="M250 170 L250 140 Q250 120 230 120 L200 120" 
            fill="none" 
            stroke="#1976d2" 
            strokeWidth="10"
          />
          <path 
            d="M250 140 Q250 120 270 120 L300 120" 
            fill="none" 
            stroke="#1976d2" 
            strokeWidth="10"
          />
          <text x="190" y="110" fontSize="11" fill="#1976d2" fontWeight="500">Right PA</text>
          <text x="280" y="110" fontSize="11" fill="#1976d2" fontWeight="500">Left PA</text>
          
          {/* Aorta */}
          <path 
            d="M350 170 L350 140 Q350 100 380 100 L420 100" 
            fill="none" 
            stroke="#d32f2f" 
            strokeWidth="12"
          />
          <text x="430" y="105" fontSize="11" fill="#d32f2f" fontWeight="500">Aorta</text>
          
          {/* Pulmonary Veins */}
          <path 
            d="M300 170 L330 170" 
            fill="none" 
            stroke="#ef5350" 
            strokeWidth="8"
          />
          <path 
            d="M300 200 L330 200" 
            fill="none" 
            stroke="#ef5350" 
            strokeWidth="8"
          />
          <text x="305" y="160" fontSize="10" fill="#ef5350">PV</text>
        </g>
        
        {/* Heart Chambers - with better spacing */}
        <g id="heart">
          {/* Right Atrium */}
          <path 
            d="M120 120 Q120 80 160 80 Q200 80 200 120 L200 170 L120 170 Z" 
            fill="#BBDEFB" 
            stroke="#1565C0" 
            strokeWidth="3"
          />
          <text x="160" y="130" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0D47A1">RA</text>
          
          {/* Left Atrium */}
          <path 
            d="M300 120 Q300 80 340 80 Q380 80 380 120 L380 170 L300 170 Z" 
            fill="#FFCDD2" 
            stroke="#C62828" 
            strokeWidth="3"
          />
          <text x="340" y="130" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#B71C1C">LA</text>
          
          {/* Right Ventricle */}
          <path 
            d="M120 170 L200 170 L200 250 Q160 280 120 250 Z" 
            fill="#90CAF9" 
            stroke="#0D47A1" 
            strokeWidth="3"
          />
          <text x="160" y="210" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0D47A1">RV</text>
          
          {/* Left Ventricle */}
          <path 
            d="M300 170 L380 170 L380 250 Q340 280 300 250 Z" 
            fill="#EF9A9A" 
            stroke="#B71C1C" 
            strokeWidth="3"
          />
          <text x="340" y="210" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#B71C1C">LV</text>
          
          {/* Interventricular Septum */}
          <line 
            x1="200" y1="170" 
            x2="300" y2="170" 
            stroke="#666" 
            strokeWidth="2" 
            strokeDasharray="2,2"
          />
          <line 
            x1="250" y1="170" 
            x2="250" y2="250" 
            stroke="#666" 
            strokeWidth="3"
          />
        </g>
        
        {/* Foramen Ovale - more visible */}
        <g id="foramen-ovale">
          <circle 
            cx="250" 
            cy="145" 
            r="18" 
            fill={stage.shunts.foramenOvale.open ? "#4CAF50" : "#9E9E9E"} 
            stroke="#333" 
            strokeWidth="3" 
            opacity={stage.shunts.foramenOvale.open ? 1 : 0.4}
          />
          <text x="250" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">FO</text>
          
          {/* Flow arrow for FO */}
          {stage.shunts.foramenOvale.open && (
            <g className={isAnimating ? "animate-pulse" : ""}>
              <path 
                d="M220 145 L280 145" 
                fill="none" 
                stroke="#FF5722" 
                strokeWidth="3" 
                markerEnd="url(#arrowhead-fo)"
                opacity={stage.shunts.foramenOvale.flow === "minimal" ? 0.5 : 1}
              />
            </g>
          )}
        </g>
        
        {/* Ductus Arteriosus - more prominent */}
        <g id="ductus-arteriosus">
          {/* Connection between Pulmonary Artery and Aorta */}
          <path 
            d="M270 120 Q310 90 380 100" 
            fill="none" 
            stroke={stage.shunts.ductusArteriosus.open ? "#4CAF50" : "#9E9E9E"} 
            strokeWidth={stage.shunts.ductusArteriosus.open ? "10" : "4"} 
            opacity={stage.shunts.ductusArteriosus.open ? 1 : 0.4}
          />
          
          {/* DA Label with background */}
          <rect x="305" y="85" width="30" height="20" fill="white" opacity="0.9" rx="2"/>
          <text x="320" y="98" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">DA</text>
          
          {/* Flow arrow for DA */}
          {stage.shunts.ductusArteriosus.open && (
            <g className={isAnimating ? "animate-pulse" : ""}>
              <path 
                d="M280 115 L350 105" 
                fill="none" 
                stroke="#2196F3" 
                strokeWidth="3" 
                markerEnd="url(#arrowhead-da)"
                opacity={stage.shunts.ductusArteriosus.flow === "bidirectional" ? 0.5 : 1}
              />
            </g>
          )}
        </g>
        
        {/* Legend Box */}
        <g id="legend">
          <rect x="10" y="320" width="480" height="70" fill="white" stroke="#ddd" strokeWidth="1" rx="5"/>
          <text x="20" y="340" fontSize="12" fontWeight="bold" fill="#333">Legend:</text>
          
          <circle cx="40" cy="360" r="8" fill="#BBDEFB" stroke="#1565C0" strokeWidth="2"/>
          <text x="55" y="365" fontSize="11" fill="#333">Deoxygenated blood</text>
          
          <circle cx="180" cy="360" r="8" fill="#FFCDD2" stroke="#C62828" strokeWidth="2"/>
          <text x="195" y="365" fontSize="11" fill="#333">Oxygenated blood</text>
          
          <circle cx="320" cy="360" r="8" fill="#4CAF50" stroke="#333" strokeWidth="2"/>
          <text x="335" y="365" fontSize="11" fill="#333">Open shunt</text>
          
          <circle cx="420" cy="360" r="8" fill="#9E9E9E" stroke="#333" strokeWidth="2" opacity="0.4"/>
          <text x="435" y="365" fontSize="11" fill="#333">Closed</text>
        </g>
        
        {/* Arrow markers */}
        <defs>
          <marker id="arrowhead-fo" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#FF5722" />
          </marker>
          <marker id="arrowhead-da" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#2196F3" />
          </marker>
        </defs>
        
        {/* Oxygen saturation indicator - repositioned */}
        <g id="oxygen-indicator">
          <rect x="390" y="40" width="100" height="60" fill="white" stroke="#ddd" strokeWidth="2" rx="5"/>
          <text x="440" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#666">O₂ Saturation</text>
          <text 
            x="440" 
            y="85" 
            textAnchor="middle" 
            fontSize="24" 
            fontWeight="bold" 
            fill={oxygenLevel > 90 ? '#4CAF50' : oxygenLevel > 70 ? '#FF9800' : '#F44336'}
          >
            {oxygenLevel}%
          </text>
        </g>
      </svg>
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
