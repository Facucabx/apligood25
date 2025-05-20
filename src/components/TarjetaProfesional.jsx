
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function TarjetaProfesional({
  id,
  nombre,
  especialidad,
  ciudad,
  rating = 5,
  imagen,
  disponibilidad,
}) {
  const navigate = useNavigate();
  const ratingSeguro = Number(rating || 5);

  const disponibleAhora = () => {
    if (!disponibilidad || disponibilidad.length === 0) return false;

    const ahora = new Date();

    const convertirHora = (horaStr) => {
      const [h, m] = horaStr.split(":").map(Number);
      const d = new Date();
      d.setHours(h);
      d.setMinutes(m || 0);
      d.setSeconds(0);
      return d;
    };

    const rangos = Array.isArray(disponibilidad) ? disponibilidad : [disponibilidad];

    return rangos.some((rango) => {
      const [inicio, fin] = rango
        .toLowerCase()
        .replace("hs", "")
        .split("a")
        .map((h) => h.trim());
      try {
        const horaInicio = convertirHora(inicio);
        const horaFin = convertirHora(fin);
        return ahora >= horaInicio && ahora <= horaFin;
      } catch {
        return false;
      }
    });
  };

  return (
    <div
      onClick={() => navigate(`/profesionales/${id}`)}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-lg hover:ring-2 ring-blue-500 transition-all duration-300 cursor-pointer p-4 w-full max-w-md mx-auto"
    >
      <div className="flex items-center gap-4">
        <img
          src={imagen}
          alt={nombre}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            {nombre}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {especialidad} · {ciudad}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(ratingSeguro)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-slate-600"
                }`}
              />
            ))}
            <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">
              {ratingSeguro.toFixed(1)}
            </span>
          </div>

          {disponibilidad && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded w-fit ${
                disponibleAhora()
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              {(Array.isArray(disponibilidad)
                ? disponibilidad.join(" / ")
                : disponibilidad)}{" "}
              {disponibleAhora() ? "✓" : "✗"}
            </span>
          )}
        </div>

        <button
          type="button"
          className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profesionales/${id}`);
          }}
        >
          Ver perfil →
        </button>
      </div>
    </div>
  );
}
