import React, { useState } from "react";

const PregnancyBodyChangesSimulator = () => {
  const [selectedSystem, setSelectedSystem] = useState("cardiovascular");
  const [trimester, setTrimester] = useState(1);

  const bodySystems = [
    {
      id: "cardiovascular",
      name: "Cardiovascular System",
      changes: {
        1: [
          "Blood volume begins to increase",
          "Heart rate increases slightly",
          "Blood pressure may decrease slightly",
        ],
        2: [
          "Blood volume increases by 40-50%",
          "Heart rate increases by 10-15 beats per minute",
          "Blood pressure reaches its lowest point",
          "Physiologic heart murmurs may develop",
        ],
        3: [
          "Maximum blood volume reached",
          "Heart shifts upward and to left due to elevated diaphragm",
          "Risk of supine hypotensive syndrome due to compression of vena cava",
          "Blood pressure begins to return to pre-pregnancy levels",
        ],
      },
    },
    {
      id: "respiratory",
      name: "Respiratory System",
      changes: {
        1: [
          "Increased oxygen demand",
          "Diaphragm begins to elevate",
          "Nasal congestion and epistaxis due to increased vascularity",
        ],
        2: [
          "Tidal volume increases by 30-40%",
          "Respiratory rate slightly increased",
          "Shortness of breath may begin",
        ],
        3: [
          "Diaphragm elevated by up to 4cm",
          "Significant shortness of breath",
          "Thoracic breathing predominates over abdominal breathing",
          "Increased oxygen consumption by 20%",
        ],
      },
    },
    {
      id: "gastrointestinal",
      name: "Gastrointestinal System",
      changes: {
        1: [
          "Morning sickness (70-80% of women)",
          "Food aversions and cravings",
          "Altered taste perception",
          "Increased salivation",
        ],
        2: [
          "Morning sickness typically resolves",
          "Decreased gastric motility",
          "Increased risk of GERD/heartburn",
          "Constipation more common",
        ],
        3: [
          "Significant heartburn/reflux as uterus displaces stomach",
          "Constipation worsens",
          "Hemorrhoids more common",
          "Gallbladder function decreases (increased risk of gallstones)",
        ],
      },
    },
    {
      id: "renal",
      name: "Renal System",
      changes: {
        1: [
          "Glomerular filtration rate (GFR) increases by 50%",
          "Increased urinary frequency",
          "Renal plasma flow increases",
        ],
        2: [
          "GFR remains elevated",
          "Urinary frequency may temporarily improve",
          "Glycosuria may occur (normal in pregnancy)",
          "Increased risk of UTIs",
        ],
        3: [
          "Urinary frequency returns due to pressure on bladder",
          "Increased risk of urinary stasis and UTIs",
          "Hydronephrosis of pregnancy (dilation of renal collecting system)",
          "Proteinuria may appear in normal pregnancies",
        ],
      },
    },
    {
      id: "endocrine",
      name: "Endocrine System",
      changes: {
        1: [
          "hCG production peaks (responsible for morning sickness)",
          "Thyroid binding globulin increases",
          "Insulin sensitivity increases",
        ],
        2: [
          "Estrogen and progesterone levels continue to rise",
          "Insulin resistance begins to develop",
          "Increased cortisol production",
          "Increased parathyroid hormone",
        ],
        3: [
          "Significant insulin resistance (highest risk for gestational diabetes)",
          "High levels of estrogen, progesterone, and human placental lactogen",
          "Prolactin levels increase in preparation for lactation",
          "Oxytocin receptors increase in myometrium",
        ],
      },
    },
    {
      id: "skin",
      name: "Skin Changes",
      changes: {
        1: [
          "Vascular changes may cause facial flushing",
          "Increased oil gland activity",
          "Spider angiomas may appear",
        ],
        2: [
          "Hyperpigmentation begins (melasma, linea nigra)",
          "Stretch marks may begin to form",
          "Palmar erythema (reddening of palms)",
          "Increased hair growth",
        ],
        3: [
          "Pronounced stretch marks",
          "Significant hyperpigmentation",
          "Skin tags may develop",
          "Heat intolerance due to increased basal metabolic rate",
        ],
      },
    },
  ];

  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-6">
      <div className="bg-indigo-600 text-white px-4 py-2">
        Pregnancy Body Changes Simulator
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">
            Select Body System:
          </h3>
          <div className="flex flex-wrap gap-2">
            {bodySystems.map((system) => (
              <button
                key={system.id}
                onClick={() => setSelectedSystem(system.id)}
                className={`px-3 py-2 rounded-md ${
                  selectedSystem === system.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {system.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">
            Trimester:
          </h3>
          <div className="flex gap-2">
            {[1, 2, 3].map((t) => (
              <button
                key={t}
                onClick={() => setTrimester(t)}
                className={`w-24 py-2 rounded-md ${
                  trimester === t
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t === 1
                  ? "First (0-13 wks)"
                  : t === 2
                  ? "Second (14-27 wks)"
                  : "Third (28+ wks)"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">
              {bodySystems.find((s) => s.id === selectedSystem).name} Changes in
              Trimester {trimester}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {bodySystems
                .find((s) => s.id === selectedSystem)
                .changes[trimester].map((change, index) => (
                  <li key={index} className="text-gray-700">
                    {change}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r">
          <h4 className="font-medium text-yellow-800 mb-2">
            Clinical Significance
          </h4>
          <p className="text-gray-700">
            {selectedSystem === "cardiovascular" &&
              "Understanding cardiovascular changes helps distinguish normal findings from pathology. Monitor BP closely as both hypertension and hypotension can affect pregnancy outcomes."}
            {selectedSystem === "respiratory" &&
              "Respiratory changes affect medication dosing and interpretation of blood gases. Shortness of breath must be distinguished from pathological causes like pulmonary embolism."}
            {selectedSystem === "gastrointestinal" &&
              "GI symptoms often require management for patient comfort. Severe vomiting (hyperemesis gravidarum) requires careful evaluation and treatment."}
            {selectedSystem === "renal" &&
              "Changes in GFR affect medication clearance. Asymptomatic bacteriuria requires treatment to prevent pyelonephritis. Proteinuria must be evaluated carefully for preeclampsia."}
            {selectedSystem === "endocrine" &&
              "Endocrine changes necessitate thyroid function monitoring and screening for gestational diabetes. Insulin management is adjusted throughout pregnancy."}
            {selectedSystem === "skin" &&
              "Most skin changes resolve post-pregnancy but may cause psychological distress. Severe pruritus needs evaluation as it may indicate cholestasis of pregnancy."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PregnancyBodyChangesSimulator;