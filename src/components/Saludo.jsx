// Saludo.jsx
import { motion } from "framer-motion";

export default function Saludo({ nombre = "Facu" }) {
  const hora = new Date().getHours();
  let saludo = "Hola";

  if (hora < 12) saludo = "Buen día";
  else if (hora < 19) saludo = "Buenas tardes";
  else saludo = "Buenas noches";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md mx-auto mt-6 px-4"
    >
      <h2 className="text-xl md:text-2xl font-semibold text-gray-100 dark:text-white drop-shadow">
        {saludo}, {nombre} 👋
      </h2>
      <p className="text-sm text-gray-300 dark:text-gray-400 mt-1">
        ¿Qué querés hacer hoy?
      </p>
    </motion.div>
  );
}