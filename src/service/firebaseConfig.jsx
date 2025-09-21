// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyAxhaUyrfOIfB1R6DXpiZnaSWVHLOGareo",
//   authDomain: "ai-trip-planner-a5746.firebaseapp.com",
//   projectId: "ai-trip-planner-a5746",
//   storageBucket: "ai-trip-planner-a5746.firebasestorage.app",
//   messagingSenderId: "733659305822",
//   appId: "1:733659305822:web:dcb4a2f8f939237f39a1cf",
//   measurementId: "G-W0LL96L4T8"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);