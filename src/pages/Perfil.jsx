import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { storage, db, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const { nombre, foto, actualizarPerfil } = useContext(AuthContext);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);
  const [nuevaFoto, setNuevaFoto] = useState(null);
  const [subiendoFoto, setSubiendoFoto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const navigate = useNavigate();

  const handleGuardar = async () => {
    if (!auth.currentUser) {
      toast.error("Usuario no cargado.");
      return;
    }

    if (!nuevoNombre.trim()) {
      toast.error("El nombre no puede estar vacío.");
      return;
    }

    try {
      setGuardando(true);
      let urlFoto = auth.currentUser.photoURL || foto;

      if (nuevaFoto) {
        setSubiendoFoto(true);
        const fotoRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        await uploadBytes(fotoRef, nuevaFoto);
        urlFoto = await getDownloadURL(fotoRef);
        setSubiendoFoto(false);
      }

      await actualizarPerfil(nuevoNombre, urlFoto);

      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el perfil.");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminarCuenta = async () => {
    if (!auth.currentUser) {
      toast.error("Usuario no cargado.");
      return;
    }

    try {
      if (!confirm("¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) return;

      if (foto) {
        const fotoRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        await deleteObject(fotoRef).catch(() => {});
      }

      await deleteDoc(doc(db, "usuarios", auth.currentUser.uid));
      await deleteUser(auth.currentUser);

      toast.success("Cuenta eliminada");
      navigate("/login");
    } catch (error) {
      toast.error("Error al eliminar cuenta.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-6">Mi perfil</h1>

      <label htmlFor="foto" className="cursor-pointer relative group">
        <img
          src={
            nuevaFoto
              ? URL.createObjectURL(nuevaFoto)
              : foto || "https://via.placeholder.com/100?text=U"
          }
          alt="Avatar"
          className={`w-24 h-24 rounded-full object-cover border-4 ${
            subiendoFoto ? "opacity-50 grayscale" : "border-blue-600"
          }`}
        />
        {subiendoFoto && (
          <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-xs bg-black bg-opacity-50 text-white rounded-full">
            Subiendo...
          </span>
        )}
      </label>
      <input
        id="foto"
        type="file"
        accept="image/*"
        onChange={(e) => setNuevaFoto(e.target.files[0])}
        className="hidden"
      />

      <input
        type="text"
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
        placeholder="Tu nombre"
        className="mt-6 mb-4 px-4 py-2 border rounded w-64 text-center dark:bg-gray-800 dark:text-white"
      />

      <button
        onClick={handleGuardar}
        disabled={guardando}
        className={`bg-blue-600 text-white px-6 py-2 rounded mb-4 hover:bg-blue-700 transition-all ${
          guardando ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {guardando ? "Guardando..." : "Guardar cambios"}
      </button>

      <button
        onClick={handleEliminarCuenta}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-all"
      >
        Eliminar cuenta
      </button>
    </div>
  );
}
