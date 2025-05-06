export default function ResenasTab({ profesional, subTab, setSubTab }) {
  const resenas = profesional.resenas[subTab] || [];

  return (
    <div>
      <div className="flex justify-around mb-2">
        <button
          className={subTab === "positivas" ? "text-green-600 font-bold border-b-2 border-green-600" : "text-gray-500"}
          onClick={() => setSubTab("positivas")}
        >
          Positivas
        </button>
        <button
          className={subTab === "negativas" ? "text-red-600 font-bold border-b-2 border-red-600" : "text-gray-500"}
          onClick={() => setSubTab("negativas")}
        >
          Negativas
        </button>
      </div>

      {resenas.length === 0 ? (
        <p className="text-center text-gray-400">No hay reseñas {subTab} aún.</p>
      ) : (
        <div className="space-y-2">
          {resenas.map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
              <p className="font-semibold text-sm text-green-800">
                {r.autor} {subTab === "positivas" && "✅"}
              </p>
              <p className="text-sm text-gray-800">"{r.texto}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
