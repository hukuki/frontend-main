// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBBBx9T3Ts8mJJ_YcpCOOx4uCfojboI004',
  authDomain: 'hukuki-dc783.firebaseapp.com',
  projectId: 'hukuki-dc783',
  storageBucket: 'hukuki-dc783.appspot.com',
  messagingSenderId: '788459500346',
  appId: '1:788459500346:web:96c4ab4754f3882c4e9603',
  measurementId: 'G-9FBEME1STV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, googleAuthProvider };
