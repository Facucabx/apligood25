import BottomNav from "../components/BottomNav";

export default function Objetos() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="bg-blue-600 text-white text-center py-4 font-bold text-lg shadow-md">
        OBJETOS
      </header>

      <div className="max-w-md mx-auto p-4">
        <p className="text-center text-gray-600">
          Acá vas a ver los objetos perdidos y encontrados de tu ciudad.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
