import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../components/pages/Home.jsx";
import Setup from "../components/pages/Setup.jsx";
import Results from "../components/pages/Results.jsx";
import Breakdown from "../components/pages/Breakdown.jsx";
import ResultsView from "../components/pages/ResultsView.jsx";
import HowScores from "../components/pages/HowScores.jsx";

import AppLayout from "../components/AppLayout.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/results" element={<Results />} />
        <Route path="/breakdown" element={<Breakdown />} />
        <Route path="/howscores" element={<HowScores />} />
        <Route path="/resultsview" element={<ResultsView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
