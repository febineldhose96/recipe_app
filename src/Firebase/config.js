import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgHjpl54PJIA0Ya56bjLLkmW89Z4ppFJ4",
  authDomain: "cooking-recipes-ab16f.firebaseapp.com",
  projectId: "cooking-recipes-ab16f",
  storageBucket: "cooking-recipes-ab16f.appspot.com",
  messagingSenderId: "596678289631",
  appId: "1:596678289631:web:9eaccc4c2cea743879216a",
  measurementId: "G-M7KBHNB7QJ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
