import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import BannerDinamico from "../components/BannerDinamico";
import BotonColorido from "../components/BotonColorido";
import { AuthContext } from "../context/AuthContext";
import { FaUserTie, FaCalendarAlt, FaSearch, FaLightbulb, FaHandPaper } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const { user, isAdmin, isProfessional } = useContext(AuthContext); // <-- Accedemos a user info

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* 👋 Saludo adaptativo */}
        <h1 className="text-slate-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold text-center leading-tight tracking-tight">
          Buen día, {user?.nombre || "Facu"} 👋
        </h1>
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base text-center mt-1 mb-4">
          Tu ciudad, más simple. ¿Qué hacemos hoy?
        </p>

        {/* 🎞️ Banner dinámico */}
        <div className="mt-4 sm:mt-6">
          <BannerDinamico />
        </div>

        {/* ⚡ Acciones rápidas */}
        <div className="mt-8 sm:mt-10 flex flex-col gap-4">
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

        {/* 🧩 Solicitar ser profesional (solo si aún no lo es) */}
        {!isProfessional && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/solicitar-profesional")}
              className="inline-flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium transition"
            >
              <FaHandPaper className="mr-2" />
              ¿Querés ofrecer tus servicios?
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
