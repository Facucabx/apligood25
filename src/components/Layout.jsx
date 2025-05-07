import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const esHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {!esHome && (
        <header className="bg-blue-600 text-white py-4 text-center shadow">
          <h1 className="text-xl font-bold">Apligood</h1>
        </header>
      )}
      <main className="max-w-md mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
