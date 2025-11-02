// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "estate-9bebe.firebaseapp.com",
    projectId: "estate-9bebe",
    storageBucket: "estate-9bebe.firebasestorage.app",
    messagingSenderId: "1093312116343",
    appId: "1:1093312116343:web:49774d1e0309246826f872"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);