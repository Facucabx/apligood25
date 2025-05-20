import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function AgregarProfesional() {
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const espSnap = await getDocs(collection(db, "especialidades"));
      const ciudadSnap = await getDocs(collection(db, "ciudades"));
      setEspecialidades(espSnap.docs.map(doc => doc.data().nombre));
      setCiudades(ciudadSnap.docs.map(doc => doc.data().nombre));
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !especialidad || !ciudad) {
      toast.error("Completa todos los campos");
      return;
    }

    await addDoc(collection(db, "profesionales"), {
      nombre,
      especialidad,
      ciudad,
    });

    toast.success("Profesional agregado");
    setNombre("");
    setEspecialidad("");
    setCiudad("");
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-4">➕ Agregar Profesional</h3>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre completo"
          className="p-2 rounded bg-slate-800 text-white border border-slate-600"
        />
        <select
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          className="p-2 rounded bg-slate-800 text-white border border-slate-600"
        >
          <option value="">Seleccionar especialidad</option>
          {especialidades.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        <select
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          className="p-2 rounded bg-slate-800 text-white border border-slate-600"
        >
          <option value="">Seleccionar ciudad</option>
          {ciudades.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded sm:col-span-2 md:col-span-1"
        >
          Agregar
        </button>
      </form>
    </div>
  );
}
