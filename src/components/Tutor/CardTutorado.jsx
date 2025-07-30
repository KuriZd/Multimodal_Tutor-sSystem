const CardTutorado = ({ tutorado, onVerMas = () => {} }) => {
  const {
    nombres = "",
    apellidoPaterno = "",
    apellidoMaterno = "",
    carrera = "Sin carrera",
    asistencia = "0 / 24 (0%)",
    avanceActividades = "0%",
    necesidad = "No",
  } = tutorado;

  const nombreCompleto =
    `${nombres} ${apellidoPaterno} ${apellidoMaterno}`.trim();

  const porcentaje = parseInt(avanceActividades.replace("%", ""));
  const actividadesColor =
    porcentaje >= 80
      ? "bg-green-100 text-green-600"
      : porcentaje >= 50
      ? "bg-yellow-100 text-yellow-600"
      : "bg-red-100 text-red-600";

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-lg w-[90%] mx-auto hover:border-l-4 hover:border-orange-400 transition-all duration-150">
      <div className="flex flex-col">
        <span className="font-semibold text-base text-gray-900">
          {nombreCompleto}
        </span>
        <span className="text-base text-gray-500">{carrera}</span>
      </div>

      <div className="flex items-end gap-6 ml-auto text-xs text-center min-w-max">
        <div className="flex flex-col items-center">
          <span className="text-gray-500 font-medium mb-1">Asistencia</span>
          <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
            {asistencia}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-500 font-medium mb-1">Actividades</span>
          <div
            className={`px-3 py-1 rounded-full font-medium ${actividadesColor}`}
          >
            {avanceActividades}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-500 font-medium mb-1">Necesidad</span>
          <div className="bg-red-100 text-red-600 px-3 py-1 rounded-xl font-medium">
            {necesidad}
          </div>
        </div>
      </div>

      <button
        onClick={onVerMas}
        className="ml-6 bg-gray-200 hover:bg-orange-200 text-gray-700 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap"
      >
        Ver más
      </button>
    </div>
  );
};

export default CardTutorado;
