// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn_fd9mfTqC2PAkXoYBwQB9aq2PqrRs0M",
  authDomain: "chatapp-189b9.firebaseapp.com",
  projectId: "chatapp-189b9",
  storageBucket: "chatapp-189b9.appspot.com",
  messagingSenderId: "738909316691",
  appId: "1:738909316691:web:c53a7c3755b4abf9c148a6",
  measurementId: "G-MXLQ93QJBR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db, getApp, getAuth };