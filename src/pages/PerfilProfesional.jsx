import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import { FaStar } from "react-icons/fa";

export default function PerfilProfesional() {
  const { id } = useParams();
  const [profesional, setProfesional] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfesional = async () => {
      try {
        const docRef = doc(db, "profesionales", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfesional(docSnap.data());
        } else {
          console.error("No existe el profesional con id:", id);
        }
      } catch (error) {
        console.error("Error al traer perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfesional();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="p-6 text-center text-gray-500">Cargando perfil...</div>
        <BottomNav />
      </Layout>
    );
  }

  if (!profesional) {
    return (
      <Layout>
        <div className="p-6 text-center text-red-500">Profesional no encontrado 😢</div>
        <BottomNav />
      </Layout>
    );
  }

  const ratingSeguro = Number(profesional.rating || 5);

  return (
    <Layout>
      <div className="container py-6 max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 text-gray-800">
          <div className="flex flex-col items-center gap-4">
            <img
              src={profesional.avatar || "/images/avatar-default.webp"}
              alt={profesional.nombre}
              className="w-24 h-24 rounded-full border-4 border-primary-500 object-cover"
            />
            <h1 className="text-2xl font-bold font-heading">{profesional.nombre}</h1>
            <p className="text-sm text-gray-500">
              {profesional.especialidad} · {profesional.ciudad}
            </p>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < Math.floor(ratingSeguro) ? "fill-current" : "fill-gray-300"} />
              ))}
              <span className="text-sm text-gray-700 ml-1">{ratingSeguro.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
              {profesional.descripcion || "Este profesional aún no completó su biografía."}
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </Layout>
  );
}
