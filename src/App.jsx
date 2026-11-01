import { Routes, Route, Navigate } from "react-router-dom";

import HeroCTA from "./Pages/HeroCTA";
import Careers from "./Pages/Careers";
import CareerApplication from "./Pages/CareerApplication";
import LegalInformation from "./Pages/LegalInformation";

export default function App() {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<HeroCTA />} />

      {/* Careers Page */}
      <Route path="/careers" element={<Careers />} />

      {/* Job Application */}
      <Route path="/careers/apply/:jobId" element={<CareerApplication />} />

      {/* Legal information */}
      <Route path="/terms" element={<LegalInformation documentName="terms" />} />
      <Route
        path="/privacy"
        element={<LegalInformation documentName="privacy" />}
      />
      <Route
        path="/cookies"
        element={<LegalInformation documentName="cookies" />}
      />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
