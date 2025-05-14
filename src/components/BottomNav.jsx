import { NavLink } from "react-router-dom";
import { FaHome, FaUserTie, FaCalendarAlt, FaSearch, FaUser } from "react-icons/fa";

export default function BottomNav() {
  const navItems = [
    { to: "/", label: "Inicio", icon: <FaHome /> },
    { to: "/profesionales", label: "Profs", icon: <FaUserTie /> },
    { to: "/reservas", label: "Reservas", icon: <FaCalendarAlt /> },
    { to: "/objetos", label: "Objetos", icon: <FaSearch /> },
    { to: "/perfil", label: "Perfil", icon: <FaUser /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 shadow-inner border-t border-slate-700">
      <ul className="flex justify-around items-center py-3">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${
                  isActive ? "text-blue-500 font-semibold" : "text-white/70 hover:text-blue-400"
                } transition-colors duration-300`
              }
            >
              <div className="text-xl mb-1">{item.icon}</div>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
