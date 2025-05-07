import { useState, useEffect } from "react";

const mensajes = [
  "Encontrá profesionales de confianza cerca tuyo",
  "Reservá turnos de forma rápida y segura",
  "Reportá objetos perdidos y encontrados",
  "Sugerí mejoras para tu comunidad"
];

export default function BannerDinamico() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-10 px-6 md:py-16 rounded-b-3xl shadow-xl overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/fondo-banner.jpg')" }}
      ></div>
      <h1 className="relative z-10 text-2xl md:text-4xl font-bold transition-opacity duration-500 ease-in-out">
        {mensajes[index]}
      </h1>
      <p className="relative z-10 mt-4 text-sm md:text-lg text-white/90">
        ¡Unite a la comunidad Apligood hoy mismo!
      </p>
    </div>
  );
}
