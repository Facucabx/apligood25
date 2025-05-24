import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SolicitarProfesional() {
  const navigate = useNavigate();
  const { user, nombre: nombreUser } = useContext(AuthContext);

  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [success, setSuccess] = useState(false);
  const [yaEnviado, setYaEnviado] = useState(false);

  const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);
  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([]);

  useEffect(() => {
    if (nombreUser) setNombre(nombreUser);
  }, [nombreUser]);

  useEffect(() => {
    const fetchListas = async () => {
      try {
        const ciudadesSnap = await getDocs(collection(db, "ciudades"));
        const especialidadesSnap = await getDocs(collection(db, "especialidades"));
        setCiudadesDisponibles(ciudadesSnap.docs.map((doc) => doc.data().nombre));
        setEspecialidadesDisponibles(especialidadesSnap.docs.map((doc) => doc.data().nombre));
      } catch (error) {
        console.error("Error al cargar listas:", error);
      }
    };

    const verificarDuplicado = async () => {
      if (!user?.uid) return;
      const q = query(
        collection(db, "solicitudesProfesionales"),
        where("uid", "==", user.uid)
      );
      const snap = await getDocs(q);
      if (!snap.empty) setYaEnviado(true);
    };

    fetchListas();
    verificarDuplicado();
  }, [user]);

  const isValid =
    nombre && especialidad && ciudad && disponibilidad && telefono;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Por favor completá todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "solicitudesProfesionales"), {
        uid: user?.uid || null,
        nombre,
        especialidad,
        ciudad,
        disponibilidad,
        telefono,
        fecha: new Date().toISOString(),
      });

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      toast.error("Ocurrió un error. Intentá nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-12 flex justify-center items-center">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-lg">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <CheckCircle className="text-green-400 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-400">¡Solicitud enviada!</h2>
            <p className="text-sm text-gray-300">Redirigiendo al inicio...</p>
          </motion.div>
        ) : yaEnviado ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <AlertCircle className="text-yellow-400 w-16 h-16 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-yellow-300">Ya enviaste una solicitud</h2>
            <p className="text-gray-300 text-sm">
              Tu solicitud está en revisión. Podrás ser habilitado como profesional pronto.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">
              Solicitar ser Profesional
            </h2>

            {/* Nombre */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              />
              <div className="absolute right-3 top-2.5">
                {nombre ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-red-500" />}
              </div>
            </div>

            {/* Especialidad */}
            <div className="relative">
              <select
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                className="w-full px-4 py-2 rounded bg-slate-700 text-white"
              >
                <option value="">Seleccioná una especialidad</option>
                {especialidadesDisponibles.map((esp, i) => (
                  <option key={i} value={esp}>{esp}</option>
                ))}
              </select>
              <div className="absolute right-3 top-2.5">
                {especialidad ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-red-500" />}
              </div>
            </div>

            {/* Ciudad */}
            <div className="relative">
              <select
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full px-4 py-2 rounded bg-slate-700 text-white"
              >
                <option value="">Seleccioná una ciudad</option>
                {ciudadesDisponibles.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute right-3 top-2.5">
                {ciudad ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-red-500" />}
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="relative">
              <input
                type="text"
                placeholder="Disponibilidad (ej: Lunes a Viernes 9 a 18hs)"
                value={disponibilidad}
                onChange={(e) => setDisponibilidad(e.target.value)}
                className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              />
              <div className="absolute right-3 top-2.5">
                {disponibilidad ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-red-500" />}
              </div>
            </div>

            {/* Teléfono */}
            <div className="relative">
              <input
                type="tel"
                placeholder="Teléfono o celular"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-gray-400"
              />
              <div className="absolute right-3 top-2.5">
                {telefono ? <CheckCircle size={18} className="text-green-500" /> : <XCircle size={18} className="text-red-500" />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold transition"
            >
              Enviar solicitud
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
