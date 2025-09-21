// import { Input } from '@/components/ui/input';
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "./../../constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { Button } from '@/components/ui/button'
// import { toast } from 'sonner';
import { chatSession } from "./../../service/AIModel";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
// } from "@/components/ui/dialog"
// import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import { doc, setDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "./../../service/firebaseConfig";
// import { app, db } from '@/';
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./index.css";
import LoadingScreen from "../LoadingScreen";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDAys > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData.traveler
    ) {
      // toast('Please fill all the details')
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    // console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    // Add a new document in collection "AITrips"
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: "dummy@gmail.com", // CHANGE CHANGE CHANGE
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile: ", error);
      });
  };

  return (
    <div className="container">
      {/* Header */}
      <h2 className="page-title">Tell us your travel preferences 🏕️🌴</h2>
      <p className="page-subtitle">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary tailored to your preferences.
      </p>

      {/* Form */}
      <div className="form-section">
        {/* Location */}
        <div>
          <h2 className="label">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        {/* Days */}
        <div>
          <h2 className="label">How many days are you planning your trip?</h2>
          <input
            placeholder="Enter number of days"
            type="number"
            className="input"
            min={0}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="label">What is your budget?</h2>
          <div className="card-grid">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`card ${
                  formData?.budget === item.title ? "active" : ""
                }`}
              >
                <h2 className="icon">{item.icon}</h2>
                <h2 className="card-title">{item.title}</h2>
                <p className="card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <h2 className="label">Who do you plan on traveling with?</h2>
          <div className="card-grid">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`card ${
                  formData?.traveler === item.people ? "active" : ""
                }`}
              >
                <h2 className="icon">{item.icon}</h2>
                <h2 className="card-title">{item.title}</h2>
                <p className="card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="btn-wrapper">
        <button
          disabled={loading}
          onClick={onGenerateTrip}
          className={`btn ${loading ? "disabled" : ""}`}
        >
          {loading && <LoadingScreen /> ? "Please Wait..." : "Generate Trip"}
        </button>
      </div>

      {/* Login Dialog */}
      {openDialog && (
        <div className="modal-overlay">
          <div className="modal">
            <img src="/logo.svg" alt="logo" width="80" className="modal-logo" />
            <h2 className="modal-title">
              Sign In to check out your travel plan
            </h2>
            <p className="modal-subtitle">
              Sign in to the app with Google authentication securely
            </p>
            <button onClick={login} className="google-btn">
              🌐 Sign in with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTrip;
