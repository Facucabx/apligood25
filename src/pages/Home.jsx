import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Imagen con fondo y overlay */}
      <div className="relative w-full h-52 md:h-64 overflow-hidden rounded-xl shadow-md mx-auto mt-4">
        <img
          src="/images/home-hero.jpg"
          alt="Ciudad conectada"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 w-full max-w-md mx-auto px-4 py-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => navigate("/profesionales")}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-4 flex items-center gap-4 shadow-md hover:scale-[1.02] transition"
          >
            <span className="text-3xl">👨‍🔧</span>
            <div className="text-left">
              <h3 className="font-bold text-lg">Profesionales</h3>
              <p className="text-sm">Expertos locales verificados</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/reservas")}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl p-4 flex items-center gap-4 shadow-md hover:scale-[1.02] transition"
          >
            <span className="text-3xl">📅</span>
            <div className="text-left">
              <h3 className="font-bold text-lg">Reservas</h3>
              <p className="text-sm">Turnos, eventos y más</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/objetos")}
            className="bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-xl p-4 flex items-center gap-4 shadow-md hover:scale-[1.02] transition"
          >
            <span className="text-3xl">🔎</span>
            <div className="text-left">
              <h3 className="font-bold text-lg">Objetos perdidos</h3>
              <p className="text-sm">Publicá o encontrá lo que se perdió</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/sugerencias")}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-4 flex items-center gap-4 shadow-md hover:scale-[1.02] transition"
          >
            <span className="text-3xl">💡</span>
            <div className="text-left">
              <h3 className="font-bold text-lg">Sugerencias</h3>
              <p className="text-sm">Ayudanos a mejorar tu ciudad</p>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-8 px-6 mb-16">
        <p>Hecho con ❤️ por Facu para revolucionar la vida urbana.</p>
        <p className="mt-1">Versión beta – Seguimos mejorando día a día</p>
      </div>

      {/* Barra de navegación */}
      <BottomNav />
    </Layout>
  );
}
