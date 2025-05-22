import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaStar, FaCheckCircle, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function PerfilProfesional() {
  const { id } = useParams();
  const [profesional, setProfesional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("info");
  const [resenaTipo, setResenaTipo] = useState("positivas");

  useEffect(() => {
    const fetchProfesional = async () => {
      try {
        const docRef = doc(db, "profesionales", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfesional(docSnap.data());
        } else {
          console.warn("No se encontró el profesional con ID:", id);
        }
      } catch (error) {
        console.error("Error al obtener profesional:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfesional();
    }
  }, [id]);

  const ratingSeguro = Number(profesional?.rating || 5);

  const reseñasMock = {
    positivas: [
      {
        nombre: "Roberto Diaz",
        texto: "Recomendable, cumplió con todo el trabajo que solicité.",
      },
      {
        nombre: "Camila Sanz",
        texto: "Excelente, muy prolijo y amable.",
      },
    ],
    negativas: [
      {
        nombre: "Carlos Ruiz",
        texto: "Tardó más de lo prometido y no cumplió bien.",
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 dark:text-gray-300 mt-8">
        Cargando perfil...
      </div>
    );
  }

  if (!profesional) {
    return (
      <div className="text-center text-red-500 mt-8">
        No se encontró este profesional 😕
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 mb-4 border border-slate-300 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <img
            src={profesional.avatar || "/images/avatar-default.webp"}
            alt={profesional.nombre}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profesional.nombre}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{profesional.especialidad} · {profesional.ciudad}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(ratingSeguro) ? "" : "text-gray-300 dark:text-slate-600"} />
                ))}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{ratingSeguro.toFixed(1)}</span>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-green-800 dark:text-green-200">
                24hs
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-6 border-t pt-3">
          <button onClick={() => setTab("info")} className={tab === "info" ? "text-blue-600 font-semibold" : "text-gray-500"}>Información</button>
          <button onClick={() => setTab("resenas")} className={tab === "resenas" ? "text-blue-600 font-semibold" : "text-gray-500"}>Reseñas</button>
          <button onClick={() => setTab("contacto")} className={tab === "contacto" ? "text-blue-600 font-semibold" : "text-gray-500"}>Contratar</button>
        </div>
      </div>

      {tab === "info" && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 text-gray-700 dark:text-gray-300">
          <p>
            {profesional.descripcion
              ? profesional.descripcion
              : "Este profesional aún no escribió su bio, pero podés contactarlo desde aquí."}
          </p>
        </div>
      )}

      {tab === "resenas" && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 text-gray-700 dark:text-gray-300">
          <div className="flex justify-around mb-4">
            <button onClick={() => setResenaTipo("positivas")} className={resenaTipo === "positivas" ? "text-green-600 font-semibold" : "text-gray-500"}>Positivas</button>
            <button onClick={() => setResenaTipo("negativas")} className={resenaTipo === "negativas" ? "text-red-600 font-semibold" : "text-gray-500"}>Negativas</button>
          </div>
          <ul className="space-y-3">
            {reseñasMock[resenaTipo].map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="rounded-full bg-gray-200 dark:bg-slate-700 w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-white">
                  {r.nombre.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">
                    {r.nombre}{" "}
                    <span className={resenaTipo === "positivas" ? "text-green-500" : "text-red-500"}>
                      {resenaTipo === "positivas" ? <FaThumbsUp className="inline" /> : <FaThumbsDown className="inline" />}
                    </span>
                  </p>
                  <p className="text-sm">{r.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "contacto" && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 text-center">
          <a
            href={`https://wa.me/${profesional.telefono || ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition"
          >
            Escribir por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
