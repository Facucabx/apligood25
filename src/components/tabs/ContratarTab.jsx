export default function ContratarTab() {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold text-blue-600 mb-2">Contratar Profesional</h2>
        <p className="mb-4 text-gray-700">¿Querés contratar a Juan Gómez? Completá el formulario y nos pondremos en contacto.</p>
        <form className="space-y-3">
          <input type="text" placeholder="Tu nombre" className="w-full border rounded px-3 py-2 shadow-sm" />
          <input type="tel" placeholder="Tu número de contacto" className="w-full border rounded px-3 py-2 shadow-sm" />
          <textarea placeholder="Mensaje" className="w-full border rounded px-3 py-2 shadow-sm" />
          <button className="bg-blue-600 text-white w-full py-2 rounded font-bold">Enviar solicitud</button>
        </form>
      </div>
    );
  }
  