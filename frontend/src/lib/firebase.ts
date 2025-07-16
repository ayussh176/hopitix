// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2Hj724DNZmMuBk64S4bph-lpfNeQSuKs",
  authDomain: "hospitix-e4e83.firebaseapp.com",
  projectId: "hospitix-e4e83",
  storageBucket: "hospitix-e4e83.firebasestorage.app",
  messagingSenderId: "704087242171",
  appId: "1:704087242171:web:0a0aab8041b3e85c61809e",
  measurementId: "G-281DK700HR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
