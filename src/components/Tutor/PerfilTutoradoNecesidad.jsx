import axios from "axios";
import { useState } from "react";
import AgregarCitaModal from "./AgregarCitaModal";

const PerfilTutoradoDetalle = ({ data, citas = [], setCitas }) => {
  const {
    fotoPerfil = "https://i.pravatar.cc/150?img=12",
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    genero,
    curp,
    tutorAsignado = "Sin asignar",
    discapacidadFisica = "No aplica",
    enfemerdad = "Ninguna",
    necesidadEspecial = "Ninguna",
  } = data;

    const [mostrarModal, setMostrarModal] = useState(false);

  const handleAgregarCita = async (nuevaCita) => {
    try {
      const response = await axios.post("http://localhost:8000/api/citas", {
        ...nuevaCita,
        idCuentaTutorado: data.idCuentaTutorado,
      });

      alert("✅ Cita registrada correctamente");
      setCitas((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("❌ Error al registrar cita:", error);
      alert("Ocurrió un error al registrar la cita");
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto mt-10 space-y-8">
      {/* Info General + Necesidades */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Información General */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1">
          <h2 className="text-lg font-semibold text-[#cc928b] bg-[#FFEEEC] px-4 py-1 rounded-full w-fit mb-4">
            Información General
          </h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={fotoPerfil}
              alt="Foto del tutorado"
              className="w-32 h-32 rounded-full object-cover border mt-4"
            />

            <div className="text-base text-gray-700 space-y-1">
              <p>
                <strong>Nombre:</strong> {nombres}
              </p>
              <p>
                <strong>Apellido paterno:</strong> {apellidoPaterno}
              </p>
              <p>
                <strong>Apellido materno:</strong> {apellidoMaterno}
              </p>
              <p>
                <strong>Fecha de nacimiento:</strong> {fechaNacimiento}
              </p>
              <p>
                <strong>Género:</strong> {genero}
              </p>
              <p>
                <strong>CURP:</strong> {curp}
              </p>
              <p>
                <strong>Tutor asignado:</strong> {tutorAsignado}
              </p>
            </div>
          </div>
        </div>

        {/* Necesidades especiales */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1">
          <h2 className="text-lg font-semibold text-[#cc928b] bg-[#FFEEEC] px-4 py-1 rounded-full w-fit mb-4">
            Necesidad especial
          </h2>

          <div className="text-base text-gray-700 space-y-3">
            <p>
              <strong>Discapacidad:</strong>{" "}
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                {discapacidadFisica}
              </span>
            </p>
            <p>
              <strong>Enfermedad:</strong>{" "}
              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                {enfemerdad}
              </span>
            </p>
            <p>
              <strong>Condición especial:</strong>{" "}
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                {necesidadEspecial}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Historial de atención */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#cc928b] bg-[#FFEEEC] px-4 py-1 rounded-full w-fit mb-4">
          Historial de atención
        </h2>

        {citas.length === 0 ? (
          <p className="text-gray-500 text-xl">No hay historial registrado.</p>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {citas.map((cita, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border rounded-md px-4 py-2 shadow-sm hover:shadow transition-all duration-150"
                >
                  <div className="flex items-center gap-3 flex-wrap text-base">
                    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                      {cita.canalizacion}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full font-medium ${
                        cita.resultados === "En atención"
                          ? "bg-blue-100 text-blue-600"
                          : cita.resultados === "Pendiente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {cita.resultados}
                    </span>
                    <span className="text-gray-600 font-medium">
                      {new Date(cita.fechaCita).toLocaleString("es-MX", {
                        day: "2-digit",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón agregar cita */}
            <div className="pt-4 text-right">
              <button
                onClick={() => setMostrarModal(true)}
                className="bg-gray-300 hover:bg-[#ffcbad] text-gray-700 px-4 py-2 rounded-md text-lg font-semibold transition-colors duration-150"
              >
                Agregar Cita
              </button>
            </div>
          </>
        )}
      </div>
      <AgregarCitaModal
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onSubmit={handleAgregarCita}
      />
    </div>
  );
};

export default PerfilTutoradoDetalle;
