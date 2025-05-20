// PanelListas.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

export default function PanelListas() {
  const [ciudades, setCiudades] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [nuevaCiudad, setNuevaCiudad] = useState("");
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("");
  const [editando, setEditando] = useState({ id: null, valor: "" });

  const configRef = doc(db, "config", "listas");

  useEffect(() => {
    const unsub = onSnapshot(configRef, (docSnap) => {
      if (docSnap.exists()) {
        setCiudades(docSnap.data().ciudades || []);
        setEspecialidades(docSnap.data().especialidades || []);
      }
    });
    return () => unsub();
  }, []);

  const agregarALista = async (tipo, valor) => {
    if (!valor.trim()) return toast.warn("No puede estar vacío");
    const campo = tipo === "ciudad" ? "ciudades" : "especialidades";
    const listaActual = tipo === "ciudad" ? ciudades : especialidades;
    if (listaActual.includes(valor)) return toast.warn("Ya existe");

    const nuevaLista = [...listaActual, valor];
    try {
      await updateDoc(configRef, { [campo]: nuevaLista });
      toast.success(`${tipo} agregada`);
      tipo === "ciudad" ? setNuevaCiudad("") : setNuevaEspecialidad("");
    } catch (error) {
      toast.error("Error al agregar");
    }
  };

  const eliminarDeLista = async (tipo, item) => {
    const campo = tipo === "ciudad" ? "ciudades" : "especialidades";
    const listaActual = tipo === "ciudad" ? ciudades : especialidades;
    const nuevaLista = listaActual.filter((i) => i !== item);

    try {
      await updateDoc(configRef, { [campo]: nuevaLista });
      toast.info(`${item} eliminada`);
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const editarElemento = async (tipo, anterior, nuevo) => {
    const campo = tipo === "ciudad" ? "ciudades" : "especialidades";
    const listaActual = tipo === "ciudad" ? ciudades : especialidades;
    const nuevaLista = listaActual.map((i) => (i === anterior ? nuevo : i));

    try {
      await updateDoc(configRef, { [campo]: nuevaLista });
      toast.success(`${tipo} actualizada`);
    } catch (error) {
      toast.error("Error al editar");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[{
        label: "Ciudades",
        tipo: "ciudad",
        valor: nuevaCiudad,
        set: setNuevaCiudad,
        items: ciudades,
      }, {
        label: "Especialidades",
        tipo: "especialidad",
        valor: nuevaEspecialidad,
        set: setNuevaEspecialidad,
        items: especialidades,
      }].map(({ label, tipo, valor, set, items }) => (
        <div key={tipo} className="bg-slate-800 p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-3">{label}</h2>
          <div className="flex mb-3">
            <input
              type="text"
              placeholder={`Nueva ${tipo}`}
              value={valor}
              onChange={(e) => set(e.target.value)}
              className="flex-1 bg-slate-900 text-white px-3 py-2 rounded-l border border-slate-700"
            />
            <button
              onClick={() => agregarALista(tipo, valor)}
              className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
            >
              +
            </button>
          </div>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={item}
                className="flex justify-between items-center bg-slate-700 px-3 py-2 rounded"
              >
                {editando.id === tipo + index ? (
                  <>
                    <input
                      value={editando.valor}
                      onChange={(e) =>
                        setEditando({ ...editando, valor: e.target.value })
                      }
                      className="bg-slate-900 text-white px-2 py-1 rounded w-full"
                    />
                    <button
                      onClick={async () => {
                        if (!editando.valor.trim()) return toast.warn("No puede estar vacío");
                        if (items.includes(editando.valor.trim())) return toast.warn("Ya existe");
                        await editarElemento(tipo, item, editando.valor.trim());
                        setEditando({ id: null, valor: "" });
                      }}
                      className="text-green-400 ml-2"
                    >
                      ✔
                    </button>
                  </>
                ) : (
                  <>
                    <span>{item}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setEditando({ id: tipo + index, valor: item })
                        }
                        className="text-yellow-400 hover:text-yellow-600"
                      >
                        🖊
                      </button>
                      <button
                        onClick={() => eliminarDeLista(tipo, item)}
                        className="text-red-400 hover:text-red-600"
                      >
                        🗑
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
