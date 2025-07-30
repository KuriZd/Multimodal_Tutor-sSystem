import { useNavigate } from "react-router-dom";

const ActividadItem = ({ alumno, carrera, estado, ruta, resultado, onVerMas }) => {
  const navigate = useNavigate();

  const getEstadoClass = (estado) => {
    switch (estado?.toUpperCase()) {
      case "EN PROCESO":
        return "bg-yellow-100 text-yellow-700";
      case "TERMINADA":
        return "bg-green-100 text-green-800";
      case "PENDIENTE":
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const manejarClick = () => {
    if (onVerMas) {
      onVerMas();
    } else if (ruta) {
      navigate(ruta);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Card del tutorado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200 rounded-xl px-6 py-4 bg-white shadow-sm text-sm w-full">
        {/* Alumno */}
        <div className="flex flex-col w-full md:w-1/3 min-w-[200px]">
          <p className="font-semibold text-gray-900">{alumno}</p>
          <p className="text-gray-500">{carrera}</p>
        </div>

        {/* Estado y botón */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-end gap-4 w-full md:w-2/3 text-right md:text-left">
          <div className="flex flex-col items-end md:items-center justify-end gap-2 w-full md:w-auto">
            <div
              className={`px-3 py-[4px] rounded-full text-xs font-semibold whitespace-nowrap ${getEstadoClass(
                estado
              )}`}
            >
              {estado}
            </div>
          </div>

        {/* Compresión lectora */}
          {resultado && (
            <div className="text-sm text-gray-500">
              Comprensión: <span className="font-semibold">{resultado}</span>
            </div>
          )}

          <button
            onClick={manejarClick}
            className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-1 rounded-md whitespace-nowrap transition-colors duration-200 w-full md:w-auto self-end md:self-auto"
            aria-label={`Ver más sobre la actividad de ${alumno}`}
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActividadItem;
