import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute.jsx";

import Login from "../pages/Login/Login.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Dashboard from "../pages/admin/Dashboard/Dashboard.jsx";
import Astrology from "../pages/admin/Astrology/Astrology.jsx";
import ElementsList from "../pages/admin/Elements/ElementsList.jsx";
import NaturesList from "../pages/admin/Natures/NaturesList.jsx";
import GunasList from "../pages/admin/Gunas/GunasList.jsx";
import QualitiesList from "../pages/admin/Qualities/QualitiesList.jsx";
import PlanetsList from "../pages/admin/Planets/PlanetsList.jsx";
import ZodiacSignsList from "../pages/admin/ZodiacSigns/ZodiacSignsList.jsx";
import ChartTypesList from "../pages/admin/ChartTypes/ChartTypesList.jsx";
import CountriesList from "../pages/admin/Countries/CountriesList.jsx";
import CitiesList from "../pages/admin/Cities/CitiesList.jsx";
import BirthAccuraciesList from "../pages/admin/BirthAccuracies/BirthAccuraciesList.jsx";
import GendersList from "../pages/admin/Genders/GendersList.jsx";
import PeopleList from "../pages/admin/People/PeopleList.jsx";
import ChartsList from "../pages/admin/Charts/ChartsList.jsx";
import PersonDetails from "../pages/admin/People/PersonDetails.jsx";
import UsersList from "../pages/admin/Users/UsersList.jsx";
import UserForm from "../pages/admin/Users/UserForm.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Admin Panel */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        {/* ASTROLOGY */}
        <Route path="astrology" element={<Astrology />} />
        <Route path="elements" element={<ElementsList />} />
        <Route path="natures" element={<NaturesList />} />
        <Route path="gunas" element={<GunasList />} />
        <Route path="qualities" element={<QualitiesList />} />{" "}
        <Route path="planets" element={<PlanetsList />} />
        <Route path="zodiac-signs" element={<ZodiacSignsList />} />{" "}
        <Route path="chart-types" element={<ChartTypesList />} />{" "}
        <Route path="countries" element={<CountriesList />} />{" "}
        <Route path="cities" element={<CitiesList />} />
        <Route path="birth-accuracies" element={<BirthAccuraciesList />} />{" "}
        <Route path="genders" element={<GendersList />} />{" "}
        {/* PEOPLE */}
        <Route path="people" element={<PeopleList />} />
        <Route path="people/:personSlug" element={<PersonDetails />} />
        <Route path="people/:personSlug/charts" element={<ChartsList />} />
        {/* USERS */}
        <Route path="users" element={<UsersList />} />
        <Route path="users/new" element={<UserForm />} />
        <Route path="users/:id/edit" element={<UserForm />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
