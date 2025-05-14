import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaCalendarAlt, FaSearch } from "react-icons/fa";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around items-center py-3 shadow-lg border-t border-gray-800 dark:border-gray-700 z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${
            isActive ? "text-blue-500" : "text-white"
          } hover:text-blue-400 transition`
        }
      >
        <FaHome size={20} />
        Inicio
      </NavLink>

      <NavLink
        to="/profesionales"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${
            isActive ? "text-blue-500" : "text-white"
          } hover:text-blue-400 transition`
        }
      >
        <FaUser size={20} />
        Profs
      </NavLink>

      <NavLink
        to="/reservas"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${
            isActive ? "text-blue-500" : "text-white"
          } hover:text-blue-400 transition`
        }
      >
        <FaCalendarAlt size={20} />
        Reservas
      </NavLink>

      <NavLink
        to="/objetos"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${
            isActive ? "text-blue-500" : "text-white"
          } hover:text-blue-400 transition`
        }
      >
        <FaSearch size={20} />
        Objetos
      </NavLink>

      <NavLink
        to="/perfil"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${
            isActive ? "text-blue-500" : "text-white"
          } hover:text-blue-400 transition`
        }
      >
        <FaUser size={20} />
        Perfil
      </NavLink>
    </nav>
  );
}
