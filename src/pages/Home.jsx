import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  const mensajes = [
    {
      texto: "Encontrá profesionales de confianza cerca tuyo",
      boton: "Explorá profesionales",
      ruta: "/profesionales",
      fondo: "/images/fondo-profesionales.webp"
    },
    {
      texto: "Reservá turnos de forma rápida y segura",
      boton: "Reservá ahora",
      ruta: "/reservas",
      fondo: "/images/fondo-reservas.webp"
    },
    {
      texto: "Reportá objetos perdidos y encontrados",
      boton: "Ver objetos",
      ruta: "/objetos",
      fondo: "/images/fondo-objetos.webp"
    },
    {
      texto: "Sugerí mejoras para tu comunidad",
      boton: "Dejá tu sugerencia",
      ruta: "/sugerencias",
      fondo: "/images/fondo-sugerencias.webp"
    }
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % mensajes.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <Layout>
      {/* Banner dinámico PRO */}
      <div className="relative w-full h-52 md:h-64 overflow-hidden rounded-xl shadow-md mx-auto mt-4">
        <img
          key={mensajes[index].fondo}
          src={mensajes[index].fondo}
          alt="Fondo dinámico"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradiente suave para contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Contenido */}
        <div className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-4 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-white text-lg md:text-2xl font-bold drop-shadow-md">
            {mensajes[index].texto}
          </h1>
          <p className="text-white text-sm mt-1 drop-shadow-sm">
            ¡Unite a la comunidad Apligood hoy mismo!
          </p>
          <button
            onClick={() => navigate(mensajes[index].ruta)}
            className="mt-3 bg-white/90 text-blue-700 font-semibold py-1 px-4 rounded-full text-sm shadow hover:bg-white transition"
          >
            {mensajes[index].boton}
          </button>
        </div>
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
