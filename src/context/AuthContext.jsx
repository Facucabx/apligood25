import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [foto, setFoto] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // ✅ Ahora sí: hook adentro del componente
  const [loading, setLoading] = useState(true);

  const cargarDatosUsuario = async (userFirebase) => {
    if (!userFirebase) return;
    try {
      const docRef = doc(db, "usuarios", userFirebase.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre || userFirebase.displayName || "");
        setFoto(data.fotoUrl || userFirebase.photoURL || "");
        setIsAdmin(data.isAdmin || false);
      } else {
        setNombre(userFirebase.displayName || "");
        setFoto(userFirebase.photoURL || "");
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error cargando datos del usuario:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        await cargarDatosUsuario(userFirebase);
        setUser(userFirebase);
        setEmail(userFirebase.email || "");
      } else {
        setUser(null);
        setEmail("");
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refrescarUsuario = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser(auth.currentUser);
      setEmail(auth.currentUser.email || "");
      await cargarDatosUsuario(auth.currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        email,
        isAdmin,
        nombre,
        foto,
        setNombre,
        setFoto,
        refrescarUsuario,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
