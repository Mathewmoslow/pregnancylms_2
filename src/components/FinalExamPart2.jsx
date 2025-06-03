
import React, { useState, useEffect } from "react";

const FinalExamPart2 = ({ onComplete }) => {

  const [examState, setExamState] = useState({

    started: false,

    completed: false,

    currentBatch: 1,

    shuffledQuestions: [],

    userAnswers: {},

    score: 0,

    reviewMode: false,

    timeRemaining: 120 * 60,

    totalScore: 0,

    batchesCompleted: 0

  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [currentQuestions, setCurrentQuestions] = useState([]);

  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  useEffect(() => {

    let timer;

    if (examState.started && !examState.completed) {

      timer = setInterval(() => {

        setExamState((prevState) => {

          const newTime = prevState.timeRemaining - 1;

          

          if (newTime <= 0) {

            clearInterval(timer);

            submitExam();

            return {

              ...prevState,

              timeRemaining: 0,

              completed: true,

            };

          }

          

          return {

            ...prevState,

            timeRemaining: newTime,

          };

        });

      }, 1000);

    }

    return () => {

      if (timer) clearInterval(timer);

    };

  }, [examState.started, examState.completed]);

  const formatTime = (timeInSeconds) => {

    const minutes = Math.floor(timeInSeconds / 60);

    const seconds = timeInSeconds % 60;

    return ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};

  };

  // All 200 exam questions for Part 2

  const allQuestions = [

    // Postpartum Adaptations (Chapter 17) - Questions 1-40

    {

      id: "P2-1",

      question: "A nurse is assessing a postpartum woman 12 hours after vaginal delivery. Where should the fundus be located?",

      options: [

        "2 cm above the umbilicus",

        "At the level of the umbilicus",

        "2 cm below the umbilicus",

        "Midway between umbilicus and symphysis pubis"

      ],

      correctAnswer: 1,

      rationale: "At 12 hours postpartum, the fundus should be at the level of the umbilicus. It then descends approximately 1 cm per day."

    },

    {

      id: "P2-2",

      question: "Which lochia characteristic on postpartum day 5 would require immediate nursing intervention?",

      options: [

        "Pink-brown color",

        "Serosanguinous appearance",

        "Bright red with clots",

        "Moderate amount on pad"

      ],

      correctAnswer: 2,

      rationale: "Bright red lochia with clots on day 5 suggests late postpartum hemorrhage. By day 5, lochia should be serosa (pink-brown)."

    },

    {

      id: "P2-3",

      question: "A multiparous woman complains of severe afterpains while breastfeeding. What is the physiologic basis for this discomfort?",

      options: [

        "Prolactin release causes uterine cramping",

        "Oxytocin release stimulates uterine contractions",

        "Estrogen withdrawal increases pain sensitivity",

        "Progesterone fluctuations cause muscle spasms"

      ],

      correctAnswer: 1,

      rationale: "Breastfeeding stimulates oxytocin release, which causes uterine contractions (afterpains). This is more pronounced in multiparous women due to decreased uterine tone."

    },

    {

      id: "P2-4",

      question: "Using the REEDA scale, which score would indicate normal perineal healing?",

      options: [

        "0-2",

        "3-5",

        "6-8",

        "9-10"

      ],

      correctAnswer: 0,

      rationale: "A REEDA score of 0-2 indicates normal healing. Higher scores suggest increasing complications requiring intervention."

    },

    {

      id: "P2-5",

      question: "What is the expected white blood cell count in a woman 24 hours postpartum?",

      options: [

        "5,000-10,000/mm³",

        "10,000-15,000/mm³",

        "15,000-30,000/mm³",

        "Greater than 30,000/mm³"

      ],

      correctAnswer: 2,

      rationale: "WBC can normally elevate to 15,000-30,000/mm³ postpartum due to the stress of labor. This is not indicative of infection without other symptoms."

    },

    {

      id: "P2-6",

      question: "A postpartum woman has not voided 8 hours after delivery. What is the primary concern?",

      options: [

        "Urinary tract infection",

        "Kidney dysfunction",

        "Uterine atony and hemorrhage",

        "Bladder rupture"

      ],

      correctAnswer: 2,

      rationale: "A distended bladder can displace the uterus and prevent proper contraction, leading to uterine atony and hemorrhage."

    },

    {

      id: "P2-7",

      question: "During which maternal adaptation phase does a mother typically ask many questions about infant care?",

      options: [

        "Taking-in phase",

        "Taking-hold phase",

        "Letting-go phase",

        "Attachment phase"

      ],

      correctAnswer: 1,

      rationale: "During the taking-hold phase, mothers become more independent and actively seek information about infant care."

    },

    {

      id: "P2-8",

      question: "What distinguishes postpartum blues from postpartum depression?",

      options: [

        "Blues last longer than 2 weeks",

        "Blues include suicidal ideation",

        "Blues resolve without treatment",

        "Blues require antidepressant therapy"

      ],

      correctAnswer: 2,

      rationale: "Postpartum blues are self-limiting and resolve within 2 weeks without treatment. Depression persists and requires intervention."

    },

    {

      id: "P2-9",

      question: "A breastfeeding mother asks when her menstrual periods will return. What is the most accurate response?",

      options: [

        "Within 6 weeks postpartum",

        "When you stop breastfeeding completely",

        "Typically 6 weeks to 6 months, but varies",

        "Not until 12 months postpartum"

      ],

      correctAnswer: 2,

      rationale: "Return of menses in breastfeeding women varies widely, typically occurring between 6 weeks to 6 months, depending on breastfeeding frequency and exclusivity."

    },

    {

      id: "P2-10",

      question: "Which finding indicates subinvolution of the uterus?",

      options: [

        "Fundus firm and midline",

        "Fundus 2 cm below umbilicus on day 3",

        "Fundus palpable above symphysis pubis on day 14",

        "Moderate lochia rubra on day 2"

      ],

      correctAnswer: 2,

      rationale: "By day 14, the fundus should not be palpable above the symphysis pubis. Continued palpability indicates subinvolution."

    },

    {

      id: "P2-11",

      question: "What is the primary risk factor for postpartum deep vein thrombosis?",

      options: [

        "Increased fibrinogen levels",

        "Decreased platelets",

        "Elevated white blood cells",

        "Reduced clotting factors"

      ],

      correctAnswer: 0,

      rationale: "Elevated fibrinogen and clotting factors during pregnancy persist into the postpartum period, increasing DVT risk, especially with immobility."

    },

    {

      id: "P2-12",

      question: "A woman reports perineal pain rated 7/10. Which intervention should be implemented first?",

      options: [

        "Apply ice pack to perineum",

        "Administer prescribed analgesics",

        "Perform perineal assessment using REEDA",

        "Encourage sitz bath"

      ],

      correctAnswer: 2,

      rationale: "Assessment must precede intervention to identify the cause of pain and rule out complications such as hematoma or infection."

    },

    {

      id: "P2-13",

      question: "Which hormone is responsible for milk let-down reflex?",

      options: [

        "Prolactin",

        "Oxytocin",

        "Estrogen",

        "Progesterone"

      ],

      correctAnswer: 1,

      rationale: "Oxytocin causes milk ejection (let-down) by contracting myoepithelial cells around alveoli. Prolactin stimulates milk production."

    },

    {

      id: "P2-14",

      question: "What is the expected fundal position on postpartum day 5?",

      options: [

        "At the umbilicus",

        "2 cm above symphysis pubis",

        "5 cm below umbilicus",

        "Not palpable abdominally"

      ],

      correctAnswer: 2,

      rationale: "The fundus descends approximately 1 cm per day. By day 5, it should be about 5 cm below the umbilicus."

    },

    {

      id: "P2-15",

      question: "Which finding suggests postpartum endometritis?",

      options: [

        "Temperature 100.2°F on day 1",

        "Foul-smelling lochia",

        "Afterpains during breastfeeding",

        "Pink lochia on day 4"

      ],

      correctAnswer: 1,

      rationale: "Foul-smelling lochia is a classic sign of endometritis. Other signs include fever >100.4°F after 24 hours, uterine tenderness, and tachycardia."

    },

    {

      id: "P2-16",

      question: "A postpartum woman's blood pressure is 142/92. Her prenatal BP was 118/74. What is the priority action?",

      options: [

        "Recheck in 15 minutes",

        "Notify the healthcare provider",

        "Encourage bedrest",

        "Increase fluid intake"

      ],

      correctAnswer: 1,

      rationale: "New-onset hypertension postpartum could indicate preeclampsia. Immediate provider notification is required for evaluation and management."

    },

    {

      id: "P2-17",

      question: "Which postpartum complication is most likely in a woman with a prolonged second stage of labor?",

      options: [

        "Uterine atony",

        "Retained placenta",

        "Perineal lacerations",

        "Subinvolution"

      ],

      correctAnswer: 2,

      rationale: "Prolonged second stage increases risk of perineal trauma due to extended pressure and stretching of tissues."

    },

    {

      id: "P2-18",

      question: "When should postpartum Kegel exercises begin?",

      options: [

        "Immediately after delivery",

        "After perineal healing is complete",

        "At 6 weeks postpartum",

        "Only if incontinence occurs"

      ],

      correctAnswer: 0,

      rationale: "Kegel exercises can begin immediately postpartum to promote perineal healing, improve circulation, and restore muscle tone."

    },

    {

      id: "P2-19",

      question: "What differentiates a cystocele from a rectocele?",

      options: [

        "Location of the prolapse",

        "Severity of symptoms",

        "Age of onset",

        "Treatment required"

      ],

      correctAnswer: 0,

      rationale: "Cystocele is anterior vaginal wall prolapse (bladder), while rectocele is posterior vaginal wall prolapse (rectum)."

    },

    {

      id: "P2-20",

      question: "Which intervention best promotes postpartum bonding?",

      options: [

        "Limiting visitors during hospital stay",

        "Encouraging skin-to-skin contact",

        "Providing detailed infant care instructions",

        "Allowing mother to rest between feedings"

      ],

      correctAnswer: 1,

      rationale: "Skin-to-skin contact promotes bonding through release of oxytocin, temperature regulation, and facilitating breastfeeding."

    },

    {

      id: "P2-21",

      question: "A woman is experiencing urinary incontinence 3 days postpartum. What type is most likely?",

      options: [

        "Stress incontinence",

        "Urge incontinence",

        "Overflow incontinence",

        "Functional incontinence"

      ],

      correctAnswer: 0,

      rationale: "Stress incontinence is common postpartum due to weakened pelvic floor muscles from pregnancy and delivery."

    },

    {

      id: "P2-22",

      question: "What is the primary cause of constipation in the early postpartum period?",

      options: [

        "Decreased progesterone",

        "Increased fiber intake",

        "Decreased intestinal motility",

        "Excessive ambulation"

      ],

      correctAnswer: 2,

      rationale: "Progesterone effects, dehydration, fear of pain, and decreased activity all contribute to decreased intestinal motility postpartum."

    },

    {

      id: "P2-23",

      question: "Which assessment finding indicates effective uterine involution?",

      options: [

        "Boggy fundus at umbilicus level",

        "Firm fundus descending 1 cm daily",

        "Soft fundus with moderate bleeding",

        "Fundus deviated to the right"

      ],

      correctAnswer: 1,

      rationale: "Normal involution shows a firm fundus that descends approximately 1 cm per day until no longer palpable by day 10-14."

    },

    {

      id: "P2-24",

      question: "When caring for a postpartum woman with a fourth-degree laceration, which diet modification is indicated?",

      options: [

        "High-protein diet",

        "Low-residue diet",

        "Clear liquids only",

        "Increased dairy products"

      ],

      correctAnswer: 1,

      rationale: "Low-residue diet minimizes bowel movements and reduces strain on the repaired rectal sphincter in fourth-degree lacerations."

    },

    {

      id: "P2-25",

      question: "What is the expected hemoglobin change from pregnancy to 1 week postpartum?",

      options: [

        "Increase of 1-2 g/dL",

        "No significant change",

        "Decrease of 1-2 g/dL",

        "Decrease of 3-4 g/dL"

      ],

      correctAnswer: 0,

      rationale: "Hemoglobin typically increases 1-2 g/dL postpartum due to diuresis and elimination of excess plasma volume from pregnancy."

    },

    {

      id: "P2-26",

      question: "Which woman is at highest risk for postpartum hemorrhage?",

      options: [

        "Primipara with 8-hour labor",

        "Multipara with macrosomic infant",

        "Woman with gestational diabetes",

        "Woman with pregnancy-induced hypertension"

      ],

      correctAnswer: 1,

      rationale: "Multiparas with overdistended uterus (macrosomia, multiples, polyhydramnios) have highest risk for uterine atony and hemorrhage."

    },

    {

      id: "P2-27",

      question: "What finding best indicates readiness for discharge on postpartum day 2?",

      options: [

        "Voiding without difficulty",

        "Ambulating independently",

        "Demonstrates proper infant care",

        "All of the above"

      ],

      correctAnswer: 3,

      rationale: "Discharge readiness requires physiologic stability (voiding, ambulating) and competence in self and infant care."

    },

    {

      id: "P2-28",

      question: "A postpartum woman reports seeing "spots" and having a headache. What is the priority assessment?",

      options: [

        "Temperature",

        "Blood pressure",

        "Deep tendon reflexes",

        "Visual acuity"

      ],

      correctAnswer: 1,

      rationale: "Visual disturbances and headache are signs of preeclampsia. Blood pressure assessment is the priority to identify hypertension."

    },

    {

      id: "P2-29",

      question: "Which factor most influences the timing of ovulation return postpartum?",

      options: [

        "Maternal age",

        "Parity",

        "Breastfeeding frequency",

        "Nutritional status"

      ],

      correctAnswer: 2,

      rationale: "Frequent breastfeeding suppresses ovulation through prolactin's inhibition of GnRH. Exclusive breastfeeding delays ovulation longest."

    },

    {

      id: "P2-30",

      question: "What is the most appropriate intervention for breast engorgement in a non-breastfeeding mother?",

      options: [

        "Breast pump to relieve pressure",

        "Warm compresses before pumping",

        "Ice packs and supportive bra",

        "Manual expression in shower"

      ],

      correctAnswer: 2,

      rationale: "For non-breastfeeding mothers, ice packs and firm support reduce milk production. Expressing milk stimulates continued production."

    },

    {

      id: "P2-31",

      question: "Which postpartum complication presents with unilateral leg swelling and positive Homans sign?",

      options: [

        "Superficial thrombophlebitis",

        "Deep vein thrombosis",

        "Pulmonary embolism",

        "Varicose veins"

      ],

      correctAnswer: 1,

      rationale: "DVT presents with unilateral leg swelling, pain, warmth, and positive Homans sign (though Homans sign has poor sensitivity/specificity)."

    },

    {

      id: "P2-32",

      question: "During the letting-go phase, what is the mother's primary psychological task?",

      options: [

        "Physical recovery from birth",

        "Learning infant care skills",

        "Grieving the loss of pregnancy",

        "Establishing milk supply"

      ],

      correctAnswer: 2,

      rationale: "The letting-go phase involves grieving the loss of pregnancy and previous lifestyle while accepting the new maternal role."

    },

    {

      id: "P2-33",

      question: "What is the normal duration of lochia alba?",

      options: [

        "3-4 days",

        "4-10 days",

        "10 days to 6 weeks",

        "6-8 weeks"

      ],

      correctAnswer: 2,

      rationale: "Lochia alba begins around day 10 and may continue up to 6 weeks postpartum, consisting mainly of leukocytes and decidual cells."

    },

    {

      id: "P2-34",

      question: "Which intervention is contraindicated for postpartum hemorrhage due to uterine atony?",

      options: [

        "Fundal massage",

        "Oxytocin administration",

        "Trendelenburg position",

        "Bladder emptying"

      ],

      correctAnswer: 2,

      rationale: "Trendelenburg position is contraindicated as it can cause blood to pool in the uterus and mask the extent of bleeding."

    },

    {

      id: "P2-35",

      question: "A woman develops eclampsia 48 hours postpartum. What distinguishes this from epilepsy?",

      options: [

        "Presence of hypertension and proteinuria",

        "Type of seizure activity",

        "Duration of seizures",

        "Response to magnesium sulfate"

      ],

      correctAnswer: 0,

      rationale: "Eclampsia occurs with preeclampsia (hypertension and proteinuria). It responds to magnesium sulfate, unlike epileptic seizures."

    },

    {

      id: "P2-36",

      question: "What is the primary purpose of methylergonovine (Methergine) postpartum?",

      options: [

        "Pain relief",

        "Prevent infection",

        "Sustained uterine contraction",

        "Promote lactation"

      ],

      correctAnswer: 2,

      rationale: "Methylergonovine causes sustained uterine contraction to control postpartum bleeding. It's contraindicated with hypertension."

    },

    {

      id: "P2-37",

      question: "Which cultural consideration is most important when providing postpartum care?",

      options: [

        "Language barriers",

        "Dietary restrictions",

        "Rest and activity beliefs",

        "All cultural practices equally"

      ],

      correctAnswer: 3,

      rationale: "All cultural practices should be respected and incorporated into care when safe. This includes dietary, rest, hygiene, and family involvement preferences."

    },

    {

      id: "P2-38",

      question: "What finding indicates hemorrhagic shock in a postpartum woman?",

      options: [

        "Hypertension and bradycardia",

        "Hypotension and tachycardia",

        "Increased urine output",

        "Flushed, warm skin"

      ],

      correctAnswer: 1,

      rationale: "Hemorrhagic shock presents with hypotension, tachycardia, cool clammy skin, decreased urine output, and altered mental status."

    },

    {

      id: "P2-39",

      question: "When should postpartum RhoGAM be administered to an Rh-negative mother?",

      options: [

        "Within 24 hours of delivery",

        "Within 72 hours of delivery",

        "At the 6-week checkup",

        "Only if baby is Rh-positive"

      ],

      correctAnswer: 3,

      rationale: "RhoGAM is given within 72 hours only if the baby is Rh-positive. If baby is Rh-negative, no RhoGAM is needed."

    },

    {

      id: "P2-40",

      question: "What differentiates mastitis from breast engorgement?",

      options: [

        "Bilateral breast involvement",

        "Presence of fever and flu-like symptoms",

        "Occurs in first week postpartum",

        "Responds to frequent feeding"

      ],

      correctAnswer: 1,

      rationale: "Mastitis typically presents with fever, flu-like symptoms, and localized breast redness/pain, usually unilateral. Engorgement is bilateral without systemic symptoms."

    },

    

    // Newborn Adaptation (Chapter 20) - Questions 41-80

    {

      id: "P2-41",

      question: "What triggers the closure of the foramen ovale after birth?",

      options: [

        "Increased oxygen levels",

        "Increased left atrial pressure",

        "Decreased prostaglandins",

        "Clamping of umbilical cord"

      ],

      correctAnswer: 1,

      rationale: "Increased left atrial pressure from increased pulmonary blood flow causes functional closure of the foramen ovale after birth."

    },

    {

      id: "P2-42",

      question: "Which factor is most important in stimulating a newborn's first breath?",

      options: [

        "Mild hypoxia and hypercapnia",

        "Maternal oxytocin release",

        "Surfactant production",

        "Umbilical cord clamping"

      ],

      correctAnswer: 0,

      rationale: "Chemical stimuli (mild hypoxia and hypercapnia) along with thermal and sensory stimuli trigger the respiratory center to initiate breathing."

    },

    {

      id: "P2-43",

      question: "A newborn has a bilirubin level of 8 mg/dL at 36 hours of age. This finding suggests:",

      options: [

        "Physiologic jaundice",

        "Pathologic jaundice",

        "Breast milk jaundice",

        "Hemolytic disease"

      ],

      correctAnswer: 1,

      rationale: "Jaundice appearing before 24 hours or bilirubin >5 mg/dL per day suggests pathologic jaundice requiring investigation."

    },

    {

      id: "P2-44",

      question: "What is the primary source of heat production in newborns?",

      options: [

        "Shivering thermogenesis",

        "Brown fat metabolism",

        "Muscle activity",

        "Peripheral vasoconstriction"

      ],

      correctAnswer: 1,

      rationale: "Newborns produce heat through non-shivering thermogenesis by metabolizing brown fat, as they cannot effectively shiver."

    },

    {

      id: "P2-45",

      question: "Which newborn reflex indicates intact neurological function of cranial nerve V?",

      options: [

        "Moro reflex",

        "Rooting reflex",

        "Sucking reflex",

        "Babinski reflex"

      ],

      correctAnswer: 1,

      rationale: "The rooting reflex tests cranial nerve V (trigeminal) function through facial sensation and response to cheek stroking."

    },

    {

      id: "P2-46",

      question: "Normal newborn respiratory rate is:",

      options: [

        "12-20 breaths/minute",

        "20-30 breaths/minute",

        "30-60 breaths/minute",

        "60-80 breaths/minute"

      ],

      correctAnswer: 2,

      rationale: "Normal newborn respiratory rate is 30-60 breaths per minute. Rates should be counted for a full minute due to irregularity."

    },

    {

      id: "P2-47",

      question: "Which finding indicates successful transition to extrauterine circulation?",

      options: [

        "Heart rate 180 bpm",

        "Central cyanosis at 1 hour",

        "Pink trunk with blue extremities",

        "Mottled skin when crying"

      ],

      correctAnswer: 2,

      rationale: "Acrocyanosis (pink trunk with blue extremities) is normal in the first 24 hours. Central cyanosis indicates poor transition."

    },

    {

      id: "P2-48",

      question: "The ductus arteriosus closes functionally due to:",

      options: [

        "Increased oxygen levels",

        "Decreased blood pressure",

        "Increased carbon dioxide",

        "Maternal hormone withdrawal"

      ],

      correctAnswer: 0,

      rationale: "Increased oxygen levels after birth cause constriction of the ductus arteriosus, leading to functional closure within hours."

    },

    {

      id: "P2-49",

      question: "A newborn's blood glucose is 38 mg/dL. What is the appropriate intervention?",

      options: [

        "Monitor and recheck in 1 hour",

        "Initiate breastfeeding immediately",

        "Start IV dextrose infusion",

        "Give oral glucose gel"

      ],

      correctAnswer: 1,

      rationale: "Blood glucose 38 mg/dL is below normal (>45 mg/dL). First intervention is feeding (breast or formula), then recheck in 30 minutes."

    },

    {

      id: "P2-50",

      question: "Which mechanism helps clear fetal lung fluid at birth?",

      options: [

        "Crying and coughing",

        "Chest compression during vaginal delivery",

        "Absorption by pulmonary capillaries",

        "All of the above"

      ],

      correctAnswer: 3,

      rationale: "Fetal lung fluid is cleared through chest compression during delivery, absorption by capillaries and lymphatics, and expulsion through crying."

    },

    {

      id: "P2-51",

      question: "What causes physiologic jaundice in newborns?",

      options: [

        "Blood group incompatibility",

        "Immature hepatic function",

        "Excessive bruising at birth",

        "Inadequate fluid intake"

      ],

      correctAnswer: 1,

      rationale: "Physiologic jaundice results from immature hepatic conjugation of bilirubin, increased RBC breakdown, and shorter RBC lifespan."

    },

    {

      id: "P2-52",

      question: "The first period of reactivity in newborns is characterized by:",

      options: [

        "Deep sleep for 2-4 hours",

        "Alert state for 30-60 minutes",

        "Continuous crying",

        "Poor muscle tone"

      ],

      correctAnswer: 1,

      rationale: "The first period of reactivity lasts 30-60 minutes after birth, with alertness, strong sucking reflex, and readiness to feed."

    },

    {

      id: "P2-53",

      question: "Which vitamin is routinely given to newborns to prevent hemorrhage?",

      options: [

        "Vitamin A",

        "Vitamin D",

        "Vitamin E",

        "Vitamin K"

      ],

      correctAnswer: 3,

      rationale: "Vitamin K is given IM within 6 hours of birth to prevent hemorrhagic disease, as newborns have limited vitamin K and clotting factors."

    },

    {

      id: "P2-54",

      question: "Normal newborn urine output by day 3 of life is:",

      options: [

        "1-2 wet diapers/day",

        "3-4 wet diapers/day",

        "5-6 wet diapers/day",

        "8-10 wet diapers/day"

      ],

      correctAnswer: 2,

      rationale: "By day 3, newborns should have 5-6 wet diapers daily. This increases to 6-8 by day 5 as feeding establishes."

    },

    {

      id: "P2-55",

      question: "Which immunoglobulin provides passive immunity to newborns?",

      options: [

        "IgA",

        "IgD",

        "IgG",

        "IgM"

      ],

      correctAnswer: 2,

      rationale: "IgG crosses the placenta providing passive immunity for 6-12 months. IgA comes through breast milk for mucosal immunity."

    },

    {

      id: "P2-56",

      question: "The presence of 'brick dust' in a newborn's diaper indicates:",

      options: [

        "Kidney disease",

        "Urinary tract infection",

        "Normal uric acid crystals",

        "Inadequate hydration"

      ],

      correctAnswer: 2,

      rationale: "Pink/orange 'brick dust' is from uric acid crystals, normal in the first few days as kidneys mature and concentrate urine."

    },

    {

      id: "P2-57",

      question: "Which factor increases risk of newborn hypoglycemia?",

      options: [

        "Large for gestational age",

        "Post-term gestation",

        "Female gender",

        "Vaginal delivery"

      ],

      correctAnswer: 0,

      rationale: "LGA infants (often from diabetic mothers) have hyperinsulinemia that persists after birth, causing hypoglycemia when maternal glucose supply ends."

    },

    {

      id: "P2-58",

      question: "When does the posterior fontanel typically close?",

      options: [

        "2-3 months",

        "6-8 months",

        "12-18 months",

        "18-24 months"

      ],

      correctAnswer: 0,

      rationale: "The posterior fontanel typically closes by 2-3 months. The anterior fontanel remains open until 12-18 months."

    },

    {

      id: "P2-59",

      question: "Which newborn stool pattern indicates adequate breastfeeding?",

      options: [

        "One stool every 2-3 days",

        "Firm, brown stools daily",

        "3-4 yellow, seedy stools daily by day 4",

        "Green, watery stools after each feeding"

      ],

      correctAnswer: 2,

      rationale: "By day 4, breastfed infants should have 3-4 yellow, seedy stools daily, indicating adequate milk intake and digestion."

    },

    {

      id: "P2-60",

      question: "The Moro reflex is absent. This finding suggests:",

      options: [

        "Normal variation",

        "Neurological impairment",

        "Hunger",

        "Cold stress"

      ],

      correctAnswer: 1,

      rationale: "Absent Moro reflex suggests neurological impairment such as brain damage, spinal cord injury, or severe hypotonia."

    },

    {

      id: "P2-61",

      question: "Which heart rate is normal for a sleeping newborn?",

      options: [

        "60-80 bpm",

        "80-100 bpm",

        "120-140 bpm",

        "160-180 bpm"

      ],

      correctAnswer: 1,

      rationale: "Normal newborn heart rate during sleep is 80-100 bpm. Awake rates are 120-160 bpm."

    },

    {

      id: "P2-62",

      question: "Caput succedaneum differs from cephalohematoma in that it:",

      options: [

        "Does not cross suture lines",

        "Appears after 24 hours",

        "Crosses suture lines",

        "Requires surgical intervention"

      ],

      correctAnswer: 2,

      rationale: "Caput succedaneum is edema that crosses suture lines and resolves in days. Cephalohematoma is blood that doesn't cross sutures."

    },

    {

      id: "P2-63",

      question: "Which factor helps maintain newborn blood glucose levels?",

      options: [

        "Glycogen stores",

        "Protein catabolism",

        "Ketone production",

        "Maternal antibodies"

      ],

      correctAnswer: 0,

      rationale: "Newborns mobilize liver glycogen stores for glucose in the first hours after birth until feeding is established."

    },

    {

      id: "P2-64",

      question: "The primary purpose of surfactant is to:",

      options: [

        "Clear lung fluid",

        "Prevent alveolar collapse",

        "Increase oxygen transport",

        "Stimulate breathing"

      ],

      correctAnswer: 1,

      rationale: "Surfactant reduces surface tension in alveoli, preventing collapse during expiration and reducing work of breathing."

    },

    {

      id: "P2-65",

      question: "Which finding at 5 minutes after birth requires immediate intervention?",

      options: [

        "Irregular respirations",

        "Heart rate 92 bpm",

        "Acrocyanosis",

        "Weak cry"

      ],

      correctAnswer: 1,

      rationale: "Heart rate <100 bpm at 5 minutes requires positive pressure ventilation. Normal is >100 bpm."

    },

    {

      id: "P2-66",

      question: "Newborn thermoregulation is challenged by:",

      options: [

        "Large body surface area to weight ratio",

        "Thick subcutaneous fat",

        "Mature sweat glands",

        "Efficient shivering mechanism"

      ],

      correctAnswer: 0,

      rationale: "Large surface area to weight ratio increases heat loss. Newborns also have thin skin, little subcutaneous fat, and cannot shiver."

    },

    {

      id: "P2-67",

      question: "Which blood glucose level indicates hypoglycemia in a term newborn?",

      options: [

        "Less than 70 mg/dL",

        "Less than 50 mg/dL",

        "Less than 40 mg/dL",

        "Less than 30 mg/dL"

      ],

      correctAnswer: 2,

      rationale: "Hypoglycemia in term newborns is defined as blood glucose <40 mg/dL in the first 24 hours, <45 mg/dL thereafter."

    },

    {

      id: "P2-68",

      question: "The primary mechanism of heat loss in the delivery room is:",

      options: [

        "Conduction",

        "Convection",

        "Evaporation",

        "Radiation"

      ],

      correctAnswer: 2,

      rationale: "Evaporation from wet skin is the primary heat loss mechanism immediately after birth, hence the importance of drying."

    },

    {

      id: "P2-69",

      question: "Which reflex helps establish breastfeeding?",

      options: [

        "Moro reflex",

        "Tonic neck reflex",

        "Rooting reflex",

        "Babinski reflex"

      ],

      correctAnswer: 2,

      rationale: "The rooting reflex helps the infant find the nipple when the cheek is stroked, facilitating breastfeeding initiation."

    },

    {

      id: "P2-70",

      question: "Normal newborn blood pressure is approximately:",

      options: [

        "60-80/40-50 mmHg",

        "80-100/50-70 mmHg",

        "100-120/60-80 mmHg",

        "120-140/80-90 mmHg"

      ],

      correctAnswer: 0,

      rationale: "Normal newborn blood pressure is 60-80 systolic and 40-50 diastolic. It increases gradually with age."

    },

    {

      id: "P2-71",

      question: "Which condition is associated with delayed passage of meconium?",

      options: [

        "Prematurity",

        "Cystic fibrosis",

        "Hypoglycemia",

        "Jaundice"

      ],

      correctAnswer: 1,

      rationale: "Cystic fibrosis can cause meconium ileus. 90% of newborns pass meconium within 24 hours, 99% by 48 hours."

    },

    {

      id: "P2-72",

      question: "The umbilical cord normally contains:",

      options: [

        "One artery, one vein",

        "Two arteries, one vein",

        "One artery, two veins",

        "Two arteries, two veins"

      ],

      correctAnswer: 1,

      rationale: "Normal umbilical cord has two arteries (carry deoxygenated blood from fetus) and one vein (carries oxygenated blood to fetus)."

    },

    {

      id: "P2-73",

      question: "Which maternal condition increases risk of newborn polycythemia?",

      options: [

        "Gestational diabetes",

        "Pregnancy at high altitude",

        "Iron deficiency anemia",

        "Hyperemesis gravidarum"

      ],

      correctAnswer: 1,

      rationale: "High altitude pregnancy causes chronic hypoxia, stimulating increased RBC production and newborn polycythemia."

    },

    {

      id: "P2-74",

      question: "Erb's palsy in a newborn results from:",

      options: [

        "Hypoxic brain injury",

        "Brachial plexus injury",

        "Facial nerve damage",

        "Spinal cord trauma"

      ],

      correctAnswer: 1,

      rationale: "Erb's palsy results from brachial plexus injury (C5-C6) during delivery, often with shoulder dystocia, causing arm paralysis."

    },

    {

      id: "P2-75",

      question: "Which finding indicates adequate newborn hydration?",

      options: [

        "Sunken fontanels",

        "Decreased skin turgor",

        "6-8 wet diapers daily by day 5",

        "Dark concentrated urine"

      ],

      correctAnswer: 2,

      rationale: "Adequate hydration shows 6-8 wet diapers daily by day 5, elastic skin turgor, moist mucous membranes, and flat fontanels."

    },

    {

      id: "P2-76",

      question: "The normal newborn hemoglobin level is:",

      options: [

        "9-11 g/dL",

        "12-14 g/dL",

        "14-20 g/dL",

        "20-24 g/dL"

      ],

      correctAnswer: 2,

      rationale: "Normal newborn hemoglobin is 14-20 g/dL, higher than adults due to fetal hemoglobin and compensation for lower intrauterine oxygen."

    },

    {

      id: "P2-77",

      question: "Which intervention prevents ophthalmia neonatorum?",

      options: [

        "Silver nitrate drops",

        "Erythromycin ointment",

        "Gentamicin drops",

        "Artificial tears"

      ],

      correctAnswer: 1,

      rationale: "Erythromycin ophthalmic ointment prevents gonococcal and chlamydial conjunctivitis. It's applied within 1-2 hours of birth."

    },

    {

      id: "P2-78",

      question: "Cold stress in newborns can lead to:",

      options: [

        "Metabolic alkalosis",

        "Hyperglycemia",

        "Metabolic acidosis",

        "Respiratory alkalosis"

      ],

      correctAnswer: 2,

      rationale: "Cold stress increases oxygen consumption and metabolism, leading to hypoxia, anaerobic metabolism, and metabolic acidosis."

    },

    {

      id: "P2-79",

      question: "The primary reason for delayed cord clamping is to:",

      options: [

        "Prevent jaundice",

        "Increase iron stores",

        "Improve Apgar scores",

        "Reduce infection risk"

      ],

      correctAnswer: 1,

      rationale: "Delayed cord clamping (30-60 seconds) allows additional blood transfer, increasing iron stores and reducing anemia risk."

    },

    {

      id: "P2-80",

      question: "Which newborn behavioral state is optimal for initial breastfeeding?",

      options: [

        "Deep sleep",

        "Light sleep",

        "Quiet alert",

        "Active crying"

      ],

      correctAnswer: 2,

      rationale: "The quiet alert state is optimal for feeding, with the infant calm, attentive, and able to coordinate sucking and swallowing."

    },

    

    // Newborn Assessment & Care (Chapters 21-22) - Questions 81-120

    {

      id: "P2-81",

      question: "An APGAR score of 4 at one minute indicates:",

      options: [

        "Normal newborn",

        "Mild depression requiring stimulation",

        "Moderate depression requiring intervention",

        "Severe depression requiring resuscitation"

      ],

      correctAnswer: 2,

      rationale: "APGAR 4-6 indicates moderate depression requiring intervention such as oxygen and stimulation. Score <4 requires immediate resuscitation."

    },

    {

      id: "P2-82",

      question: "When using the Ballard scale, a score of 10 indicates gestational age of approximately:",

      options: [

        "28 weeks",

        "32 weeks",

        "36 weeks",

        "40 weeks"

      ],

      correctAnswer: 1,

      rationale: "Ballard score of 10 correlates with approximately 32 weeks gestation. The scale ranges from -10 (20 weeks) to 50 (44 weeks)."

    },

    {

      id: "P2-83",

      question: "Which finding on newborn assessment requires immediate intervention?",

      options: [

        "Molding of skull bones",

        "Nasal flaring and grunting",

        "Acrocyanosis at 2 hours",

        "Irregular breathing pattern"

      ],

      correctAnswer: 1,

      rationale: "Nasal flaring and grunting indicate respiratory distress requiring immediate assessment and intervention."

    },

    {

      id: "P2-84",

      question: "The presence of a single palmar crease may indicate:",

      options: [

        "Normal variation",

        "Down syndrome",

        "Prematurity",

        "Both A and B"

      ],

      correctAnswer: 3,

      rationale: "Single palmar crease can be a normal variation or associated with chromosomal abnormalities like Down syndrome."

    },

    {

      id: "P2-85",

      question: "When should the initial newborn bath be given?",

      options: [

        "Immediately after birth",

        "Within 1 hour of birth",

        "After temperature stabilizes",

        "At 24 hours of age"

      ],

      correctAnswer: 2,

      rationale: "First bath should be delayed until temperature is stable (usually 2-4 hours) to prevent hypothermia."

    },

    {

      id: "P2-86",

      question: "Which measurement is most important for identifying growth problems?",

      options: [

        "Weight alone",

        "Length alone",

        "Head circumference alone",

        "Weight for gestational age"

      ],

      correctAnswer: 3,

      rationale: "Plotting weight against gestational age identifies SGA, AGA, or LGA status, which determines risk factors and care needs."

    },

    {

      id: "P2-87",

      question: "A positive Ortolani maneuver indicates:",

      options: [

        "Normal hip joint",

        "Hip dislocation",

        "Fractured clavicle",

        "Erb's palsy"

      ],

      correctAnswer: 1,

      rationale: "Positive Ortolani maneuver (clunk felt as hip reduces) indicates developmental dysplasia of the hip requiring orthopedic referral."

    },

    {

      id: "P2-88",

      question: "Normal newborn head circumference is:",

      options: [

        "28-31 cm",

        "32-37 cm",

        "38-42 cm",

        "43-46 cm"

      ],

      correctAnswer: 1,

      rationale: "Normal term newborn head circumference is 32-37 cm (average 34-35 cm). It should be 2 cm larger than chest."

    },

    {

      id: "P2-89",

      question: "Which skin finding is abnormal in a newborn?",

      options: [

        "Mongolian spots",

        "Erythema toxicum",

        "Milia",

        "Petechiae on trunk"

      ],

      correctAnswer: 3,

      rationale: "Petechiae on the trunk suggest thrombocytopenia or infection. Facial petechiae from birth pressure are normal."

    },

    {

      id: "P2-90",

      question: "The recommended site for vitamin K injection in newborns is:",

      options: [

        "Deltoid muscle",

        "Vastus lateralis",

        "Ventrogluteal",

        "Dorsogluteal"

      ],

      correctAnswer: 1,

      rationale: "Vastus lateralis is the preferred site for newborn IM injections due to adequate muscle mass and absence of major nerves/vessels."

    },

    {

      id: "P2-91",

      question: "Which assessment finding suggests congenital hypothyroidism?",

      options: [

        "Large posterior fontanel",

        "Hyperactivity",

        "Tachycardia",

        "Hyperthermia"

      ],

      correctAnswer: 0,

      rationale: "Large posterior fontanel (>1 cm) may indicate hypothyroidism. Other signs include lethargy, poor feeding, and prolonged jaundice."

    },

    {

      id: "P2-92",

      question: "Choanal atresia is best assessed by:",

      options: [

        "Observing for nasal flaring",

        "Passing catheter through nares",

        "Checking for cyanosis when crying",

        "Auscultating breath sounds"

      ],

      correctAnswer: 1,

      rationale: "Inability to pass a catheter through the nares confirms choanal atresia. Affected infants are pink when crying (mouth breathing) but cyanotic at rest."

    },

    {

      id: "P2-93",

      question: "Which umbilical cord care practice is currently recommended?",

      options: [

        "Alcohol application with each diaper change",

        "Triple dye application daily",

        "Keep clean and dry",

        "Bacitracin ointment twice daily"

      ],

      correctAnswer: 2,

      rationale: "Current evidence supports keeping cord clean and dry for fastest healing. Antimicrobials may delay cord separation."

    },

    {

      id: "P2-94",

      question: "A newborn's initial temperature is 97.2°F. Priority intervention is:",

      options: [

        "Double wrap in blankets",

        "Place under radiant warmer",

        "Give warm formula feeding",

        "Increase room temperature"

      ],

      correctAnswer: 1,

      rationale: "Temperature <97.7°F requires active rewarming under radiant warmer with temperature monitoring every 15-30 minutes."

    },

    {

      id: "P2-95",

      question: "Which finding suggests adequate attachment behaviors?",

      options: [

        "Mother states baby looks like father",

        "En face position during feeding",

        "Mother asks nurse to feed baby",

        "Parents name baby after 3 days"

      ],

      correctAnswer: 1,

      rationale: "En face (face-to-face) position demonstrates engagement and bonding. Avoidance behaviors suggest attachment difficulties."

    },

    {

      id: "P2-96",

      question: "The cremasteric reflex in male newborns:",

      options: [

        "Indicates testicular torsion",

        "Confirms descended testes",

        "Is absent until 6 months",

        "Causes testicular retraction"

      ],

      correctAnswer: 3,

      rationale: "Cremasteric reflex causes testes to retract when inner thigh is stroked. This is normal and makes examination challenging."

    },

    {

      id: "P2-97",

      question: "Which newborn screening test is mandatory in all US states?",

      options: [

        "Cystic fibrosis",

        "Phenylketonuria",

        "Galactosemia",

        "Sickle cell disease"

      ],

      correctAnswer: 1,

      rationale: "PKU screening is mandatory in all states. Other tests vary by state but commonly include hypothyroidism and galactosemia."

    },

    {

      id: "P2-98",

      question: "The optimal time for newborn metabolic screening is:",

      options: [

        "Within 2 hours of birth",

        "Before first feeding",

        "24-48 hours of age",

        "At 1 week of age"

      ],

      correctAnswer: 2,

      rationale: "Metabolic screening is most accurate at 24-48 hours after protein feeding has begun but before discharge."

    },

    {

      id: "P2-99",

      question: "Which position is recommended for newborn sleep?",

      options: [

        "Prone",

        "Side-lying",

        "Supine",

        "Trendelenburg"

      ],

      correctAnswer: 2,

      rationale: "Supine (back) sleeping reduces SIDS risk by 50%. Side-lying is unstable and prone position increases SIDS risk."

    },

    {

      id: "P2-100",

      question: "Normal weight loss in the first week of life is:",

      options: [

        "Up to 5%",

        "Up to 10%",

        "Up to 15%",

        "Up to 20%"

      ],

      correctAnswer: 1,

      rationale: "Up to 10% weight loss is normal due to fluid shifts and limited intake. Greater loss requires evaluation of feeding."

    },

    {

      id: "P2-101",

      question: "Which infant requires phototherapy?",

      options: [

        "Term infant, bilirubin 8 mg/dL at 24 hours",

        "Term infant, bilirubin 12 mg/dL at 48 hours",

        "Term infant, bilirubin 15 mg/dL at 72 hours",

        "All require phototherapy"

      ],

      correctAnswer: 0,

      rationale: "Bilirubin 8 mg/dL at 24 hours exceeds phototherapy threshold. Treatment thresholds increase with age and depend on risk factors."

    },

    {

      id: "P2-102",

      question: "The primary purpose of the initial newborn assessment is to:",

      options: [

        "Establish bonding",

        "Determine gestational age",

        "Identify immediate needs",

        "Complete birth records"

      ],

      correctAnswer: 2,

      rationale: "Initial assessment focuses on identifying immediate needs for resuscitation, thermoregulation, and transition support."

    },

    {

      id: "P2-103",

      question: "Which cranial nerve is assessed with the sucking reflex?",

      options: [

        "III, IV, VI",

        "V, VII, IX, XII",

        "VIII",

        "X, XI"

      ],

      correctAnswer: 1,

      rationale: "Sucking involves cranial nerves V (trigeminal), VII (facial), IX (glossopharyngeal), and XII (hypoglossal)."

    },

    {

      id: "P2-104",

      question: "Pseudostrabismus in newborns is due to:",

      options: [

        "Cranial nerve palsy",

        "Wide nasal bridge",

        "Congenital cataracts",

        "Increased intracranial pressure"

      ],

      correctAnswer: 1,

      rationale: "Pseudostrabismus (false appearance of crossed eyes) is common due to wide nasal bridge and epicanthal folds."

    },

    {

      id: "P2-105",

      question: "Which discharge teaching point has highest priority?",

      options: [

        "Cord care technique",

        "Car seat safety",

        "Bathing procedure",

        "Feeding schedule"

      ],

      correctAnswer: 1,

      rationale: "Car seat safety is the highest priority as motor vehicle accidents are the leading cause of infant death after the neonatal period."

    },

    {

      id: "P2-106",

      question: "A newborn with central cyanosis at 10 minutes of life requires:",

      options: [

        "Stimulation and warming",

        "Oxygen administration",

        "Continued observation",

        "Deep suctioning"

      ],

      correctAnswer: 1,

      rationale: "Central cyanosis beyond the first few minutes indicates hypoxemia requiring oxygen and evaluation for cardiac/respiratory problems."

    },

    {

      id: "P2-107",

      question: "Which finding indicates possible sepsis in a newborn?",

      options: [

        "Temperature 99.5°F rectally",

        "Heart rate 145 bpm when crying",

        "Temperature instability",

        "Respiratory rate 45/minute"

      ],

      correctAnswer: 2,

      rationale: "Temperature instability (hypothermia or hyperthermia) is often the first sign of sepsis in newborns."

    },

    {

      id: "P2-108",

      question: "The startle reflex is the same as:",

      options: [

        "Rooting reflex",

        "Moro reflex",

        "Tonic neck reflex",

        "Stepping reflex"

      ],

      correctAnswer: 1,

      rationale: "The Moro (startle) reflex involves arm extension and abduction followed by flexion when the infant is startled."

    },

    {

      id: "P2-109",

      question: "Which maternal medication contraindicates breastfeeding?",

      options: [

        "Acetaminophen",

        "Penicillin",

        "Radioactive iodine",

        "Insulin"

      ],

      correctAnswer: 2,

      rationale: "Radioactive compounds are absolutely contraindicated during breastfeeding. Most other medications are compatible or have safer alternatives."

    },

    {

      id: "P2-110",

      question: "Physiologic weight loss in newborns is primarily due to:",

      options: [

        "Inadequate caloric intake",

        "Increased metabolic rate",

        "Fluid shifts and diuresis",

        "Immature digestive system"

      ],

      correctAnswer: 2,

      rationale: "Initial weight loss is mainly from fluid loss through diuresis and insensible losses, not inadequate nutrition."

    },

    {

      id: "P2-111",

      question: "Which assessment finding in a 2-hour-old newborn is most concerning?",

      options: [

        "Respiratory rate 65/minute",

        "Minimal response to stimulation",

        "Pink body with blue hands",

        "Heart rate 150 bpm"

      ],

      correctAnswer: 1,

      rationale: "Lethargy and minimal response suggest possible hypoglycemia, sepsis, or neurological problems requiring immediate evaluation."

    },

    {

      id: "P2-112",

      question: "The purpose of silver nitrate or erythromycin eye prophylaxis is to prevent:",

      options: [

        "Congenital cataracts",

        "Ophthalmia neonatorum",

        "Retinopathy of prematurity",

        "Congenital glaucoma"

      ],

      correctAnswer: 1,

      rationale: "Eye prophylaxis prevents ophthalmia neonatorum (conjunctivitis) from gonorrhea and chlamydia exposure during birth."

    },

    {

      id: "P2-113",

      question: "Which newborn requires blood glucose monitoring?",

      options: [

        "37 weeks, AGA, breastfeeding well",

        "40 weeks, LGA, jittery",

        "39 weeks, AGA, pink and active",

        "38 weeks, AGA, passed meconium"

      ],

      correctAnswer: 1,

      rationale: "LGA infants with jitteriness require glucose monitoring due to high risk of hypoglycemia from hyperinsulinemia."

    },

    {

      id: "P2-114",

      question: "The best indicator of effective breastfeeding in the first 24 hours is:",

      options: [

        "Baby sleeps 3-4 hours between feeds",

        "Audible swallowing during feeds",

        "No weight loss",

        "Mother reports no nipple pain"

      ],

      correctAnswer: 1,

      rationale: "Audible swallowing indicates milk transfer. Sleeping long periods and no weight loss are not expected in first 24 hours."

    },

    {

      id: "P2-115",

      question: "Which intervention promotes newborn thermoregulation?",

      options: [

        "Bathing immediately after birth",

        "Placing on cold scale for weight",

        "Skin-to-skin contact with mother",

        "Keeping delivery room at 65°F"

      ],

      correctAnswer: 2,

      rationale: "Skin-to-skin contact provides warmth, promotes bonding, stabilizes temperature, and facilitates breastfeeding."

    },

    {

      id: "P2-116",

      question: "A positive Babinski reflex in a newborn indicates:",

      options: [

        "Neurological damage",

        "Normal finding",

        "Need for orthopedic referral",

        "Hypoglycemia"

      ],

      correctAnswer: 1,

      rationale: "Positive Babinski (toe fanning with plantar stimulation) is normal until 12-24 months due to immature myelination."

    },

    {

      id: "P2-117",

      question: "Which action should the nurse take first for a newborn with tachypnea?",

      options: [

        "Suction mouth and nose",

        "Check blood glucose",

        "Assess oxygen saturation",

        "Notify pediatrician"

      ],

      correctAnswer: 2,

      rationale: "Assessing oxygenation determines severity and guides intervention. Tachypnea may indicate respiratory or cardiac problems."

    },

    {

      id: "P2-118",

      question: "The recommended position for lumbar puncture in a newborn is:",

      options: [

        "Prone with head extended",

        "Lateral with knees to chest",

        "Sitting upright",

        "Supine with legs extended"

      ],

      correctAnswer: 1,

      rationale: "Lateral position with knees flexed to chest opens vertebral spaces while maintaining airway. Sitting position risks airway compromise."

    },

    {

      id: "P2-119",

      question: "Which statement about newborn pain is accurate?",

      options: [

        "Newborns don't feel pain due to immature nervous system",

        "Pain responses are primarily reflexive",

        "Newborns experience and remember pain",

        "Crying is the only pain indicator"

      ],

      correctAnswer: 2,

      rationale: "Research shows newborns experience pain with physiologic and behavioral responses. Untreated pain has long-term consequences."

    },

    {

      id: "P2-120",

      question: "When should parents call the pediatrician after discharge?",

      options: [

        "Yellow skin color on day 3",

        "Eating every 2-3 hours",

        "Temperature 100.5°F rectally",

        "3-4 wet diapers on day 2"

      ],

      correctAnswer: 2,

      rationale: "Fever >100.4°F rectally in a newborn is a medical emergency requiring immediate evaluation for sepsis."

    },

    

    // Infant Feeding (Chapter 23) - Questions 121-160

    {

      id: "P2-121",

      question: "Colostrum differs from mature milk in that it contains:",

      options: [

        "More carbohydrates and fat",

        "More protein and immunoglobulins",

        "Less vitamins and minerals",

        "More water content"

      ],

      correctAnswer: 1,

      rationale: "Colostrum is high in protein, immunoglobulins (especially IgA), vitamins, and minerals, but lower in fat and carbohydrates than mature milk."

    },

    {

      id: "P2-122",

      question: "The primary carbohydrate in human milk is:",

      options: [

        "Glucose",

        "Fructose",

        "Lactose",

        "Sucrose"

      ],

      correctAnswer: 2,

      rationale: "Lactose is the primary carbohydrate in human milk, providing energy and enhancing calcium absorption."

    },

    {

      id: "P2-123",

      question: "Which immunoglobulin is most abundant in colostrum?",

      options: [

        "IgA",

        "IgG",

        "IgM",

        "IgE"

      ],

      correctAnswer: 0,

      rationale: "Secretory IgA is the predominant immunoglobulin in colostrum, providing passive immunity to the newborn's mucosal surfaces."

    },

    {

      id: "P2-124",

      question: "A mother asks about foremilk and hindmilk. The nurse explains that hindmilk:",

      options: [

        "Comes at the beginning of feeding",

        "Is higher in fat content",

        "Is more watery in consistency",

        "Contains more lactose"

      ],

      correctAnswer: 1,

      rationale: "Hindmilk comes later in the feeding and has higher fat content, providing satiety and calories for growth."

    },

    {

      id: "P2-125",

      question: "Which factor does NOT affect breast milk composition?",

      options: [

        "Maternal diet",

        "Time of day",

        "Stage of feeding",

        "Infant gender"

      ],

      correctAnswer: 3,

      rationale: "Infant gender does not affect milk composition. Maternal diet affects fatty acids, time affects volume, and stage affects fat content."

    },

    {

      id: "P2-126",

      question: "The recommended duration of exclusive breastfeeding is:",

      options: [

        "2 months",

        "4 months",

        "6 months",

        "12 months"

      ],

      correctAnswer: 2,

      rationale: "WHO and AAP recommend exclusive breastfeeding for 6 months, with continued breastfeeding alongside complementary foods thereafter."

    },

    {

      id: "P2-127",

      question: "Which maternal condition is an absolute contraindication to breastfeeding?",

      options: [

        "Hepatitis C",

        "HIV in developed countries",

        "Mastitis",

        "Tuberculosis"

      ],

      correctAnswer: 1,

      rationale: "In developed countries with safe water, HIV is contraindicated for breastfeeding. In developing countries, benefits may outweigh risks."

    },

    {

      id: "P2-128",

      question: "Signs of ineffective latch include:",

      options: [

        "Clicking sounds during feeding",

        "Sustained rhythmic sucking",

        "Relaxed arms and hands",

        "Wide-open mouth"

      ],

      correctAnswer: 0,

      rationale: "Clicking sounds indicate the baby is losing suction, suggesting shallow latch. Effective latch is quiet except for swallowing."

    },

    {

      id: "P2-129",

      question: "The let-down reflex is stimulated by:",

      options: [

        "Prolactin",

        "Oxytocin",

        "Estrogen",

        "Progesterone"

      ],

      correctAnswer: 1,

      rationale: "Oxytocin causes the let-down reflex by contracting myoepithelial cells around alveoli. Prolactin stimulates milk production."

    },

    {

      id: "P2-130",

      question: "A breastfeeding mother should increase her daily caloric intake by approximately:",

      options: [

        "200 calories",

        "300 calories",

        "500 calories",

        "700 calories"

      ],

      correctAnswer: 2,

      rationale: "Lactating women need approximately 500 additional calories daily to support milk production without depleting maternal stores."

    },

    {

      id: "P2-131",

      question: "Which statement about breastfeeding jaundice is correct?",

      options: [

        "It appears after 7 days of life",

        "It's caused by inadequate fluid intake",

        "It requires stopping breastfeeding",

        "It's due to breast milk proteins"

      ],

      correctAnswer: 1,

      rationale: "Breastfeeding jaundice (not breast milk jaundice) occurs in first week due to inadequate intake and delayed bilirubin elimination."

    },

    {

      id: "P2-132",

      question: "The football hold position is especially useful for:",

      options: [

        "Premature infants",

        "Mothers who had cesarean delivery",

        "Sleepy babies",

        "First-time mothers"

      ],

      correctAnswer: 1,

      rationale: "Football (clutch) hold keeps baby's weight off the incision site, making it ideal for post-cesarean mothers."

    },

    {

      id: "P2-133",

      question: "Which vitamin supplement is recommended for exclusively breastfed infants?",

      options: [

        "Vitamin A",

        "Vitamin C",

        "Vitamin D",

        "Vitamin E"

      ],

      correctAnswer: 2,

      rationale: "Vitamin D supplementation (400 IU/day) is recommended for all breastfed infants as breast milk is low in vitamin D."

    },

    {

      id: "P2-134",

      question: "A mother reports nipple pain during breastfeeding. The priority intervention is:",

      options: [

        "Apply lanolin cream",

        "Use nipple shields",

        "Assess latch technique",

        "Recommend pumping instead"

      ],

      correctAnswer: 2,

      rationale: "Poor latch is the most common cause of nipple pain. Assessment and correction of latch should precede other interventions."

    },

    {

      id: "P2-135",

      question: "Which type of formula is recommended for infants with galactosemia?",

      options: [

        "Cow's milk-based",

        "Soy-based",

        "Protein hydrolysate",

        "Amino acid-based"

      ],

      correctAnswer: 1,

      rationale: "Soy-based formula is used for galactosemia as it contains no lactose or galactose, which affected infants cannot metabolize."

    },

    {

      id: "P2-136",

      question: "Proper formula preparation includes:",

      options: [

        "Adding extra water to make it last longer",

        "Microwaving to ensure even heating",

        "Using bottled or boiled water for newborns",

        "Preparing a day's worth at once"

      ],

      correctAnswer: 2,

      rationale: "Bottled or boiled water should be used for newborns to prevent infection. Formula should be prepared as directed without dilution."

    },

    {

      id: "P2-137",

      question: "The primary advantage of ready-to-feed formula is:",

      options: [

        "Lower cost",

        "Longer shelf life",

        "No mixing errors",

        "Better nutrition"

      ],

      correctAnswer: 2,

      rationale: "Ready-to-feed formula eliminates mixing errors that could lead to improper concentration, though it's more expensive."

    },

    {

      id: "P2-138",

      question: "Which feeding cue indicates early hunger?",

      options: [

        "Crying vigorously",

        "Hand-to-mouth movements",

        "Falling asleep",

        "Arching back"

      ],

      correctAnswer: 1,

      rationale: "Hand-to-mouth movements and rooting are early hunger cues. Crying is a late cue making feeding more difficult."

    },

    {

      id: "P2-139",

      question: "Normal weight gain for breastfed infants after the first week is:",

      options: [

        "1/2 oz per day",

        "1 oz per day",

        "2 oz per day",

        "3 oz per day"

      ],

      correctAnswer: 1,

      rationale: "After regaining birth weight, infants should gain approximately 1 oz (30g) per day or 6-7 oz per week."

    },

    {

      id: "P2-140",

      question: "Which factor indicates adequate milk transfer during breastfeeding?",

      options: [

        "Feeding duration of exactly 20 minutes",

        "Audible swallowing",

        "Baby falls asleep at breast",

        "No breast fullness after feeding"

      ],

      correctAnswer: 1,

      rationale: "Audible swallowing indicates active milk transfer. Duration varies, and babies may sleep when satisfied or exhausted."

    },

    {

      id: "P2-141",

      question: "Treatment for mastitis includes:",

      options: [

        "Stop breastfeeding on affected side",

        "Apply ice packs continuously",

        "Continue breastfeeding and antibiotics",

        "Pump and discard milk"

      ],

      correctAnswer: 2,

      rationale: "Continued breastfeeding helps clear the infection. Antibiotics treat bacterial infection. Milk remains safe for baby."

    },

    {

      id: "P2-142",

      question: "Which infant is at highest risk for feeding difficulties?",

      options: [

        "37 weeks gestation",

        "Born by cesarean",

        "35 weeks gestation",

        "Second-born twin"

      ],

      correctAnswer: 2,

      rationale: "Late preterm infants (34-36 weeks) have immature suck-swallow-breathe coordination, making feeding challenging."

    },

    {

      id: "P2-143",

      question: "The most reliable indicator of adequate infant nutrition is:",

      options: [

        "Sleeping through the night",

        "Appropriate weight gain",

        "Feeding every 3 hours",

        "Contented behavior"

      ],

      correctAnswer: 1,

      rationale: "Consistent weight gain along growth curves is the best indicator of adequate nutrition, regardless of feeding method."

    },

    {

      id: "P2-144",

      question: "When should cow's milk be introduced?",

      options: [

        "6 months",

        "9 months",

        "12 months",

        "18 months"

      ],

      correctAnswer: 2,

      rationale: "Cow's milk should not be given before 12 months due to low iron content, renal solute load, and potential for micro-bleeding."

    },

    {

      id: "P2-145",

      question: "Which medication is considered safe during breastfeeding?",

      options: [

        "Lithium",

        "Methotrexate",

        "Acetaminophen",

        "Radioactive iodine"

      ],

      correctAnswer: 2,

      rationale: "Acetaminophen is safe during breastfeeding. Lithium, methotrexate, and radioactive substances are contraindicated."

    },

    {

      id: "P2-146",

      question: "Nipple confusion is best prevented by:",

      options: [

        "Using pacifiers from birth",

        "Avoiding artificial nipples for 3-4 weeks",

        "Alternating breast and bottle",

        "Using only slow-flow nipples"

      ],

      correctAnswer: 1,

      rationale: "Avoiding artificial nipples for 3-4 weeks allows breastfeeding to be well established before introducing different sucking patterns."

    },

    {

      id: "P2-147",

      question: "Which position promotes optimal bottle feeding?",

      options: [

        "Lying flat",

        "Semi-upright position",

        "Side-lying",

        "Prone position"

      ],

      correctAnswer: 1,

      rationale: "Semi-upright position prevents choking, reduces ear infections, and allows baby to control flow and intake."

    },

    {

      id: "P2-148",

      question: "Signs of overfeeding in bottle-fed infants include:",

      options: [

        "Falling asleep during feeds",

        "Spitting up large amounts",

        "Wanting to feed every 2 hours",

        "Fussiness after feeding"

      ],

      correctAnswer: 1,

      rationale: "Excessive spitting up suggests overfeeding. Bottle-fed babies may continue sucking beyond satiety due to continuous flow."

    },

    {

      id: "P2-149",

      question: "The primary reason for burping during feeding is to:",

      options: [

        "Prevent colic",

        "Increase intake",

        "Release swallowed air",

        "Wake the baby"

      ],

      correctAnswer: 2,

      rationale: "Burping releases swallowed air that can cause discomfort and premature satiety, especially important for bottle-fed infants."

    },

    {

      id: "P2-150",

      question: "Which factor does NOT influence milk production?",

      options: [

        "Breast size",

        "Frequency of feeding",

        "Completeness of emptying",

        "Maternal hydration"

      ],

      correctAnswer: 0,

      rationale: "Breast size is determined by fat tissue, not glandular tissue. Small breasts can produce adequate milk with frequent feeding."

    },

    {

      id: "P2-151",

      question: "The best way to increase milk supply is:",

      options: [

        "Drink more fluids",

        "Eat galactagogue foods",

        "Increase feeding frequency",

        "Take fenugreek supplements"

      ],

      correctAnswer: 2,

      rationale: "Milk production works by supply and demand. Increased feeding/pumping frequency is most effective for increasing supply."

    },

    {

      id: "P2-152",

      question: "Which infant feeding practice increases SIDS risk?",

      options: [

        "Breastfeeding",

        "Propping bottles",

        "Feeding on demand",

        "Burping frequently"

      ],

      correctAnswer: 1,

      rationale: "Propped bottles increase aspiration and SIDS risk. Bottles should always be held by caregiver during feeding."

    },

    {

      id: "P2-153",

      question: "Cluster feeding in newborns:",

      options: [

        "Indicates low milk supply",

        "Is normal behavior",

        "Should be discouraged",

        "Only occurs at night"

      ],

      correctAnswer: 1,

      rationale: "Cluster feeding (frequent feeds close together) is normal, especially during growth spurts, and helps establish supply."

    },

    {

      id: "P2-154",

      question: "Which storage guideline for expressed breast milk is correct?",

      options: [

        "Room temperature for 24 hours",

        "Refrigerator for 2 weeks",

        "Freezer for 6-12 months",

        "Never refreeze thawed milk"

      ],

      correctAnswer: 3,

      rationale: "Thawed breast milk should never be refrozen. Fresh milk: room temp 4-6 hours, fridge 3-5 days, freezer 6-12 months."

    },

    {

      id: "P2-155",

      question: "A mother taking which medication should pump and discard milk?",

      options: [

        "Ibuprofen",

        "Chemotherapy drugs",

        "Prenatal vitamins",

        "Insulin"

      ],

      correctAnswer: 1,

      rationale: "Chemotherapy drugs require pumping and discarding to maintain supply while protecting infant from toxic exposure."

    },

    {

      id: "P2-156",

      question: "Which complementary feeding practice is recommended?",

      options: [

        "Start with rice cereal at 4 months",

        "Introduce one food at a time",

        "Avoid allergenic foods until 12 months",

        "Begin with fruit juices"

      ],

      correctAnswer: 1,

      rationale: "Introducing single foods allows identification of allergies/intolerances. Current guidelines support early allergen introduction."

    },

    {

      id: "P2-157",

      question: "Signs of tongue-tie affecting feeding include:",

      options: [

        "Clicking during feeds",

        "Good weight gain",

        "Long feeding sessions",

        "Both A and C"

      ],

      correctAnswer: 3,

      rationale: "Tongue-tie can cause clicking sounds and prolonged feeds due to inefficient milk transfer, often with poor weight gain."

    },

    {

      id: "P2-158",

      question: "Which practice supports successful breastfeeding?",

      options: [

        "Scheduled feedings every 3 hours",

        "Limiting night feedings",

        "Rooming-in 24 hours",

        "Supplementing with formula"

      ],

      correctAnswer: 2,

      rationale: "24-hour rooming-in promotes on-demand feeding, helps mothers learn cues, and supports milk supply establishment."

    },

    {

      id: "P2-159",

      question: "The most common cause of early breastfeeding cessation is:",

      options: [

        "Return to work",

        "Perception of insufficient milk",

        "Infant preference for bottles",

        "Maternal illness"

      ],

      correctAnswer: 1,

      rationale: "Perceived insufficient milk supply is the top reason for early weaning, often due to misunderstanding normal infant behavior."

    },

    {

      id: "P2-160",

      question: "Which resource provides evidence-based breastfeeding support?",

      options: [

        "Formula company websites",

        "Lactation consultants",

        "Social media groups",

        "Family advice"

      ],

      correctAnswer: 1,

      rationale: "International Board Certified Lactation Consultants (IBCLCs) provide evidence-based support for breastfeeding challenges."

    },

    

    // Family Planning (Chapter 26) - Questions 161-200

    {

      id: "P2-161",

      question: "Which contraceptive method has the highest typical-use failure rate?",

      options: [

        "Male condoms",

        "Withdrawal",

        "Fertility awareness methods",

        "Spermicides alone"

      ],

      correctAnswer: 3,

      rationale: "Spermicides alone have a typical-use failure rate of 28%. Withdrawal is 22%, condoms 18%, and FAM 24%."

    },

    {

      id: "P2-162",

      question: "The mechanism of action for combined oral contraceptives primarily involves:",

      options: [

        "Thickening cervical mucus only",

        "Preventing ovulation",

        "Thinning endometrium only",

        "Increasing vaginal pH"

      ],

      correctAnswer: 1,

      rationale: "COCs primarily prevent pregnancy by suppressing ovulation through inhibition of FSH and LH. Secondary mechanisms include cervical mucus thickening."

    },

    {

      id: "P2-163",

      question: "Which condition is an absolute contraindication for combined hormonal contraceptives?",

      options: [

        "Age over 35 years",

        "History of migraine with aura",

        "Controlled hypertension",

        "Family history of breast cancer"

      ],

      correctAnswer: 1,

      rationale: "Migraine with aura is an absolute contraindication due to increased stroke risk with estrogen. Age >35 alone is not a contraindication."

    },

    {

      id: "P2-164",

      question: "The copper IUD prevents pregnancy primarily by:",

      options: [

        "Releasing hormones",

        "Creating a toxic environment for sperm",

        "Preventing implantation only",

        "Thickening cervical mucus"

      ],

      correctAnswer: 1,

      rationale: "Copper ions are toxic to sperm and ova, preventing fertilization. The inflammatory response also contributes to contraceptive effect."

    },

    {

      id: "P2-165",

      question: "Which method provides dual protection against pregnancy and STIs?",

      options: [

        "IUD plus spermicide",

        "Oral contraceptives",

        "Male or female condoms",

        "Fertility awareness plus withdrawal"

      ],

      correctAnswer: 2,

      rationale: "Only barrier methods (male and female condoms) provide protection against both pregnancy and STIs when used correctly."

    },

    {

      id: "P2-166",

      question: "Emergency contraception is most effective when taken:",

      options: [

        "Within 24 hours",

        "Within 72 hours",

        "Within 5 days",

        "Within 7 days"

      ],

      correctAnswer: 0,

      rationale: "While EC can work up to 120 hours, effectiveness decreases with time. Taking within 24 hours provides maximum effectiveness."

    },

    {

      id: "P2-167",

      question: "A woman misses 2 active pills in week 3 of her pack. She should:",

      options: [

        "Take 2 pills daily until caught up",

        "Finish the pack normally",

        "Start a new pack immediately",

        "Stop pills until next period"

      ],

      correctAnswer: 2,

      rationale: "Missing 2 pills in week 3: discard placebo pills and start new pack immediately to prevent withdrawal bleeding and maintain protection."

    },

    {

      id: "P2-168",

      question: "Which long-acting reversible contraceptive (LARC) is most appropriate for nulliparous women?",

      options: [

        "Copper IUD only",

        "Hormonal IUD only",

        "Subdermal implant only",

        "All are appropriate"

      ],

      correctAnswer: 3,

      rationale: "Current guidelines support all LARC methods for nulliparous women. Previous concerns about IUD use have been disproven."

    },

    {

      id: "P2-169",

      question: "The primary advantage of the contraceptive implant is:",

      options: [

        "Reversibility within 24 hours",

        "No systemic hormone exposure",

        "Long-term efficacy with minimal maintenance",

        "Protection against STIs"

      ],

      correctAnswer: 2,

      rationale: "The implant provides 3 years of highly effective contraception with no daily maintenance required after insertion."

    },

    {

      id: "P2-170",

      question: "Which statement about lactational amenorrhea method (LAM) is correct?",

      options: [

        "Effective for 12 months postpartum",

        "Requires exclusive breastfeeding",

        "Works with any breastfeeding pattern",

        "Effective after menses returns"

      ],

      correctAnswer: 1,

      rationale: "LAM requires exclusive breastfeeding, amenorrhea, and infant <6 months old. Effectiveness is 98% when all criteria are met."

    },

    {

      id: "P2-171",

      question: "Depo-Provera (DMPA) may cause which long-term effect?",

      options: [

        "Permanent infertility",

        "Decreased bone density",

        "Increased cancer risk",

        "Blood clots"

      ],

      correctAnswer: 1,

      rationale: "DMPA can decrease bone density, particularly concerning for adolescents. Density usually recovers after discontinuation."

    },

    {

      id: "P2-172",

      question: "Natural family planning methods are most effective when:",

      options: [

        "Used with regular menstrual cycles",

        "Combined with withdrawal",

        "Used by women over 35",

        "Started immediately postpartum"

      ],

      correctAnswer: 0,

      rationale: "NFP/FAM methods require regular, predictable cycles to accurately identify fertile days. Irregular cycles reduce effectiveness."

    },

    {

      id: "P2-173",

      question: "Which contraceptive method requires fitting by a healthcare provider?",

      options: [

        "Contraceptive sponge",

        "Diaphragm",

        "Spermicide",

        "Female condom"

      ],

      correctAnswer: 1,

      rationale: "Diaphragms must be fitted by a provider to ensure proper size. Incorrect sizing reduces effectiveness and comfort."

    },

    {

      id: "P2-174",

      question: "The contraceptive patch should be changed:",

      options: [

        "Daily",

        "Weekly",

        "Monthly",

        "Every 3 months"

      ],

      correctAnswer: 1,

      rationale: "The patch is changed weekly for 3 weeks, followed by a patch-free week for withdrawal bleeding."

    },

    {

      id: "P2-175",

      question: "Which factor does NOT affect contraceptive efficacy?",

      options: [

        "User compliance",

        "Drug interactions",

        "Sexual frequency",

        "Method storage"

      ],

      correctAnswer: 2,

      rationale: "Sexual frequency doesn't affect method efficacy. Compliance, drug interactions, and proper storage all impact effectiveness."

    },

    {

      id: "P2-176",

      question: "A woman using the rhythm method should abstain during:",

      options: [

        "Days 1-7 of cycle",

        "Days 8-19 of cycle",

        "Days 20-28 of cycle",

        "Menstruation only"

      ],

      correctAnswer: 1,

      rationale: "In a 28-day cycle, ovulation typically occurs around day 14. Abstinence from days 8-19 covers the fertile window."

    },

    {

      id: "P2-177",

      question: "Which medication can decrease oral contraceptive effectiveness?",

      options: [

        "Acetaminophen",

        "Rifampin",

        "Ibuprofen",

        "Vitamins"

      ],

      correctAnswer: 1,

      rationale: "Rifampin induces liver enzymes that metabolize hormones faster, reducing contraceptive effectiveness. Backup method needed."

    },

    {

      id: "P2-178",

      question: "The levonorgestrel IUD can remain in place for:",

      options: [

        "3 years",

        "5 years",

        "7 years",

        "10 years"

      ],

      correctAnswer: 1,

      rationale: "Mirena and similar levonorgestrel IUDs are FDA-approved for 5 years, though some studies show longer efficacy."

    },

    {

      id: "P2-179",

      question: "Which woman is the best candidate for fertility awareness methods?",

      options: [

        "Breastfeeding mother",

        "Woman with PCOS",

        "Woman with regular 28-day cycles",

        "Perimenopausal woman"

      ],

      correctAnswer: 2,

      rationale: "FAM works best with regular, predictable cycles. Breastfeeding, PCOS, and perimenopause cause irregular cycles."

    },

    {

      id: "P2-180",

      question: "The primary mechanism of emergency contraceptive pills is:",

      options: [

        "Inducing abortion",

        "Preventing implantation",

        "Delaying ovulation",

        "Killing sperm"

      ],

      correctAnswer: 2,

      rationale: "EC pills primarily work by delaying or preventing ovulation. They do not disrupt established pregnancies."

    },

    {

      id: "P2-181",

      question: "Which side effect is most common with the contraceptive implant?",

      options: [

        "Weight loss",

        "Irregular bleeding",

        "Acne improvement",

        "Mood stability"

      ],

      correctAnswer: 1,

      rationale: "Irregular bleeding is the most common side effect, affecting up to 50% of users in the first year."

    },

    {

      id: "P2-182",

      question: "Vasectomy is considered effective after:",

      options: [

        "The procedure is complete",

        "1 month post-procedure",

        "Confirmation of azoospermia",

        "3 ejaculations"

      ],

      correctAnswer: 2,

      rationale: "Vasectomy requires semen analysis confirming absence of sperm (azoospermia), typically after 8-16 weeks and 15-20 ejaculations."

    },

    {

      id: "P2-183",

      question: "Which contraceptive method has no user-dependent factors?",

      options: [

        "Birth control pills",

        "Condoms",

        "IUD",

        "Fertility awareness"

      ],

      correctAnswer: 2,

      rationale: "Once inserted, IUDs work without user action. Pills require daily compliance, condoms require correct use each time."

    },

    {

      id: "P2-184",

      question: "The diaphragm should remain in place after intercourse for at least:",

      options: [

        "2 hours",

        "6 hours",

        "12 hours",

        "24 hours"

      ],

      correctAnswer: 1,

      rationale: "Diaphragm must stay in place at least 6 hours after intercourse to ensure spermicide effectiveness, but no more than 24 hours."

    },

    {

      id: "P2-185",

      question: "Which woman should avoid Depo-Provera?",

      options: [

        "Adolescent concerned about pregnancy",

        "Woman planning pregnancy in 6 months",

        "Woman with irregular periods",

        "Breastfeeding mother"

      ],

      correctAnswer: 1,

      rationale: "Fertility return after Depo can be delayed 10-18 months. Not ideal for women planning pregnancy soon."

    },

    {

      id: "P2-186",

      question: "The contraceptive vaginal ring is replaced:",

      options: [

        "Daily",

        "Weekly",

        "Monthly",

        "Every 3 months"

      ],

      correctAnswer: 2,

      rationale: "NuvaRing is worn for 3 weeks, removed for 1 week for withdrawal bleeding, then replaced with a new ring."

    },

    {

      id: "P2-187",

      question: "Which statement about tubal ligation is accurate?",

      options: [

        "Immediately reversible",

        "Protects against ovarian cancer",

        "Requires hormone replacement",

        "Prevents all ectopic pregnancies"

      ],

      correctAnswer: 1,

      rationale: "Tubal ligation provides some protection against ovarian cancer. It's considered permanent and doesn't prevent all ectopic pregnancies."

    },

    {

      id: "P2-188",

      question: "Spermicides are most effective when used:",

      options: [

        "Alone",

        "With barrier methods",

        "After intercourse",

        "Once weekly"

      ],

      correctAnswer: 1,

      rationale: "Spermicides are most effective when combined with barrier methods like diaphragms or condoms, increasing overall efficacy."

    },

    {

      id: "P2-189",

      question: "The copper IUD can be used for emergency contraception up to:",

      options: [

        "24 hours after intercourse",

        "72 hours after intercourse",

        "5 days after intercourse",

        "7 days after intercourse"

      ],

      correctAnswer: 2,

      rationale: "Copper IUD is the most effective EC, working up to 5 days after intercourse with >99% effectiveness."

    },

    {

      id: "P2-190",

      question: "Which contraceptive benefit is unique to combined oral contraceptives?",

      options: [

        "Decreased menstrual flow",

        "Reduced acne",

        "Protection from pregnancy",

        "Convenience"

      ],

      correctAnswer: 1,

      rationale: "COCs uniquely offer non-contraceptive benefits including acne reduction, while other hormonal methods may worsen acne."

    },

    {

      id: "P2-191",

      question: "A breastfeeding woman at 6 weeks postpartum should avoid:",

      options: [

        "Progestin-only pills",

        "Copper IUD",

        "Combined oral contraceptives",

        "Condoms"

      ],

      correctAnswer: 2,

      rationale: "Estrogen in COCs can decrease milk supply. Progestin-only methods and non-hormonal options are preferred while breastfeeding."

    },

    {

      id: "P2-192",

      question: "The standard days method works for women with cycles between:",

      options: [

        "21-35 days",

        "26-32 days",

        "28-30 days",

        "25-31 days"

      ],

      correctAnswer: 1,

      rationale: "Standard days method requires cycles between 26-32 days. Women avoid intercourse days 8-19 of their cycle."

    },

    {

      id: "P2-193",

      question: "Which factor most influences contraceptive method choice?",

      options: [

        "Cost alone",

        "Provider preference",

        "Individual patient factors",

        "Insurance coverage"

      ],

      correctAnswer: 2,

      rationale: "Method choice should be individualized based on patient preferences, medical history, lifestyle, and reproductive goals."

    },

    {

      id: "P2-194",

      question: "The basal body temperature method detects ovulation by:",

      options: [

        "Temperature drop before ovulation",

        "Temperature rise after ovulation",

        "No temperature change",

        "Temperature spike during ovulation"

      ],

      correctAnswer: 1,

      rationale: "BBT rises 0.4-0.8°F after ovulation due to progesterone. This confirms ovulation occurred but doesn't predict it."

    },

    {

      id: "P2-195",

      question: "Which emergency contraception has no weight restrictions?",

      options: [

        "Plan B One-Step",

        "Ella (ulipristal)",

        "Copper IUD",

        "Next Choice"

      ],

      correctAnswer: 2,

      rationale: "Copper IUD effectiveness is not affected by weight. Levonorgestrel EC has reduced efficacy in women >165 lbs."

    },

    {

      id: "P2-196",

      question: "The main disadvantage of barrier methods is:",

      options: [

        "Side effects",

        "User-dependent effectiveness",

        "Long-term health risks",

        "Delayed fertility return"

      ],

      correctAnswer: 1,

      rationale: "Barrier methods require correct use with each sexual encounter, leading to higher typical-use failure rates."

    },

    {

      id: "P2-197",

      question: "Which woman needs additional counseling about her contraceptive choice?",

      options: [

        "35-year-old smoker choosing COCs",

        "Nulliparous woman choosing IUD",

        "Diabetic woman choosing implant",

        "Migraine sufferer choosing copper IUD"

      ],

      correctAnswer: 0,

      rationale: "Smoking and age >35 significantly increase cardiovascular risks with COCs. Alternative methods should be recommended."

    },

    {

      id: "P2-198",

      question: "The cervical mucus method identifies fertile days by:",

      options: [

        "Thick, sticky mucus",

        "Clear, stretchy mucus",

        "Absence of mucus",

        "Blood-tinged mucus"

      ],

      correctAnswer: 1,

      rationale: "Clear, stretchy, egg-white cervical mucus indicates peak fertility. Sperm survival is optimal in this mucus type."

    },

    {

      id: "P2-199",

      question: "Which contraceptive method has the highest continuation rate at one year?",

      options: [

        "Birth control pills",

        "Condoms",

        "IUD",

        "Contraceptive patch"

      ],

      correctAnswer: 2,

      rationale: "IUDs have the highest continuation rates (>80%) due to user satisfaction and no daily maintenance requirements."

    },

    {

      id: "P2-200",

      question: "Informed consent for contraception must include discussion of:",

      options: [

        "Effectiveness rates only",

        "Benefits, risks, and alternatives",

        "Cost comparison only",

        "Provider recommendations only"

      ],

      correctAnswer: 1,

      rationale: "Informed consent requires discussion of benefits, risks, alternatives, and effectiveness of all appropriate methods for shared decision-making."

    }

  ];

  useEffect(() => {

    setExamState(prevState => {

      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());

      return {

        ...prevState,

        shuffledQuestions: shuffled

      };

    });

  }, []);

  useEffect(() => {

    if (examState.shuffledQuestions.length > 0) {

      const startIndex = (examState.currentBatch - 1) * 50;

      const endIndex = startIndex + 50;

      setCurrentQuestions(examState.shuffledQuestions.slice(startIndex, endIndex));

      setCurrentQuestionIndex(0);

    }

  }, [examState.shuffledQuestions, examState.currentBatch]);

  const startExam = () => {

    setExamState({

      ...examState,

      started: true,

      timeRemaining: 120 * 60

    });

  };

  const handleAnswerChange = (questionId, selectedOption) => {

    setExamState(prevState => ({

      ...prevState,

      userAnswers: {

        ...prevState.userAnswers,

        [questionId]: selectedOption

      }

    }));

  };

  const submitExam = () => {

    let score = 0;

    const incorrect = [];

    currentQuestions.forEach(question => {

      const userAnswer = examState.userAnswers[question.id];

      if (userAnswer === question.correctAnswer) {

        score++;

      } else {

        incorrect.push(question);

      }

    });

    setIncorrectQuestions(incorrect);

    const newTotalScore = examState.totalScore + score;

    const newBatchesCompleted = examState.batchesCompleted + 1;

    setExamState(prevState => ({

      ...prevState,

      completed: true,

      score: score,

      totalScore: newTotalScore,

      batchesCompleted: newBatchesCompleted

    }));

    if (examState.currentBatch === 4) {

      onComplete && onComplete({ 

        totalScore: newTotalScore, 

        totalQuestions: 200,

        percentageScore: (newTotalScore / 200) * 100

      });

    }

  };

  const nextBatch = () => {

    if (examState.currentBatch < 4) {

      setExamState(prevState => ({

        ...prevState,

        currentBatch: prevState.currentBatch + 1,

        completed: false,

        userAnswers: {},

        score: 0,

        timeRemaining: 120 * 60

      }));

      setIncorrectQuestions([]);

    }

  };

  const restartExam = () => {

    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());

    

    setExamState({

      started: false,

      completed: false,

      currentBatch: 1,

      shuffledQuestions: shuffled,

      userAnswers: {},

      score: 0,

      reviewMode: false,

      timeRemaining: 120 * 60,

      totalScore: 0,

      batchesCompleted: 0

    });

    setIncorrectQuestions([]);

    setCurrentQuestionIndex(0);

  };

  const toggleReviewMode = () => {

    setExamState(prevState => ({

      ...prevState,

      reviewMode: !prevState.reviewMode

    }));

  };

  const nextQuestion = () => {

    if (currentQuestionIndex < currentQuestions.length - 1) {

      setCurrentQuestionIndex(prevIndex => prevIndex + 1);

    }

  };

  const previousQuestion = () => {

    if (currentQuestionIndex > 0) {

      setCurrentQuestionIndex(prevIndex => prevIndex - 1);

    }

  };

  const calculateProgress = () => {

    const answeredCount = Object.keys(examState.userAnswers).length;

    return (answeredCount / currentQuestions.length) * 100;

  };

  if (!examState.started) {

    return (

      <div className="bg-white rounded-lg p-6 max-w-6xl mx-auto">

        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">

          Part 2: Postpartum & Newborn Care Final Exam

        </h2>

        

        <div className="bg-indigo-50 p-4 rounded-lg mb-6">

          <h3 className="text-lg font-semibold text-indigo-700 mb-2">Exam Coverage</h3>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">

            <li>Postpartum Adaptations and Nursing Care (40 questions)</li>

            <li>Normal Newborn Processes of Adaptation (40 questions)</li>

            <li>Assessment and Care of the Normal Newborn (40 questions)</li>

            <li>Infant Feeding (40 questions)</li>

            <li>Family Planning (40 questions)</li>

          </ul>

        </div>

        

        <div className="text-center">

          <button

            onClick={startExam}

            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"

          >

            Start Exam

          </button>

        </div>

      </div>

    );

  }

  if (examState.completed) {

    return (

      <div className="bg-white rounded-lg p-6 max-w-6xl mx-auto">

        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">

          Exam Results - Set {examState.currentBatch}

        </h2>

        

        <div className="mb-6">

          <div className="bg-indigo-50 p-4 rounded-lg text-center">

            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Your Score</h3>

            <div className="text-3xl font-bold text-indigo-600 mb-2">

              {examState.score} / 50

            </div>

            <div className="text-xl text-gray-700">

              {Math.round((examState.score / 50) * 100)}%

            </div>

            

            <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">

              <div 

                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"

                style={{ width: ${(examState.score / 50) * 100}% }}

              ></div>

            </div>

          </div>

        </div>

        

        {examState.currentBatch === 4 && (

          <div className="mb-6">

            <div className="bg-blue-50 p-4 rounded-lg text-center">

              <h3 className="text-xl font-semibold text-blue-700 mb-2">Final Score</h3>

              <div className="text-3xl font-bold text-blue-600 mb-2">

                {examState.totalScore} / 200

              </div>

              <div className="text-xl text-gray-700">

                {Math.round((examState.totalScore / 200) * 100)}%

              </div>

            </div>

          </div>

        )}

        

        <div className="mb-6 flex justify-center gap-4">

          <button

            onClick={toggleReviewMode}

            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"

          >

            {examState.reviewMode ? "Hide Incorrect Answers" : "Review Incorrect Answers"}

          </button>

          

          {examState.currentBatch < 4 ? (

            <button

              onClick={nextBatch}

              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"

            >

              Next Set of Questions

            </button>

          ) : (

            <button

              onClick={restartExam}

              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all"

            >

              Restart Exam

            </button>

          )}

        </div>

        

        {examState.reviewMode && incorrectQuestions.length > 0 && (

          <div>

            <h3 className="text-xl font-bold text-indigo-700 mb-4">Review Incorrect Answers</h3>

            <div className="space-y-6">

              {incorrectQuestions.map((question, index) => (

                <div key={question.id} className="border rounded-lg p-4 bg-gray-50">

                  <div className="flex justify-between">

                    <h4 className="font-bold text-gray-800 mb-2">Question {index + 1}</h4>

                    <span className="text-sm text-gray-500">ID: {question.id}</span>

                  </div>

                  <p className="mb-3">{question.question}</p>

                  

                  <div className="grid grid-cols-1 gap-2 mb-4">

                    {question.options.map((option, optionIndex) => (

                      <div 

                        key={optionIndex}

                        className={`p-3 rounded-lg ${

                          optionIndex === question.correctAnswer

                            ? "bg-green-100 border border-green-300 text-green-800"

                            : examState.userAnswers[question.id] === optionIndex

                            ? "bg-red-100 border border-red-300 text-red-800"

                            : "bg-white border border-gray-300 text-gray-800"

                        }`}

                      >

                        {option}

                        {optionIndex === question.correctAnswer && (

                          <span className="ml-2 text-green-600 font-bold">✓ Correct Answer</span>

                        )}

                        {examState.userAnswers[question.id] === optionIndex && 

                         optionIndex !== question.correctAnswer && (

                          <span className="ml-2 text-red-600 font-bold">✗ Your Answer</span>

                        )}

                      </div>

                    ))}

                  </div>

                  

                  <div className="bg-blue-50 p-3 rounded-lg">

                    <h5 className="font-semibold text-blue-700 mb-1">Explanation:</h5>

                    <p className="text-gray-700">{question.rationale}</p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    );

  }

  const currentQuestion = currentQuestions[currentQuestionIndex];

  return (

    <div className="bg-white rounded-lg p-6 max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-indigo-700">

          Part 2 Final Exam - Set {examState.currentBatch}

        </h2>

        <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg font-bold">

          Time Remaining: {formatTime(examState.timeRemaining)}

        </div>

      </div>

      

      <div className="mb-4">

        <div className="w-full bg-gray-200 rounded-full h-2">

          <div

            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"

            style={{ width: ${calculateProgress()}% }}

          ></div>

        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-1">

          <span>Progress: {Object.keys(examState.userAnswers).length}/50 questions answered</span>

          <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>

        </div>

      </div>

      

      {currentQuestion && (

        <div className="border rounded-lg p-4 bg-gray-50 mb-6">

          <div className="flex justify-between">

            <h3 className="font-bold text-gray-800 mb-2">Question {currentQuestionIndex + 1}</h3>

            <span className="text-sm text-gray-500">ID: {currentQuestion.id}</span>

          </div>

          <p className="mb-4">{currentQuestion.question}</p>

          

          <div className="grid grid-cols-1 gap-2 mb-4">

            {currentQuestion.options.map((option, optionIndex) => (

              <div

                key={optionIndex}

                onClick={() => handleAnswerChange(currentQuestion.id, optionIndex)}

                className={`p-3 rounded-lg cursor-pointer transition-colors ${

                  examState.userAnswers[currentQuestion.id] === optionIndex

                    ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-800"

                    : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"

                }`}

              >

                <div className="flex items-center">

                  <div className={`h-5 w-5 mr-3 rounded-full flex items-center justify-center border ${

                    examState.userAnswers[currentQuestion.id] === optionIndex

                      ? "bg-indigo-500 border-indigo-500"

                      : "border-gray-400"

                  }`}>

                    {examState.userAnswers[currentQuestion.id] === optionIndex && (

                      <div className="h-2 w-2 rounded-full bg-white"></div>

                    )}

                  </div>

                  {option}

                </div>

              </div>

            ))}

          </div>

          <div className="flex justify-between mt-6">

            <button

              onClick={previousQuestion}

              disabled={currentQuestionIndex === 0}

              className={`px-4 py-2 rounded-lg font-medium transition-all ${

                currentQuestionIndex === 0

                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"

                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"

              }`}

            >

              Previous Question

            </button>

            

            <button

              onClick={nextQuestion}

              disabled={currentQuestionIndex === currentQuestions.length - 1}

              className={`px-4 py-2 rounded-lg font-medium transition-all ${

                currentQuestionIndex === currentQuestions.length - 1

                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"

                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"

              }`}

            >

              Next Question

            </button>

          </div>

        </div>

      )}

      

      <div className="flex justify-between items-center">

        <button

          onClick={restartExam}

          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"

        >

          Cancel Exam

        </button>

        

        <button

          onClick={submitExam}

          className={`px-6 py-3 rounded-lg font-medium transition-all ${

            Object.keys(examState.userAnswers).length === currentQuestions.length

              ? "bg-green-600 text-white hover:bg-green-700"

              : "bg-indigo-600 text-white hover:bg-indigo-700"

          }`}

        >

          {Object.keys(examState.userAnswers).length === currentQuestions.length

            ? "Submit All Answers"

            : Submit (${Object.keys(examState.userAnswers).length}/${currentQuestions.length} Answered)}

        </button>

      </div>

      <div className="mt-8 border-t pt-4">

        <h3 className="text-lg font-medium text-indigo-700 mb-3">Question Navigator</h3>

        <div className="grid grid-cols-10 gap-2">

          {currentQuestions.map((question, index) => (

            <button

              key={question.id}

              onClick={() => setCurrentQuestionIndex(index)}

              className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium 

                ${currentQuestionIndex === index 

                  ? "bg-indigo-600 text-white" 

                  : examState.userAnswers[question.id] !== undefined

                    ? "bg-indigo-100 text-indigo-700"

                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"

                }`}

            >

              {index + 1}

            </button>

          ))}

        </div>

      </div>

    </div>

  );

};

export default FinalExamPart2;

