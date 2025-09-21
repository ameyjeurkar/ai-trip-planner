import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "./../../service/firebaseConfig";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "./../../constants/options";
import { chatSession } from "./../../service/AIModel";
import LoadingScreen from "../LoadingScreen";
import "./index.css";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    location: null,
    noOfDays: "",
    budget: "",
    traveler: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // -----------------------------
  // Handle input changes
  // -----------------------------
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // -----------------------------
  // Function to generate trip
  // -----------------------------
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData.location ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.traveler
    ) {
      alert("Please fill in all the details!");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{typeOfExperience}', formData?.typeOfExperience)
      .replace('{location}', formData?.location?.label)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  // -----------------------------
  // Save trip data to Firebase
  // -----------------------------
  const SaveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user?.email || "dummy@gmail.com",
        id: docId,
      });
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Get Google profile function
  // -----------------------------
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
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => console.error("Error fetching user profile: ", error));
  };


  return (
    <div className="container">
      {/* Header */}
      <h2 className="page-title">Let's Plan Your Dream Adventure! 🌎✨</h2>
      <p className="page-subtitle">
        Share a few details, and we'll craft a personalized trip just for you.
      </p>

      {/* Form Section */}
      <div className="form-section">
        {/* Destination */}
        <div>
          <h2 className="label">Where will your next adventure take you?</h2>
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

        {/* Number of Days */}
        <div>
          <h2 className="label">How long do you want your adventure to be?</h2>
          <input
            type="number"
            min={1}
            placeholder="Enter number of days"
            className="input"
            value={formData.noOfDays}
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="label">What's your ideal travel budget?</h2>
          <div className="card-grid">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`card ${
                  formData.budget === item.title ? "active" : ""
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
          <h2 className="label">Who will you be exploring with?</h2>
          <div className="card-grid">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`card ${
                  formData.traveler === item.people ? "active" : ""
                }`}
                >
                <h2 className="icon">{item.icon}</h2>
                <h2 className="card-title">{item.title}</h2>
                <p className="card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      {/* Generate Trip Button */}
      <div className="btn-wrapper">
        <button
          disabled={loading}
          onClick={onGenerateTrip}
          className={`btn ${loading ? "disabled" : ""}`}
        >
          {loading ? "Please Wait..." : "Create My Dream Trip ✨"}
        </button>
      </div>
      </div>
    </div>
  );
}

export default CreateTrip;
