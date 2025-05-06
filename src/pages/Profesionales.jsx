import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";

export default function Profesionales() {
  const [profesionales, setProfesionales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const [filtroCiudad, setFiltroCiudad] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profesionales"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfesionales(data);

        const esp = [...new Set(data.map((p) => p.especialidad))];
        const ciu = [...new Set(data.map((p) => p.ciudad))];
        setEspecialidades(esp);
        setCiudades(ciu);
      } catch (error) {
        console.error("Error al traer profesionales:", error);
      }
    };

    fetchData();
  }, []);

  const profesionalesFiltrados = profesionales.filter((pro) => {
    return (
      (!filtroEspecialidad || pro.especialidad === filtroEspecialidad) &&
      (!filtroCiudad || pro.ciudad === filtroCiudad)
    );
  });

  return (
    <Layout>
      <h1 className="text-lg font-bold mb-2">Buscar profesionales</h1>

      <div className="flex flex-col gap-2 mb-4">
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

      <h2 className="text-sm text-gray-500 mb-2 font-semibold">Recomendados</h2>

      {profesionalesFiltrados.length === 0 ? (
        <div className="text-center py-8 text-gray-500 italic">
          No encontramos profesionales con ese filtro 😕
        </div>
      ) : (
        profesionalesFiltrados.map((pro) => (
          <div
            key={pro.id}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow border mb-3 hover:bg-blue-50 dark:hover:bg-blue-900 transition"
          >
            <img
              src={pro.avatar || "https://via.placeholder.com/50"}
              alt={pro.nombre}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">{pro.nombre}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">🛠️ {pro.especialidad}</p>
              <p className="text-xs text-gray-400">{pro.ciudad}</p>
            </div>
            <div className="text-right text-xs">
              <p className="text-yellow-500 font-semibold">⭐ {pro.rating || 5}</p>
              <p className="text-green-600 font-semibold">{pro.disponible || "24hs"}</p>
            </div>
          </div>
        ))
      )}

      {/* Botón flotante para agregar */}
      <a
        href="/nuevo"
        className="fixed bottom-20 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        ➕
      </a>

      <BottomNav />
    </Layout>
  );
}
