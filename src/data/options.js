export const SAMPLE_SIZE_N = 51;

export const CATEGORY_OPTIONS = {
  Sleep: {
    label: "Sleep (hours)",
    options: [
      { id: "sleep_lt6", label: "<6 hours" },
      { id: "sleep_6_8", label: "6-8 hours" },
      { id: "sleep_gt8", label: ">8 hours" },
    ],
  },
  Food: {
    label: "Food",
    options: [
      { id: "food_light", label: "Light" },
      { id: "food_normal", label: "Normal" },
      { id: "food_heavy", label: "Heavy" },
    ],
  },
  Caffeine: {
    label: "Caffeine (cups)",
    options: [
      { id: "caff_0", label: "0" },
      { id: "caff_1", label: "1" },
      { id: "caff_2p", label: "2+" },
    ],
  },
};
