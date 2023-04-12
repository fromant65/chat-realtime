import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_bNHC8IUgAIgEKWXQqvV6pUiivCSzEss",
  authDomain: "chat-fomant.firebaseapp.com",
  projectId: "chat-fomant",
  storageBucket: "chat-fomant.appspot.com",
  messagingSenderId: "1098613318560",
  appId: "1:1098613318560:web:e7c212e17b1528a8f4bac5",
  measurementId: "G-TZ3CRQYFXZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
