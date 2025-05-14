import { motion } from "framer-motion";

export default function BotonColorido({ bgColor, icono, titulo, descripcion, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 9000, damping: 200 }}
      className={`w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br ${bgColor} text-white shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md shadow-inner">
        <span className="text-2xl">{icono}</span>
      </div>
      <div className="text-left flex-1">
        <h3 className="font-extrabold text-lg">{titulo}</h3>
        <p className="text-sm opacity-80">{descripcion}</p>
      </div>
    </motion.button>
  );
}
