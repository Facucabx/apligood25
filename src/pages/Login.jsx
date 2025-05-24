import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("¡Bienvenido Facu!");
      navigate(from, { replace: true });
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("El usuario no existe.");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta.");
          break;
        case "auth/invalid-email":
          setError("El correo no es válido.");
          break;
        default:
          setError(`Error: ${err.code}`);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center px-4 bg-center bg-no-repeat transition-all duration-500"
      style={{ backgroundColor: '#0f172a'
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            div[style] {
              background-image: url('/images/fondo-login-oscuro-tablet.webp');
              background-size: cover;
            }
          }
          @media (max-width: 480px) {
            div[style] {
              background-image: url('/images/fondo-login-oscuro-mobile.webp');
              background-size: cover;
            }
          }
        `}
      </style>

      <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-2 tracking-tight">Apligood</h1>
        <h2 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
          Conectando soluciones en tu ciudad...
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Ingresa a tu cuenta</p>

        {error && (
          <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>
        )}

        <form className="space-y-4 text-left" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            aria-label="Correo electrónico"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            aria-label="Contraseña"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg transition-all duration-200 font-semibold shadow-lg ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Iniciando sesión..." : "Acceder"}
          </button>
        </form>

        <p className="text-sm text-gray-500 my-4">Iniciar con</p>
        <div className="flex justify-center gap-6 mb-4">
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
          />
          <img
            src="https://img.icons8.com/color/48/facebook-new.png"
            alt="Facebook"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>

        <div className="mb-4">
          <img
            src="https://img.icons8.com/ios/50/fingerprint.png"
            alt="fingerprint"
            className="w-8 h-8 mx-auto opacity-40"
          />
        </div>

        <div className="text-sm text-blue-600 space-y-1">
          <Link to="/registro" className="block hover:underline">
            Crear cuenta
          </Link>
          <Link to="#" className="block hover:underline text-gray-500 dark:text-gray-400">
            Recuperar contraseña
          </Link>
        </div>
      </div>
    </div>
  );
}
