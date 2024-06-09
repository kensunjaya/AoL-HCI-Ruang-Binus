// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeYanS7KCYb3a1qj20ER5-wnAPGhngKHg",
  authDomain: "rbinus-7052d.firebaseapp.com",
  projectId: "rbinus-7052d",
  storageBucket: "rbinus-7052d.appspot.com",
  messagingSenderId: "729799211449",
  appId: "1:729799211449:web:b5bdf8a98907bb08311e68",
  measurementId: "G-Q7LNR4CKCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db, collection, addDoc };