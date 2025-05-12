import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BottomNav from "./BottomNav";
import { ThemeContext } from "../context/ThemeContext";

export default function Layout({ children }) {
  const { nombre, foto } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Sesión cerrada");
      navigate("/login");
    } catch (err) {
      toast.error("Error al cerrar sesión");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center relative z-10">
        <div className="font-bold text-lg">Apligood</div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-blue-500 transition"
          >
            <img
              src={foto || "/images/avatar-default.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <span className="text-sm font-medium">{nombre || "Usuario"}</span>
          </button>

          {menuAbierto && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden text-sm text-slate-800 dark:text-slate-200">
              <button
                onClick={() => {
                  navigate("/perfil");
                  setMenuAbierto(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-gray-700 transition"
              >
                👤 Mi cuenta
              </button>
              <button
                onClick={() => {
                  toggleDarkMode();
                  setMenuAbierto(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? "☀️ Modo claro" : "🌙 Modo oscuro"}
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-gray-700 transition"
              >
                🔓 Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <BottomNav />
    </div>
  );
}
