import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaCalendarAlt, FaSearch, FaUser } from "react-icons/fa";

export default function BottomNav() {
  const links = [
    { to: "/", label: "Inicio", icon: <FaHome /> },
    { to: "/profesionales", label: "Profs", icon: <FaUsers /> },
    { to: "/reservas", label: "Reservas", icon: <FaCalendarAlt /> },
    { to: "/objetos", label: "Objetos", icon: <FaSearch /> },
    { to: "/perfil", label: "Perfil", icon: <FaUser /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 shadow-inner dark:shadow-md transition-colors duration-300 backdrop-blur-sm">
      <div className="flex justify-around px-2 py-2">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-colors duration-300 ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-slate-700 dark:text-slate-300"
              }`
            }
          >
            <div className="text-xl">{link.icon}</div>
            <span className="mt-1">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
