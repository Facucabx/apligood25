import { useEffect, useState } from "react";

export default function Saludo({ nombre }) {
  const [momento, setMomento] = useState("Hola");

  useEffect(() => {
    const hora = new Date().getHours();
    if (hora < 12) setMomento("Buen día");
    else if (hora < 19) setMomento("Buenas tardes");
    else setMomento("Buenas noches");
  }, []);

  return (
    <div className="text-center mt-6">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
        {momento}, {nombre} 👋
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
        ¿En qué te puedo ayudar hoy?
      </p>
    </div>
  );
}
