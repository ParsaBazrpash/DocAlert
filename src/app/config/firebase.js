// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Import Firestore


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyc01bbitmMx-l8irDQUNhHzIa8aIHJz8",
  authDomain: "doc-alert-33cbe.firebaseapp.com",
  projectId: "doc-alert-33cbe",
  storageBucket: "doc-alert-33cbe.firebasestorage.app",
  messagingSenderId: "907448347215",
  appId: "1:907448347215:web:b665da62211203d38f983a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Authentication and Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);  // Initialize Firestore



