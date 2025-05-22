import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RutaPrivada({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // ✅ Mientras se carga, no hacer nada
  if (loading) {
    return (
      <div className="text-white p-4 text-center animate-pulse">
        Verificando sesión...
      </div>
    );
  }

  // ❌ Si no hay user y ya terminó de cargar, redirigir
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ Si hay usuario, dejar pasar
  return children ? children : <Outlet />;
}
