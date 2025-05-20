
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function NuevoProfesional() {
  const [form, setForm] = useState({
    nombre: "",
    especialidad: "",
    ciudad: "",
    avatar: "",
    rating: 5,
    disponible: "24hs",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const validar = () => {
    let nuevosErrores = {};
    if (!form.nombre) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.especialidad) nuevosErrores.especialidad = "Requerido.";
    if (!form.ciudad) nuevosErrores.ciudad = "Requerido.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    toast.info("Guardando profesional...", { icon: "🛠️", autoClose: 1500 });
    setSubiendo(true);
    try {
      let avatarURL = "";

      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${Date.now()}-${avatarFile.name}`);
        await uploadBytes(storageRef, avatarFile);
        avatarURL = await getDownloadURL(storageRef);
      }

      const nuevo = {
        ...form,
        avatar: avatarURL || form.avatar,
      };

      await addDoc(collection(db, "profesionales"), nuevo);
      toast.success("¡Agregado con éxito!", { icon: "✅", autoClose: 2000 });

      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-xl bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">
          Agregar Profesional
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Nombre completo</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-xl bg-slate-900 text-white border ${
                errores.nombre ? "border-red-500" : "border-slate-600"
              } focus:outline-none`}
              placeholder="Ej: Facundo Pérez"
            />
            {errores.nombre && <p className="text-red-400 text-sm">{errores.nombre}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Especialidad</label>
            <select
              name="especialidad"
              value={form.especialidad}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-xl bg-slate-900 text-white border ${
                errores.especialidad ? "border-red-500" : "border-slate-600"
              }`}
            >
              <option value="">Seleccioná una opción</option>
              <option value="Electricista">Electricista</option>
              <option value="Plomero">Plomero</option>
              <option value="Cerrajero">Cerrajero</option>
              <option value="Niñera">Niñera</option>
              <option value="Arquitecta">Arquitecta</option>
            </select>
            {errores.especialidad && <p className="text-red-400 text-sm">{errores.especialidad}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Ciudad</label>
            <select
              name="ciudad"
              value={form.ciudad}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-xl bg-slate-900 text-white border ${
                errores.ciudad ? "border-red-500" : "border-slate-600"
              }`}
            >
              <option value="">Seleccioná una ciudad</option>
              <option value="San Nicolas de los Arroyos">San Nicolás</option>
              <option value="Ramallo">Ramallo</option>
            </select>
            {errores.ciudad && <p className="text-red-400 text-sm">{errores.ciudad}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Avatar (imagen o URL)</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="text-white"
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover border border-slate-600" />
            )}
            <p className="text-sm text-slate-400 mt-1">Si no subís imagen, podés ingresar una URL:</p>
            <input
              type="text"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 rounded-xl bg-slate-900 text-white border border-slate-600"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Rating</label>
              <input
                type="number"
                name="rating"
                min={1}
                max={5}
                value={form.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-900 text-white border border-slate-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Disponibilidad</label>
              <input
                name="disponible"
                value={form.disponible}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-900 text-white border border-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={subiendo}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-3 px-4 rounded-xl font-semibold shadow-md"
          >
            {subiendo ? "Guardando..." : "Agregar profesional"}
          </button>
        </form>
      </div>
    </div>
  );
}
