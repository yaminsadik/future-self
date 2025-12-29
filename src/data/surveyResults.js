// Survey results data based on the spreadsheet
// Each entry maps to a selectionId and contains results for Energy, Mood, and Focus

export const SURVEY_RESULTS = {
  // Sleep < 6 hours (S1)
  sleep_lt6: {
    Energy: {
      muchWorse: 0.0,
      worse: 3.9,
      normal: 19.6,
      better: 60.8,
      muchBetter: 15.7,
    },
    Mood: {
      muchWorse: 2.0,
      worse: 0.0,
      normal: 51.0,
      better: 39.2,
      muchBetter: 7.8,
    },
    Focus: {
      muchWorse: 2.0,
      worse: 3.9,
      normal: 29.4,
      better: 45.1,
      muchBetter: 19.6,
    },
  },

  // Sleep 6-8 hours (S2)
  sleep_6_8: {
    Energy: {
      muchWorse: 5.9,
      worse: 33.3,
      normal: 56.9,
      better: 2.0,
      muchBetter: 2.0,
    },
    Mood: {
      muchWorse: 11.8,
      worse: 35.3,
      normal: 47.1,
      better: 5.9,
      muchBetter: 0.0,
    },
    Focus: {
      muchWorse: 9.8,
      worse: 31.4,
      normal: 51.0,
      better: 7.8,
      muchBetter: 0.0,
    },
  },

  // Sleep > 8 hours (S3 - assuming this is the third option)
  sleep_gt8: {
    Energy: {
      muchWorse: 11.8,
      worse: 29.4,
      normal: 31.4,
      better: 21.6,
      muchBetter: 5.9,
    },
    Mood: {
      muchWorse: 17.6,
      worse: 25.5,
      normal: 43.1,
      better: 5.9,
      muchBetter: 7.8,
    },
    Focus: {
      muchWorse: 15.7,
      worse: 13.7,
      normal: 49.0,
      better: 15.7,
      muchBetter: 5.9,
    },
  },

  // Caffeine 0 mg (C1)
  caff_0: {
    Energy: {
      muchWorse: 2.0,
      worse: 7.8,
      normal: 58.8,
      better: 27.5,
      muchBetter: 3.9,
    },
    Mood: {
      muchWorse: 2.0,
      worse: 9.8,
      normal: 70.6,
      better: 11.8,
      muchBetter: 5.9,
    },
    Focus: {
      muchWorse: 2.0,
      worse: 5.9,
      normal: 66.7,
      better: 21.6,
      muchBetter: 3.9,
    },
  },

  // Caffeine <=200 mg (C2)
  caff_1: {
    Energy: {
      muchWorse: 11.8,
      worse: 49.0,
      normal: 31.4,
      better: 5.9,
      muchBetter: 2.0,
    },
    Mood: {
      muchWorse: 3.9,
      worse: 11.8,
      normal: 72.5,
      better: 5.9,
      muchBetter: 5.9,
    },
    Focus: {
      muchWorse: 11.8,
      worse: 31.4,
      normal: 41.2,
      better: 11.8,
      muchBetter: 3.9,
    },
  },

  // Caffeine > 200 mg (C3)
  caff_2p: {
    Energy: {
      muchWorse: 2.0,
      worse: 7.8,
      normal: 58.8,
      better: 27.5,
      muchBetter: 3.9,
    },
    Mood: {
      muchWorse: 2.0,
      worse: 9.8,
      normal: 70.6,
      better: 11.8,
      muchBetter: 5.9,
    },
    Focus: {
      muchWorse: 2.0,
      worse: 5.9,
      normal: 66.7,
      better: 21.6,
      muchBetter: 3.9,
    },
  },

  // Food - Proper meal (F1)
  food_light: {
    Energy: {
      muchWorse: 13.7,
      worse: 51.0,
      normal: 27.5,
      better: 7.8,
      muchBetter: 0.0,
    },
    Mood: {
      muchWorse: 19.6,
      worse: 29.4,
      normal: 51.0,
      better: 0.0,
      muchBetter: 0.0,
    },
    Focus: {
      muchWorse: 15.7,
      worse: 39.2,
      normal: 39.2,
      better: 3.9,
      muchBetter: 2.0,
    },
  },

  // Food - Normal (F2 - assuming middle option)
  food_normal: {
    Energy: {
      muchWorse: 0.0,
      worse: 2.0,
      normal: 60.8,
      better: 29.4,
      muchBetter: 7.8,
    },
    Mood: {
      muchWorse: 2.0,
      worse: 0.0,
      normal: 60.8,
      better: 31.4,
      muchBetter: 5.9,
    },
    Focus: {
      muchWorse: 0.0,
      worse: 2.0,
      normal: 47.1,
      better: 37.3,
      muchBetter: 13.7,
    },
  },

  // Food - Heavy (F3 - assuming skip meal based on context)
  food_heavy: {
    Energy: {
      muchWorse: 0.0,
      worse: 2.0,
      normal: 60.8,
      better: 29.4,
      muchBetter: 7.8,
    },
    Mood: {
      muchWorse: 2.0,
      worse: 0.0,
      normal: 60.8,
      better: 31.4,
      muchBetter: 5.9,
    },
    Focus: {
      muchWorse: 0.0,
      worse: 2.0,
      normal: 47.1,
      better: 37.3,
      muchBetter: 13.7,
    },
  },
};