import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import VerifyRoute from "./components/ProtectedRoute/VerifyRoute";
import LoggedUser from "./components/ProtectedRoute/LoggedUser";
import PlanPage from "./pages/planYourTrip/PlanPage";
import CityPage from "./pages/citypage/CityPage";
import Itineraries from "./pages/itineraries/Itineraries";
import { useState } from "react";
import { UserContext } from "./assets/context/usercontext";
import { IUser } from "../src/assets/interfaces/User";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route
            path="/planmytrip"
            element={
              <VerifyRoute>
                <PlanPage />
              </VerifyRoute>
            }
          />
          <Route
            path="/"
            element={
              <VerifyRoute>
                <Home />
              </VerifyRoute>
            }
          />
          <Route
            path="/itineraries"
            element={
              <VerifyRoute>
                <Itineraries />
              </VerifyRoute>
            }
          />
          <Route
            path="/city/:id"
            element={
              <VerifyRoute>
                <CityPage />
              </VerifyRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoggedUser>
                <Login />
              </LoggedUser>
            }
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
