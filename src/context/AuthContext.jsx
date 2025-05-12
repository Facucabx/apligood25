import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase);
        const docSnap = await getDoc(doc(db, "usuarios", userFirebase.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || userFirebase.displayName || "");
          setFoto(data.fotoUrl || userFirebase.photoURL || "");
        } else {
          setNombre(userFirebase.displayName || "");
          setFoto(userFirebase.photoURL || "");
        }
      } else {
        setUser(null);
        setNombre("");
        setFoto("");
      }
    });
    return () => unsubscribe();
  }, []);

  const actualizarPerfil = async (nuevoNombre, nuevaFotoUrl) => {
    if (!auth.currentUser) throw new Error("No hay usuario autenticado");

    const usuarioRef = doc(db, "usuarios", auth.currentUser.uid);

    await setDoc(usuarioRef, {
      nombre: nuevoNombre,
      fotoUrl: nuevaFotoUrl,
    }, { merge: true });

    await updateProfile(auth.currentUser, {
      displayName: nuevoNombre,
      photoURL: nuevaFotoUrl,
    });

    setNombre(nuevoNombre);
    setFoto(nuevaFotoUrl);
  };

  return (
    <AuthContext.Provider value={{ user, nombre, foto, actualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}
