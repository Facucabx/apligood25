import { useLocation, Link } from "react-router-dom";
import { Home, Users, Calendar, Search, User } from "lucide-react";

const navItems = [
  { label: "Inicio", icon: <Home size={22} />, path: "/" },
  { label: "Profs", icon: <Users size={22} />, path: "/profesionales" },
  { label: "Reservas", icon: <Calendar size={22} />, path: "/reservas" },
  { label: "Objetos", icon: <Search size={22} />, path: "/objetos" },
  { label: "Perfil", icon: <User size={22} />, path: "/perfil" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-sm">
      <ul className="flex justify-center gap-x-12 py-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <li
              key={index}
              className={`flex flex-col items-center text-xs transition relative ${
                isActive
                  ? "text-blue-600 font-semibold after:content-[''] after:absolute after:-bottom-1 after:w-6 after:h-[2px] after:bg-blue-600 after:rounded-full after:transition-all"
                  : "text-gray-600"
              }`}
            >
              <Link to={item.path}>
                <div className="flex flex-col items-center">
                  {item.icon}
                  <span className="mt-1">{item.label}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
