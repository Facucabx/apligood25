import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDznNrsi8oVLLfbVfwvVK2dd6Yt_LUYBg",
  authDomain: "apligood2025.firebaseapp.com",
  projectId: "apligood2025",
  storageBucket: "apligood2025.appspot.com",
  messagingSenderId: "820543904439",
  appId: "1:820543904439:web:9a3dd5cf603c3cceb4cb32"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
