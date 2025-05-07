export default function MensajesTab() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-blue-600 mb-2">Mensajes</h2>
      <p className="text-gray-700">Aquí podrás iniciar una conversación con el profesional.</p>
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        className="mt-4 w-full border rounded px-3 py-2 shadow-sm"
      />
    </div>
  );
}
