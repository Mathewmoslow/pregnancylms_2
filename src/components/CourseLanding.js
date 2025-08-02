import React from "react";

const modules = [
  {
    id: "module1",
    title: "Module 1: Current Perspectives in Women's Health and A&P Review",
    outcomes: [
      "Explore historical and current childbirth and women's health trends",
      "Examine factors affecting maternal, newborn, and women's health",
      "Discuss societal expectations and culture's influence",
      "Identify healthcare barriers and community resources",
      "Review reproductive anatomy and physiology"
    ],
    link: "womenshealth"
  },
  {
    id: "module1part2",
    title: "Module 1 Part 2: Fetal Development and Healthy Pregnancy",
    outcomes: [
      "Describe conception and implantation processes",
      "Identify fetal developmental milestones",
      "Discuss multifetal pregnancy considerations",
      "Evaluate teratogenic effects",
      "Apply evidence-based prenatal care principles"
    ],
    link: "basics"
  },
  {
    id: "module2",
    title: "Module 2: Normal Labor and Birth",
    outcomes: [
      "Recognize signs of impending labor",
      "Differentiate between true and false labor",
      "Analyze factors affecting the labor process",
      "Evaluate maternal and fetal responses to labor",
      "Identify and describe the stages of labor"
    ],
    link: "labor"
  },
  {
    id: "module3",
    title: "Module 3: Normal Postpartum",
    outcomes: [
      "Explain physiological adaptations during the postpartum period",
      "Perform comprehensive postpartum assessments",
      "Provide appropriate patient education",
      "Enhance maternal-infant bonding and attachment",
      "Support healthy parenting and family adaptation"
    ],
    link: "postpartum"
  },
  {
    id: "module4",
    title: "Module 4: Normal Newborn",
    outcomes: [
      "Describe physiological challenges of newborn transition",
      "Perform comprehensive newborn assessments",
      "Recognize normal and abnormal newborn behaviors",
      "Educate families on newborn safety and screenings",
      "Implement evidence-based newborn care practices"
    ],
    link: "newbornadaptation"
  },
  {
    id: "module5",
    title: "Module 5: Antepartum at Risk",
    outcomes: [
      "Discuss high-risk pregnancy complications",
      "Apply the nursing process to complex situations",
      "Identify warning signs and provide patient education",
      "Analyze risk factors and implement preventive strategies"
    ],
    link: "complications"
  }
];

const CourseLanding = ({ navigateToModule }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
        Course Overview
      </h2>
      <p className="mb-4 text-gray-700">
        Select a module below to begin exploring course content.
      </p>
      <div className="space-y-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="border rounded-lg p-4 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              {module.title}
            </h3>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              {module.outcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
            {module.link && (
              <button
                onClick={() => navigateToModule(module.link)}
                className="self-start px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Go to Module
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLanding;

