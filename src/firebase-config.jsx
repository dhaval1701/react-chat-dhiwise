// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD17y4mxcXNyHlvx1mxFlOW_kzmrfLHIWA",
  authDomain: "react-dhiwise-chat.firebaseapp.com",
  projectId: "react-dhiwise-chat",
  storageBucket: "react-dhiwise-chat.appspot.com",
  messagingSenderId: "581469485865",
  appId: "1:581469485865:web:aa873542ee546094955538",
  measurementId: "G-NQBMEPWM5G",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
