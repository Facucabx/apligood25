import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function ListaProfesionales() {
  const [profesionales, setProfesionales] = useState([]);

  const fetchProfesionales = async () => {
    const snapshot = await getDocs(collection(db, "profesionales"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProfesionales(data);
  };

  useEffect(() => {
    fetchProfesionales();
  }, []);

  const eliminarProfesional = async (id) => {
    await deleteDoc(doc(db, "profesionales", id));
    toast.info("Profesional eliminado");
    fetchProfesionales();
  };

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold mb-4">👥 Lista de Profesionales</h3>
      <ul className="space-y-4">
        {profesionales.map((p) => (
          <li
            key={p.id}
            className="bg-slate-800 p-4 rounded shadow-md flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div>
              <p className="font-semibold">{p.nombre}</p>
              <p className="text-sm text-slate-300">
                {p.especialidad} - {p.ciudad}
              </p>
            </div>
            <button
              onClick={() => eliminarProfesional(p.id)}
              className="text-red-400 hover:text-red-600 mt-2 md:mt-0"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
