import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("¡Bienvenido Facu!");
      navigate("/");
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Apligood</h1>
        <h2 className="text-lg font-semibold">¡Bienvenidos!</h2>
        <p className="text-sm text-gray-500 mb-4">Ingresa a tu cuenta</p>

        {error && (
          <p className="text-red-500 text-sm font-medium mb-2">{error}</p>
        )}

        <form className="space-y-4 text-left" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Acceder
          </button>
        </form>

        <p className="text-sm text-gray-500 my-4">Iniciar con</p>
        <div className="flex justify-center gap-6 mb-4">
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="w-6 h-6 cursor-pointer"
          />
          <img
            src="https://img.icons8.com/color/48/facebook-new.png"
            alt="Facebook"
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        <div className="mb-4">
          <img
            src="https://img.icons8.com/ios/50/fingerprint.png"
            alt="fingerprint"
            className="w-8 h-8 mx-auto opacity-50"
          />
        </div>

        <div className="text-sm text-blue-600 space-y-1">
          <Link to="/register" className="block hover:underline">
            Crear cuenta
          </Link>
          <Link to="#" className="block hover:underline text-gray-500">
            Recuperar contraseña
          </Link>
        </div>
      </div>
    </div>
  );
}
