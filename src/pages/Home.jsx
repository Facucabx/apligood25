import Saludo from "../components/Saludo";
import BannerDinamico from "../components/BannerDinamico";
import BotonColorido from "../components/BotonColorido";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaSearch, FaLightbulb } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-backgroundLight dark:bg-backgroundDark text-gray-900 dark:text-white">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4">
        {/* Saludo potente */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-8 text-center">
          Buen día, Facu <span className="animate-wave">👋</span>
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-1">
          ¿En qué te puedo ayudar hoy?
        </p>

        {/* Banner dinámico con blur pro */}
        <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-xl shadow-xl mx-auto mt-8">
          <BannerDinamico />
        </div>

        {/* Separador visual */}
        <div className="border-t border-slate-300 dark:border-slate-700 mt-12 mb-6 w-full max-w-md mx-auto" />

        {/* Tarjetas de acción mejoradas */}
        <div className="space-y-6 max-w-md mx-auto">
          <BotonColorido
            bgColor="bg-gradient-to-r from-blue-500 to-indigo-500"
            icono={<FaUser />}
            titulo="Explorá profesionales"
            descripcion="Conectá con profesionales de confianza cerca tuyo"
            onClick={() => navigate("/profesionales")}
          />

          <BotonColorido
            bgColor="bg-gradient-to-r from-purple-500 to-pink-500"
            icono={<FaCalendarAlt />}
            titulo="Reservá ahora"
            descripcion="Reservá turnos de forma rápida y segura"
            onClick={() => navigate("/reservas")}
          />

          <BotonColorido
            bgColor="bg-gradient-to-r from-emerald-500 to-teal-500"
            icono={<FaSearch />}
            titulo="Ver objetos"
            descripcion="Reportá objetos perdidos o encontrados fácilmente"
            onClick={() => navigate("/objetos")}
          />

          <BotonColorido
            bgColor="bg-gradient-to-r from-yellow-400 to-yellow-500"
            icono={<FaLightbulb />}
            titulo="Dejá tu sugerencia"
            descripcion="Sugerí ideas para mejorar tu comunidad"
            onClick={() => navigate("/sugerencias")}
          />
        </div>
      </main>

      {/* Footer pro */}
      <footer className="text-center text-sm text-slate-400 px-6 mb-4 mt-12">
        Hecho con <span className="animate-pulse text-red-500">❤️</span> por Facu para revolucionar la vida urbana.
        <p className="mt-1">Versión beta – Seguimos mejorando día a día</p>
      </footer>
    </div>
  );
}
