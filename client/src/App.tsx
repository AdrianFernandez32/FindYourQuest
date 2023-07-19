import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import VerifyRoute from "./components/ProtectedRoute/VerifyRoute";
import LoggedUser from "./components/ProtectedRoute/LoggedUser";
import PlanPage from "./pages/planYourTrip/PlanPage";

function App() {
  return (
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
          path="/login"
          element={
            <LoggedUser>
              <Login />
            </LoggedUser>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
