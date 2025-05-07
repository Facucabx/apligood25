// src/components/Saludo.jsx
export default function Saludo({ nombre = "Facu" }) {
    const hora = new Date().getHours();
    let saludo = "Hola";
  
    if (hora < 12) saludo = "Buen día";
    else if (hora < 19) saludo = "Buenas tardes";
    else saludo = "Buenas noches";
  
    return (
      <div className="w-full max-w-md mx-auto mt-6 px-4">
        <h2 className="text-xl font-semibold text-white drop-shadow-md">
          {saludo}, {nombre} 👋 ¿Qué querés hacer hoy?
        </h2>
      </div>
    );
  }
  