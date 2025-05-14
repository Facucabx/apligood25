import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Outlet } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import BottomNav from "./BottomNav";
import { FaSun, FaMoon, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function Layout() {
  const { user, foto } = useContext(AuthContext);
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
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}>
      <header className="flex items-center justify-between p-4 shadow" style={{ backgroundColor: '#3B82F6', color: 'white' }}>
        <div onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer">
          Apligood
        </div>
        <div className="relative" ref={menuRef}>
          <img
            src={foto || "https://via.placeholder.com/40?text=U"}
            alt="Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:opacity-80 transition"
            onClick={() => setMenuAbierto(!menuAbierto)}
          />
          {menuAbierto && (
            <div className="absolute right-0 mt-2 rounded-lg shadow-lg p-2 w-48 z-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 animate-fade-in">
              <button
                onClick={() => navigate("/perfil")}
                className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
              >
                <FaUser /> Perfil
              </button>
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
              >
                {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Modo claro" : "Modo oscuro"}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-600 dark:text-red-400 transition"
              >
                <FaSignOutAlt /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
