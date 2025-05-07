import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

export default function AdminProfesionales() {
  const [profesionales, setProfesionales] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    especialidad: "",
    ciudad: "",
    disponible: "",
    avatar: "",
    rating: 0,
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filtroCiudad, setFiltroCiudad] = useState("Todas");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("Todas");

  const profesionalesRef = collection(db, "profesionales");

  const cargarProfesionales = async () => {
    const snapshot = await getDocs(profesionalesRef);
    const datos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProfesionales(datos);
    setFiltrados(datos);
  };

  useEffect(() => {
    cargarProfesionales();
  }, []);

  useEffect(() => {
    let resultado = profesionales;

    if (search.trim() !== "") {
      resultado = resultado.filter((p) => p.nombre.toLowerCase().includes(search.toLowerCase()));
    }
    if (filtroCiudad !== "Todas") {
      resultado = resultado.filter((p) => p.ciudad === filtroCiudad);
    }
    if (filtroEspecialidad !== "Todas") {
      resultado = resultado.filter((p) => p.especialidad === filtroEspecialidad);
    }

    setFiltrados(resultado);
  }, [search, filtroCiudad, filtroEspecialidad, profesionales]);

  const abrirModal = (prof = null) => {
    if (prof) {
      setFormData(prof);
      setEditId(prof.id);
    } else {
      setFormData({
        nombre: "",
        especialidad: "",
        ciudad: "",
        disponible: "",
        avatar: "",
        rating: 0,
      });
      setEditId(null);
    }
    setModalOpen(true);
  };

  const guardarProfesional = async () => {
    const { nombre, especialidad, ciudad, disponible, avatar } = formData;

    if (!nombre || !especialidad || !ciudad || !disponible || !avatar) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      if (editId) {
        const ref = doc(db, "profesionales", editId);
        await updateDoc(ref, formData);
        toast.success("Profesional actualizado");
      } else {
        await addDoc(profesionalesRef, formData);
        toast.success("Profesional agregado");
      }
      setModalOpen(false);
      cargarProfesionales();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al guardar");
    }
  };

  const eliminarProfesional = async (id) => {
    if (confirm("¿Estás seguro que querés eliminar este profesional?")) {
      await deleteDoc(doc(db, "profesionales", id));
      toast.info("Profesional eliminado");
      cargarProfesionales();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const subirImagen = async (file) => {
    setSubiendo(true);
    const storage = getStorage();
    const ruta = `avatars/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, ruta);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, avatar: url }));
      toast.success("✅ Imagen subida");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al subir imagen");
    } finally {
      setSubiendo(false);
    }
  };

  const ciudades = [...new Set(profesionales.map((p) => p.ciudad))];
  const especialidades = [...new Set(profesionales.map((p) => p.especialidad))];

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      {/* Filtros */}
      <div className="bg-gray-800 p-4 rounded-md mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded mr-2 text-black"
        />

        <select
          value={filtroCiudad}
          onChange={(e) => setFiltroCiudad(e.target.value)}
          className="p-2 rounded mr-2 text-black"
        >
          <option value="Todas">📍 Ciudad: Todas</option>
          {ciudades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={filtroEspecialidad}
          onChange={(e) => setFiltroEspecialidad(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="Todas">🛠️ Especialidad: Todas</option>
          {especialidades.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => abrirModal()}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Agregar nuevo profesional
      </button>

      {/* Lista */}
      <div className="space-y-4">
        {filtrados.map((p) => (
          <div key={p.id} className="flex items-center p-4 rounded bg-gray-800 shadow gap-4">
            <img
              src={p.avatar || "https://via.placeholder.com/64?text=👤"}
              alt={p.nombre}
              className="w-16 h-16 rounded-full object-cover border border-white"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-400">{p.nombre}</h3>
              <p>
                {p.especialidad} – {p.ciudad}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => abrirModal(p)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarProfesional(p.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{editId ? "Editar" : "Nuevo"} Profesional</h3>
            <div className="space-y-2">
              {["nombre", "especialidad", "ciudad"].map((f) => (
                <input
                  key={f}
                  name={f}
                  value={formData[f]}
                  onChange={handleChange}
                  placeholder={f}
                  className="w-full p-2 border rounded"
                />
              ))}

              <select
                name="disponible"
                value={formData.disponible}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">⏰ Disponibilidad</option>
                <option value="24hs">24hs</option>
                <option value="Horario comercial">Horario comercial</option>
                <option value="Fines de semana">Fines de semana</option>
              </select>

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full p-2 border rounded"
                placeholder="rating"
              />

              {/* Imagen: ver o cambiar */}
              {formData.avatar && (
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Imagen actual</p>
                  <img
                    src={formData.avatar}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-full border mx-auto"
                  />
                  <label className="block mt-2 text-sm font-medium">
                    Cambiar imagen:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) subirImagen(file);
                      }}
                      className="w-full mt-1 p-1 border rounded"
                    />
                  </label>
                </div>
              )}

              {!formData.avatar && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) subirImagen(file);
                  }}
                  className="w-full p-2 border rounded"
                />
              )}

              {subiendo && (
                <p className="text-sm text-gray-500 text-center mt-2">Subiendo imagen...</p>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 border rounded">
                Cancelar
              </button>
              <button
                onClick={guardarProfesional}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
