import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLcVK7Kn9-UPxnheW13q1Gr27GJCEqwTE",
  authDomain: "sprout-9526a.firebaseapp.com",
  databaseURL: "https://sprout-9526a-default-rtdb.firebaseio.com",
  projectId: "sprout-9526a",
  storageBucket: "sprout-9526a.appspot.com",
  messagingSenderId: "1032162155980",
  appId: "1:1032162155980:web:68af63fd06a52daa2c1169",
  measurementId: "G-TSCDSKPE9T",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export default {
    firebaseApp,
    db
}