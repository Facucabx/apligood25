import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Topbar from "../components/Topbar";
import BottomNav from "../components/BottomNav";
import PanelListas from "../components/PanelListas";
import ListaProfesionales from "../components/ListaProfesionales";
import AgregarProfesional from "../components/AgregarProfesional";

export default function AdminProfesionales() {
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const snapshot = await getDocs(collection(db, "profesionales"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfesionales(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener profesionales:", error);
      }
    };

    fetchProfesionales();
  }, []);

  const total = profesionales.length;
  const ciudades = {};
  const especialidades = {};

  profesionales.forEach((prof) => {
    ciudades[prof.ciudad] = (ciudades[prof.ciudad] || 0) + 1;
    especialidades[prof.especialidad] = (especialidades[prof.especialidad] || 0) + 1;
  });

  return (
    <>
      <Topbar />
      <main className="min-h-screen bg-slate-900 text-white px-4 pt-4 pb-24">
        <h1 className="text-center text-2xl font-bold mb-2">Resumen</h1>
        <p className="text-center mb-6">
          Total de profesionales: <strong>{total}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">📍 Por ciudad</h2>
            {Object.entries(ciudades).map(([ciudad, count]) => (
              <p key={ciudad}>{ciudad}: <strong>{count}</strong></p>
            ))}
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-2">🧠 Por especialidad</h2>
            {Object.entries(especialidades).map(([esp, count]) => (
              <p key={esp}>{esp}: <strong>{count}</strong></p>
            ))}
          </div>
        </div>

        <section className="space-y-10">
          <PanelListas />
          <section className="space-y-10">
            <PanelListas />
            <AgregarProfesional />
            <ListaProfesionales />
          </section>
          <ListaProfesionales />
        </section>
      </main>
      <BottomNav />
    </>
  );
}
