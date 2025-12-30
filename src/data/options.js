export const SAMPLE_SIZE_N = 51;

export const CATEGORY_OPTIONS = {
  Sleep: {
    label: "Sleep (hours)",
    options: [
      { id: "sleep_lt6", label: "Less than 6 hours" },
      { id: "sleep_6_8", label: "6 to 8 hours" },
      { id: "sleep_gt8", label: "More than 8 hours" },
    ],
  },
  Food: {
    label: "Food",
    options: [
      { id: "food_proper_meal", label: "Proper meal" },
      { id: "food_skip_meal", label: "Skip meal" },
    ],
  },
  Caffeine: {
    label: "Caffeine (mg)",
    options: [
      { id: "caff_0mg", label: "0 mg" },
      { id: "caff_le200", label: "200 mg or less" },
      { id: "caff_gt200", label: "More than 200 mg" },
    ],
  },
};
