export const newbornContent = {
  apgarCriteria: {
    appearance: [
      { score: 0, description: "Blue or pale all over" },
      { score: 1, description: "Pink body, blue extremities" },
      { score: 2, description: "Pink all over" }
    ],
    pulse: [
      { score: 0, description: "Absent" },
      { score: 1, description: "Less than 100 bpm" },
      { score: 2, description: "100 bpm or greater" }
    ],
    grimace: [
      { score: 0, description: "No response" },
      { score: 1, description: "Grimace or weak cry" },
      { score: 2, description: "Good cry" }
    ],
    activity: [
      { score: 0, description: "Limp" },
      { score: 1, description: "Some flexion" },
      { score: 2, description: "Active motion" }
    ],
    respiration: [
      { score: 0, description: "Absent" },
      { score: 1, description: "Slow or irregular" },
      { score: 2, description: "Good cry" }
    ]
  },
  ballardScore: {
    neuromuscular: [
      "Posture",
      "Square Window",
      "Arm Recoil",
      "Popliteal Angle",
      "Scarf Sign",
      "Heel to Ear"
    ],
    physical: [
      "Skin",
      "Lanugo",
      "Plantar Surface",
      "Breast",
      "Eye/Ear",
      "Genitals"
    ]
  }
};
