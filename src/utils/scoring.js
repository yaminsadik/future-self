/**
 * Scoring utilities for FutureSelf v2
 * 
 * Score calculation formula (from PDF specification):
 * Score = (1 × %Much Worse + 2 × %Worse + 3 × %Normal + 4 × %Better + 5 × %Much Better) ÷ 100
 */

/**
 * Calculate a weighted score from survey distribution data
 * @param {Object} data - Object with muchWorse, worse, normal, better, muchBetter percentages
 * @returns {number} Score from 1-5
 */
export function calculateScore(data) {
  if (!data) return null;
  
  const score = (
    1 * data.muchWorse +
    2 * data.worse +
    3 * data.normal +
    4 * data.better +
    5 * data.muchBetter
  ) / 100;
  
  return Math.round(score * 100) / 100; // Round to 2 decimal places
}

/**
 * Get a descriptive label for a score
 * @param {number} score - Score from 1-5
 * @returns {string} Descriptive label
 */
export function getScoreLabel(score) {
  if (score === null || score === undefined) return "N/A";
  if (score >= 4.0) return "Positive pattern";
  if (score >= 3.5) return "Slightly positive";
  if (score >= 2.5) return "Neutral";
  if (score >= 2.0) return "Slightly negative";
  return "Negative pattern";
}

/**
 * Get Tailwind color class for a score
 * @param {number} score - Score from 1-5
 * @returns {string} Tailwind color class
 */
export function getScoreColorClass(score) {
  if (score === null || score === undefined) return "text-textSecondary";
  if (score >= 3.5) return "text-emerald-600";
  if (score >= 2.5) return "text-amber-600";
  return "text-rose-600";
}

/**
 * Get background color class for score bars
 * @param {number} score - Score from 1-5
 * @returns {string} Tailwind background color class
 */
export function getScoreBarColorClass(score) {
  if (score === null || score === undefined) return "bg-gray-300";
  if (score >= 3.5) return "bg-emerald-500";
  if (score >= 2.5) return "bg-amber-500";
  return "bg-rose-500";
}

/**
 * Compare two options and generate a summary
 * @param {Object} dataA - Survey data for option A
 * @param {Object} dataB - Survey data for option B
 * @param {string} labelA - Label for option A
 * @param {string} labelB - Label for option B
 * @param {string[]} priorities - Selected outcome priorities (Focus, Mood, Energy)
 * @returns {string} Dynamic summary paragraph
 */
export function generateComparisonSummary(dataA, dataB, labelA, labelB, priorities) {
  if (!dataA || !dataB || !priorities.length) {
    return "Select both options and at least one outcome priority to see a comparison summary.";
  }

  const outcomes = priorities.length > 0 ? priorities : ["Focus", "Mood", "Energy"];
  const comparisons = [];

  for (const outcome of outcomes) {
    const scoreA = calculateScore(dataA[outcome]);
    const scoreB = calculateScore(dataB[outcome]);
    
    if (scoreA !== null && scoreB !== null) {
      const diff = scoreA - scoreB;
      const absDiff = Math.abs(diff);
      
      if (absDiff < 0.2) {
        comparisons.push(`For ${outcome.toLowerCase()}, both options showed similar patterns in survey responses.`);
      } else if (diff > 0) {
        const strength = absDiff > 0.5 ? "notably" : "slightly";
        comparisons.push(`Survey respondents reported ${strength} more positive ${outcome.toLowerCase()} patterns with "${labelA}" compared to "${labelB}".`);
      } else {
        const strength = absDiff > 0.5 ? "notably" : "slightly";
        comparisons.push(`Survey respondents reported ${strength} more positive ${outcome.toLowerCase()} patterns with "${labelB}" compared to "${labelA}".`);
      }
    }
  }

  if (comparisons.length === 0) {
    return "Unable to generate comparison. Please ensure both options are selected.";
  }

  return comparisons.join(" ") + " Remember: these patterns reflect survey responses and may not predict your individual experience.";
}
