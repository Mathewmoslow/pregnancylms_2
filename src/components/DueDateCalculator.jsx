import React, { useState } from "react";

const DueDateCalculator = () => {
  const [lmpDate, setLmpDate] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [calculationSteps, setCalculationSteps] = useState([]);
  const [showSteps, setShowSteps] = useState(false);
  const [cycleLength, setCycleLength] = useState(28);
  const [currentStep, setCurrentStep] = useState(0);

  // Calculate due date using Naegele's Rule
  const calculateDueDate = () => {
    if (!lmpDate) {
      return;
    }

    // Reset steps
    const steps = [];
    setCurrentStep(0);

    // Step 1: Start with LMP date
    const lmp = new Date(lmpDate);
    steps.push({
      title: "Step 1: Start with LMP date",
      description: `We begin with the first day of your last menstrual period: ${formatDate(
        lmp
      )}`,
    });

    // Step 2: Subtract 3 months
    const step2Date = new Date(lmp);
    step2Date.setMonth(lmp.getMonth() - 3);
    steps.push({
      title: "Step 2: Subtract 3 months",
      description: `${formatDate(lmp)} minus 3 months = ${formatDate(
        step2Date
      )}`,
    });

    // Step 3: Add 7 days
    const step3Date = new Date(step2Date);
    step3Date.setDate(step2Date.getDate() + 7);
    steps.push({
      title: "Step 3: Add 7 days",
      description: `${formatDate(step2Date)} plus 7 days = ${formatDate(
        step3Date
      )}`,
    });

    // Step 4: Adjust year if needed
    const lmpMonth = lmp.getMonth();
    const step4Date = new Date(step3Date);

    if (lmpMonth >= 0 && lmpMonth <= 2) {
      // January (0), February (1), March (2)
      step4Date.setFullYear(step3Date.getFullYear() + 1);
      steps.push({
        title: "Step 4: Adjust the year",
        description: `Since your LMP was in ${getMonthName(
          lmpMonth
        )} (Jan-Mar), we add 1 year: ${formatDate(step3Date)} → ${formatDate(
          step4Date
        )}`,
      });
    } else {
      steps.push({
        title: "Step 4: Adjust the year",
        description: `Since your LMP was in ${getMonthName(
          lmpMonth
        )} (Apr-Dec), the year remains the same: ${formatDate(step4Date)}`,
      });
    }

    // Step 5: Adjust for cycle length if different from 28 days
    let finalDate = new Date(step4Date);

    if (cycleLength !== 28) {
      const adjustment = cycleLength - 28;
      finalDate.setDate(finalDate.getDate() + adjustment);
      steps.push({
        title: "Step 5: Adjust for cycle length",
        description: `Your cycle length is ${cycleLength} days (${
          adjustment > 0 ? "longer" : "shorter"
        } than average). We ${adjustment > 0 ? "add" : "subtract"} ${Math.abs(
          adjustment
        )} days: ${formatDate(step4Date)} → ${formatDate(finalDate)}`,
      });
    } else {
      steps.push({
        title: "Step 5: No cycle length adjustment needed",
        description:
          "Your cycle length is the standard 28 days, so no adjustment is needed.",
      });
    }

    // Set state values
    setDueDate(finalDate);
    setCalculationSteps(steps);
    setShowSteps(true);
  };

  // Format date in a readable format
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Get month name
  const getMonthName = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  };

  // Calculate trimester dates
  const calculateTrimesterDates = () => {
    if (!dueDate) return null;

    // Calculate conception date (approximately 2 weeks after LMP)
    const lmp = new Date(lmpDate);
    const conception = new Date(lmp);
    conception.setDate(lmp.getDate() + 14);

    // Calculate first trimester end (13 weeks from conception)
    const firstTrimesterEnd = new Date(conception);
    firstTrimesterEnd.setDate(conception.getDate() + 13 * 7);

    // Calculate second trimester end (27 weeks from conception)
    const secondTrimesterEnd = new Date(conception);
    secondTrimesterEnd.setDate(conception.getDate() + 27 * 7);

    return {
      conception: formatDate(conception),
      firstTrimester: formatDate(firstTrimesterEnd),
      secondTrimester: formatDate(secondTrimesterEnd),
      thirdTrimester: formatDate(dueDate),
    };
  };

  // Handle advancing through steps
  const nextStep = () => {
    if (currentStep < calculationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate weeks pregnant based on LMP
  const calculateWeeksPregnant = () => {
    if (!lmpDate) return null;

    const lmp = new Date(lmpDate);
    const today = new Date();

    // Calculate days between dates
    const diffTime = Math.abs(today - lmp);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    return { weeks, days };
  };

  const weeksPregnant = calculateWeeksPregnant();
  const trimesterDates = dueDate ? calculateTrimesterDates() : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mx-auto max-w-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">
        Due Date Calculator
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">
            Calculate Your Due Date
          </h3>

          <div className="mb-4">
            <label
              htmlFor="lmp-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First day of your Last Menstrual Period:
            </label>
            <input
              type="date"
              id="lmp-date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cycle-length"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Average Length of Your Menstrual Cycle:
            </label>
            <div className="flex items-center">
              <input
                type="range"
                id="cycle-length"
                min="21"
                max="35"
                value={cycleLength}
                onChange={(e) => setCycleLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-3 font-medium">{cycleLength} days</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Standard cycle length is 28 days. Adjust if yours differs.
            </p>
          </div>

          <button
            onClick={calculateDueDate}
            disabled={!lmpDate}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              !lmpDate
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Calculate Due Date
          </button>

          {weeksPregnant && weeksPregnant.weeks >= 0 && (
            <div className="mt-4 p-3 bg-white rounded-md shadow-sm">
              <p className="font-medium text-gray-700">
                Based on your LMP, you are currently:
              </p>
              <p className="text-xl font-bold text-indigo-600 mt-1">
                {weeksPregnant.weeks} weeks and {weeksPregnant.days} days
                pregnant
              </p>
            </div>
          )}
        </div>

        <div>
          {dueDate && (
            <div className="bg-indigo-100 p-3 sm:p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2">Your Due Date:</h3>
              <p className="text-xl sm:text-2xl font-bold text-indigo-600 mb-2">
                {formatDate(dueDate)}
              </p>

              {trimesterDates && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Important Dates:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mr-2 mt-1">
                        1
                      </div>
                      <div>
                        <p className="font-medium">
                          First Trimester (Weeks 1-13)
                        </p>
                        <p className="text-sm text-gray-600">
                          Ends: {trimesterDates.firstTrimester}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mr-2 mt-1">
                        2
                      </div>
                      <div>
                        <p className="font-medium">
                          Second Trimester (Weeks 14-27)
                        </p>
                        <p className="text-sm text-gray-600">
                          Ends: {trimesterDates.secondTrimester}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mr-2 mt-1">
                        3
                      </div>
                      <div>
                        <p className="font-medium">
                          Third Trimester (Weeks 28-40)
                        </p>
                        <p className="text-sm text-gray-600">
                          Ends: {trimesterDates.thirdTrimester}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {showSteps && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 className="text-lg font-semibold mb-3">
                How We Calculated Your Due Date
              </h3>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`px-3 py-1 rounded transition-colors ${
                      currentStep === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-500">
                    Step {currentStep + 1} of {calculationSteps.length}
                  </span>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === calculationSteps.length - 1}
                    className={`px-3 py-1 rounded transition-colors ${
                      currentStep === calculationSteps.length - 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                    }`}
                  >
                    Next
                  </button>
                </div>

                <div className="flex">
                  {calculationSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-grow mx-0.5 rounded-full ${
                        index <= currentStep ? "bg-indigo-500" : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded">
                <h4 className="font-medium text-indigo-700">
                  {calculationSteps[currentStep]?.title}
                </h4>
                <p className="mt-1">
                  {calculationSteps[currentStep]?.description}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  About Naegele's Rule:
                </h4>
                <p className="text-sm text-gray-600">
                  This calculator uses Naegele's Rule, a standard method for
                  estimating your due date. It assumes a 28-day cycle with
                  ovulation occurring on day 14. If your cycle length differs,
                  we adjust accordingly. Remember, only about 5% of babies are
                  born on their exact due date - most arrive within a week
                  before or after.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {dueDate && (
        <div className="mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">What to Remember</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>
              Your due date is just an estimate. Only about 5% of women deliver
              exactly on their due date.
            </li>
            <li>Most babies are born within 1-2 weeks of their due date.</li>
            <li>
              First pregnancies often go past the due date, sometimes up to 41
              weeks.
            </li>
            <li>
              For the most accurate due date, an ultrasound during your first
              trimester is recommended.
            </li>
            <li>
              A full-term pregnancy is considered 39-40 weeks, but delivery
              between 37-42 weeks is considered normal.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DueDateCalculator;