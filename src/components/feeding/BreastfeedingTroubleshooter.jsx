import React, { useState } from 'react';

const BreastfeedingTroubleshooter = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [expandedSolutions, setExpandedSolutions] = useState({});

  const issues = {
    latchDifficulty: {
      title: "Poor Latch",
      icon: "😣",
      symptoms: [
        "Painful nursing",
        "Clicking sounds while feeding",
        "Baby slips off breast frequently",
        "Flattened or lipstick-shaped nipple after feeding",
        "Baby seems frustrated at breast"
      ],
      causes: [
        "Incorrect positioning",
        "Tongue-tie or lip-tie",
        "Inverted or flat nipples",
        "Engorgement making breast too firm",
        "Baby's inexperience"
      ],
      solutions: [
        {
          title: "Positioning Techniques",
          steps: [
            "Try different holds (cradle, cross-cradle, football, side-lying)",
            "Ensure baby's ear, shoulder, and hip are in line",
            "Baby's nose should be level with nipple",
            "Support breast with C-hold if needed",
            "Wait for wide open mouth before latching"
          ]
        },
        {
          title: "Latch Correction",
          steps: [
            "Break suction gently with finger if latch is shallow",
            "Tickle baby's lip with nipple to encourage wide mouth",
            "Bring baby to breast, not breast to baby",
            "Ensure lips are flanged outward",
            "Check that baby's chin touches breast first"
          ]
        },
        {
          title: "When to Seek Help",
          steps: [
            "Persistent pain beyond initial latch",
            "Damaged nipples",
            "Baby not gaining weight adequately",
            "Consider lactation consultant evaluation",
            "Assess for tongue/lip tie"
          ]
        }
      ]
    },
    soreNipples: {
      title: "Sore or Cracked Nipples",
      icon: "🩹",
      symptoms: [
        "Pain during or after feeding",
        "Visible cracks or bleeding",
        "Scabbing on nipples",
        "Burning sensation",
        "Reluctance to nurse due to pain"
      ],
      causes: [
        "Poor latch (most common)",
        "Thrush infection",
        "Incorrect pump flange size",
        "Dry skin",
        "Baby's sucking pattern"
      ],
      solutions: [
        {
          title: "Immediate Relief",
          steps: [
            "Apply expressed breast milk to nipples after feeding",
            "Use purified lanolin or nipple cream",
            "Air dry nipples after feeding",
            "Use breast shells to prevent fabric friction",
            "Consider temporary nipple shields if severe"
          ]
        },
        {
          title: "Healing Strategies",
          steps: [
            "Correct latch issues first",
            "Start feeding on less sore side",
            "Vary nursing positions",
            "Use hydrogel pads between feedings",
            "Take pain medication if needed (ibuprofen safe)"
          ]
        },
        {
          title: "Prevention",
          steps: [
            "Ensure proper latch from the start",
            "Break suction before removing baby",
            "Keep nipples moisturized",
            "Change breast pads frequently",
            "Avoid harsh soaps on nipples"
          ]
        }
      ]
    },
    engorgement: {
      title: "Breast Engorgement",
      icon: "🎈",
      symptoms: [
        "Breasts feel hard and painful",
        "Skin appears tight and shiny",
        "Low-grade fever possible",
        "Difficulty latching due to firmness",
        "Flattened nipples"
      ],
      causes: [
        "Milk coming in (days 2-5)",
        "Missed feedings",
        "Sudden weaning",
        "Ineffective milk removal",
        "IV fluids during labor"
      ],
      solutions: [
        {
          title: "Immediate Relief",
          steps: [
            "Apply cold compresses between feedings",
            "Use warm compresses or shower before feeding",
            "Gentle breast massage toward nipple",
            "Hand express to soften areola before latching",
            "Reverse pressure softening technique"
          ]
        },
        {
          title: "Feeding Management",
          steps: [
            "Feed frequently (8-12 times/24 hours)",
            "Ensure effective milk removal",
            "Pump after feeding if needed",
            "Avoid skipping feedings",
            "Consider block feeding if oversupply"
          ]
        },
        {
          title: "Comfort Measures",
          steps: [
            "Wear supportive but not tight bra",
            "Use cabbage leaves (evidence mixed but safe)",
            "Take anti-inflammatory medication",
            "Avoid excessive pumping (can worsen)",
            "Lymphatic drainage massage"
          ]
        }
      ]
    },
    lowSupply: {
      title: "Low Milk Supply Concerns",
      icon: "📉",
      symptoms: [
        "Baby seems unsatisfied after feeding",
        "Frequent feeding beyond normal",
        "Poor weight gain",
        "Few wet/dirty diapers",
        "No feeling of fullness"
      ],
      causes: [
        "Ineffective milk removal",
        "Infrequent feeding",
        "Hormonal issues",
        "Medications",
        "Previous breast surgery"
      ],
      solutions: [
        {
          title: "Increase Stimulation",
          steps: [
            "Feed more frequently (every 2-3 hours)",
            "Offer both breasts each feeding",
            "Pump after feedings",
            "Power pumping sessions",
            "Skin-to-skin contact"
          ]
        },
        {
          title: "Optimize Feeding",
          steps: [
            "Ensure proper latch and positioning",
            "Breast compressions during feeding",
            "Switch nursing (alternate breasts multiple times)",
            "Wake sleepy baby to feed",
            "Limit pacifier use in early weeks"
          ]
        },
        {
          title: "Lifestyle Factors",
          steps: [
            "Stay well hydrated",
            "Eat adequate calories",
            "Rest when possible",
            "Consider galactagogues (with provider guidance)",
            "Address stress and anxiety"
          ]
        }
      ]
    },
    oversupply: {
      title: "Oversupply/Forceful Letdown",
      icon: "💦",
      symptoms: [
        "Baby coughs or chokes during feeding",
        "Excessive leaking",
        "Baby pulls off breast frequently",
        "Green, frothy stools",
        "Recurrent plugged ducts"
      ],
      causes: [
        "Overactive letdown reflex",
        "Hormonal factors",
        "Excessive pumping",
        "Oversupply established early",
        "Twin/multiple pregnancy history"
      ],
      solutions: [
        {
          title: "Feeding Positions",
          steps: [
            "Use laid-back or reclined positions",
            "Side-lying position",
            "Baby sitting upright/straddle position",
            "Let baby control flow better",
            "Allow milk to spray into towel at letdown"
          ]
        },
        {
          title: "Management Strategies",
          steps: [
            "Block feeding (one breast per session)",
            "Avoid unnecessary pumping",
            "Hand express to comfort only",
            "Cold compresses to reduce production",
            "Sage tea may help (use cautiously)"
          ]
        },
        {
          title: "Baby Comfort",
          steps: [
            "Burp frequently during feeds",
            "Keep baby upright after feeding",
            "Pace the feeding",
            "Let baby finish first breast completely",
            "Watch for cues of satisfaction"
          ]
        }
      ]
    },
    thrush: {
      title: "Thrush/Yeast Infection",
      icon: "🦠",
      symptoms: [
        "Burning nipple pain during/after feeds",
        "Pink, shiny nipples",
        "Shooting pains in breast",
        "White patches in baby's mouth",
        "Diaper rash in baby"
      ],
      causes: [
        "Antibiotic use",
        "Damaged nipples",
        "Diabetes",
        "Immune system issues",
        "Warm, moist environment"
      ],
      solutions: [
        {
          title: "Medical Treatment",
          steps: [
            "See healthcare provider for diagnosis",
            "Antifungal treatment for mother and baby",
            "Treat simultaneously to prevent reinfection",
            "Complete full course of treatment",
            "Consider probiotics"
          ]
        },
        {
          title: "Hygiene Measures",
          steps: [
            "Wash hands frequently",
            "Change breast pads after each feeding",
            "Wash bras daily in hot water",
            "Sterilize pump parts and pacifiers daily",
            "Air dry nipples after feeding"
          ]
        },
        {
          title: "Comfort and Prevention",
          steps: [
            "Use vinegar rinse (1 tbsp/cup water)",
            "Avoid nipple creams with antibiotics",
            "Reduce sugar in diet",
            "Wear cotton bras",
            "Consider gentian violet (with provider approval)"
          ]
        }
      ]
    }
  };

  const toggleSolution = (issueKey, solutionIndex) => {
    const key = `${issueKey}-${solutionIndex}`;
    setExpandedSolutions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Breastfeeding Troubleshooter
      </h2>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          Select a common breastfeeding challenge to view symptoms, causes, and evidence-based solutions. 
          Remember: most breastfeeding problems can be resolved with proper support and intervention.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issue Selection */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Common Issues</h3>
          <div className="space-y-2">
            {Object.entries(issues).map(([key, issue]) => (
              <button
                key={key}
                onClick={() => setSelectedIssue(key)}
                className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                  selectedIssue === key
                    ? 'bg-indigo-100 border-2 border-indigo-500'
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{issue.icon}</span>
                <span className="font-medium">{issue.title}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Remember</h4>
            <p className="text-sm text-yellow-700">
              If problems persist or you're concerned about baby's weight gain, 
              seek help from a lactation consultant or healthcare provider promptly.
            </p>
          </div>
        </div>

        {/* Issue Details */}
        <div className="lg:col-span-2">
          {selectedIssue ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                  <span className="text-3xl">{issues[selectedIssue].icon}</span>
                  {issues[selectedIssue].title}
                </h3>

                {/* Symptoms */}
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-red-700 mb-2">Common Symptoms</h4>
                  <ul className="space-y-1">
                    {issues[selectedIssue].symptoms.map((symptom, index) => (
                      <li key={index} className="text-red-600 text-sm flex items-start">
                        <span className="mr-2">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Causes */}
                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-orange-700 mb-2">Possible Causes</h4>
                  <ul className="space-y-1">
                    {issues[selectedIssue].causes.map((cause, index) => (
                      <li key={index} className="text-orange-600 text-sm flex items-start">
                        <span className="mr-2">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700">Solutions & Interventions</h4>
                  {issues[selectedIssue].solutions.map((solution, index) => {
                    const isExpanded = expandedSolutions[`${selectedIssue}-${index}`];
                    return (
                      <div key={index} className="bg-green-50 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSolution(selectedIssue, index)}
                          className="w-full p-4 text-left flex justify-between items-center hover:bg-green-100 transition-colors"
                        >
                          <span className="font-medium text-green-700">{solution.title}</span>
                          <span className="text-green-600">
                            {isExpanded ? '−' : '+'}
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4">
                            <ol className="space-y-2">
                              {solution.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="text-sm text-green-600 flex">
                                  <span className="font-medium mr-2">{stepIndex + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-center">
                Select an issue from the left to view detailed information and solutions
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">General Breastfeeding Success Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-blue-600 mb-2">Early Days</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Initiate within first hour</li>
              <li>• Skin-to-skin contact</li>
              <li>• Feed on demand</li>
              <li>• Room-in with baby</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-600 mb-2">Ongoing Support</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Join support groups</li>
              <li>• Partner involvement</li>
              <li>• Rest when possible</li>
              <li>• Healthy diet & hydration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-600 mb-2">When to Seek Help</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Persistent pain</li>
              <li>• Poor weight gain</li>
              <li>• Signs of infection</li>
              <li>• Concerns about supply</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastfeedingTroubleshooter;
