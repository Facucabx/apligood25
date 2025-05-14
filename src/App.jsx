import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RutaPrivada from "./components/RutaPrivada";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import AdminProfesionales from "./pages/AdminProfesionales";
import Profesionales from "./pages/Profesionales";
import Objetos from "./pages/Objetos";
import Reservas from "./pages/Reservas";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas privadas con Layout general */}
        <Route
          path="/"
          element={
            <RutaPrivada>
              <Layout />
            </RutaPrivada>
          }
        >
          <Route index element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="admin" element={<AdminProfesionales />} />
          <Route path="profesionales" element={<Profesionales />} />
          <Route path="objetos" element={<Objetos />} />
          <Route path="reservas" element={<Reservas />} />
        </Route>
      </Routes>
    </Router>
  );
}
