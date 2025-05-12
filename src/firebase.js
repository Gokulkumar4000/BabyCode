// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFeyuumAYjHMupzfGGrLsgn5eBxjrep5Y",
    authDomain: "babycode-intern.firebaseapp.com",
    projectId: "babycode-intern",
    storageBucket: "babycode-intern.firebasestorage.app",
    messagingSenderId: "968147643289",
    appId: "1:968147643289:web:9bf643d69c4510482a4108",
    measurementId: "G-63CZT8Y9WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export the auth instance
export { auth };  // ← This is the critical change