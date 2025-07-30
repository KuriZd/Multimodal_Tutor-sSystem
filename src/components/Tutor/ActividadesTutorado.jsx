const ActividadesTutorado = ({ actividades = [] }) => {
  const getEstadoClase = (estado) => {
    switch (estado) {
      case "Completada":
        return "bg-green-100 text-green-700";
      case "En curso":
        return "bg-yellow-100 text-yellow-700";
      case "Sin comenzar":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md max-w-7xl mx-auto overflow-hidden">
      {/* Encabezado */}
      <div className="text-base font-semibold text-[#303030] bg-[#ffcec8] px-4 py-1 rounded-full w-fit mb-4">
        Actividades
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {actividades.map((actividad, index) => {
          const estadoFormateado = actividad.estado === "SI" ? "Completada" : "Sin comenzar";

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200 rounded-md px-4 py-2"
            >
              {/* Número + nombre */}
              <div className="flex items-center gap-3 mb-1 md:mb-0">
                <span className="font-bold text-sm text-gray-800">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-gray-800">{actividad.nombre}</span>
              </div>

              {/* Estado y Nivel de Comprensión */}
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${getEstadoClase(
                    actividad.estado
                  )}`}
                >
                  {actividad.estado}
                </span>


                {actividad.nivelComprensionLectora && (
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    Nivel: {actividad.nivelComprensionLectora}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActividadesTutorado;