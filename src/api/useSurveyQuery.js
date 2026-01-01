import { useQuery } from "@tanstack/react-query";
import survey from "../data/survey_results.json";

export function useSurveyQuery() {
  return useQuery({
    queryKey: ["surveyResults"],
    queryFn: () => survey,
  });
}
