import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import ItineraryPage from './pages/ItineraryPage';
import CartPage from './pages/CartPage';
import ConfirmationPage from './pages/ConfirmationPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import GroupPlanningPage from './pages/GroupPlanningPage';
import LiveCompanionPage from './pages/LiveCompanionPage';
import ProfilePage from './pages/ProfilePage';
import TripsPage from './pages/TripsPage';
import BookingsPage from './pages/BookingsPage';
import Viewtrip from './components/view-trip';
import CreateTrip from './components/create-trip';

const AppContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-container">
      {user && <Header />}
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          <Route path="/group-planning" element={<GroupPlanningPage />} />
          <Route path="/live-companion" element={<LiveCompanionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/view-trip/:tripId" element={<Viewtrip />} />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  );
};

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
