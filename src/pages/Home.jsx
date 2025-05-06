import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Encabezado */}
      <div className="text-center my-6">
        <h1 className="text-2xl font-bold text-blue-700">Bienvenido a Apligood 🚀</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
          Tu app ciudadana para conectar con lo que necesitás, cuando lo necesitás.
        </p>
      </div>

      {/* Acciones destacadas */}
      <div className="space-y-4 px-4">
        <button
          onClick={() => navigate("/profesionales")}
          className="w-full flex items-center gap-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-4 rounded-xl shadow hover:scale-[1.02] transition"
        >
          <span className="text-3xl">👨‍🔧</span>
          <div className="text-left">
            <h2 className="font-bold text-lg">Profesionales</h2>
            <p className="text-sm">Encontrá a los expertos de tu ciudad.</p>
          </div>
        </button>

        <button
          onClick={() => navigate("/reservas")}
          className="w-full flex items-center gap-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-4 rounded-xl shadow hover:scale-[1.02] transition"
        >
          <span className="text-3xl">📅</span>
          <div className="text-left">
            <h2 className="font-bold text-lg">Reservas</h2>
            <p className="text-sm">Estacionamiento, restaurantes y más.</p>
          </div>
        </button>

        <button
          onClick={() => navigate("/objetos")}
          className="w-full flex items-center gap-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-4 py-4 rounded-xl shadow hover:scale-[1.02] transition"
        >
          <span className="text-3xl">🔎</span>
          <div className="text-left">
            <h2 className="font-bold text-lg">Objetos perdidos</h2>
            <p className="text-sm">Publicá o encontrá lo que se perdió.</p>
          </div>
        </button>

        <button
          onClick={() => navigate("/sugerencias")}
          className="w-full flex items-center gap-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-4 rounded-xl shadow hover:scale-[1.02] transition"
        >
          <span className="text-3xl">💡</span>
          <div className="text-left">
            <h2 className="font-bold text-lg">Sugerencias</h2>
            <p className="text-sm">Contanos cómo mejorar la ciudad y la app.</p>
          </div>
        </button>
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
