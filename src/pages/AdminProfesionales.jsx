// AdminProfesionales.jsx
import { useState } from "react";
import ListaProfesionales from "../components/ListaProfesionales";
import PanelListas from "../components/PanelListas";
import DashboardAdmin from "../components/DashboardAdmin";

export default function AdminProfesionales() {
  const [tab, setTab] = useState("profesionales");

  return (
    <div className="p-4 max-w-6xl mx-auto text-white min-h-screen bg-[#0f172a]">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel de Administración</h1>

      <div className="flex justify-center gap-4 mb-6">
        {["profesionales", "listas", "dashboard"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              tab === t ? "bg-blue-600 shadow-lg scale-105" : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "profesionales" && <ListaProfesionales />}
      {tab === "listas" && <PanelListas />}
      {tab === "dashboard" && <DashboardAdmin />}
    </div>
  );
}
