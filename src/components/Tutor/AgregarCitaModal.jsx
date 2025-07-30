import { useEffect, useRef, useState } from "react";

const AgregarCitaModal = ({ visible, onClose, onSubmit }) => {
  const modalRef = useRef(null);
  const [fechaCita, setFechaCita] = useState("");
  const [canalizacion, setCanalizacion] = useState("Psicologia");
  const [resultados, setResultados] = useState("Pendiente");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const handleSubmit = () => {
    const nuevaCita = {
      fechaCita,
      descripcion,
      canalizacion,
      resultados,
    };
    onSubmit(nuevaCita);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-30 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-lg font-bold text-[#cc928b] mb-4">Agregar cita</h2>

        <div className="space-y-4">
          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de cita:
            </label>
            <input
              type="datetime-local"
              value={fechaCita}
              onChange={(e) => setFechaCita(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
            />
          </div>

          {/* Departamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departamento:
            </label>
            <select
              value={canalizacion}
              onChange={(e) => setCanalizacion(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
            >
              <option value="Psicologia">Psicología</option>
              <option value="Enfermeria">Enfermería</option>
            </select>
          </div>

          {/* Resultado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado de atención:
            </label>
            <select
              value={resultados}
              onChange={(e) => setResultados(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En atención">En atención</option>
              <option value="Atendido">Atendido</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción:
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="w-full border px-3 py-2 rounded-lg text-sm"
              placeholder="Detalles adicionales..."
            />
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#cc928b] hover:bg-[#b06b65] text-white px-4 py-2 rounded-md text-sm"
          >
            Guardar cita
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarCitaModal;
