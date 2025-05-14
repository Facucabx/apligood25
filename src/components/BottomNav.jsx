import { NavLink } from "react-router-dom";
import { FaHome, FaUserTie, FaCalendarAlt, FaSearch, FaUser } from "react-icons/fa";

export default function BottomNav() {
  const navItems = [
    { label: "Inicio", icon: <FaHome />, to: "/" },
    { label: "Profs", icon: <FaUserTie />, to: "/profesionales" },
    { label: "Reservas", icon: <FaCalendarAlt />, to: "/reservas" },
    { label: "Objetos", icon: <FaSearch />, to: "/objetos" },
    { label: "Perfil", icon: <FaUser />, to: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-slate-900/80 shadow-inner z-50 border-t border-slate-700">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs transition-transform duration-300 ${
                  isActive ? "text-blue-400 scale-105" : "text-slate-400"
                } hover:text-blue-500 hover:scale-110`
              }
            >
              <span className="text-xl mb-1">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
