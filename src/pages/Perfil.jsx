import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { updateProfile, deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaSpinner } from "react-icons/fa";

export default function Perfil() {
  const { user, refrescarUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [nuevaFoto, setNuevaFoto] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!user) return;
    const cargarDatos = async () => {
      try {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || "");
          setFotoUrl(data.fotoUrl || "");
        } else {
          toast.error("No se encontraron datos del usuario.");
        }
      } catch (error) {
        toast.error("Error al cargar los datos.");
      }
    };
    cargarDatos();
  }, [user]);

  const handleGuardar = async () => {
    if (!nombre.trim()) {
      toast.warning("Por favor ingresa un nombre válido.");
      return;
    }
    if (!user) {
      toast.error("Usuario no cargado.");
      return;
    }

    setCargando(true);
    try {
      const usuarioRef = doc(db, "usuarios", user.uid);
      let urlFotoActualizada = fotoUrl;

      if (nuevaFoto) {
        const fotoRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(fotoRef, nuevaFoto);
        urlFotoActualizada = await getDownloadURL(fotoRef);
      }

      await updateDoc(usuarioRef, {
        nombre,
        fotoUrl: urlFotoActualizada,
      });

      await updateProfile(auth.currentUser, {
        displayName: nombre,
        photoURL: urlFotoActualizada,
      });

      await refrescarUsuario();

      toast.success("Perfil actualizado correctamente.");
    } catch (error) {
      toast.error("Error al actualizar perfil.");
    } finally {
      setCargando(false);
    }
  };

  const handleCambiarFoto = (e) => {
    if (e.target.files[0]) {
      setNuevaFoto(e.target.files[0]);
    }
  };

  const handleEliminarCuenta = async () => {
    if (!user) return;
    try {
      if (confirm("¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.")) {
        await deleteDoc(doc(db, "usuarios", user.uid));
        await deleteUser(auth.currentUser);
        toast.success("Cuenta eliminada.");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error al eliminar cuenta.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-full max-w-md space-y-6 animate-fade-in">
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="foto" className="cursor-pointer relative group">
            <img
              src={nuevaFoto ? URL.createObjectURL(nuevaFoto) : fotoUrl || "https://via.placeholder.com/100?text=U"}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-600 shadow-lg hover:opacity-80 transition-all"
            />
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Cambiar foto
            </span>
          </label>
          <input id="foto" type="file" accept="image/*" onChange={handleCambiarFoto} className="hidden" />
        </div>

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
          className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-center"
        />

        <button
          onClick={handleGuardar}
          disabled={cargando}
          className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold transition-all w-full ${
            cargando ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {cargando && <FaSpinner className="animate-spin" />} Guardar cambios
        </button>

        <div className="border-t border-gray-600 pt-4">
          <button
            onClick={handleEliminarCuenta}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold transition-all w-full"
          >
            <FaTrash /> Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
