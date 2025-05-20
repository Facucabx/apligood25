// DashboardAdmin.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function DashboardAdmin() {
  const [profesionales, setProfesionales] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "profesionales"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProfesionales(lista);
    });
    return () => unsub();
  }, []);

  const contarPor = (lista, campo) =>
    lista.reduce((acc, p) => {
      acc[p[campo]] = (acc[p[campo]] || 0) + 1;
      return acc;
    }, {});

  return (
    <div className="bg-slate-800 p-6 rounded shadow-md text-center space-y-4">
      <h2 className="text-2xl font-bold mb-4">Resumen</h2>
      <p>Total de profesionales: <strong>{profesionales.length}</strong></p>

      <div className="grid sm:grid-cols-2 gap-6 text-left">
        <div>
          <h3 className="text-lg font-semibold mb-2">📍 Por ciudad</h3>
          <ul className="text-sm space-y-1">
            {Object.entries(contarPor(profesionales, "ciudad")).map(([ciudad, count]) => (
              <li key={ciudad}>{ciudad}: <strong>{count}</strong></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">🧠 Por especialidad</h3>
          <ul className="text-sm space-y-1">
            {Object.entries(contarPor(profesionales, "especialidad")).map(([esp, count]) => (
              <li key={esp}>{esp}: <strong>{count}</strong></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
