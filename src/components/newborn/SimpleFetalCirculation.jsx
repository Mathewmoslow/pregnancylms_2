
import React from 'react';

const SimpleFetalCirculation = ({ showTransition = false, oxygenLevel = 45 }) => {

  return (

    <div className="bg-white rounded-lg shadow-md p-4 mx-auto max-w-3xl">

      <svg viewBox="0 0 700 500" className="w-full h-auto">

        {/* Background */}

        <rect width="700" height="500" fill="#ffffff"/>

        

        {/* Unified heart shape */}

        <g id="heart">

          {/* Combined heart outline */}

          <path d="M 200 120 Q 200 80 240 80 L 360 80 Q 400 80 400 120 L 400 300 Q 400 340 360 340 L 240 340 Q 200 340 200 300 Z" 

                fill="none" stroke="#666" strokeWidth="3"/>

          

          {/* Right chambers (blue tint) */}

          <path d="M 200 120 Q 200 80 240 80 L 300 80 L 300 340 L 240 340 Q 200 340 200 300 Z" 

                fill="#e3f2fd" opacity="0.8"/>

          

          {/* Left chambers (red tint) */}

          <path d="M 300 80 L 360 80 Q 400 80 400 120 L 400 300 Q 400 340 360 340 L 300 340 Z" 

                fill="#ffebee" opacity="0.8"/>

          

          {/* Horizontal divider */}

          <line x1="200" y1="210" x2="400" y2="210" stroke="#999" strokeWidth="1.5"/>

          

          {/* Vertical divider */}

          <line x1="300" y1="80" x2="300" y2="340" stroke="#999" strokeWidth="1.5"/>

          

          {/* Chamber labels */}

          <text x="250" y="150" textAnchor="middle" fontFamily="Arial" fontSize="20" fill="#333">RA</text>

          <text x="350" y="150" textAnchor="middle" fontFamily="Arial" fontSize="20" fill="#333">LA</text>

          <text x="250" y="270" textAnchor="middle" fontFamily="Arial" fontSize="20" fill="#333">RV</text>

          <text x="350" y="270" textAnchor="middle" fontFamily="Arial" fontSize="20" fill="#333">LV</text>

        </g>

        

        {/* SVC entry */}

        <path d="M 250 80 L 250 40" stroke="#5c85d6" strokeWidth="16" fill="none"/>

        <text x="180" y="50" textAnchor="end" fontFamily="Arial" fontSize="16" fill="#666">SVC</text>

        

        {/* IVC entry */}

        <path d="M 250 340 L 250 380" stroke="#5c85d6" strokeWidth="16" fill="none"/>

        

        {/* Foramen Ovale (integrated circle) */}

        <circle cx="300" cy="145" r="20" fill="#90ee90" stroke="#5cb85c" strokeWidth="2" 

                opacity={showTransition ? "0.3" : "1"}/>

        {!showTransition && (

          <path d="M 285 145 L 315 145" stroke="#5cb85c" strokeWidth="4" markerEnd="url(#arrowGreen)"/>

        )}

        

        {/* Pulmonary Artery with DA */}

        <path d="M 250 210 Q 250 170 220 150 Q 190 130 140 130" 

              stroke="#5c85d6" strokeWidth="16" fill="none"/>

        <text x="50" y="135" textAnchor="start" fontFamily="Arial" fontSize="16" fill="#666">Pulmonary Artery</text>

        

        {/* Ductus Arteriosus (integrated green segment) */}

        <path d="M 140 130 Q 120 130 120 150 L 120 200" 

              stroke="#5cb85c" strokeWidth="14" fill="none"

              opacity={showTransition ? "0.3" : "1"}/>

        <text x="100" y="180" textAnchor="end" fontFamily="Arial" fontSize="14" 

              fill="#5cb85c" opacity={showTransition ? "0.3" : "1"}>DA</text>

        

        {/* Aorta */}

        <path d="M 350 210 Q 350 170 380 150 Q 410 130 460 130 L 460 380" 

              stroke="#d9534f" strokeWidth="16" fill="none"/>

        <text x="490" y="250" textAnchor="start" fontFamily="Arial" fontSize="16" fill="#666">Aorta</text>

        

        {/* O2 Saturation */}

        <g transform="translate(480, 50)">

          <rect x="0" y="0" width="160" height="70" fill="white" stroke="#e0e0e0" strokeWidth="1" rx="8"/>

          <text x="80" y="25" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#666">O₂ Saturation</text>

          <text x="80" y="50" textAnchor="middle" fontFamily="Arial" fontSize="28" fontWeight="bold" 

                fill={oxygenLevel < 60 ? "#ff5555" : oxygenLevel < 85 ? "#ff9933" : "#33cc33"}>

            {oxygenLevel}%

          </text>

        </g>

        

        {/* Title */}

        <text x="350" y="460" textAnchor="middle" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#333">

          {showTransition ? "Newborn Circulation" : "Fetal Circulation"}

        </text>

        

        {/* Legend */}

        <g transform="translate(50, 400)">

          <circle cx="0" cy="0" r="8" fill="#e3f2fd" stroke="#5c85d6" strokeWidth="1"/>

          <text x="15" y="5" fontFamily="Arial" fontSize="14" fill="#666">Deoxygenated blood</text>

          

          <circle cx="200" cy="0" r="8" fill="#ffebee" stroke="#d9534f" strokeWidth="1"/>

          <text x="215" y="5" fontFamily="Arial" fontSize="14" fill="#666">Oxygenated blood</text>

          

          <circle cx="400" cy="0" r="8" fill="#90ee90"/>

          <text x="415" y="5" fontFamily="Arial" fontSize="14" fill="#666">Open shunt</text>

          

          <circle cx="550" cy="0" r="8" fill="#cccccc"/>

          <text x="565" y="5" fontFamily="Arial" fontSize="14" fill="#666">Closed</text>

        </g>

        

        {/* Arrow marker */}

        <defs>

          <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">

            <path d="M0,0 L0,6 L6,3 z" fill="#5cb85c"/>

          </marker>

        </defs>

      </svg>

    </div>

  );

};

export default SimpleFetalCirculation;

