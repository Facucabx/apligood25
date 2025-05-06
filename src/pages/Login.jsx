export default function Login() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Apligood</h1>
  
          <h2 className="text-lg font-semibold mb-1">¡Bienvenidos!</h2>
          <p className="text-sm text-gray-500 mb-4">Ingresa a tu cuenta</p>
  
          <form className="space-y-4 text-left">
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-6 h-6 cursor-pointer" />
            <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" className="w-6 h-6 cursor-pointer" />
          </div>
  
          <div className="mb-4">
            <img
              src="https://img.icons8.com/ios/50/fingerprint.png"
              alt="fingerprint"
              className="w-8 h-8 mx-auto opacity-50"
            />
          </div>
  
          <div className="text-sm text-blue-600 space-y-1">
            <a href="#" className="block hover:underline">Crear cuenta</a>
            <a href="#" className="block hover:underline text-gray-500">Recuperar contraseña</a>
          </div>
        </div>
      </div>
    );
  }
  