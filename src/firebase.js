import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDznNrsi8oVLLfbVfwVK2d6dYt-_LUYBg",
  authDomain: "apligood2025.firebaseapp.com",
  projectId: "apligood2025",
  storageBucket: "apligood2025.appspot.com",
  messagingSenderId: "820543904439",
  appId: "1:820543904439:web:9a3dd5fc603c3ccebc4b32"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
