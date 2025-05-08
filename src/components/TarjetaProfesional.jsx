import React from "react";
import { FaStar } from "react-icons/fa";

export default function TarjetaProfesional({
  nombre = "María González",
  especialidad = "Peluquería",
  ciudad = "San Nicolás",
  rating = 4.8,
  imagen = "/images/avatar-default.webp", // ruta local o URL
  onReservar = () => alert("Reservar turno")
}) {
  return (
    <div className="card w-full max-w-md mx-auto">
      {/* Imagen */}
      <div className="flex items-center gap-4">
        <img
          src={imagen}
          alt={`Avatar de ${nombre}`}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
        />
        <div>
          <h3 className="text-lg font-heading font-semibold text-gray-900">{nombre}</h3>
          <p className="text-sm text-gray-600">
            {especialidad} · {ciudad}
          </p>
        </div>
      </div>

      {/* Rating y botón */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={i < Math.floor(rating) ? "fill-current" : "fill-gray-300"} />
          ))}
          <span className="text-sm text-gray-700 ml-1">{rating.toFixed(1)}</span>
        </div>

        <button className="btn-primary text-sm px-4 py-1.5" onClick={onReservar}>
          Reservar
        </button>
      </div>
    </div>
  );
}
