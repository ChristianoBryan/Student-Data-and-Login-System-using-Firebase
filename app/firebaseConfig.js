import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyhoRY0wYxciSAmH3vhvYeD1sfscJ0JYE",
  authDomain: "pbp-local-storage-react-native.firebaseapp.com",
  projectId: "pbp-local-storage-react-native",
  storageBucket: "pbp-local-storage-react-native.firebasestorage.app",
  messagingSenderId: "652726780699",
  appId: "1:652726780699:web:47aa4cbcac5079436909be",
  measurementId: "G-JN8569MYLM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);