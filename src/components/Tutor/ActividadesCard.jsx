import { useNavigate } from "react-router-dom";

const ActividadCard = ({ actividades = [] }) => {
  const navigate = useNavigate();

  const getEstadoClass = (estado) => {
    switch (estado?.toUpperCase()) {
      case "EN PROCESO":
        return "bg-yellow-100 text-yellow-700";
      case "TERMINADO":
      case "TERMINADA":
        return "bg-green-100 text-green-700";
      case "PENDIENTE":
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const manejarVerMas = (actividad) => {
    if (actividad.onVerMas) {
      actividad.onVerMas();
    } else if (actividad.ruta) {
      navigate(actividad.ruta);
    }
  };

  return (
    <div className="space-y-3">
      {actividades.map((actividad, index) => (
        <div
          key={index}
          className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-5 text-lg shadow-md bg-white flex-wrap gap-2"
        >
          {/* Número */}
          <span className="font-bold w-10 text-center">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Nombre */}
          <span className="flex-1 text-gray-800 truncate px-4">
            {actividad.nombre}
          </span>

          {/* Tipo */}
          <span className="w-40 text-center text-gray-700 font-medium">
            {actividad.tipo}
          </span>

          {/* Resultado si existe */}
          {actividad.resultado && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              Comprensión: {actividad.resultado}
            </span>
          )}

          {/* Estado */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoClass(
              actividad.estado
            )}`}
          >
            {actividad.estado}
          </span>

          {/* Botón Ver más */}
          <button
            onClick={() => manejarVerMas(actividad)}
            className="ml-4 bg-gray-300 hover:bg-gray-200 text-gray-800 px-4 py-1 rounded-md text-sm font-medium"
          >
            Ver más
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActividadCard;
