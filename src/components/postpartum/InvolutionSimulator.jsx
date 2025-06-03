import React, { useState, useEffect } from 'react';

const InvolutionSimulator = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedView, setSelectedView] = useState('sagittal'); // sagittal or anterior

  // Define the progression of involution over time
  const involutionStages = [
    {
      day: 0,
      hours: "Immediately postpartum",
      fundalHeight: 20, // cm above pubic symphysis
      uterusWeight: 1000, // grams
      consistency: "Firm with contractions",
      lochia: { type: "Rubra", color: "#8B0000", amount: "Heavy", description: "Bright red blood with small clots" },
      size: 100, // percentage of immediate postpartum size
      clinicalNotes: "Fundus at umbilicus level, regular contractions help control bleeding"
    },
    {
      day: 1,
      hours: "24 hours",
      fundalHeight: 18,
      uterusWeight: 900,
      consistency: "Firm",
      lochia: { type: "Rubra", color: "#8B0000", amount: "Moderate-Heavy", description: "Dark red blood, possible small clots" },
      size: 90,
      clinicalNotes: "Fundus 1-2 cm below umbilicus, afterpains common especially during breastfeeding"
    },
    {
      day: 3,
      hours: "3 days",
      fundalHeight: 15,
      uterusWeight: 700,
      consistency: "Firm",
      lochia: { type: "Rubra", color: "#A52A2A", amount: "Moderate", description: "Dark red/brown blood, decreasing flow" },
      size: 70,
      clinicalNotes: "Fundus 3-4 cm below umbilicus, endometrium regenerating"
    },
    {
      day: 5,
      hours: "5 days",
      fundalHeight: 12,
      uterusWeight: 500,
      consistency: "Firm",
      lochia: { type: "Serosa", color: "#DEB887", amount: "Moderate", description: "Pinkish-brown, serosanguineous" },
      size: 50,
      clinicalNotes: "Fundus at midpoint between umbilicus and symphysis pubis"
    },
    {
      day: 7,
      hours: "1 week",
      fundalHeight: 8,
      uterusWeight: 350,
      consistency: "Firm",
      lochia: { type: "Serosa", color: "#F4A460", amount: "Light-Moderate", description: "Pinkish to brownish discharge" },
      size: 35,
      clinicalNotes: "Fundus palpable just above symphysis pubis, cervix closing"
    },
    {
      day: 10,
      hours: "10 days",
      fundalHeight: 4,
      uterusWeight: 200,
      consistency: "Firm, small",
      lochia: { type: "Alba", color: "#FFFACD", amount: "Light", description: "Yellowish-white discharge" },
      size: 20,
      clinicalNotes: "Fundus barely palpable above symphysis, internal os closed"
    },
    {
      day: 14,
      hours: "2 weeks",
      fundalHeight: 0,
      uterusWeight: 100,
      consistency: "Non-palpable",
      lochia: { type: "Alba", color: "#FFFFF0", amount: "Scant", description: "Light yellow or white discharge" },
      size: 10,
      clinicalNotes: "Uterus descended into true pelvis, no longer palpable abdominally"
    },
    {
      day: 42,
      hours: "6 weeks",
      fundalHeight: 0,
      uterusWeight: 60,
      consistency: "Pre-pregnancy state",
      lochia: { type: "None", color: "#FFFFFF", amount: "None", description: "Discharge resolved" },
      size: 6,
      clinicalNotes: "Complete involution, uterus returned to pre-pregnancy size and position"
    }
  ];

  // Find the appropriate stage based on current day
  const getCurrentStage = () => {
    // If exact day exists, return it
    const exactStage = involutionStages.find(stage => stage.day === currentDay);
    if (exactStage) return exactStage;

    // Otherwise, interpolate between stages
    const prevStage = involutionStages.filter(s => s.day < currentDay).pop();
    const nextStage = involutionStages.find(s => s.day > currentDay);

    if (!prevStage) return involutionStages[0];
    if (!nextStage) return involutionStages[involutionStages.length - 1];

    // Linear interpolation for smooth transitions
    const progress = (currentDay - prevStage.day) / (nextStage.day - prevStage.day);
    
    return {
      day: currentDay,
      hours: `Day ${currentDay}`,
      fundalHeight: prevStage.fundalHeight + (nextStage.fundalHeight - prevStage.fundalHeight) * progress,
      uterusWeight: Math.round(prevStage.uterusWeight + (nextStage.uterusWeight - prevStage.uterusWeight) * progress),
      consistency: progress < 0.5 ? prevStage.consistency : nextStage.consistency,
      lochia: progress < 0.5 ? prevStage.lochia : nextStage.lochia,
      size: prevStage.size + (nextStage.size - prevStage.size) * progress,
      clinicalNotes: progress < 0.5 ? prevStage.clinicalNotes : nextStage.clinicalNotes
    };
  };

  const currentStage = getCurrentStage();

  // Animation effect
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentDay(prev => {
          if (prev >= 42) {
            setIsPlaying(false);
            return 42;
          }
          // Speed up through the middle days
          if (prev < 10) return prev + 1;
          if (prev < 20) return prev + 2;
          return prev + 4;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Render the uterus visualization
  const renderUterusVisualization = () => {
    const baseHeight = 200; // Maximum height in pixels
    const currentHeight = (currentStage.size / 100) * baseHeight;
    const fundalPosition = 250 - (currentStage.fundalHeight * 8); // Position from top

    return (
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-md mx-auto">
        {/* Background anatomy markers */}
        <g opacity="0.3">
          {/* Umbilicus */}
          <line x1="150" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
          <text x="260" y="105" fontSize="12" fill="#666">Umbilicus</text>
          
          {/* Symphysis pubis */}
          <line x1="150" y1="250" x2="250" y2="250" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
          <text x="260" y="255" fontSize="12" fill="#666">Symphysis pubis</text>
        </g>

        {/* Pelvis outline */}
        <path 
          d="M 120 240 Q 200 280 280 240 L 280 300 Q 200 340 120 300 Z"
          fill="none"
          stroke="#ccc"
          strokeWidth="2"
        />

        {/* Uterus shape */}
        {selectedView === 'sagittal' ? (
          // Side view
          <g>
            {/* Uterus body */}
            <ellipse
              cx="200"
              cy={fundalPosition}
              rx={currentHeight * 0.4}
              ry={currentHeight * 0.5}
              fill="#ff9999"
              stroke="#cc6666"
              strokeWidth="2"
              opacity="0.8"
            />
            
            {/* Cervix */}
            <rect
              x="190"
              y={fundalPosition + currentHeight * 0.4}
              width="20"
              height="30"
              rx="5"
              fill="#ffaaaa"
              stroke="#cc6666"
              strokeWidth="2"
            />
            
            {/* Fundal height indicator */}
            {currentStage.fundalHeight > 0 && (
              <g>
                <line
                  x1="100"
                  y1={fundalPosition - currentHeight * 0.5}
                  x2="130"
                  y2={fundalPosition - currentHeight * 0.5}
                  stroke="#0066cc"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text x="50" y={fundalPosition - currentHeight * 0.5 + 5} fontSize="12" fill="#0066cc">
                  {currentStage.fundalHeight} cm
                </text>
              </g>
            )}
          </g>
        ) : (
          // Front view
          <g>
            {/* Uterus body - pear shape */}
            <path
              d={`M 200 ${fundalPosition - currentHeight * 0.5}
                  Q ${200 - currentHeight * 0.4} ${fundalPosition} 
                    200 ${fundalPosition + currentHeight * 0.3}
                  Q ${200 + currentHeight * 0.4} ${fundalPosition}
                    200 ${fundalPosition - currentHeight * 0.5}`}
              fill="#ff9999"
              stroke="#cc6666"
              strokeWidth="2"
              opacity="0.8"
            />
            
            {/* Fallopian tubes */}
            <path
              d={`M ${200 - currentHeight * 0.3} ${fundalPosition - currentHeight * 0.3}
                  Q ${200 - currentHeight * 0.5} ${fundalPosition - currentHeight * 0.4}
                    ${200 - currentHeight * 0.6} ${fundalPosition - currentHeight * 0.3}`}
              fill="none"
              stroke="#cc6666"
              strokeWidth="2"
            />
            <path
              d={`M ${200 + currentHeight * 0.3} ${fundalPosition - currentHeight * 0.3}
                  Q ${200 + currentHeight * 0.5} ${fundalPosition - currentHeight * 0.4}
                    ${200 + currentHeight * 0.6} ${fundalPosition - currentHeight * 0.3}`}
              fill="none"
              stroke="#cc6666"
              strokeWidth="2"
            />
          </g>
        )}

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#0066cc" />
          </marker>
        </defs>

        {/* Labels */}
        <text x="200" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">
          {currentStage.hours}
        </text>
        <text x="200" y="380" textAnchor="middle" fontSize="14" fill="#666">
          Uterus Weight: {currentStage.uterusWeight}g
        </text>
      </svg>
    );
  };

  // Render lochia indicator
  const renderLochiaIndicator = () => {
    const { lochia } = currentStage;
    
    return (
      <div className="bg-white border rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-3">Lochia Assessment</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: lochia.color }}
            />
            <div>
              <div className="font-medium">{lochia.type}</div>
              <div className="text-sm text-gray-600">{lochia.amount}</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{lochia.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Uterine Involution Simulator
      </h2>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Explore the remarkable process of uterine involution - how the uterus returns to its pre-pregnancy state after delivery. 
          This process involves the uterus shrinking from approximately 1000g to 60g over 6 weeks through muscle fiber retraction 
          and autolysis of excess tissue.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedView('sagittal')}
              className={`px-4 py-2 rounded-md ${
                selectedView === 'sagittal' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Side View
            </button>
            <button
              onClick={() => setSelectedView('anterior')}
              className={`px-4 py-2 rounded-md ${
                selectedView === 'anterior' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Front View
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-md ${
                isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isPlaying ? 'Pause' : 'Play'} Animation
            </button>
            <button
              onClick={() => setCurrentDay(0)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Day slider */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Postpartum Day: {currentDay}
          </label>
          <input
            type="range"
            min="0"
            max="42"
            value={currentDay}
            onChange={(e) => setCurrentDay(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Delivery</span>
            <span>1 week</span>
            <span>2 weeks</span>
            <span>6 weeks</span>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Uterus visualization */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4">
            {renderUterusVisualization()}
          </div>
        </div>

        {/* Information panels */}
        <div className="space-y-4">
          {/* Clinical Assessment */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-3">Clinical Assessment</h4>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium text-gray-600">Consistency:</dt>
                <dd className="text-gray-800">{currentStage.consistency}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-600">Fundal Height:</dt>
                <dd className="text-gray-800">
                  {currentStage.fundalHeight > 0 
                    ? `${currentStage.fundalHeight} cm above symphysis`
                    : 'Not palpable abdominally'}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-600">Clinical Notes:</dt>
                <dd className="text-gray-800">{currentStage.clinicalNotes}</dd>
              </div>
            </dl>
          </div>

          {/* Lochia indicator */}
          {renderLochiaIndicator()}

          {/* Key milestones */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Key Milestones</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Day 1-3: Rapid initial descent</li>
              <li>• Day 10: Uterus no longer palpable</li>
              <li>• Day 14: Returns to true pelvis</li>
              <li>• 6 weeks: Complete involution</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Educational notes */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Clinical Pearls</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h5 className="font-medium mb-1">Factors Promoting Involution:</h5>
            <ul className="list-disc list-inside space-y-1">
              <li>Breastfeeding (oxytocin release)</li>
              <li>Early ambulation</li>
              <li>Complete placental expulsion</li>
              <li>Absence of infection</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-1">Signs of Subinvolution:</h5>
            <ul className="list-disc list-inside space-y-1">
              <li>Fundus remains high</li>
              <li>Prolonged lochia rubra</li>
              <li>Boggy uterus</li>
              <li>Excessive bleeding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvolutionSimulator;
