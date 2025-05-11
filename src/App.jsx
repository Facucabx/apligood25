import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profesionales from "./pages/Profesionales";
import Reservas from "./pages/Reservas";
import Objetos from "./pages/Objetos";
import Perfil from "./pages/Perfil";
import PerfilProfesional from "./pages/PerfilProfesional";
import NuevoProfesional from "./pages/NuevoProfesional";
import AdminProfesionales from "./pages/AdminProfesionales";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profesionales" element={<Profesionales />} />
      <Route path="/profesionales/:id" element={<PerfilProfesional />} />
      <Route path="/reservas" element={<Reservas />} />
      <Route path="/objetos" element={<Objetos />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/nuevo" element={<NuevoProfesional />} />
      <Route path="/admin" element={<AdminProfesionales />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div className="p-6 text-center">Página no encontrada 😕</div>} />
    </Routes>
  );
}
