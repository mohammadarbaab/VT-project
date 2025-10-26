// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // ✅ Add this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCy8_JxGmEiUK8cJ04kOhrtV3mwmpKG8Q",
  authDomain: "video-trans-app.firebaseapp.com",
  projectId: "video-trans-app",
  storageBucket: "video-trans-app.firebasestorage.app",
  messagingSenderId: "753235743986",
  appId: "1:753235743986:web:7f0d7d4cd557b6d2712c6b",
  measurementId: "G-5V7FLECTBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize and export storage
export const storage = getStorage(app);