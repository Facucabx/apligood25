import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    fondo: "/images/fondo-profesionales.webp",
    texto: "Conectá con profesionales de confianza cerca tuyo",
    boton: "Explorá profesionales",
    ruta: "/profesionales",
  },
  {
    fondo: "/images/fondo-reservas.webp",
    texto: "Reservá turnos de forma rápida y segura",
    boton: "Reservá ahora",
    ruta: "/reservas",
  },
  {
    fondo: "/images/fondo-objetos.webp",
    texto: "Reportá objetos perdidos o encontrados fácilmente",
    boton: "Ver objetos",
    ruta: "/objetos",
  },
  {
    fondo: "/images/fondo-sugerencias.webp",
    texto: "Sugerí ideas para mejorar tu comunidad",
    boton: "Dejá tu sugerencia",
    ruta: "/sugerencias",
  },
];

export default function BannerDinamico({ onNavigate }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const bannerActual = banners[index];

  return (
    <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-2xl shadow-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={bannerActual.fondo}
          src={bannerActual.fondo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          alt="Banner dinámico"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => (e.target.style.display = "none")}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md rounded-2xl" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-lg md:text-2xl font-bold drop-shadow-lg">
          {bannerActual.texto}
        </h1>
        <button
          onClick={() => onNavigate(bannerActual.ruta)}
          className="mt-3 bg-white text-slate-900 font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 transition"
        >
          {bannerActual.boton}
        </button>
      </div>
    </div>
  );
}
