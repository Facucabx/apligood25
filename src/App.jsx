import { Routes, Route } from "react-router-dom";
import RutaPrivada from "./components/RutaPrivada";
import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Profesionales from "./pages/Profesionales";
import Perfil from "./pages/Perfil";
import PerfilProfesional from "./pages/PerfilProfesional";
import AdminProfesionales from "./pages/AdminProfesionales";
import NuevoProfesional from "./pages/NuevoProfesional";
import Reservas from "./pages/Reservas";
import Objetos from "./pages/Objetos";
import SolicitarProfesional from "./pages/SolicitarProfesional"; // ✅ agregala

export default function App() {
  const [mostrandoSplash, setMostrandoSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setMostrandoSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (mostrandoSplash) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      {/* 🌐 Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* 🔒 Rutas protegidas con layout */}
      <Route
        path="/"
        element={
          <RutaPrivada>
            <Layout />
          </RutaPrivada>
        }
      >
        <Route index element={<Home />} />
        <Route path="profesionales" element={<Profesionales />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="reservas" element={<Reservas />} />
        <Route path="objetos" element={<Objetos />} />
        <Route path="profesionales/:id" element={<PerfilProfesional />} />

        {/* 🛠️ Admin */}
        <Route path="admin" element={<AdminProfesionales />} />
        <Route path="admin/nuevo" element={<NuevoProfesional />} />
        <Route path="solicitar-profesional" element={<SolicitarProfesional />} /> // ✅ nueva ruta
      </Route>
    </Routes>
  );
}
