// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwmskUB4IwTCppAkCBg3NLg3TiTO_SrT4",
  authDomain: "lms-admin-581f0.firebaseapp.com",
  projectId: "lms-admin-581f0",
  storageBucket: "lms-admin-581f0.appspot.com",
  messagingSenderId: "188781971907",
  appId: "1:188781971907:web:facf137946611546755576",
  measurementId: "G-KWN29VKX7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase ora get a reference to the service
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
