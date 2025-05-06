export default function Layout({ children }) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Header fijo */}
        <header className="bg-blue-600 text-white text-center py-4 font-bold text-lg shadow-md">
          Apligood
        </header>
  
        {/* Contenido */}
        <main className="max-w-md mx-auto px-4 py-6">{children}</main>
      </div>
    );
  }