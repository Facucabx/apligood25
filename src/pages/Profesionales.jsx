import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import TarjetaProfesional from "../components/TarjetaProfesional";

export default function Profesionales() {
  const [profesionales, setProfesionales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const [filtroCiudad, setFiltroCiudad] = useState("");

  useEffect(() => {
    let montado = true;

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profesionales"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (montado) {
          setProfesionales(data);
          setEspecialidades([...new Set(data.map((p) => p.especialidad))]);
          setCiudades([...new Set(data.map((p) => p.ciudad))]);
        }
      } catch (error) {
        console.error("Error al traer profesionales:", error);
      }
    };

    fetchData();
    return () => {
      montado = false;
    };
  }, []);

  const profesionalesFiltrados = profesionales.filter((pro) => {
    return (
      (!filtroEspecialidad || pro.especialidad === filtroEspecialidad) &&
      (!filtroCiudad || pro.ciudad === filtroCiudad)
    );
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
        Profesionales disponibles
      </h1>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <select
          value={filtroEspecialidad}
          onChange={(e) => setFiltroEspecialidad(e.target.value)}
          className="bg-white dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Todas las especialidades</option>
          {especialidades.map((esp, i) => (
            <option key={i} value={esp}>
              {esp}
            </option>
          ))}
        </select>

        <select
          value={filtroCiudad}
          onChange={(e) => setFiltroCiudad(e.target.value)}
          className="bg-white dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Todas las ciudades</option>
          {ciudades.map((ciu, i) => (
            <option key={i} value={ciu}>
              {ciu}
            </option>
          ))}
        </select>
      </div>

      {/* Resultados */}
      {profesionalesFiltrados.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profesionalesFiltrados.map((pro) => (
            <TarjetaProfesional
              key={pro.id}
              id={pro.id}
              nombre={pro.nombre}
              especialidad={pro.especialidad}
              ciudad={pro.ciudad}
              rating={pro.rating}
              imagen={pro.avatar || "/images/avatar-default.webp"}
              disponibilidad={pro.disponibilidad}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400 italic">
          No encontramos profesionales con ese filtro 😕
        </div>
      )}
    </div>
  );
}
