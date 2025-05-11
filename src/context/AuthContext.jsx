import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase);

        try {
          const docRef = doc(db, "usuarios", userFirebase.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setNombre(data.nombre || "");
          } else {
            setNombre("");
          }
        } catch (err) {
          console.error("Error obteniendo el nombre:", err);
          setNombre("");
        }

      } else {
        setUser(null);
        setNombre("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, nombre }}>
      {children}
    </AuthContext.Provider>
  );
}
