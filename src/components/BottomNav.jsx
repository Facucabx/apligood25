import { NavLink } from "react-router-dom";
import { FaHome, FaUserFriends, FaCalendarAlt, FaSearch, FaUser } from "react-icons/fa";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around py-2 shadow-inner z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${isActive ? "text-blue-400" : ""}`
        }
      >
        <FaHome size={20} />
        Inicio
      </NavLink>
      <NavLink
        to="/profesionales"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${isActive ? "text-blue-400" : ""}`
        }
      >
        <FaUserFriends size={20} />
        Profs
      </NavLink>
      <NavLink
        to="/reservas"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${isActive ? "text-blue-400" : ""}`
        }
      >
        <FaCalendarAlt size={20} />
        Reservas
      </NavLink>
      <NavLink
        to="/objetos"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${isActive ? "text-blue-400" : ""}`
        }
      >
        <FaSearch size={20} />
        Objetos
      </NavLink>
      <NavLink
        to="/perfil"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${isActive ? "text-blue-400" : ""}`
        }
      >
        <FaUser size={20} />
        Perfil
      </NavLink>
    </nav>
  );
}
