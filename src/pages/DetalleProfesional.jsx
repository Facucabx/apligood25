import { useParams } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const profesionales = [
  {
    id: "juan-gomez",
    nombre: "Juan Gomez",
    profesion: "Cerrajero",
    rating: 5,
    disponible: "24hs",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    positivas: [
      { autor: "Roberto Díaz", texto: "Recomendable, cumplió con todo el trabajo que solicité." },
      { autor: "Camila Sanz", texto: "Excelente, muy prolijo y amable." },
    ],
    negativas: [],
  },
  // Podés agregar más profesionales acá...
];

export default function DetalleProfesional() {
  const { id } = useParams();
  const profesional = profesionales.find((p) => p.id === id);

  if (!profesional) {
    return <p className="text-center mt-10">Profesional no encontrado</p>;
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="bg-blue-600 text-white text-center py-4 font-bold text-lg shadow-md">
        Reseñas
      </header>

      <div className="max-w-md mx-auto p-4">
        {/* Profesional */}
        <div className="flex items-center gap-4 bg-blue-100 rounded-lg p-4 mb-4 shadow">
          <img src={profesional.avatar} alt={profesional.nombre} className="w-12 h-12 rounded-full" />
          <div>
            <p className="text-xs text-gray-600">{profesional.profesion}</p>
            <h3 className="text-md font-bold text-blue-700">{profesional.nombre}</h3>
            <div className="text-xs text-gray-500 flex gap-2">
              <span>⭐ {profesional.rating}</span>
              <span className="text-green-600 font-semibold">{profesional.disponible}</span>
            </div>
          </div>
        </div>

        {/* Tabs (simples para ahora) */}
        <div className="flex justify-around text-sm font-semibold mb-2">
          <span className="text-green-600 border-b-2 border-green-600 pb-1">Positivas</span>
          <span className="text-gray-400">Negativas</span>
        </div>

        {/* Reseñas */}
        {profesional.positivas.map((r, i) => (
          <div key={i} className="mb-3 p-3 border rounded-lg shadow-sm bg-gray-50">
            <p className="text-sm font-semibold text-green-700">{r.autor} ✅</p>
            <p className="text-sm text-gray-700 mt-1">"{r.texto}"</p>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
