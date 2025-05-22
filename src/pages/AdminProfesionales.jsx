import { useState, useEffect, useContext } from "react";
import { db, storage, auth } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import BottomNav from "../components/BottomNav";
import { ThemeContext } from "../context/ThemeContext";
import { Pencil, Trash2, Save } from "lucide-react";

export default function AdminProfesionales() {
  const { darkMode } = useContext(ThemeContext);
  const [tab, setTab] = useState("resumen");
  const [profesionales, setProfesionales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filtroEmail, setFiltroEmail] = useState("");

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");
  const [rating, setRating] = useState(5);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [editando, setEditando] = useState(null);

  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("");
  const [nuevaCiudad, setNuevaCiudad] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editandoValor, setEditandoValor] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    obtenerProfesionales();
    obtenerListas();
    obtenerUsuarios();
  }, []);

  const obtenerProfesionales = async () => {
    const querySnapshot = await getDocs(collection(db, "profesionales"));
    const lista = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProfesionales(lista);
  };

  const obtenerListas = async () => {
    const espSnap = await getDocs(collection(db, "especialidades"));
    setEspecialidades(espSnap.docs.map((doc) => ({ id: doc.id, nombre: doc.data().nombre })));
    const ciuSnap = await getDocs(collection(db, "ciudades"));
    setCiudades(ciuSnap.docs.map((doc) => ({ id: doc.id, nombre: doc.data().nombre })));
  };

  const obtenerUsuarios = async () => {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const listaUsuarios = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsuarios(listaUsuarios);
  };

  const handleAgregar = async () => {
    if (!nombre || !especialidad || !ciudad || !disponibilidad) {
      toast.error("Completá todos los campos obligatorios");
      return;
    }

    let avatarURL = "";
    if (avatar) {
      const storageRef = ref(storage, `avatars/${Date.now()}-${avatar.name}`);
      await uploadBytes(storageRef, avatar);
      avatarURL = await getDownloadURL(storageRef);
    }

    const datosProfesional = {
      nombre,
      especialidad,
      ciudad,
      disponibilidad,
      rating,
      avatar: avatarURL || (editando?.avatar || ""),
    };

    if (editando) {
      await updateDoc(doc(db, "profesionales", editando.id), datosProfesional);
      toast.success("Profesional actualizado");
    } else {
      await addDoc(collection(db, "profesionales"), datosProfesional);
      toast.success("Profesional agregado");
    }

    obtenerProfesionales();
    resetForm();
  };

  const resetForm = () => {
    setNombre("");
    setEspecialidad("");
    setCiudad("");
    setDisponibilidad("");
    setRating(5);
    setAvatar(null);
    setAvatarPreview(null);
    setEditando(null);
  };

  const handleEliminar = async (id) => {
    await deleteDoc(doc(db, "profesionales", id));
    setProfesionales((prev) => prev.filter((p) => p.id !== id));
    toast.info("Profesional eliminado");
  };

  const handleEditar = (p) => {
    setNombre(p.nombre);
    setEspecialidad(p.especialidad);
    setCiudad(p.ciudad);
    setDisponibilidad(p.disponibilidad);
    setRating(p.rating);
    setAvatarPreview(p.avatar);
    setEditando(p);
  };

  const agregarItemLista = async (tipo) => {
    const valor = tipo === "especialidad" ? nuevaEspecialidad : nuevaCiudad;
    if (!valor.trim()) return;
    await addDoc(collection(db, tipo === "especialidad" ? "especialidades" : "ciudades"), {
      nombre: valor.trim(),
    });
    toast.success(`${tipo === "especialidad" ? "Especialidad" : "Ciudad"} agregada`);
    setNuevaEspecialidad("");
    setNuevaCiudad("");
    obtenerListas();
  };

  const editarItemLista = async (tipo, id, nuevoNombre) => {
    if (!nuevoNombre.trim()) return;
    await updateDoc(doc(db, tipo === "especialidad" ? "especialidades" : "ciudades", id), {
      nombre: nuevoNombre.trim(),
    });
    toast.success("Nombre actualizado");
    setEditandoId(null);
    setEditandoValor("");
    obtenerListas();
  };

  const eliminarItemLista = async (tipo, id) => {
    await deleteDoc(doc(db, tipo === "especialidad" ? "especialidades" : "ciudades", id));
    toast.info(`${tipo === "especialidad" ? "Especialidad" : "Ciudad"} eliminada`);
    obtenerListas();
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    await deleteDoc(doc(db, "usuarios", id));
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    toast.success("Usuario eliminado");
  };

  const cambiarRol = async (usuario) => {
    if (usuario.uid === auth.currentUser.uid) {
      toast.error("No podés modificar tu propio rol");
      return;
    }

    try {
      const nuevoValor = !usuario.isAdmin;
      await updateDoc(doc(db, "usuarios", usuario.id), { isAdmin: nuevoValor });
      toast.success(`Rol actualizado: ahora es ${nuevoValor ? "admin" : "usuario"}`);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al cambiar rol:", error);
      toast.error("Error al cambiar el rol del usuario");
    }
  };

  const clasesFondo = darkMode ? "bg-backgroundDark text-white" : "bg-white text-black";
  const usuariosFiltrados = usuarios.filter((u) =>
    u.email?.toLowerCase().includes(filtroEmail.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${clasesFondo}`}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-center gap-4 mb-6">
          {["resumen", "profesionales", "listas", "usuarios"].map((t) => (
            <button
              key={t}
              className={`px-4 py-2 rounded-full font-semibold shadow-sm transition-all duration-200 ${tab === t
                  ? "bg-primary text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* TAB RESUMEN */}
        {tab === "resumen" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">¡Bienvenido a tu Panel, Admin!</h2>
            <p className="text-gray-400">Acá tenés un vistazo general de Apligood.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/70 p-4 rounded-xl shadow-md text-center">
                <p className="text-sm text-gray-400">Profesionales</p>
                <p className="text-2xl font-bold">{profesionales.length}</p>
              </div>
              <div className="bg-slate-800/70 p-4 rounded-xl shadow-md text-center">
                <p className="text-sm text-gray-400">Ciudades</p>
                <p className="text-2xl font-bold">{ciudades.length}</p>
              </div>
              <div className="bg-slate-800/70 p-4 rounded-xl shadow-md text-center">
                <p className="text-sm text-gray-400">Especialidades</p>
                <p className="text-2xl font-bold">{especialidades.length}</p>
              </div>
              <div className="bg-slate-800/70 p-4 rounded-xl shadow-md text-center">
                <p className="text-sm text-gray-400">Rating Promedio</p>
                <p className="text-2xl font-bold">
                  {(
                    profesionales.reduce((acc, p) => acc + Number(p.rating || 0), 0) /
                    (profesionales.length || 1)
                  ).toFixed(1)}
                </p>
              </div>
            </div>
            <div className="mt-6 bg-slate-700/60 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Acciones rápidas</h3>
              <button
                onClick={() => setTab("profesionales")}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                + Agregar nuevo profesional
              </button>
            </div>
          </div>
        )}
        {/* TAB PROFESIONALES */}
        {tab === "profesionales" && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {editando ? "Editar Profesional" : "Agregar Profesional"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre completo"
                className="p-3 rounded-lg shadow bg-slate-100 text-black placeholder-gray-500"
              />
              <select
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                className="p-3 rounded-lg shadow bg-slate-100 text-black"
              >
                <option value="">Seleccionar especialidad</option>
                {especialidades.map((e) => (
                  <option key={e.id} value={e.nombre}>{e.nombre}</option>
                ))}
              </select>
              <select
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="p-3 rounded-lg shadow bg-slate-100 text-black"
              >
                <option value="">Seleccionar ciudad</option>
                {ciudades.map((c) => (
                  <option key={c.id} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
              <input
                type="text"
                value={disponibilidad}
                onChange={(e) => setDisponibilidad(e.target.value)}
                placeholder="Disponibilidad (ej: L a V - 9 a 18hs)"
                className="p-3 rounded-lg shadow bg-slate-100 text-black placeholder-gray-500"
              />
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                placeholder="Rating (1 a 5)"
                min={1}
                max={5}
                className="p-3 rounded-lg shadow bg-slate-100 text-black placeholder-gray-500"
              />
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAvatar(file);
                  setAvatarPreview(URL.createObjectURL(file));
                }}
                className="p-2 rounded bg-slate-100 text-black file:mr-2 file:px-4 file:py-2 file:border-0 file:rounded-full file:bg-primary file:text-white"
              />
            </div>
            {avatarPreview && (
              <div className="mb-4 flex justify-center">
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="h-24 w-24 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>
            )}
            <button
              onClick={handleAgregar}
              className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full shadow-lg transition"
            >
              {editando ? "Guardar Cambios" : "Agregar"}
            </button>
            <h3 className="text-xl font-semibold mt-10 mb-4">Lista de Profesionales</h3>
            <div className="grid gap-4">
              {profesionales.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-800/60 backdrop-blur-md p-4 rounded-xl shadow-md flex items-center justify-between transition hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.avatar}
                      alt="Avatar"
                      className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h4 className="text-lg font-bold tracking-tight">{p.nombre}</h4>
                      <p className="text-sm text-gray-300">{p.especialidad} · {p.ciudad}</p>
                      <p className="text-sm text-gray-400">{p.disponibilidad}</p>
                      <p className="text-sm text-yellow-400 font-semibold">⭐ {p.rating}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditar(p)}
                      className="text-blue-400 hover:text-blue-500 transition"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleEliminar(p.id)}
                      className="text-red-400 hover:text-red-500 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* TAB LISTAS */}
        {tab === "listas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ tipo: "especialidad", data: especialidades, nuevo: nuevaEspecialidad, setNuevo: setNuevaEspecialidad },
            { tipo: "ciudad", data: ciudades, nuevo: nuevaCiudad, setNuevo: setNuevaCiudad }].map(({ tipo, data, nuevo, setNuevo }) => (
              <div key={tipo} className="bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-white/10 capitalize">{tipo}s</h3>
                <ul className="space-y-2 mb-4">
                  {data.map((item) => (
                    <li key={item.id} className="flex items-center gap-2 bg-slate-700/40 p-3 rounded-xl hover:shadow-md transition">
                      {editandoId === item.id ? (
                        <>
                          <input
                            type="text"
                            value={editandoValor}
                            onChange={(e) => setEditandoValor(e.target.value)}
                            className="flex-1 bg-slate-100 text-black px-3 py-2 rounded-lg"
                          />
                          <button onClick={() => editarItemLista(tipo, item.id, editandoValor)} className="text-green-500 hover:text-green-600">
                            <Save size={20} />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 text-sm md:text-base font-medium">{item.nombre}</span>
                          <button onClick={() => {
                            setEditandoId(item.id);
                            setEditandoValor(item.nombre);
                          }} className="text-blue-400 hover:text-blue-500">
                            <Pencil size={20} />
                          </button>
                          <button onClick={() => eliminarItemLista(tipo, item.id)} className="text-red-400 hover:text-red-500">
                            <Trash2 size={20} />
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nuevo}
                    onChange={(e) => setNuevo(e.target.value)}
                    placeholder={`Nueva ${tipo}`}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-100 text-black"
                  />
                  <button
                    onClick={() => agregarItemLista(tipo)}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB USUARIOS */}
        {tab === "usuarios" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Usuarios Registrados</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-white">
                Total de usuarios: <span className="font-semibold text-blue-400">{usuarios.length}</span>
              </p>
              <input
                type="text"
                placeholder="Buscar por email..."
                value={filtroEmail}
                onChange={(e) => setFiltroEmail(e.target.value)}
                className="p-2 rounded bg-slate-100 text-black w-64"
              />
            </div>

            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-slate-800 text-white rounded-md">
                <thead>
                  <tr className="text-left border-b border-slate-700">
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">UID</th>
                    <th className="p-2">Fecha de registro</th>
                    <th className="p-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-400">
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  ) : (
                    usuariosFiltrados.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-slate-700 transition">
                        <td className="p-2">{usuario.nombre || "—"}</td>
                        <td className="p-2">{usuario.email || "—"}</td>
                        <td className="p-2">{usuario.uid || "—"}</td>
                        <td className="p-2">{usuario.fechaRegistro || "—"}</td>
                        <td className="p-2 text-center space-x-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${usuario.isAdmin ? "bg-green-600" : "bg-gray-500"
                              }`}
                          >
                            {usuario.isAdmin ? "Sí" : "No"}
                          </span>
                          <button
                            onClick={() => cambiarRol(usuario)}
                            className={`text-sm font-semibold ${usuario.isAdmin ? "text-yellow-400 hover:text-yellow-300" : "text-blue-400 hover:text-blue-300"
                              }`}
                          >
                            {usuario.isAdmin ? "Quitar admin" : "Hacer admin"}
                          </button>
                          {usuario.uid !== auth.currentUser.uid && (
                            <button
                              onClick={() => eliminarUsuario(usuario.id)}
                              className="ml-2 text-red-400 hover:text-red-500 transition"
                            >
                              <Trash2 size={20} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
