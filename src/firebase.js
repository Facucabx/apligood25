import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDznNrsi8oVLLfbVfwuVK2dd6Yt-_LUYBg",
  authDomain: "apligood2025.firebaseapp.com",
  projectId: "apligood2025",
  storageBucket: "apligood2025.firebasestorage.app",
  messagingSenderId: "820543904439",
  appId: "1:820543904439:web:9a3dd5fc603c3ccebc4b32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
