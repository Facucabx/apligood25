// ListaProfesionales.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ListaProfesionales() {
  const [profesionales, setProfesionales] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filtroCiudad, setFiltroCiudad] = useState("Todas");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("Todas");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "profesionales"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProfesionales(lista);
    });

    const configRef = doc(db, "config", "listas");
    const unsubConfig = onSnapshot(configRef, (docSnap) => {
      if (docSnap.exists()) {
        setCiudades(docSnap.data().ciudades || []);
        setEspecialidades(docSnap.data().especialidades || []);
      }
    });

    return () => {
      unsub();
      unsubConfig();
    };
  }, []);

  const eliminarProfesional = async (id) => {
    if (confirm("¿Eliminar profesional?")) {
      await deleteDoc(doc(db, "profesionales", id));
      toast.info("Profesional eliminado");
    }
  };

  const filtrados = profesionales.filter((p) => {
    const coincideCiudad = filtroCiudad === "Todas" || p.ciudad === filtroCiudad;
    const coincideEspecialidad =
      filtroEspecialidad === "Todas" || p.especialidad === filtroEspecialidad;
    return coincideCiudad && coincideEspecialidad;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
        <div className="flex gap-2">
          <select
            value={filtroCiudad}
            onChange={(e) => setFiltroCiudad(e.target.value)}
            className="bg-slate-800 px-3 py-2 rounded"
          >
            <option value="Todas">📍 Todas las ciudades</option>
            {ciudades.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={filtroEspecialidad}
            onChange={(e) => setFiltroEspecialidad(e.target.value)}
            className="bg-slate-800 px-3 py-2 rounded"
          >
            <option value="Todas">🧠 Todas las especialidades</option>
            {especialidades.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>

        <Link
          to="/admin/nuevo"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          + Agregar profesional
        </Link>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center text-gray-400 mt-6">
          No se encontraron profesionales.
        </p>
      ) : (
        filtrados.map((p) => (
          <div
            key={p.id}
            className="bg-slate-800 rounded p-4 mb-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.avatar || "https://via.placeholder.com/50"}
                alt={p.nombre}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sky-400">{p.nombre}</p>
                <p className="text-sm text-gray-300">
                  {p.especialidad} – {p.ciudad}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/admin/editar/${p.id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-1 px-3 rounded"
              >
                Editar
              </Link>
              <button
                onClick={() => eliminarProfesional(p.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
