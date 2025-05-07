import { useState } from "react";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminAddProfesional() {
  const [profesional, setProfesional] = useState({
    nombre: "",
    especialidad: "",
    ciudad: "",
    imagen: ""
  });
  const [subiendo, setSubiendo] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setProfesional({ ...profesional, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setPreview(URL.createObjectURL(archivo));
      subirImagen(archivo);
    }
  };

  const subirImagen = async (archivo) => {
    setSubiendo(true);
    try {
      const storage = getStorage();
      const ruta = `profesionales/${Date.now()}-${archivo.name}`;
      const storageRef = ref(storage, ruta);
      await uploadBytes(storageRef, archivo);
      const url = await getDownloadURL(storageRef);
      setProfesional((prev) => ({ ...prev, imagen: url }));
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen.");
    } finally {
      setSubiendo(false);
    }
  };

  const handleGuardar = async () => {
    if (!profesional.nombre || !profesional.especialidad || !profesional.ciudad || !profesional.imagen) {
      return alert("Completa todos los campos incluyendo la imagen.");
    }

    try {
      const db = getFirestore();
      const refProfesionales = collection(db, "profesionales");
      await addDoc(refProfesionales, {
        ...profesional,
        creado: Timestamp.now()
      });
      alert("¡Profesional agregado con éxito!");
      setProfesional({ nombre: "", especialidad: "", ciudad: "", imagen: "" });
      setPreview(null);
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      alert("Error al guardar el profesional.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">Agregar Profesional</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={profesional.nombre}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="especialidad"
        placeholder="Especialidad"
        value={profesional.especialidad}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="ciudad"
        placeholder="Ciudad"
        value={profesional.ciudad}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-md mx-auto" />
      )}

      <button
        onClick={handleGuardar}
        disabled={subiendo}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {subiendo ? "Subiendo imagen..." : "Guardar Profesional"}
      </button>
    </div>
  );
}
