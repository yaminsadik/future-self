import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../components/pages/Home.jsx";
import Plan from "../components/pages/Plan.jsx";
import checkin from "../components/pages/Check-in.jsx";
import Why from "../components/pages/Why.jsx";
import Setup from "../components/pages/Setup.jsx";
import Results from "../components/pages/Results.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/results" element={<Results />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/why" element={<Why />} />
            <Route path="/check-in" element={<checkin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
