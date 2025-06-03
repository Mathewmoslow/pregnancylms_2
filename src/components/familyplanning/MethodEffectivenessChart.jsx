import React, { useState } from 'react';

const MethodEffectivenessChart = () => {
  const [viewMode, setViewMode] = useState('effectiveness');
  const [selectedMethod, setSelectedMethod] = useState(null);

  const contraceptiveMethods = [
    {
      category: "Permanent Methods",
      color: "purple",
      methods: [
        {
          name: "Female Sterilization",
          perfectUse: 99.5,
          typicalUse: 99.5,
          reversibility: "Difficult, requires surgery",
          sideEffects: "Surgical risks, regret possible",
          cost: "$$$$ (one-time)",
          duration: "Permanent"
        },
        {
          name: "Male Sterilization (Vasectomy)",
          perfectUse: 99.85,
          typicalUse: 99.85,
          reversibility: "Difficult, requires surgery",
          sideEffects: "Minor surgical risks",
          cost: "$$$ (one-time)",
          duration: "Permanent"
        }
      ]
    },
    {
      category: "Long-Acting Reversible (LARC)",
      color: "green",
      methods: [
        {
          name: "Copper IUD",
          perfectUse: 99.2,
          typicalUse: 99.2,
          reversibility: "Immediate upon removal",
          sideEffects: "Heavier periods, cramping",
          cost: "$$$$ (lasts 10+ years)",
          duration: "10-12 years"
        },
        {
          name: "Hormonal IUD",
          perfectUse: 99.8,
          typicalUse: 99.8,
          reversibility: "Immediate upon removal",
          sideEffects: "Irregular bleeding, possible amenorrhea",
          cost: "$$$$ (lasts 3-7 years)",
          duration: "3-7 years"
        },
        {
          name: "Implant",
          perfectUse: 99.95,
          typicalUse: 99.95,
          reversibility: "Immediate upon removal",
          sideEffects: "Irregular bleeding, weight changes",
          cost: "$$$ (lasts 3 years)",
          duration: "3 years"
        }
      ]
    },
    {
      category: "Short-Acting Hormonal",
      color: "blue",
      methods: [
        {
          name: "Combined Pill",
          perfectUse: 99.7,
          typicalUse: 91,
          reversibility: "Immediate",
          sideEffects: "Nausea, breast tenderness, mood changes",
          cost: "$ (monthly)",
          duration: "Daily use"
        },
        {
          name: "Progestin-Only Pill",
          perfectUse: 99.7,
          typicalUse: 91,
          reversibility: "Immediate",
          sideEffects: "Irregular bleeding",
          cost: "$ (monthly)",
          duration: "Daily use"
        },
        {
          name: "Patch",
          perfectUse: 99.7,
          typicalUse: 91,
          reversibility: "Immediate",
          sideEffects: "Skin irritation, similar to pill",
          cost: "$$ (monthly)",
          duration: "Weekly"
        },
        {
          name: "Vaginal Ring",
          perfectUse: 99.7,
          typicalUse: 91,
          reversibility: "Immediate",
          sideEffects: "Vaginal irritation, similar to pill",
          cost: "$$ (monthly)",
          duration: "Monthly"
        },
        {
          name: "Injectable (Depo)",
          perfectUse: 99.8,
          typicalUse: 94,
          reversibility: "Delayed 10-18 months",
          sideEffects: "Weight gain, bone density loss",
          cost: "$ (every 3 months)",
          duration: "3 months"
        }
      ]
    },
    {
      category: "Barrier Methods",
      color: "orange",
      methods: [
        {
          name: "Male Condom",
          perfectUse: 98,
          typicalUse: 82,
          reversibility: "N/A",
          sideEffects: "Latex allergy possible",
          cost: "$ (per use)",
          duration: "Single use",
          additionalBenefit: "STI protection"
        },
        {
          name: "Female Condom",
          perfectUse: 95,
          typicalUse: 79,
          reversibility: "N/A",
          sideEffects: "None significant",
          cost: "$$ (per use)",
          duration: "Single use",
          additionalBenefit: "STI protection"
        },
        {
          name: "Diaphragm with Spermicide",
          perfectUse: 94,
          typicalUse: 88,
          reversibility: "N/A",
          sideEffects: "UTI risk, spermicide irritation",
          cost: "$$ (reusable)",
          duration: "Per use"
        },
        {
          name: "Sponge (Nulliparous)",
          perfectUse: 91,
          typicalUse: 88,
          reversibility: "N/A",
          sideEffects: "Vaginal irritation, TSS risk",
          cost: "$$ (per use)",
          duration: "24 hours"
        }
      ]
    },
    {
      category: "Natural Methods",
      color: "teal",
      methods: [
        {
          name: "Fertility Awareness",
          perfectUse: 95,
          typicalUse: 76,
          reversibility: "N/A",
          sideEffects: "None",
          cost: "Free",
          duration: "Ongoing tracking"
        },
        {
          name: "Lactational Amenorrhea",
          perfectUse: 98,
          typicalUse: 98,
          reversibility: "N/A",
          sideEffects: "None",
          cost: "Free",
          duration: "Up to 6 months postpartum"
        },
        {
          name: "Withdrawal",
          perfectUse: 96,
          typicalUse: 78,
          reversibility: "N/A",
          sideEffects: "None",
          cost: "Free",
          duration: "Per use"
        }
      ]
    },
    {
      category: "Emergency Contraception",
      color: "red",
      methods: [
        {
          name: "Copper IUD",
          perfectUse: 99.9,
          typicalUse: 99.9,
          reversibility: "Can keep as ongoing method",
          sideEffects: "See Copper IUD above",
          cost: "$$$$ (can continue use)",
          duration: "Within 5 days"
        },
        {
          name: "Ulipristal Acetate",
          perfectUse: 98.5,
          typicalUse: 98.5,
          reversibility: "N/A",
          sideEffects: "Nausea, headache",
          cost: "$$$",
          duration: "Within 5 days"
        },
        {
          name: "Levonorgestrel",
          perfectUse: 95,
          typicalUse: 95,
          reversibility: "N/A",
          sideEffects: "Nausea, irregular bleeding",
          cost: "$$",
          duration: "Within 3 days"
        }
      ]
    }
  ];

  const getEffectivenessColor = (percentage) => {
    if (percentage >= 99) return 'text-green-600';
    if (percentage >= 95) return 'text-yellow-600';
    if (percentage >= 90) return 'text-orange-600';
    return 'text-red-600';
  };

  const getEffectivenessBar = (perfect, typical) => {
    return (
      <div className="relative">
        <div className="flex items-center space-x-2">
          <span className="text-xs w-20">Perfect use:</span>
          <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
            <div 
              className="bg-green-500 h-4 rounded-full absolute top-0 left-0"
              style={{ width: `${perfect}%` }}
            />
            <span className="absolute right-2 top-0 text-xs font-medium">{perfect}%</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs w-20">Typical use:</span>
          <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
            <div 
              className={`h-4 rounded-full absolute top-0 left-0 ${
                typical >= 90 ? 'bg-blue-500' : 'bg-orange-500'
              }`}
              style={{ width: `${typical}%` }}
            />
            <span className="absolute right-2 top-0 text-xs font-medium">{typical}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Contraceptive Method Effectiveness Chart
      </h2>

      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-indigo-700 mb-2">Understanding Effectiveness</h4>
            <p className="text-sm text-gray-700">
              <strong>Perfect Use:</strong> When method is used correctly and consistently every time.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Typical Use:</strong> How effective the method is with common human error.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-700 mb-2">What the Numbers Mean</h4>
            <p className="text-sm text-gray-700">
              Effectiveness percentages show how many women out of 100 will NOT get pregnant 
              in the first year of use.
            </p>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode('effectiveness')}
          className={`px-4 py-2 rounded-lg ${
            viewMode === 'effectiveness' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Effectiveness View
        </button>
        <button
          onClick={() => setViewMode('comparison')}
          className={`px-4 py-2 rounded-lg ${
            viewMode === 'comparison' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Comparison Table
        </button>
      </div>

      {/* Effectiveness View */}
      {viewMode === 'effectiveness' && (
        <div className="space-y-6">
          {contraceptiveMethods.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className={`text-lg font-semibold text-${category.color}-700 mb-3`}>
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.methods.map((method, methodIndex) => (
                  <div 
                    key={methodIndex}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => setSelectedMethod(selectedMethod === method.name ? null : method.name)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{method.name}</h4>
                      {method.additionalBenefit && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          {method.additionalBenefit}
                        </span>
                      )}
                    </div>
                    {getEffectivenessBar(method.perfectUse, method.typicalUse)}
                    
                    {selectedMethod === method.name && (
                      <div className="mt-3 pt-3 border-t border-gray-200 grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p><strong>Duration:</strong> {method.duration}</p>
                          <p><strong>Cost:</strong> {method.cost}</p>
                        </div>
                        <div>
                          <p><strong>Reversibility:</strong> {method.reversibility}</p>
                          <p><strong>Side Effects:</strong> {method.sideEffects}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comparison Table View */}
      {viewMode === 'comparison' && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Method</th>
                <th className="border px-4 py-2 text-center">Perfect Use</th>
                <th className="border px-4 py-2 text-center">Typical Use</th>
                <th className="border px-4 py-2 text-center">Duration</th>
                <th className="border px-4 py-2 text-left">Key Considerations</th>
              </tr>
            </thead>
            <tbody>
              {contraceptiveMethods.flatMap((category, catIndex) =>
                category.methods.map((method, methodIndex) => (
                  <tr key={`${catIndex}-${methodIndex}`} className={methodIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border px-4 py-2 font-medium">{method.name}</td>
                    <td className={`border px-4 py-2 text-center font-bold ${getEffectivenessColor(method.perfectUse)}`}>
                      {method.perfectUse}%
                    </td>
                    <td className={`border px-4 py-2 text-center font-bold ${getEffectivenessColor(method.typicalUse)}`}>
                      {method.typicalUse}%
                    </td>
                    <td className="border px-4 py-2 text-center text-sm">{method.duration}</td>
                    <td className="border px-4 py-2 text-sm">{method.sideEffects}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Key Messages */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <h4 className="font-semibold text-green-700 mb-2">Most Effective</h4>
          <p className="text-sm text-gray-700">
            LARC methods (IUDs and implants) and permanent methods have the highest effectiveness 
            because they don't depend on user action.
          </p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h4 className="font-semibold text-blue-700 mb-2">User-Dependent Methods</h4>
          <p className="text-sm text-gray-700">
            Pills, patches, rings, and barrier methods show bigger gaps between perfect and typical use, 
            highlighting the importance of consistent use.
          </p>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
          <h4 className="font-semibold text-purple-700 mb-2">Dual Protection</h4>
          <p className="text-sm text-gray-700">
            Only barrier methods (condoms) provide STI protection. Consider using condoms with 
            another method for dual protection.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Source: Contraceptive Technology, 21st Edition. Effectiveness rates based on first-year use.
        </p>
      </div>
    </div>
  );
};

export default MethodEffectivenessChart;
