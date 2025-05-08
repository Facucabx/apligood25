import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import Saludo from "../components/Saludo";
import { useState, useEffect } from "react";
import { FaUserTie, FaCalendarAlt, FaSearch, FaLightbulb } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();

  const mensajes = [
    {
      texto: "Encontrá profesionales de confianza cerca tuyo",
      boton: "Explorá profesionales",
      ruta: "/profesionales",
      fondo: "/images/fondo-profesionales.webp",
      color: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      texto: "Reservá turnos de forma rápida y segura",
      boton: "Reservá ahora",
      ruta: "/reservas",
      fondo: "/images/fondo-reservas.webp",
      color: "bg-purple-600 text-white hover:bg-purple-700",
    },
    {
      texto: "Reportá objetos perdidos y encontrados",
      boton: "Ver objetos",
      ruta: "/objetos",
      fondo: "/images/fondo-objetos.webp",
      color: "bg-teal-600 text-white hover:bg-teal-700",
    },
    {
      texto: "Sugerí mejoras para tu comunidad",
      boton: "Dejá tu sugerencia",
      ruta: "/sugerencias",
      fondo: "/images/fondo-sugerencias.webp",
      color: "bg-yellow-400 text-black hover:bg-yellow-300",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <Layout>
      <Toaster position="top-center" />
      <div className="flex flex-col min-h-screen pb-20">
        <main className="flex-1">
          <Saludo nombre="Facu" />

          {/* Banner UX/UI elegante */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mensajes[index].fondo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-52 md:h-64 overflow-hidden rounded-xl shadow-lg mx-auto mt-4"
            >
              <img
                src={mensajes[index].fondo}
                alt="Fondo dinámico"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
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
                  className={`mt-3 font-bold py-1.5 px-6 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2 ${mensajes[index].color}`}
                >
                  <FaLightbulb />
                  {mensajes[index].boton}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Tarjetas de navegación */}
          <div className="w-full max-w-md mx-auto px-4 py-6 space-y-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-4 flex items-center gap-4 shadow-md transition"
              onClick={() => navigate("/profesionales")}
            >
              <FaUserTie className="text-3xl" />
              <div className="text-left">
                <h3 className="font-bold text-lg">Profesionales</h3>
                <p className="text-sm text-white/80">Expertos locales verificados</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl p-4 flex items-center gap-4 shadow-md transition"
              onClick={() => navigate("/reservas")}
            >
              <FaCalendarAlt className="text-3xl" />
              <div className="text-left">
                <h3 className="font-bold text-lg">Reservas</h3>
                <p className="text-sm text-white/80">Turnos, eventos y más</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-xl p-4 flex items-center gap-4 shadow-md transition"
              onClick={() => navigate("/objetos")}
            >
              <FaSearch className="text-3xl" />
              <div className="text-left">
                <h3 className="font-bold text-lg">Objetos perdidos</h3>
                <p className="text-sm text-white/80">Publicá o encontrá lo que se perdió</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-xl p-4 flex items-center gap-4 shadow-md transition"
              onClick={() => navigate("/sugerencias")}
            >
              <FaLightbulb className="text-3xl" />
              <div className="text-left">
                <h3 className="font-bold text-lg">Sugerencias</h3>
                <p className="text-sm">Ayudanos a mejorar tu ciudad</p>
              </div>
            </motion.button>
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
