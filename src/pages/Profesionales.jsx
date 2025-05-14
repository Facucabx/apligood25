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
    <div className="container py-6">
      <h1 className="section-title">Buscar profesionales</h1>

      {/* Filtros */}
      <div className="flex flex-col gap-2 mb-6">
        <select
          value={filtroEspecialidad}
          onChange={(e) => setFiltroEspecialidad(e.target.value)}
          className="px-3 py-2 border rounded text-black"
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
          className="px-3 py-2 border rounded text-black"
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profesionalesFiltrados.map((pro) => (
            <TarjetaProfesional
              key={pro.id}
              id={pro.id}
              nombre={pro.nombre}
              especialidad={pro.especialidad}
              ciudad={pro.ciudad}
              rating={pro.rating}
              imagen={pro.avatar || "/images/avatar-default.webp"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 italic">
          No encontramos profesionales con ese filtro 😕
        </div>
      )}
    </div>
  );
}
