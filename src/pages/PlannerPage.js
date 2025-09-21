import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from '../components/TripForm';
import LoadingScreen from '../components/LoadingScreen';
import './PlannerPage.css';

const PlannerPage = () => {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (itinerary) {
      navigate('/itinerary', { state: { plan: itinerary } });
    }
  }, [itinerary, navigate]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="planner-page">
      {loading && <LoadingScreen />}
      <TripForm
        setItinerary={setItinerary}
        setLoading={setLoading}
        step={step}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </div>
  );
};

export default PlannerPage;
