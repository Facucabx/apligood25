import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RutaPrivada({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Mientras Firebase verifica el estado del usuario, no mostrar nada
  if (loading) {
    return <div className="text-white p-4 text-center">Cargando sesión...</div>;
  }

  // Si no hay usuario, redirigir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
