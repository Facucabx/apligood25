import { useParams } from "react-router-dom";
import { useState } from "react";
import BottomNav from "../components/BottomNav";

import MensajesTab from "../components/tabs/MensajesTab";
import InformacionTab from "../components/tabs/InformacionTab";
import ResenasTab from "../components/tabs/ResenasTab";
import ContratarTab from "../components/tabs/ContratarTab";

const profesionales = {
  "juan-gomez": {
    nombre: "Juan Gomez",
    profesion: "Cerrajero",
    rating: 5,
    disponibilidad: "24hs",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
    resenas: {
      positivas: [
        {
          autor: "Roberto Díaz",
          texto: "Recomendable, cumplió con todo el trabajo que solicité.",
        },
        {
          autor: "Camila Sanz",
          texto: "Excelente, muy prolijo y amable.",
        },
      ],
      negativas: [],
    },
  },
};

export default function PerfilProfesional() {
  const { id } = useParams();
  const profesional = profesionales[id];

  const [tab, setTab] = useState("mensajes");
  const [subTab, setSubTab] = useState("positivas");

  if (!profesional)
    return <div className="p-4 text-center">Profesional no encontrado.</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white text-center py-4 font-bold text-lg shadow-md">
        Reseñas
      </div>

      {/* Contenido centrado y limitado */}
      <div className="max-w-md mx-auto px-4 py-4">
        {/* Perfil */}
        <div className="flex items-center gap-4 bg-blue-100 p-4 rounded-lg shadow-sm mb-4">
          <img
            src={profesional.foto}
            alt={profesional.nombre}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-sm text-gray-600">{profesional.profesion}</p>
            <p className="font-bold text-blue-800">{profesional.nombre}</p>
            <p className="text-sm text-yellow-600">
              ⭐ {profesional.rating} • {profesional.disponibilidad}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between text-sm border-b border-gray-300 mb-4">
          {["mensajes", "informacion", "reseñas", "contratar"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`py-2 px-2 w-full text-center ${
                tab === item
                  ? "font-bold text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Contenido según la pestaña activa */}
        {tab === "mensajes" && <MensajesTab />}
        {tab === "informacion" && <InformacionTab />}
        {tab === "reseñas" && (
          <ResenasTab
            profesional={profesional}
            subTab={subTab}
            setSubTab={setSubTab}
          />
        )}
        {tab === "contratar" && <ContratarTab />}
      </div>

      <BottomNav />
    </div>
  );
}
