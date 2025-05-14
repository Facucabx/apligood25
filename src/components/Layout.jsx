import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Outlet } from "react-router-dom";
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
    <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
      <header className="bg-primary shadow-md text-white px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">Apligood</div>
        <div className="relative">
          <img
            src={foto || "/avatar-placeholder.webp"}
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
            onClick={() => setMenuAbierto(!menuAbierto)}
          />
          {menuAbierto && (
            <div ref={menuRef} className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg overflow-hidden min-w-[180px] z-50">
              <button onClick={() => navigate("/perfil")} className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FaUser /> Perfil
              </button>
              <button onClick={toggleDarkMode} className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Modo claro" : "Modo oscuro"}
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FaSignOutAlt /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 bg-backgroundLight dark:bg-backgroundDark transition-colors duration-300">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
