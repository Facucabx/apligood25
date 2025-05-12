import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Outlet } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import BottomNav from "./BottomNav";
import { FaSun, FaMoon, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function Layout() {
  const { user, nombre, foto } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  useEffect(() => {
    function manejarClickFuera(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    }
    document.addEventListener("mousedown", manejarClickFuera);
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="font-bold text-lg cursor-pointer" onClick={() => navigate("/")}>
          Apligood
        </div>
        {user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 hover:bg-white/10 transition"
            >
              <img
                src={foto || "https://ui-avatars.com/api/?name=Apligood"}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:block text-sm">{nombre || "Usuario"}</span>
            </button>
            {menuAbierto && (
              <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  className="w-full flex items-center gap-2 p-3 hover:bg-neutral-700 transition"
                  onClick={() => {
                    setMenuAbierto(false);
                    navigate("/perfil");
                  }}
                >
                  <FaUser /> Mi cuenta
                </button>
                <button
                  className="w-full flex items-center gap-2 p-3 hover:bg-neutral-700 transition"
                  onClick={() => {
                    toggleDarkMode();
                    setMenuAbierto(false);
                  }}
                >
                  {darkMode ? <FaSun /> : <FaMoon />} Modo {darkMode ? "Claro" : "Oscuro"}
                </button>
                <button
                  className="w-full flex items-center gap-2 p-3 text-red-400 hover:bg-red-700 hover:text-white transition"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>

      <footer className="sticky bottom-0 w-full">
        <BottomNav />
      </footer>
    </div>
  );
}
