// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "storage1-c4770.firebaseapp.com",
  projectId: "storage1-c4770",
  storageBucket: "storage1-c4770.appspot.com",
  messagingSenderId: "775002635855",
  appId: "1:775002635855:web:4083567a14f5872d1bf43a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);