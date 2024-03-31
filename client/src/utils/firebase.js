// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "cap2taskmanager.firebaseapp.com",
  projectId: "cap2taskmanager",
  storageBucket: "cap2taskmanager.appspot.com",
  messagingSenderId: "997796345447",
  appId: "1:997796345447:web:a55755ed7c70ebb06786c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);