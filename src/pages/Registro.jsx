import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // 🔥 Guardamos el nombre en Firestore
      await setDoc(doc(db, "usuarios", cred.user.uid), {
        nombre,
        email
      });

      toast.success("Cuenta creada con éxito");
      navigate("/");
    } catch (err) {
      console.error(err.code);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("El correo ya está registrado.");
          break;
        case "auth/invalid-email":
          setError("Correo inválido.");
          break;
        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;
        default:
          setError(`Error: ${err.message}`);
          break;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Registrarse</h1>
        <p className="text-sm text-gray-500 mb-4">Crea una cuenta nueva</p>
        {error && <p className="text-red-500 text-sm font-medium mb-2">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Registrarme
          </button>
        </form>
        <p className="text-sm mt-4">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
