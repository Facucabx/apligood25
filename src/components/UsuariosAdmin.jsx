import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroEmail, setFiltroEmail] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const lista = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsuarios(lista);
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    await deleteDoc(doc(db, "usuarios", id));
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    toast.success("Usuario eliminado");
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.email?.toLowerCase().includes(filtroEmail.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Usuarios Registrados</h2>
        <input
          type="text"
          placeholder="Buscar por email..."
          value={filtroEmail}
          onChange={(e) => setFiltroEmail(e.target.value)}
          className="p-2 rounded bg-slate-100 text-black w-64"
        />
      </div>

      <p className="text-gray-400">Total: <span className="font-semibold text-white">{usuarios.length}</span></p>

      <div className="grid gap-4">
        {usuariosFiltrados.length === 0 ? (
          <div className="text-center text-gray-400">No se encontraron usuarios.</div>
        ) : (
          usuariosFiltrados.map((usuario) => (
            <div
              key={usuario.id}
              className="bg-slate-800/60 backdrop-blur-md p-4 rounded-xl shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={usuario.avatar || "/user-placeholder.png"}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                />
                <div>
                  <p className="font-semibold">{usuario.nombre || "—"}</p>
                  <p className="text-sm text-gray-300">{usuario.email || "—"}</p>
                  <p className="text-xs text-gray-400">UID: {usuario.uid || "—"}</p>
                </div>
              </div>
              <button
                onClick={() => eliminarUsuario(usuario.id)}
                className="text-red-400 hover:text-red-500 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
