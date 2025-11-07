import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import PublicSurveys from "../pages/PublicSurveys";
import Results from "../pages/Results";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/surveys" element={<PublicSurveys />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </BrowserRouter>
);
