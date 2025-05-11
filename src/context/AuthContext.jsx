import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState("");

  const refreshUserData = async (userFirebase) => {
    try {
      await userFirebase.reload();
      const updatedUser = auth.currentUser;

      setUser(updatedUser);

      const docRef = doc(db, "usuarios", updatedUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre || updatedUser.displayName || "");
        setFoto(data.fotoURL || updatedUser.photoURL || "");
      } else {
        setNombre(updatedUser.displayName || "");
        setFoto(updatedUser.photoURL || "");
      }
    } catch (err) {
      console.error("Error actualizando usuario:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        refreshUserData(userFirebase);
      } else {
        setUser(null);
        setNombre("");
        setFoto("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, nombre, setNombre, foto, setFoto, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
