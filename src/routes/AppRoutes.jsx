import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../components/pages/Home.jsx";
import Plan from "../components/pages/Plan.jsx";
import Why from "../components/pages/Why.jsx";
import Setup from "../components/pages/Setup.jsx";
import Results from "../components/pages/Results.jsx";
import Explore from "../components/pages/Explore.jsx";

import AppLayout from "../components/AppLayout.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/results" element={<Results />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/why" element={<Why />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
