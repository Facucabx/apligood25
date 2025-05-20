import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function PanelListas() {
  const [ciudades, setCiudades] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [nuevaCiudad, setNuevaCiudad] = useState("");
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("");

  const fetchData = async () => {
    const ciudadesSnapshot = await getDocs(collection(db, "ciudades"));
    const especialidadesSnapshot = await getDocs(collection(db, "especialidades"));

    setCiudades(
      ciudadesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setEspecialidades(
      especialidadesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const agregarCiudad = async () => {
    if (!nuevaCiudad.trim()) return;
    await addDoc(collection(db, "ciudades"), { nombre: nuevaCiudad });
    toast.success("Ciudad agregada");
    setNuevaCiudad("");
    fetchData();
  };

  const eliminarCiudad = async (id) => {
    await deleteDoc(doc(db, "ciudades", id));
    toast.info("Ciudad eliminada");
    fetchData();
  };

  const agregarEspecialidad = async () => {
    if (!nuevaEspecialidad.trim()) return;
    await addDoc(collection(db, "especialidades"), { nombre: nuevaEspecialidad });
    toast.success("Especialidad agregada");
    setNuevaEspecialidad("");
    fetchData();
  };

  const eliminarEspecialidad = async (id) => {
    await deleteDoc(doc(db, "especialidades", id));
    toast.info("Especialidad eliminada");
    fetchData();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 📍 Ciudades */}
      <div>
        <h3 className="text-lg font-bold mb-2">📍 Ciudades</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={nuevaCiudad}
            onChange={(e) => setNuevaCiudad(e.target.value)}
            placeholder="Agregar ciudad"
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600"
          />
          <button
            onClick={agregarCiudad}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        </div>
        <ul className="space-y-2">
          {ciudades.map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center bg-slate-800 p-2 rounded"
            >
              <span>{c.nombre}</span>
              <button
                onClick={() => eliminarCiudad(c.id)}
                className="text-red-400 hover:text-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🧠 Especialidades */}
      <div>
        <h3 className="text-lg font-bold mb-2">🧠 Especialidades</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={nuevaEspecialidad}
            onChange={(e) => setNuevaEspecialidad(e.target.value)}
            placeholder="Agregar especialidad"
            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600"
          />
          <button
            onClick={agregarEspecialidad}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        </div>
        <ul className="space-y-2">
          {especialidades.map((e) => (
            <li
              key={e.id}
              className="flex justify-between items-center bg-slate-800 p-2 rounded"
            >
              <span>{e.nombre}</span>
              <button
                onClick={() => eliminarEspecialidad(e.id)}
                className="text-red-400 hover:text-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
