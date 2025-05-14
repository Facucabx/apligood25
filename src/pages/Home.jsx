import { useNavigate } from "react-router-dom";
import BannerDinamico from "../components/BannerDinamico";
import BotonColorido from "../components/BotonColorido";
import { FaUserTie, FaCalendarAlt, FaSearch, FaLightbulb } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <main className="flex-1 w-full max-w-4xl mx-auto pt-6 px-4">
        {/* Saludo adaptativo modo PRO */}
        <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold text-center">
          Buen día, Facu 👋
        </h1>
        <p className="text-slate-700 dark:text-slate-300 text-sm text-center mt-1">
          ¿Qué te gustaría hacer hoy para mejorar tu comunidad?
        </p>

        {/* Banner dinámico */}
        <div className="mt-8">
          <BannerDinamico />
        </div>

        {/* Acciones rápidas */}
        <div className="mt-10 space-y-4">
          <BotonColorido
            bgColor="bg-gradient-to-r from-blue-500 to-blue-700"
            icono={<FaUserTie />}
            titulo="Conectá"
            descripcion="Profesionales cerca tuyo"
            onClick={() => navigate("/profesionales")}
          />
          <BotonColorido
            bgColor="bg-gradient-to-r from-pink-500 to-purple-500"
            icono={<FaCalendarAlt />}
            titulo="Reservá"
            descripcion="Tus turnos seguros"
            onClick={() => navigate("/reservas")}
          />
          <BotonColorido
            bgColor="bg-gradient-to-r from-emerald-500 to-teal-600"
            icono={<FaSearch />}
            titulo="Explorá objetos"
            descripcion="Encontrá o reportá objetos"
            onClick={() => navigate("/objetos")}
          />
          <BotonColorido
            bgColor="bg-gradient-to-r from-yellow-400 to-yellow-500"
            icono={<FaLightbulb />}
            titulo="Dejá ideas"
            descripcion="Sugerencias para mejorar tu comunidad"
            onClick={() => navigate("/sugerencias")}
          />
        </div>
      </main>
    </div>
  );
}
