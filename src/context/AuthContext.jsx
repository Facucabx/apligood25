import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState("");
  const [loading, setLoading] = useState(true); // ⬅️ Nuevo: loading

  const cargarDatosUsuario = async (userFirebase) => {
    if (!userFirebase) return;
    try {
      const docRef = doc(db, "usuarios", userFirebase.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre || userFirebase.displayName || "");
        setFoto(data.fotoUrl || userFirebase.photoURL || "");
      } else {
        setNombre(userFirebase.displayName || "");
        setFoto(userFirebase.photoURL || "");
      }
    } catch (error) {
      console.error("Error cargando datos del usuario:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFirebase) => {
      setUser(userFirebase);
      if (userFirebase) {
        await cargarDatosUsuario(userFirebase);
      }
      setLoading(false); // ⬅️ Listo: termina la carga
    });

    return () => unsubscribe();
  }, []);

  const refrescarUsuario = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser(auth.currentUser);
      await cargarDatosUsuario(auth.currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        nombre,
        foto,
        setNombre,
        setFoto,
        refrescarUsuario,
        loading, // ⬅️ Exportamos loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
