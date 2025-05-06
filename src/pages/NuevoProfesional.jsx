import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";

export default function NuevoProfesional() {
  const [form, setForm] = useState({
    nombre: "",
    especialidad: "",
    ciudad: "",
    avatar: "",
    rating: 5,
    disponible: "24hs",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "profesionales"), form);
      setMensaje("✅ Profesional agregado con éxito");
      setForm({
        nombre: "",
        especialidad: "",
        ciudad: "",
        avatar: "",
        rating: 5,
        disponible: "24hs",
      });
    } catch (error) {
      console.error("Error al agregar:", error);
      setMensaje("❌ Hubo un error. Revisá la consola.");
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Agregar Profesional</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["nombre", "especialidad", "ciudad", "avatar", "rating", "disponible"].map((campo) => (
          <input
            key={campo}
            type="text"
            name={campo}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={form[campo]}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm text-black"

          />
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar
        </button>

        {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
      </form>

      <BottomNav />
    </Layout>
  );
}
