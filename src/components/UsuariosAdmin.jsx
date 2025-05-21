// src/components/UsuariosAdmin.jsx
import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ThemeContext } from "../context/ThemeContext";

export default function UsuariosAdmin() {
  const { darkMode } = useContext(ThemeContext);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        const usuariosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Usuarios Registrados</h2>
      <p className="text-white mb-4">
        Total de usuarios:{" "}
        <span className="font-semibold text-blue-400">{usuarios.length}</span>
      </p>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-slate-800 text-white rounded-md">
          <thead>
            <tr className="text-left border-b border-slate-700">
              <th className="p-2">Nombre</th>
              <th className="p-2">Email</th>
              <th className="p-2">UID</th>
              <th className="p-2">Fecha de registro</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-slate-700 transition">
                <td className="p-2">{usuario.nombre || "—"}</td>
                <td className="p-2">{usuario.email || "—"}</td>
                <td className="p-2">{usuario.uid || "—"}</td>
                <td className="p-2">{usuario.fechaRegistro || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
