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
}) {
  const navigate = useNavigate();
  const ratingSeguro = Number(rating || 5);

  return (
    <div
      onClick={() => navigate(`/profesionales/${id}`)}
      className="card cursor-pointer hover:ring-2 ring-primary-500 transition-all"
    >
      <div className="flex items-center gap-4">
        <img
          src={imagen}
          alt={nombre}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{nombre}</h3>
          <p className="text-sm text-gray-500">{especialidad} · {ciudad}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={i < Math.floor(ratingSeguro) ? "fill-current" : "fill-gray-300"} />
          ))}
          <span className="text-sm text-gray-700 ml-1">{ratingSeguro.toFixed(1)}</span>
        </div>
        <span className="text-primary-600 text-sm font-semibold hover:underline">
          Ver perfil →
        </span>
      </div>
    </div>
  );
}
