import { Routes, Route } from "react-router-dom";


import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import StarKnowledge from "../pages/StarKnowledge/StarKnowledge";

function AppRoutes() {
  return (
    <Routes>

      <Route 
        path="/" 
        element={<Home />} 
      />

      <Route element={<MainLayout />}>

        <Route
          path="/star-knowledge"
          element={<StarKnowledge />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;