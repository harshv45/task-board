// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGy_PMWh9TFprHHu-VXMn3QbvLCcw0wYI",
  authDomain: "taskboardapp-f27a0.firebaseapp.com",
  projectId: "taskboardapp-f27a0",
  storageBucket: "taskboardapp-f27a0.firebasestorage.app",
  messagingSenderId: "88678260566",
  appId: "1:88678260566:web:2d2ef26ac8414641ea00f7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
