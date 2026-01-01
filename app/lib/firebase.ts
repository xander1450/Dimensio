import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCjkkPrKD8Ob0wokjXac2S_tQirDRZptqc",
  authDomain: "dimensio-583d6.firebaseapp.com",
  projectId: "dimensio-583d6",
  storageBucket: "dimensio-583d6.firebasestorage.app",
  messagingSenderId: "289388166006",
  appId: "1:289388166006:web:207378b993af372b4fd857",
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
