import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import StarKnowledge from "../pages/StarKnowledge/StarKnowledge";
import PersonDetail from "../pages/PersonDetail/PersonDetail";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Main Layout */}
      <Route element={<MainLayout />}>

        {/* Star Knowledge */}
        <Route
          path="/star-knowledge"
          element={<StarKnowledge />}
        />

        {/* Zodiac */}
        <Route
          path="/star-knowledge/:zodiac"
          element={<StarKnowledge />}
        />

        {/* Person Detail */}
        <Route
          path="/star-knowledge/person/:slug"
          element={<PersonDetail />}
        />

        {/* 404 */}
        <Route
          path="/404"
          element={<NotFound />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;