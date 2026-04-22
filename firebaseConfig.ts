// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApY1WOAwdZ3ZknOByh1Op6hJs7xAUN7Zk",
  authDomain: "kjlahsd.firebaseapp.com",
  projectId: "kjlahsd",
  storageBucket: "kjlahsd.firebasestorage.app",
  messagingSenderId: "83825044689",
  appId: "1:83825044689:web:1c477b356525b7f941e9f0",
  measurementId: "G-LEJG8EX542"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
