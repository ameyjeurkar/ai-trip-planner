import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PlannerPage from "./pages/PlannerPage";
import ItineraryPage from "./pages/ItineraryPage";
import CartPage from "./pages/CartPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import GroupPlanningPage from "./pages/GroupPlanningPage";
import LiveCompanionPage from "./pages/LiveCompanionPage";
import ProfilePage from "./pages/ProfilePage";
import TripsPage from "./pages/TripsPage";
import BookingsPage from "./pages/BookingsPage";
import Viewtrip from "./components/view-trip";
import CreateTrip from "./components/create-trip";

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// Layout for private routes (Header + Footer)
const PrivateLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

// Main App Content
const AppContent = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    {/* Private Routes */}
    <Route
      path="/"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <HomePage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/planner"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <PlannerPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/itinerary"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <ItineraryPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/cart"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <CartPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/payment"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <PaymentPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/confirmation"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <ConfirmationPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/profile-setup"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <ProfileSetupPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/group-planning"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <GroupPlanningPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/live-companion"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <LiveCompanionPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <ProfilePage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/trips"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <TripsPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/bookings"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <BookingsPage />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/create-trip"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <CreateTrip />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
    <Route
      path="/view-trip/:tripId"
      element={
        <PrivateRoute>
          <PrivateLayout>
            <Viewtrip />
          </PrivateLayout>
        </PrivateRoute>
      }
    />
  </Routes>
);

// App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
