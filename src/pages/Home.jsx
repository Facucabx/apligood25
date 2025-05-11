import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import Saludo from "../components/Saludo";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserTie, FaCalendarAlt, FaSearch, FaLightbulb } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const mensajes = [
    {
      texto: "Conectá con profesionales de confianza cerca tuyo",
      boton: "Explorá profesionales",
      ruta: "/profesionales",
      fondo: "/images/fondo-profesionales.webp",
      color: "bg-blue-600 text-white hover:bg-blue-700",
      icono: <FaUserTie />,
    },
    {
      texto: "Reservá turnos de forma rápida y segura",
      boton: "Reservá ahora",
      ruta: "/reservas",
      fondo: "/images/fondo-reservas.webp",
      color: "bg-purple-600 text-white hover:bg-purple-700",
      icono: <FaCalendarAlt />,
    },
    {
      texto: "Reportá objetos perdidos o encontrados fácilmente",
      boton: "Ver objetos",
      ruta: "/objetos",
      fondo: "/images/fondo-objetos.webp",
      color: "bg-teal-600 text-white hover:bg-teal-700",
      icono: <FaSearch />,
    },
    {
      texto: "Sugerí ideas para mejorar tu comunidad",
      boton: "Dejá tu sugerencia",
      ruta: "/sugerencias",
      fondo: "/images/fondo-sugerencias.webp",
      color: "bg-yellow-400 text-black hover:bg-yellow-300",
      icono: <FaLightbulb />,
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen pb-20">
        <main className="flex-1 w-full max-w-5xl mx-auto">

          <Saludo nombre="Facu" />

          {/* Banner dinámico */}
          <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-xl shadow-lg mx-auto mt-8">
            <AnimatePresence mode="wait">
              <motion.img
                key={mensajes[index].fondo}
                src={mensajes[index].fondo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                alt="Fondo dinámico"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white text-lg md:text-2xl font-bold drop-shadow-md">
                {mensajes[index].texto}
              </h1>
              <p className="text-white text-sm mt-1 drop-shadow-sm">
                ¡Unite a la comunidad Apligood hoy mismo!
              </p>
              <button
                onClick={() => {
                  toast.success("Redirigiendo...");
                  setTimeout(() => navigate(mensajes[index].ruta), 1000);
                }}
                className={`mt-3 font-bold py-2 px-6 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2 ${mensajes[index].color}`}
              >
                {mensajes[index].icono}
                {mensajes[index].boton}
              </button>
            </div>
          </div>

          {/* Separador visual */}
          <div className="border-t border-slate-800 mt-10 mb-4 w-full max-w-md mx-auto" />

          {/* Tarjetas de acceso directo */}
          <div className="w-full max-w-md mx-auto px-4 py-6 space-y-4">
            {mensajes.map((opcion, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                className={`w-full h-24 ${opcion.color} rounded-xl px-4 flex items-center gap-4 shadow-md hover:shadow-lg transition`}
                onClick={() => navigate(opcion.ruta)}
              >
                <div className="text-3xl drop-shadow-sm">{opcion.icono}</div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-white dark:text-black">
                    {opcion.boton}
                  </h3>
                  <p className="text-sm text-white/90 dark:text-black/90">
                    {opcion.texto}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </main>

        <footer className="text-center text-sm text-slate-400 px-6 mb-4">
          <p>
            Hecho con <span className="animate-pulse text-red-500">❤️</span> por Facu para
            revolucionar la vida urbana.
          </p>
          <p className="mt-1">Versión beta – Seguimos mejorando día a día</p>
        </footer>
      </div>

      <BottomNav />
    </Layout>
  );
}
