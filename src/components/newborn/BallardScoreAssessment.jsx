import React, { useState } from 'react';

const BallardScoreAssessment = () => {
  const [neuromuscularScores, setNeuromuscularScores] = useState({
    posture: 0,
    squareWindow: 0,
    armRecoil: 0,
    poplitealAngle: 0,
    scarfSign: 0,
    heelToEar: 0
  });

  const [physicalScores, setPhysicalScores] = useState({
    skin: 0,
    lanugo: 0,
    plantarSurface: 0,
    breast: 0,
    eyeEar: 0,
    genitals: 0
  });

  const neuromuscularCriteria = {
    posture: [
      { score: 0, description: "Arms and legs extended" },
      { score: 1, description: "Slight flexion of hips and knees" },
      { score: 2, description: "Moderate flexion of hips and knees" },
      { score: 3, description: "Arms slightly flexed, legs well flexed" },
      { score: 4, description: "Full flexion of arms and legs" }
    ],
    squareWindow: [
      { score: 0, description: ">90°" },
      { score: 1, description: "90°" },
      { score: 2, description: "60°" },
      { score: 3, description: "45°" },
      { score: 4, description: "30°" },
      { score: 5, description: "0°" }
    ],
    armRecoil: [
      { score: 0, description: "No recoil (180°)" },
      { score: 1, description: "Sluggish recoil (140-180°)" },
      { score: 2, description: "Quick recoil (110-140°)" },
      { score: 3, description: "Very quick recoil (90-110°)" },
      { score: 4, description: "Immediate recoil (<90°)" }
    ],
    poplitealAngle: [
      { score: 0, description: "180°" },
      { score: 1, description: "160°" },
      { score: 2, description: "140°" },
      { score: 3, description: "120°" },
      { score: 4, description: "100°" },
      { score: 5, description: "90°" },
      { score: 6, description: "<90°" }
    ],
    scarfSign: [
      { score: 0, description: "Elbow reaches opposite axillary line" },
      { score: 1, description: "Elbow between midline and opposite axillary line" },
      { score: 2, description: "Elbow reaches midline" },
      { score: 3, description: "Elbow does not reach midline" }
    ],
    heelToEar: [
      { score: 0, description: "Heel reaches ear easily" },
      { score: 1, description: "Heel close to ear" },
      { score: 2, description: "Heel reaches nose level" },
      { score: 3, description: "Heel reaches eye level" },
      { score: 4, description: "Heel barely lifted" }
    ]
  };

  const physicalCriteria = {
    skin: [
      { score: 0, description: "Sticky, friable, transparent" },
      { score: 1, description: "Gelatinous, red, translucent" },
      { score: 2, description: "Smooth pink, visible veins" },
      { score: 3, description: "Superficial peeling, few veins" },
      { score: 4, description: "Cracking, pale areas, no veins" },
      { score: 5, description: "Parchment, deep cracking" },
      { score: 6, description: "Leathery, cracked, wrinkled" }
    ],
    lanugo: [
      { score: 0, description: "None" },
      { score: 1, description: "Sparse" },
      { score: 2, description: "Abundant" },
      { score: 3, description: "Thinning" },
      { score: 4, description: "Bald areas" },
      { score: 5, description: "Mostly bald" }
    ],
    plantarSurface: [
      { score: 0, description: "Heel-toe <40mm" },
      { score: 1, description: "Faint red marks" },
      { score: 2, description: "Anterior transverse crease only" },
      { score: 3, description: "Creases anterior 2/3" },
      { score: 4, description: "Creases over entire sole" }
    ],
    breast: [
      { score: 0, description: "Imperceptible" },
      { score: 1, description: "Barely perceptible" },
      { score: 2, description: "Flat areola, no bud" },
      { score: 3, description: "Stippled areola, 1-2mm bud" },
      { score: 4, description: "Raised areola, 3-4mm bud" },
      { score: 5, description: "Full areola, 5-10mm bud" }
    ],
    eyeEar: [
      { score: 0, description: "Lids fused loosely/tightly" },
      { score: 1, description: "Lids open, pinna flat" },
      { score: 2, description: "Slightly curved pinna" },
      { score: 3, description: "Well-curved pinna, soft" },
      { score: 4, description: "Formed & firm, instant recoil" },
      { score: 5, description: "Thick cartilage, stiff ear" }
    ],
    genitals: [
      { score: 0, description: "Male: scrotum flat / Female: clitoris prominent" },
      { score: 1, description: "Male: scrotum empty / Female: prominent clitoris & labia minora" },
      { score: 2, description: "Male: testes in upper canal / Female: prominent clitoris, enlarging minora" },
      { score: 3, description: "Male: testes descending / Female: majora & minora equally prominent" },
      { score: 4, description: "Male: testes down / Female: majora large, minora small" },
      { score: 5, description: "Male: testes pendulous / Female: majora cover clitoris & minora" }
    ]
  };

  const calculateTotalScore = () => {
    const neuroTotal = Object.values(neuromuscularScores).reduce((sum, score) => sum + score, 0);
    const physicalTotal = Object.values(physicalScores).reduce((sum, score) => sum + score, 0);
    return neuroTotal + physicalTotal;
  };

  const calculateGestationalAge = (totalScore) => {
    // Simplified conversion - actual Ballard chart has more precise values
    return Math.round(20 + (totalScore * 0.5));
  };

  const totalScore = calculateTotalScore();
  const gestationalAge = calculateGestationalAge(totalScore);

  const updateNeuromuscularScore = (criterion, score) => {
    setNeuromuscularScores(prev => ({ ...prev, [criterion]: score }));
  };

  const updatePhysicalScore = (criterion, score) => {
    setPhysicalScores(prev => ({ ...prev, [criterion]: score }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Ballard Score Assessment
      </h2>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          The Ballard Score assesses gestational age by evaluating neuromuscular and physical maturity. 
          Select the description that best matches the infant's characteristics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Neuromuscular Maturity */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">Neuromuscular Maturity</h3>
          <div className="space-y-4">
            {Object.entries(neuromuscularCriteria).map(([criterion, options]) => (
              <div key={criterion} className="border rounded-lg p-4">
                <h4 className="font-medium capitalize mb-2">{criterion.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <div className="space-y-2">
                  {options.map((option) => (
                    <label key={option.score} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`neuro-${criterion}`}
                        value={option.score}
                        checked={neuromuscularScores[criterion] === option.score}
                        onChange={() => updateNeuromuscularScore(criterion, option.score)}
                        className="text-indigo-600"
                      />
                      <span className="text-sm">
                        <span className="font-medium">{option.score}:</span> {option.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Maturity */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">Physical Maturity</h3>
          <div className="space-y-4">
            {Object.entries(physicalCriteria).map(([criterion, options]) => (
              <div key={criterion} className="border rounded-lg p-4">
                <h4 className="font-medium capitalize mb-2">{criterion.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <div className="space-y-2">
                  {options.map((option) => (
                    <label key={option.score} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`physical-${criterion}`}
                        value={option.score}
                        checked={physicalScores[criterion] === option.score}
                        onChange={() => updatePhysicalScore(criterion, option.score)}
                        className="text-indigo-600"
                      />
                      <span className="text-sm">
                        <span className="font-medium">{option.score}:</span> {option.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{Object.values(neuromuscularScores).reduce((sum, score) => sum + score, 0)}</div>
            <div className="text-sm">Neuromuscular Score</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{Object.values(physicalScores).reduce((sum, score) => sum + score, 0)}</div>
            <div className="text-sm">Physical Score</div>
          </div>
          <div className="border-l-2 border-white/30 pl-4">
            <div className="text-4xl font-bold">{totalScore}</div>
            <div className="text-sm">Total Score</div>
            <div className="text-lg mt-2">≈ {gestationalAge} weeks</div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Clinical Note</h4>
        <p className="text-sm text-yellow-700">
          The Ballard Score is most accurate when performed within 12-24 hours after birth. 
          Results should be interpreted alongside other clinical findings and maternal history.
        </p>
      </div>
    </div>
  );
};

export default BallardScoreAssessment;
