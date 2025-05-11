import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile, deleteUser } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState(user?.displayName || "");
  const [fotoPreview, setFotoPreview] = useState(user?.photoURL || "/images/avatar-default.png");
  const [archivo, setArchivo] = useState(null);
  const inputFileRef = useRef();

  const handleImagenSeleccionada = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGuardar = async () => {
    try {
      let nuevaURL = user.photoURL;

      if (archivo) {
        const storageRef = ref(storage, `avatares/${user.uid}`);
        await uploadBytes(storageRef, archivo);
        nuevaURL = await getDownloadURL(storageRef);
      }

      await updateProfile(auth.currentUser, {
        displayName: nombre,
        photoURL: nuevaURL,
      });

      toast.success("Perfil actualizado");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar perfil");
    }
  };

  const handleEliminarCuenta = async () => {
    if (!window.confirm("¿Seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer.")) return;

    try {
      await deleteUser(auth.currentUser);
      toast.success("Cuenta eliminada");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar la cuenta. Reautenticá e intentá de nuevo.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Mi perfil</h2>

      <div className="flex flex-col items-center gap-4 mb-6">
        <img
          src={fotoPreview}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <button
          onClick={() => inputFileRef.current.click()}
          className="text-sm text-blue-600 hover:underline"
        >
          Cambiar foto
        </button>
        <input
          type="file"
          accept="image/*"
          ref={inputFileRef}
          onChange={handleImagenSeleccionada}
          className="hidden"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>

      <button
        onClick={handleGuardar}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        Guardar cambios
      </button>

      <button
        onClick={handleEliminarCuenta}
        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
      >
        Eliminar cuenta
      </button>
    </div>
  );
}
