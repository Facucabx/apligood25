
import { Routes, Route } from "react-router-dom";
import RutaPrivada from "./components/RutaPrivada";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Profesionales from "./pages/Profesionales";
import Perfil from "./pages/Perfil";
import PerfilProfesional from "./pages/PerfilProfesional";
import AdminProfesionales from "./pages/AdminProfesionales";
import NuevoProfesional from "./pages/NuevoProfesional"; // ✅ Importación agregada
import Reservas from "./pages/Reservas";
import Objetos from "./pages/Objetos";

export default function App() {
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
        <Route path="admin/nuevo" element={<NuevoProfesional />} /> {/* ✅ Ruta agregada */}
      </Route>
    </Routes>
  );
}
