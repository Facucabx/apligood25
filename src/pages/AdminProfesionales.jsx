import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Layout from "../components/Layout";

export default function AdminProfesionales() {
  const [autorizado, setAutorizado] = useState(false);
  const [password, setPassword] = useState("");
  const [profesionales, setProfesionales] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    especialidad: "",
    ciudad: "",
    avatar: "",
    rating: 5,
    disponible: "24hs",
  });
  const [mensaje, setMensaje] = useState("");

  const CLAVE = "facu2025";

  const verificarPassword = () => {
    if (password === CLAVE) {
      setAutorizado(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const cargarProfesionales = async () => {
    const querySnapshot = await getDocs(collection(db, "profesionales"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProfesionales(data);
  };

  const eliminarProfesional = async (id) => {
    const confirmacion = window.confirm("¿Seguro que querés eliminar este profesional?");
    if (!confirmacion) return;
    await deleteDoc(doc(db, "profesionales", id));
    cargarProfesionales();
  };

  const comenzarEdicion = (pro) => {
    setEditandoId(pro.id);
    setForm({ ...pro });
  };

  const guardarCambios = async () => {
    await updateDoc(doc(db, "profesionales", editandoId), form);
    setEditandoId(null);
    setMensaje("✅ Cambios guardados correctamente");
    cargarProfesionales();
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const agregarNuevo = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.especialidad || !form.ciudad) {
      alert("Completá nombre, especialidad y ciudad.");
      return;
    }
    try {
      await addDoc(collection(db, "profesionales"), form);
      setForm({
        nombre: "",
        especialidad: "",
        ciudad: "",
        avatar: "",
        rating: 5,
        disponible: "24hs",
      });
      setMensaje("✅ Profesional agregado con éxito");
      cargarProfesionales();
      setTimeout(() => setMensaje(""), 3000);
    } catch (err) {
      console.error("Error al agregar:", err);
      alert("Hubo un error al agregar el profesional.");
    }
  };

  useEffect(() => {
    if (autorizado) cargarProfesionales();
  }, [autorizado]);

  if (!autorizado) {
    return (
      <Layout>
        <h1 className="text-xl font-bold mb-4">Acceso restringido</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresá la contraseña"
          className="px-4 py-2 border rounded text-black mb-3"
        />
        <br />
        <button
          onClick={verificarPassword}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ingresar
        </button>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Panel de Administración</h1>

      {mensaje && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 shadow">
          {mensaje}
        </div>
      )}

      {/* Formulario para agregar nuevo profesional */}
      <details className="mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded">
        <summary className="cursor-pointer font-semibold mb-2">➕ Agregar nuevo profesional</summary>
        <form onSubmit={agregarNuevo} className="mt-4 space-y-2">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
          <input
            name="especialidad"
            placeholder="Especialidad"
            value={form.especialidad}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
          <input
            name="ciudad"
            placeholder="Ciudad"
            value={form.ciudad}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
          <input
            name="avatar"
            placeholder="URL Avatar (opcional)"
            value={form.avatar}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
          <input
            name="rating"
            placeholder="Rating (1-5)"
            type="number"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
          <input
            name="disponible"
            placeholder="Disponibilidad"
            value={form.disponible}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-black"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar profesional
          </button>
        </form>
      </details>

      {/* Estadísticas */}
      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
        <h2 className="text-md font-semibold mb-2">📊 Estadísticas</h2>
        <p>Total de profesionales: <strong>{profesionales.length}</strong></p>

        <div className="mt-3">
          <h3 className="font-semibold text-sm mb-1">Por ciudad:</h3>
          <ul className="text-sm list-disc list-inside">
            {[...new Set(profesionales.map(p => p.ciudad))].map((ciudad, i) => {
              const count = profesionales.filter(p => p.ciudad === ciudad).length;
              return <li key={i}>{ciudad}: {count}</li>;
            })}
          </ul>
        </div>

        <div className="mt-3">
          <h3 className="font-semibold text-sm mb-1">Por especialidad:</h3>
          <ul className="text-sm list-disc list-inside">
            {[...new Set(profesionales.map(p => p.especialidad))].map((esp, i) => {
              const count = profesionales.filter(p => p.especialidad === esp).length;
              return <li key={i}>{esp}: {count}</li>;
            })}
          </ul>
        </div>
      </div>

      {/* Lista de profesionales */}
      {profesionales.map((pro) => (
        <div
          key={pro.id}
          className="mb-4 p-4 border rounded bg-white dark:bg-gray-800 shadow"
        >
          {editandoId === pro.id ? (
            <>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-1 border rounded text-black"
              />
              <input
                name="especialidad"
                value={form.especialidad}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-1 border rounded text-black"
              />
              <input
                name="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-1 border rounded text-black"
              />
              <input
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-1 border rounded text-black"
              />
              <input
                name="rating"
                value={form.rating}
                onChange={handleChange}
                type="number"
                step="0.1"
                className="w-full mb-2 px-3 py-1 border rounded text-black"
              />
              <input
                name="disponible"
                value={form.disponible}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-1 border rounded text-black"
              />

              <button
                onClick={guardarCambios}
                className="bg-green-600 text-white px-3 py-1 rounded mr-2"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditandoId(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <h2 className="font-bold text-blue-600">{pro.nombre}</h2>
              <p className="text-sm">{pro.especialidad} – {pro.ciudad}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => comenzarEdicion(pro)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProfesional(pro.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </Layout>
  );
}
