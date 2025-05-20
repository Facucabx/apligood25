import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AdminProfesionales() {
  const [tab, setTab] = useState("profesionales");
  const [profesionales, setProfesionales] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [nuevaCiudad, setNuevaCiudad] = useState("");
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("");
  const [filtroCiudad, setFiltroCiudad] = useState("Todas");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("Todas");

  const configRef = doc(db, "config", "listas");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "profesionales"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProfesionales(lista);
    });

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

  const agregarALista = async (tipo, valor) => {
    if (!valor.trim()) return;
    const campo = tipo === "ciudad" ? "ciudades" : "especialidades";
    const nuevaLista = tipo === "ciudad" ? [...ciudades, valor] : [...especialidades, valor];

    try {
      await updateDoc(configRef, { [campo]: nuevaLista });
      toast.success(`${tipo} agregada`);
      tipo === "ciudad" ? setNuevaCiudad("") : setNuevaEspecialidad("");
    } catch (error) {
      toast.error("Error al agregar");
    }
  };

  const eliminarDeLista = async (tipo, item) => {
    const campo = tipo === "ciudad" ? "ciudades" : "especialidades";
    const listaActual = tipo === "ciudad" ? ciudades : especialidades;
    const nuevaLista = listaActual.filter((i) => i !== item);

    try {
      await updateDoc(configRef, { [campo]: nuevaLista });
      toast.info(`${item} eliminada`);
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const filtrados = profesionales.filter((p) => {
    const coincideCiudad = filtroCiudad === "Todas" || p.ciudad === filtroCiudad;
    const coincideEspecialidad = filtroEspecialidad === "Todas" || p.especialidad === filtroEspecialidad;
    return coincideCiudad && coincideEspecialidad;
  });

  const contarPor = (lista, campo) =>
    lista.reduce((acc, p) => {
      acc[p[campo]] = (acc[p[campo]] || 0) + 1;
      return acc;
    }, {});

  return (
    <div className="p-4 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel de Administración</h1>

      <div className="flex justify-center gap-4 mb-6">
        {["profesionales", "listas", "dashboard"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full font-semibold ${
              tab === t ? "bg-blue-600 shadow-lg" : "bg-slate-700"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "profesionales" && (
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
            <p className="text-center text-gray-400 mt-6">No se encontraron profesionales.</p>
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
      )}

      {tab === "listas" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-3">Ciudades</h2>
            <div className="flex mb-3">
              <input
                type="text"
                placeholder="Nueva ciudad"
                value={nuevaCiudad}
                onChange={(e) => setNuevaCiudad(e.target.value)}
                className="flex-1 bg-slate-900 text-white px-3 py-2 rounded-l border border-slate-700"
              />
              <button
                onClick={() => agregarALista("ciudad", nuevaCiudad)}
                className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
              >
                +
              </button>
            </div>
            <ul className="space-y-2">
              {ciudades.map((item) => (
                <li
                  key={item}
                  className="flex justify-between items-center bg-slate-700 px-3 py-2 rounded"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => eliminarDeLista("ciudad", item)}
                    className="text-red-400 hover:text-red-600"
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-3">Especialidades</h2>
            <div className="flex mb-3">
              <input
                type="text"
                placeholder="Nueva especialidad"
                value={nuevaEspecialidad}
                onChange={(e) => setNuevaEspecialidad(e.target.value)}
                className="flex-1 bg-slate-900 text-white px-3 py-2 rounded-l border border-slate-700"
              />
              <button
                onClick={() => agregarALista("especialidad", nuevaEspecialidad)}
                className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
              >
                +
              </button>
            </div>
            <ul className="space-y-2">
              {especialidades.map((item) => (
                <li
                  key={item}
                  className="flex justify-between items-center bg-slate-700 px-3 py-2 rounded"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => eliminarDeLista("especialidad", item)}
                    className="text-red-400 hover:text-red-600"
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === "dashboard" && (
        <div className="bg-slate-800 p-6 rounded shadow-md text-center space-y-4">
          <h2 className="text-2xl font-bold mb-4">Resumen</h2>
          <p>Total de profesionales: <strong>{profesionales.length}</strong></p>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-lg font-semibold mb-2">📍 Por ciudad</h3>
              <ul className="text-sm space-y-1">
                {Object.entries(contarPor(profesionales, "ciudad")).map(([ciudad, count]) => (
                  <li key={ciudad}>
                    {ciudad}: <strong>{count}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">🧠 Por especialidad</h3>
              <ul className="text-sm space-y-1">
                {Object.entries(contarPor(profesionales, "especialidad")).map(([esp, count]) => (
                  <li key={esp}>
                    {esp}: <strong>{count}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
