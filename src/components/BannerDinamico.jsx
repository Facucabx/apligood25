import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const mensajes = [
  {
    texto: "Conectá con profesionales de confianza cerca tuyo",
    boton: "Explorá profesionales",
    ruta: "/profesionales",
    fondo: "/images/fondo-profesionales.webp",
    colorBoton: "bg-blue-600 hover:bg-blue-700",
  },
  {
    texto: "Reservá turnos de forma rápida y segura",
    boton: "Reservá ahora",
    ruta: "/reservas",
    fondo: "/images/fondo-reservas.webp",
    colorBoton: "bg-purple-600 hover:bg-purple-700",
  },
  {
    texto: "Reportá objetos perdidos o encontrados fácilmente",
    boton: "Ver objetos",
    ruta: "/objetos",
    fondo: "/images/fondo-objetos.webp",
    colorBoton: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    texto: "Sugerí ideas para mejorar tu comunidad",
    boton: "Dejá tu sugerencia",
    ruta: "/sugerencias",
    fondo: "/images/fondo-sugerencias.webp",
    colorBoton: "bg-yellow-400 hover:bg-yellow-300 text-black",
  },
];

export default function BannerDinamico() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={mensajes[index].fondo}
          src={mensajes[index].fondo}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          alt="Fondo dinámico"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl transition-all duration-700"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 animate-fade-in">
        <h2 className="text-white text-2xl md:text-3xl font-extrabold drop-shadow-xl mb-2">
          {mensajes[index].texto}
        </h2>
        <p className="text-white/80 text-sm mb-4">
          ¡Unite a la comunidad Apligood hoy mismo!
        </p>
        <button
          onClick={() => {
            toast.success("Redirigiendo...");
            setTimeout(() => navigate(mensajes[index].ruta), 1000);
          }}
          className={`px-6 py-2 font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 ${mensajes[index].colorBoton}`}
        >
          {mensajes[index].boton}
        </button>
      </div>
    </div>
  );
}
