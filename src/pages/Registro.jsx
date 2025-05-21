
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Eye, EyeOff, Upload } from "lucide-react";

export default function Registro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isValidNombre = nombre.trim().length > 2;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;

  const handleNext = () => {
    setError("");
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async () => {
    if (!isValidPassword) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      let avatarUrl = "";
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${cred.user.uid}`);
        await uploadBytes(storageRef, avatarFile);
        avatarUrl = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, "usuarios", cred.user.uid), {
        nombre,
        email,
        avatar: avatarUrl,
      });

      setSuccess(true);
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("El correo ya está registrado.");
          break;
        case "auth/invalid-email":
          setError("Correo inválido.");
          break;
        default:
          setError("Error al crear la cuenta.");
          break;
      }
    }
  };

  const steps = ["Nombre", "Correo", "Contraseña", "Avatar"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md text-center transition-all duration-300">
        {success ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-600">¡Registro exitoso!</h2>
            <p className="text-gray-700 text-sm mt-2">Redirigiendo...</p>
          </motion.div>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-1">Registro</h1>
            <p className="text-sm text-gray-700 mb-4 font-medium">
              Paso {step} de {steps.length} - {steps[step - 1]}
            </p>

            {error && <p className="text-red-500 text-sm font-semibold mb-3">{error}</p>}

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <>
                    <div className="relative mb-2">
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full border rounded-md p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                        autoFocus
                      />
                      <div className="absolute right-3 top-3">
                        {isValidNombre ? (
                          <CheckCircle className="text-green-500 w-5 h-5" />
                        ) : (
                          <XCircle className="text-red-500 w-5 h-5" />
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (isValidNombre) {
                          handleNext();
                        } else {
                          setError("El nombre debe tener al menos 3 letras.");
                        }
                      }}
                      className="mt-4 w-full bg-primary hover:bg-blue-700 text-white py-2.5 rounded-md font-semibold transition"
                    >
                      Siguiente
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="relative mb-2">
                      <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-md p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                      />
                      <div className="absolute right-3 top-3">
                        {isValidEmail ? (
                          <CheckCircle className="text-green-500 w-5 h-5" />
                        ) : (
                          <XCircle className="text-red-500 w-5 h-5" />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={handleBack}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Volver
                      </button>
                      <button
                        onClick={() => {
                          if (isValidEmail) {
                            handleNext();
                          } else {
                            setError("Correo inválido.");
                          }
                        }}
                        className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition"
                      >
                        Siguiente
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="relative mb-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-md p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-primary"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={handleBack}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Volver
                      </button>
                      <button
                        onClick={() => {
                          if (isValidPassword) {
                            handleNext();
                          } else {
                            setError("Contraseña muy corta.");
                          }
                        }}
                        className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition"
                      >
                        Siguiente
                      </button>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="flex flex-col items-center gap-4">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Preview"
                          className="w-20 h-20 rounded-full object-cover shadow-md"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                          <Upload className="text-gray-500" />
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleAvatarChange} />
                    </div>
                    <div className="flex justify-between mt-6">
                      <button
                        onClick={handleBack}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Volver
                      </button>
                      <button
                        onClick={handleRegister}
                        className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition"
                      >
                        Registrarme
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="text-sm mt-6 text-gray-600">
              ¿Ya tenés cuenta?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
