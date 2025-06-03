import React, { useState } from 'react';

const FeedingMethodComparison = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);

  const comparisonData = {
    breastfeeding: {
      icon: "🤱",
      color: "green",
      benefits: {
        infant: [
          "Optimal nutrition perfectly tailored to baby's needs",
          "Antibodies provide passive immunity",
          "Reduced risk of infections (ear, respiratory, GI)",
          "Lower risk of SIDS",
          "Decreased risk of childhood obesity",
          "Enhanced cognitive development",
          "Better jaw and teeth development",
          "Lower risk of allergies and asthma"
        ],
        maternal: [
          "Faster uterine involution",
          "Reduced postpartum bleeding",
          "Faster return to pre-pregnancy weight",
          "Reduced risk of breast and ovarian cancer",
          "Natural child spacing (not reliable contraception)",
          "Enhanced bonding through oxytocin release",
          "Cost-effective (no formula to purchase)",
          "Convenient (always available at right temperature)"
        ]
      },
      challenges: [
        "Learning curve for proper latch and positioning",
        "Time commitment and frequent feedings",
        "Potential for sore nipples initially",
        "Difficulty assessing exact intake",
        "Mother must be available for all feedings (unless pumping)",
        "Dietary restrictions for mother",
        "Social challenges in public settings",
        "Return to work considerations"
      ],
      recommendations: {
        exclusive: "First 6 months",
        continued: "Up to 2 years or beyond with complementary foods",
        who: "WHO and AAP recommend as optimal feeding method"
      }
    },
    formulaFeeding: {
      icon: "🍼",
      color: "blue",
      benefits: {
        practical: [
          "Anyone can feed the baby",
          "Exact intake measurement possible",
          "Longer time between feedings",
          "No maternal dietary restrictions",
          "Mother can take medications freely",
          "Easier return to work",
          "No pumping required",
          "Partner can share feeding responsibilities equally"
        ],
        situational: [
          "Necessary for certain medical conditions",
          "Option when breastfeeding not possible",
          "Allows for adoption feeding",
          "No concern about milk supply",
          "Predictable feeding schedule possible"
        ]
      },
      considerations: [
        "Cost of formula (significant expense)",
        "Preparation time and equipment needed",
        "Risk of contamination if not prepared properly",
        "No antibody protection",
        "Higher risk of certain infections",
        "Potential for overfeeding",
        "Environmental impact (packaging, water use)",
        "Need for clean water source"
      ],
      types: {
        standard: "Cow's milk-based, iron-fortified",
        soy: "For lactose intolerance or milk protein allergy",
        hydrolyzed: "Proteins broken down for easier digestion",
        specialized: "For specific medical conditions"
      }
    },
    combination: {
      icon: "🤱🍼",
      color: "purple",
      description: "Combining breastfeeding with formula feeding",
      benefits: [
        "Flexibility for working mothers",
        "Partner can participate in feeding",
        "Some breast milk benefits maintained",
        "Reduced pressure on mother",
        "Backup option for low supply",
        "Gradual weaning possible"
      ],
      considerations: [
        "May affect milk supply if started too early",
        "Potential nipple confusion in early weeks",
        "Requires both sets of equipment",
        "Need to maintain pumping to preserve supply",
        "Planning required to balance both methods"
      ],
      tips: [
        "Establish breastfeeding first (3-4 weeks)",
        "Introduce bottle gradually",
        "Pump when giving formula to maintain supply",
        "Use paced bottle feeding technique",
        "Monitor baby's cues and preferences"
      ]
    }
  };

  const nutritionalComparison = {
    headers: ["Component", "Breast Milk", "Formula", "Key Differences"],
    rows: [
      {
        component: "Proteins",
        breastMilk: "Whey-dominant, easily digestible",
        formula: "Modified cow's milk proteins",
        difference: "Breast milk proteins are species-specific and change over time"
      },
      {
        component: "Carbohydrates",
        breastMilk: "Lactose (7%), oligosaccharides",
        formula: "Lactose or corn syrup solids",
        difference: "Breast milk contains prebiotics that support gut health"
      },
      {
        component: "Fats",
        breastMilk: "Changes during feed, contains DHA/ARA naturally",
        formula: "Vegetable oils, added DHA/ARA",
        difference: "Breast milk fat content varies; hindmilk is richer"
      },
      {
        component: "Iron",
        breastMilk: "Low quantity but high bioavailability",
        formula: "Higher quantity, lower absorption",
        difference: "Breast milk iron is absorbed at ~50% vs ~10% from formula"
      },
      {
        component: "Antibodies",
        breastMilk: "IgA, IgG, IgM present",
        formula: "None",
        difference: "Provides passive immunity not available in formula"
      },
      {
        component: "Vitamins",
        breastMilk: "Most adequate except vitamin D",
        formula: "Fortified with all vitamins",
        difference: "Breast milk requires vitamin D supplementation"
      }
    ]
  };

  const costAnalysis = {
    breastfeeding: {
      direct: ["Breast pump ($0-300)", "Nursing bras/pads ($50-150)", "Lactation consultant ($75-200/visit)"],
      indirect: ["Time investment", "Potential lost wages if pumping at work"],
      total: "~$500-1,000 first year"
    },
    formula: {
      direct: ["Formula ($1,200-3,000/year)", "Bottles and supplies ($50-200)", "Sterilizing equipment ($20-100)"],
      indirect: ["Preparation time", "Water and energy costs"],
      total: "~$1,500-3,500 first year"
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Infant Feeding Methods Comparison
      </h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['overview', 'nutrition', 'practical', 'cost'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition-all ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(comparisonData).map(([method, data]) => (
              <div key={method} className={`border-2 border-${data.color}-200 rounded-lg overflow-hidden`}>
                <div className={`bg-${data.color}-50 p-4 text-center`}>
                  <div className="text-4xl mb-2">{data.icon}</div>
                  <h3 className="text-lg font-semibold capitalize">{method.replace(/([A-Z])/g, ' $1').trim()}</h3>
                </div>
                <div className="p-4">
                  {data.description && (
                    <p className="text-sm text-gray-600 mb-3">{data.description}</p>
                  )}
                  {data.recommendations && (
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p><strong>Exclusive:</strong> {data.recommendations.exclusive}</p>
                      <p><strong>Continue:</strong> {data.recommendations.continued}</p>
                    </div>
                  )}
                  {data.types && (
                    <div className="text-sm">
                      <strong>Types Available:</strong>
                      <ul className="mt-1 space-y-1">
                        {Object.entries(data.types).map(([type, desc]) => (
                          <li key={type} className="text-gray-600">
                            • <span className="capitalize">{type}:</span> {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {method === 'combination' && (
                    <div className="mt-3">
                      <strong className="text-sm">Key Tips:</strong>
                      <ul className="mt-1 space-y-1">
                        {data.tips.slice(0, 3).map((tip, index) => (
                          <li key={index} className="text-sm text-gray-600">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Key Recommendations */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
            <h4 className="font-semibold text-indigo-700 mb-2">Professional Recommendations</h4>
            <p className="text-gray-700">
              The WHO and AAP recommend exclusive breastfeeding for the first 6 months, 
              followed by continued breastfeeding with complementary foods up to 2 years or beyond. 
              However, the best feeding method is one that works for both mother and baby, 
              considering individual circumstances and needs.
            </p>
          </div>
        </div>
      )}

      {/* Nutrition Tab */}
      {activeTab === 'nutrition' && (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {nutritionalComparison.headers.map((header, index) => (
                    <th key={index} className="border px-4 py-2 text-left font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nutritionalComparison.rows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border px-4 py-2 font-medium">{row.component}</td>
                    <td className="border px-4 py-2 text-green-600">{row.breastMilk}</td>
                    <td className="border px-4 py-2 text-blue-600">{row.formula}</td>
                    <td className="border px-4 py-2 text-sm text-gray-600">{row.difference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Note</h4>
            <p className="text-sm text-yellow-700">
              While formula provides adequate nutrition for growth and development, 
              breast milk contains living cells, hormones, and antibodies that cannot be replicated. 
              Modern formulas are continually improved to more closely match breast milk composition.
            </p>
          </div>
        </div>
      )}

      {/* Practical Tab */}
      {activeTab === 'practical' && (
        <div className="space-y-6">
          {/* Benefits and Challenges Accordion */}
          <div className="space-y-4">
            {/* Breastfeeding */}
            <div className="border rounded-lg">
              <button
                onClick={() => setExpandedSection(expandedSection === 'bf-benefits' ? null : 'bf-benefits')}
                className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold text-green-700">Breastfeeding Benefits</span>
                <span>{expandedSection === 'bf-benefits' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'bf-benefits' && (
                <div className="p-4 border-t">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">For Baby:</h5>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {comparisonData.breastfeeding.benefits.infant.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">For Mother:</h5>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {comparisonData.breastfeeding.benefits.maternal.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Breastfeeding Challenges */}
            <div className="border rounded-lg">
              <button
                onClick={() => setExpandedSection(expandedSection === 'bf-challenges' ? null : 'bf-challenges')}
                className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold text-orange-700">Breastfeeding Challenges</span>
                <span>{expandedSection === 'bf-challenges' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'bf-challenges' && (
                <div className="p-4 border-t">
                  <ul className="space-y-1 text-sm text-gray-600">
                    {comparisonData.breastfeeding.challenges.map((challenge, index) => (
                      <li key={index}>• {challenge}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Formula Benefits */}
            <div className="border rounded-lg">
              <button
                onClick={() => setExpandedSection(expandedSection === 'ff-benefits' ? null : 'ff-benefits')}
                className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold text-blue-700">Formula Feeding Benefits</span>
                <span>{expandedSection === 'ff-benefits' ? '−' : '+'}</span>
              </button>
              {expandedSection === 'ff-benefits' && (
                <div className="p-4 border-t">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Practical Benefits:</h5>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {comparisonData.formulaFeeding.benefits.practical.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Situational Benefits:</h5>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {comparisonData.formulaFeeding.benefits.situational.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Decision Factors */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-700 mb-3">Factors to Consider in Your Decision</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium mb-2">Personal Factors:</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Work schedule and flexibility</li>
                  <li>• Support system available</li>
                  <li>• Previous experiences</li>
                  <li>• Physical/medical considerations</li>
                  <li>• Mental health needs</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Practical Factors:</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Financial considerations</li>
                  <li>• Partner involvement preferences</li>
                  <li>• Lifestyle and travel needs</li>
                  <li>• Cultural/family expectations</li>
                  <li>• Available resources</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cost Tab */}
      {activeTab === 'cost' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Breastfeeding Costs */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">🤱</span>
                Breastfeeding Costs
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">Direct Costs:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {costAnalysis.breastfeeding.direct.map((cost, index) => (
                      <li key={index}>• {cost}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Indirect Costs:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {costAnalysis.breastfeeding.indirect.map((cost, index) => (
                      <li key={index}>• {cost}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t">
                  <p className="font-semibold text-green-600">
                    Estimated Total: {costAnalysis.breastfeeding.total}
                  </p>
                </div>
              </div>
            </div>

            {/* Formula Costs */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">🍼</span>
                Formula Feeding Costs
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-700">Direct Costs:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {costAnalysis.formula.direct.map((cost, index) => (
                      <li key={index}>• {cost}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Indirect Costs:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {costAnalysis.formula.indirect.map((cost, index) => (
                      <li key={index}>• {cost}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t">
                  <p className="font-semibold text-blue-600">
                    Estimated Total: {costAnalysis.formula.total}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Cost Considerations</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Many insurance plans cover breast pumps and lactation consultations</li>
              <li>• WIC programs provide formula assistance for eligible families</li>
              <li>• Consider long-term health benefits and potential medical cost savings</li>
              <li>• Factor in time value and opportunity costs for your situation</li>
            </ul>
          </div>
        </div>
      )}

      {/* Support Message */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Remember</h3>
        <p className="text-gray-700">
          There is no "one size fits all" approach to infant feeding. The best feeding method 
          is the one that works for your family, supports your baby's health and growth, and 
          maintains maternal well-being. Support and respect for all feeding choices creates 
          the best environment for healthy families.
        </p>
      </div>
    </div>
  );
};

export default FeedingMethodComparison;
