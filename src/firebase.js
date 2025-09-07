// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY88XGCQMQxhrOhAS8GMv6jE3ABFoHpaA",
  authDomain: "august-b6726.firebaseapp.com",
  projectId: "august-b6726",
  storageBucket: "august-b6726.firebasestorage.app",
  messagingSenderId: "607371631765",
  appId: "1:607371631765:web:20456cde3ddb5a53ee0f9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
