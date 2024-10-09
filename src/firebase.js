
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAn8hhmOL4x6JuggaTx9wjuhgpdXg8BLaQ",
  authDomain: "drop-33a15.firebaseapp.com",
  databaseURL:
    "https://drop-33a15-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "drop-33a15",
  storageBucket: "drop-33a15.appspot.com",
  messagingSenderId: "232420928787",
  appId: "1:232420928787:web:ce1962fb1ea53cf706bee6",
  measurementId: "G-SKYVYEL5T5",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, set, get, child };
