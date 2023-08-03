import React, { useEffect } from "react";
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
import axios from "axios";
import ItineraryPage from "./pages/itineraries/ItineraryPage";
import MapPage from "./pages/map/MapPage";

interface IApiResponse {
  user: IUser;
}

async function fetchUserFromToken(token: string | null): Promise<IUser | null> {
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get<IApiResponse>(
      "http://localhost:3001/login/verifyUser",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.user;
  } catch (err) {
    console.error(`Error al obtener los datos del usuario: ${err}`);
    return null;
  }
}

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const userData = await fetchUserFromToken(token);

    if (userData) {
      setUser(userData);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            path="/map"
            element={
              <VerifyRoute>
                <MapPage />
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
            path="/itinerary/:id"
            element={
              <VerifyRoute>
                <ItineraryPage />
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
