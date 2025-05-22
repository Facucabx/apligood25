import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Topbar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 text-white px-4 py-3 shadow-md flex justify-between items-center">
      <Link to="/" className="text-lg font-bold hover:opacity-80 transition">
        Apligood
      </Link>
      <div className="flex items-center gap-4">
        {currentUser && (
          <>
            <span className="text-sm hidden sm:inline">
              {currentUser.displayName || currentUser.email}
            </span>
            <img
              src={currentUser.photoURL || "/user.png"}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 text-sm"
            >
              Salir
            </button>
          </>
        )}
      </div>
    </header>
  );
}
