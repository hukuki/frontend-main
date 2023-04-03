// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDr1O0lEMyMC8tU4JO5_oCp5-k7lrW-DmA",
    authDomain: "deeplex1234.firebaseapp.com",
    projectId: "deeplex1234",
    storageBucket: "deeplex1234.appspot.com",
    messagingSenderId: "526028600216",
    appId: "1:526028600216:web:3c8d89f4ebfef8815cb1ed",
    measurementId: "G-YME1WC0F1E"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

export { app, auth, googleAuthProvider }