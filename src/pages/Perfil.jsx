import BottomNav from "../components/BottomNav";

export default function Perfil() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="bg-blue-600 text-white text-center py-4 font-bold text-lg shadow-md">
        PERFIL
      </header>

      <div className="max-w-md mx-auto p-4">
        <p className="text-center text-gray-600">Acá vas a ver tu perfil y otras opciones.</p>
      </div>

      <BottomNav />
    </div>
  );
}
