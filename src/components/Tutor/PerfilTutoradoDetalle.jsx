import { useNavigate } from "react-router-dom";

const PerfilTutoradoDetalle = ({ data }) => {
  const navigate = useNavigate();

  const {
    fotoPerfil,
    nombres = "",
    apellidoPaterno = "",
    apellidoMaterno = "",
    fechaNacimiento,
    genero,
    curp,
    tutorAsignado,
    discapacidadFisica,
    enfemerdad,
    necesidadEspecial,
    idCuentaTutorado, // Asegúrate de recibir esto
  } = data;

  const nombreCompleto =
    `${nombres} ${apellidoPaterno} ${apellidoMaterno}`.trim();

  const mostrarValor = (valor) =>
    typeof valor === "string" && valor.trim() ? valor : "Sin información";

  const Badge = ({ valor, color = "none" }) => {
    const esInfo = mostrarValor(valor) === "Sin información";
    const bg = esInfo ? "bg-gray-100" : `bg-${color}-200`;
    const text = esInfo ? "text-gray-500" : `text-${color}-600`;

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${bg} ${text}`}
      >
        {mostrarValor(valor)}
      </span>
    );
  };

  const handleConsultar = () => {
    if (idCuentaTutorado) {
      navigate(`/tutorado-necesidad/${idCuentaTutorado}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto">
      {/* Información general */}
      <div className="bg-white p-6 rounded-lg shadow-md flex-1">
        <div className="text-base font-semibold text-[#303030] bg-[#ffcec8] px-4 py-1 rounded-full w-fit mb-4">
          Información General
        </div>
        <div className="flex gap-4">
          <img
            src={fotoPerfil}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full object-cover border-2 border-[#cc928b] shadow-md mt-6"
          />
          <div className="text-base space-y-4">
            <p>
              <strong>Nombre:</strong> <Badge valor={nombreCompleto} />
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong>{" "}
              <Badge valor={fechaNacimiento} />
            </p>
            <p>
              <strong>Género:</strong> <Badge valor={genero} />
            </p>
            <p>
              <strong>CURP:</strong> <Badge valor={curp} />
            </p>
            <p>
              <strong>Tutor asignado:</strong>{" "}
              <Badge valor={tutorAsignado} color="orange" />
            </p>
          </div>
        </div>
      </div>

      {/* Necesidad especial */}
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 relative">
        <div className="text-base font-semibold text-[#303030] bg-[#ffcec8] px-4 py-1 rounded-full w-fit mb-4">
          Necesidad especial
        </div>
        <div className="text-base space-y-4">
          <p>
            <strong>Discapacidad:</strong> <Badge valor={discapacidadFisica} />
          </p>
          <p>
            <strong>Enfermedad:</strong> <Badge valor={enfemerdad} />
          </p>
          <p>
            <strong>Condición especial:</strong>{" "}
            <Badge valor={necesidadEspecial} color="red" />
          </p>
        </div>

        <button
          onClick={handleConsultar}
          className="absolute bottom-4 right-4 bg-gray-200 hover:bg-orange-200 text-gray-700 px-4 py-1 rounded-md text-base"
        >
          Consultar
        </button>
      </div>
    </div>
  );
};

export default PerfilTutoradoDetalle;