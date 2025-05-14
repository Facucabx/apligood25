import { motion } from "framer-motion";

export default function BotonColorido({ bgColor, icono, titulo, descripcion, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${bgColor} w-full h-24 rounded-xl px-4 flex items-center gap-4 shadow-md hover:shadow-lg transition-all duration-300`}
      onClick={onClick}
    >
      <div className="text-3xl text-white drop-shadow-sm">{icono}</div>
      <div className="text-left">
        <h3 className="font-bold text-lg text-white">{titulo}</h3>
        <p className="text-sm text-white/90">{descripcion}</p>
      </div>
    </motion.button>
  );
}
