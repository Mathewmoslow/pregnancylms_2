
import React from 'react';

const FetalCirculationDiagram = () => {

  return (

    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">

      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4 text-center">

        Fetal Circulation

      </h2>

      

      <svg viewBox="0 0 800 600" className="w-full h-auto">

        {/* Background */}

        <rect width="800" height="600" fill="#f8f9fa"/>

        

        {/* Heart chambers */}

        <g id="heart">

          {/* Right Atrium */}

          <rect x="200" y="150" width="120" height="100" fill="#a3c2e0" stroke="#2c5aa0" strokeWidth="3" rx="10"/>

          <text x="260" y="200" textAnchor="middle" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#1a365d">RA</text>

          

          {/* Right Ventricle */}

          <rect x="200" y="250" width="120" height="120" fill="#7fa3c9" stroke="#2c5aa0" strokeWidth="3" rx="10"/>

          <text x="260" y="310" textAnchor="middle" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#1a365d">RV</text>

          

          {/* Left Atrium */}

          <rect x="320" y="150" width="120" height="100" fill="#f5b3b3" stroke="#c53030" strokeWidth="3" rx="10"/>

          <text x="380" y="200" textAnchor="middle" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#742a2a">LA</text>

          

          {/* Left Ventricle */}

          <rect x="320" y="250" width="120" height="120" fill="#e88c8c" stroke="#c53030" strokeWidth="3" rx="10"/>

          <text x="380" y="310" textAnchor="middle" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#742a2a">LV</text>

        </g>

        

        {/* Foramen Ovale */}

        <ellipse cx="320" cy="200" rx="25" ry="35" fill="#ff9500" stroke="#d97706" strokeWidth="3"/>

        <text x="320" y="208" textAnchor="middle" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white">FO</text>

        

        {/* Arrow through FO */}

        <path d="M 290 200 L 350 200" stroke="#ff9500" strokeWidth="8" fill="none" markerEnd="url(#arrowOrange)"/>

        

        {/* Major vessels */}

        {/* SVC */}

        <rect x="240" y="80" width="40" height="70" fill="#a3c2e0" stroke="#2c5aa0" strokeWidth="2"/>

        <text x="260" y="115" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#1a365d">SVC</text>

        

        {/* IVC */}

        <rect x="240" y="370" width="40" height="70" fill="#a3c2e0" stroke="#2c5aa0" strokeWidth="2"/>

        <text x="260" y="410" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#1a365d">IVC</text>

        

        {/* Pulmonary Artery */}

        <path d="M 260 250 L 260 180 Q 260 160 280 160 L 450 160" stroke="#5b8dbf" strokeWidth="20" fill="none"/>

        <text x="355" y="155" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#1a365d">Pulmonary Artery</text>

        

        {/* Ductus Arteriosus */}

        <path d="M 450 160 Q 470 160 470 180 L 470 220" stroke="#16a34a" strokeWidth="16" fill="none" markerEnd="url(#arrowGreen)"/>

        <rect x="480" y="170" width="40" height="40" fill="#d4edda" stroke="#16a34a" strokeWidth="2" rx="5"/>

        <text x="500" y="195" textAnchor="middle" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#14532d">DA</text>

        

        {/* Aorta */}

        <path d="M 380 250 L 380 220 Q 380 200 400 200 L 470 200 Q 490 200 490 220 L 490 400" stroke="#dc2626" strokeWidth="20" fill="none"/>

        <text x="480" y="300" textAnchor="start" fontFamily="Arial" fontSize="16" fill="#7f1d1d">Aorta</text>

        

        {/* Placenta */}

        <ellipse cx="650" cy="400" rx="80" ry="60" fill="#fce7f3" stroke="#ec4899" strokeWidth="3"/>

        <text x="650" y="410" textAnchor="middle" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#831843">PLACENTA</text>

        

        {/* Umbilical vessels */}

        <path d="M 570 400 L 490 400" stroke="#dc2626" strokeWidth="12" fill="none"/>

        <text x="530" y="395" textAnchor="middle" fontFamily="Arial" fontSize="12" fill="#7f1d1d">Umbilical A.</text>

        

        <path d="M 570 380 Q 500 380 440 300 Q 400 250 400 200" stroke="#dc2626" strokeWidth="12" fill="none"/>

        <text x="480" y="340" textAnchor="middle" fontFamily="Arial" fontSize="12" fill="#7f1d1d">Umbilical V.</text>

        

        {/* O2 Saturation box */}

        <g>

          <rect x="550" y="100" width="200" height="80" fill="white" stroke="#6b7280" strokeWidth="2" rx="10"/>

          <text x="650" y="130" textAnchor="middle" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#374151">O₂ Saturation Levels</text>

          <text x="650" y="155" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#dc2626">Umbilical vein: 80%</text>

          <text x="650" y="175" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#2563eb">Mixed venous: 67%</text>

        </g>

        

        {/* Key features box */}

        <g>

          <rect x="50" y="450" width="300" height="120" fill="white" stroke="#6b7280" strokeWidth="2" rx="10"/>

          <text x="200" y="480" textAnchor="middle" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#374151">Key Fetal Shunts</text>

          <circle cx="80" cy="505" r="8" fill="#ff9500"/>

          <text x="95" y="510" fontFamily="Arial" fontSize="14" fill="#374151">Foramen Ovale: RA → LA</text>

          <circle cx="80" cy="530" r="8" fill="#16a34a"/>

          <text x="95" y="535" fontFamily="Arial" fontSize="14" fill="#374151">Ductus Arteriosus: PA → Aorta</text>

          <circle cx="80" cy="555" r="8" fill="#ec4899"/>

          <text x="95" y="560" fontFamily="Arial" fontSize="14" fill="#374151">Placenta: Gas exchange</text>

        </g>

        

        {/* Arrow markers */}

        <defs>

          <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">

            <path d="M0,0 L0,6 L9,3 z" fill="#ff9500"/>

          </marker>

          <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">

            <path d="M0,0 L0,6 L9,3 z" fill="#16a34a"/>

          </marker>

        </defs>

      </svg>

      

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">

        <h4 className="font-semibold text-yellow-800 mb-2">Clinical Significance</h4>

        <ul className="text-sm text-yellow-700 space-y-1">

          <li>• Foramen ovale allows oxygenated blood to bypass the lungs</li>

          <li>• Ductus arteriosus shunts blood from pulmonary artery to aorta</li>

          <li>• These shunts close after birth as lungs take over gas exchange</li>

          <li>• Placenta provides highest oxygen content (80%) via umbilical vein</li>

        </ul>

      </div>

    </div>

  );

};

export default FetalCirculationDiagram;

