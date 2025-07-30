import { useNavigate } from "react-router-dom";

const ActividadItem = ({
  alumno,
  carrera,
  estado,
  ruta,
  onVerMas,
  resultadoPrueba, // ← Nuevo prop
}) => {
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
    <div className="w-full max-w-5xl mx-auto space-y-4">
     

      {/* Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200 rounded-xl px-6 py-3 bg-white shadow-sm text-base w-full">
        {/* Alumno */}
        <div className="flex flex-col w-full md:w-1/3 min-w-[200px]">
          <p className="font-semibold text-gray-900">{alumno}</p>
          <p className="text-gray-500">{carrera}</p>
        </div>

        {/* Resultado + Estado + Botón */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-end gap-2 w-full md:w-2/3 text-right md:text-left">
          {/* Resultado de prueba */}
          {resultadoPrueba && (
            <div className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-[2px] rounded-full whitespace-nowrap">
              Comprensión: {resultadoPrueba}
            </div>
          )}

          <div className="flex flex-col items-end md:items-center py-2 mx-3">
            {/* Estado */}

            <div
              className={`px-3 py-[2px] rounded-full text-sm font-semibold whitespace-nowrap ${getEstadoClass(
                estado
              )}`}
            >
              {estado}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActividadItem;
