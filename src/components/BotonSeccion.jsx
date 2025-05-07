export default function BotonSeccion({ icono, titulo, descripcion, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={`w-full ${color} rounded-xl p-4 flex items-center gap-4 shadow-md hover:scale-[1.03] transition`}
    >
      {icono}
      <div className="text-left">
        <h3 className="font-bold text-lg">{titulo}</h3>
        <p className="text-sm text-white/80">{descripcion}</p>
      </div>
    </button>
  );
}
