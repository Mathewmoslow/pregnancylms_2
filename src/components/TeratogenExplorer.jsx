import React, { useState } from "react";

const TeratogenExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState("physical");
  const [selectedTeratogen, setSelectedTeratogen] = useState(null);

  const teratogens = {
    physical: [
      {
        name: "Radiation",
        description:
          "Ionizing radiation can cause cell death and mutations in the developing embryo/fetus.",
        effects:
          "Effects depend on exposure dose, gestational age, and duration. May cause growth restriction, microcephaly, intellectual disability, or increased cancer risk later in life.",
        timing:
          "Most sensitive period is 8-15 weeks gestation for brain development. Early embryogenesis (2-8 weeks) is also high risk.",
        management:
          "Minimize diagnostic radiation; utilize appropriate shielding when necessary. Therapeutic radiation is generally contraindicated in pregnancy.",
        safetyMeasures:
          "Single diagnostic procedures (X-ray, CT) rarely exceed threshold for fetal damage. Magnetic resonance imaging (MRI) does not use ionizing radiation and is safe.",
      },
      {
        name: "Hyperthermia",
        description:
          "Elevated core body temperature (>101.5°F or 38.6°C) can disturb normal embryonic development.",
        effects:
          "Neural tube defects, microcephaly, miscarriage, and other fetal anomalies.",
        timing:
          "Most sensitive during first trimester, particularly during neural tube formation (3-4 weeks).",
        management:
          "Avoid hot tubs, saunas, or activities that significantly increase core temperature. Treat fevers promptly with acetaminophen.",
        safetyMeasures:
          "Brief exposures to moderately warm environments are generally considered safe. Maintain hydration during exercise.",
      },
    ],
    infections: [
      {
        name: "Rubella (German Measles)",
        description:
          "Viral infection that can cross the placenta and infect the developing fetus.",
        effects:
          "Congenital Rubella Syndrome: hearing loss, cataracts, cardiac defects, developmental delay, and growth restriction.",
        timing:
          "Highest risk during first trimester (up to 90% transmission), particularly first 12 weeks.",
        management:
          "No specific treatment available. Prevention through MMR vaccination prior to pregnancy is essential.",
        safetyMeasures:
          "Confirm immunity before pregnancy. If exposed during pregnancy, test for infection and monitor fetus closely with specialized ultrasound.",
      },
      {
        name: "Cytomegalovirus (CMV)",
        description:
          "Common herpesvirus that can cross the placenta. Leading cause of congenital infections.",
        effects:
          "Hearing loss, vision impairment, microcephaly, intellectual disability, seizures, and developmental delay.",
        timing:
          "First trimester infection carries highest risk of severe effects, but transmission can occur at any stage.",
        management:
          "No approved treatment during pregnancy. Hyperimmune globulin is investigational.",
        safetyMeasures:
          "Proper handwashing, avoiding sharing food/utensils with young children, and avoiding contact with saliva and urine from young children (particularly for childcare workers).",
      },
      {
        name: "Zika Virus",
        description:
          "Mosquito-borne flavivirus that can cross the placenta and infect neural progenitor cells.",
        effects:
          "Microcephaly, brain abnormalities, eye defects, hearing loss, and limb contractures.",
        timing:
          "Can cause damage in all trimesters, with first trimester presenting highest risk.",
        management:
          "No specific treatment. Supportive care and appropriate monitoring of the fetus.",
        safetyMeasures:
          "Avoid travel to Zika-endemic areas during pregnancy. Use insect repellent and protective clothing if travel cannot be avoided.",
      },
    ],
    drugs: [
      {
        name: "Alcohol",
        description:
          "Ethanol readily crosses the placenta and disrupts fetal development through multiple mechanisms.",
        effects:
          "Fetal Alcohol Spectrum Disorders (FASD): facial abnormalities, growth deficiency, central nervous system problems, behavioral and learning difficulties.",
        timing:
          "No safe amount or time during pregnancy. Risk present throughout, with periods of increased vulnerability based on developing structures.",
        management:
          "No treatment reverses effects. Early intervention programs for affected children.",
        safetyMeasures:
          "Complete abstinence from alcohol during pregnancy and when trying to conceive is recommended.",
      },
      {
        name: "Isotretinoin (Accutane)",
        description:
          "Vitamin A derivative used for severe acne. Potent teratogen that affects cell migration and differentiation.",
        effects:
          "Craniofacial abnormalities, heart defects, thymus/parathyroid abnormalities, central nervous system malformations. High risk of spontaneous abortion.",
        timing: "High risk during first trimester, even with brief exposure.",
        management:
          "Discontinue immediately if pregnancy occurs. Half-life is approximately 24 hours.",
        safetyMeasures:
          "iPLEDGE program requires two negative pregnancy tests before prescription, monthly testing, and two forms of contraception during use.",
      },
      {
        name: "Angiotensin-Converting Enzyme (ACE) Inhibitors",
        description:
          "Antihypertensive medications that affect the renin-angiotensin system.",
        effects:
          "First trimester: potential increased risk of cardiovascular and central nervous system malformations. Second and third trimesters: oligohydramnios, renal tubular dysgenesis, anuria, hypocalvaria, growth restriction, and neonatal death.",
        timing:
          "Greatest risk during second and third trimesters, but first trimester exposure may also cause harm.",
        management:
          "Switch to pregnancy-safe antihypertensives before conception when possible. If exposure occurs, monitor fetal development closely.",
        safetyMeasures:
          "Contraindicated in pregnancy. Use alternative antihypertensives like methyldopa or labetalol.",
      },
    ],
    environmental: [
      {
        name: "Lead",
        description:
          "Heavy metal that crosses the placenta and accumulates in fetal tissues. Interferes with cellular processes and neurodevelopment.",
        effects:
          "Reduced birth weight, preterm delivery, developmental delays, reduced IQ, and behavioral problems.",
        timing: "Exposure at any point in pregnancy may cause harm.",
        management:
          "Remove source of exposure. Chelation therapy rarely used during pregnancy except in severe cases.",
        safetyMeasures:
          "Test for lead in older homes (pre-1978), avoid lead-contaminated soil, use cold water for cooking/drinking, and avoid certain herbal medicines or cosmetics with high lead content.",
      },
      {
        name: "Mercury",
        description:
          "Heavy metal that readily crosses the blood-brain and placental barriers. Organic mercury (methylmercury) is most concerning.",
        effects:
          "Neurological damage, developmental delays, visual and hearing impairment, and cerebral palsy-like symptoms.",
        timing: "Brain development throughout pregnancy is vulnerable.",
        management:
          "Eliminate exposure source. No specific treatment reverses effects.",
        safetyMeasures:
          "Avoid high-mercury fish (shark, swordfish, king mackerel, tilefish). Low-mercury fish are safe in moderation (2-3 servings/week) and beneficial.",
      },
      {
        name: "Pesticides",
        description:
          "Various agricultural and household chemicals can cross the placenta and may disrupt hormone function or directly damage developing tissues.",
        effects:
          "Associated with birth defects, preterm birth, low birth weight, developmental delays, and childhood cancers.",
        timing:
          "Early embryonic development particularly vulnerable to organophosphates and certain herbicides.",
        management: "Reduce exposure. No specific treatments available.",
        safetyMeasures:
          "Avoid direct contact with pesticides, wash produce thoroughly, remove shoes before entering home, and consider organic foods when possible.",
      },
    ],
  };

  const handleTeratogenSelect = (teratogen) => {
    setSelectedTeratogen(teratogen);
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden mb-6">
      <div className="bg-indigo-600 text-white px-4 py-2">
        Teratogen Explorer
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-700 mb-3">
            Teratogen Categories:
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory("physical");
                setSelectedTeratogen(null);
              }}
              className={`px-3 py-2 rounded-md ${
                selectedCategory === "physical"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Physical Teratogens
            </button>
            <button
              onClick={() => {
                setSelectedCategory("infections");
                setSelectedTeratogen(null);
              }}
              className={`px-3 py-2 rounded-md ${
                selectedCategory === "infections"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Infectious Teratogens
            </button>
            <button
              onClick={() => {
                setSelectedCategory("drugs");
                setSelectedTeratogen(null);
              }}
              className={`px-3 py-2 rounded-md ${
                selectedCategory === "drugs"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Drug Teratogens
            </button>
            <button
              onClick={() => {
                setSelectedCategory("environmental");
                setSelectedTeratogen(null);
              }}
              className={`px-3 py-2 rounded-md ${
                selectedCategory === "environmental"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Environmental Teratogens
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-medium text-indigo-700 mb-3">
                Select a Teratogen:
              </h3>
              <div className="space-y-2">
                {teratogens[selectedCategory].map((teratogen, index) => (
                  <button
                    key={index}
                    onClick={() => handleTeratogenSelect(teratogen)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedTeratogen &&
                      selectedTeratogen.name === teratogen.name
                        ? "bg-indigo-100 border-l-4 border-indigo-500"
                        : "bg-white hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {teratogen.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
              <h4 className="font-medium text-yellow-800 mb-2">
                Patient Education Note
              </h4>
              <p className="text-gray-700 text-sm">
                Many pregnant women experience anxiety about potential
                teratogens. While it's important to avoid known harmful
                substances, most exposures result in no adverse effects. Counsel
                patients to discuss concerns with their healthcare provider
                rather than stopping medications or becoming unduly anxious
                about minor exposures.
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedTeratogen ? (
              <div>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="bg-indigo-600 text-white px-4 py-2">
                    {selectedTeratogen.name}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-indigo-700 mb-1">
                      Description:
                    </h4>
                    <p className="text-gray-700 mb-3">
                      {selectedTeratogen.description}
                    </p>

                    <h4 className="font-medium text-indigo-700 mb-1">
                      Potential Effects:
                    </h4>
                    <p className="text-gray-700 mb-3">
                      {selectedTeratogen.effects}
                    </p>

                    <h4 className="font-medium text-indigo-700 mb-1">
                      Critical Timing:
                    </h4>
                    <p className="text-gray-700 mb-3">
                      {selectedTeratogen.timing}
                    </p>

                    <h4 className="font-medium text-indigo-700 mb-1">
                      Management if Exposure Occurs:
                    </h4>
                    <p className="text-gray-700 mb-3">
                      {selectedTeratogen.management}
                    </p>

                    <h4 className="font-medium text-indigo-700 mb-1">
                      Prevention/Safety Measures:
                    </h4>
                    <p className="text-gray-700">
                      {selectedTeratogen.safetyMeasures}
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-700 mb-2">
                    Developmental Timeline & Teratogenic Periods
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Teratogens affect different organ systems based on when
                    critical development occurs:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                      <thead>
                        <tr className="bg-indigo-100">
                          <th className="py-2 px-3 border text-left">
                            Developmental Period
                          </th>
                          <th className="py-2 px-3 border text-left">
                            Gestational Weeks
                          </th>
                          <th className="py-2 px-3 border text-left">
                            Vulnerable Systems
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-3 border">Pre-implantation</td>
                          <td className="py-2 px-3 border">0-2 weeks</td>
                          <td className="py-2 px-3 border">
                            "All or none" effect - typically embryo loss rather
                            than malformation
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 border">Embryonic Period</td>
                          <td className="py-2 px-3 border">3-8 weeks</td>
                          <td className="py-2 px-3 border">
                            Critical for organogenesis - heart (3-6 wks), neural
                            tube (3-4 wks), limbs (4-8 wks)
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 border">Early Fetal</td>
                          <td className="py-2 px-3 border">9-16 weeks</td>
                          <td className="py-2 px-3 border">
                            Brain growth, palate (10-12 wks), external genitalia
                            (12-14 wks)
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 border">Late Fetal</td>
                          <td className="py-2 px-3 border">17-40 weeks</td>
                          <td className="py-2 px-3 border">
                            Brain development continues, functional maturation
                            of organs
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg p-6 border border-dashed border-gray-300">
                <div className="text-center">
                  <p className="text-gray-500">
                    Select a teratogen from the list to view detailed
                    information
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeratogenExplorer;