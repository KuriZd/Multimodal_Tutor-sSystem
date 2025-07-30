import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const ListaAsistencia = ({ alumnos = [] }) => {
  const [estadoAsistencias, setEstadoAsistencias] = useState({});
  const [fechasSemana, setFechasSemana] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [cargandoAsistencias, setCargandoAsistencias] = useState(false);
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [isGuardando, setIsGuardando] = useState(false);

  useEffect(() => {
    const obtenerFechasDesdeBD = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:8000/api/asistencias-fechas",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fechas = res.data.sort();
        setFechasSemana(fechas);

        const hoy = dayjs();
        let fechaCercana = fechas[0];
        let menorDiferencia = Math.abs(hoy.diff(dayjs(fechas[0]), "day"));

        for (let i = 1; i < fechas.length; i++) {
          const diferencia = Math.abs(hoy.diff(dayjs(fechas[i]), "day"));
          if (diferencia < menorDiferencia) {
            menorDiferencia = diferencia;
            fechaCercana = fechas[i];
          }
        }

        setFechaSeleccionada(fechaCercana);
      } catch (error) {
        console.error("❌ Error al cargar fechas:", error);
      }
    };

    obtenerFechasDesdeBD();
  }, []);

  useEffect(() => {
    if (!fechaSeleccionada || alumnos.length === 0) return;

    const token = localStorage.getItem("token");

    const fetchAsistencias = async () => {
      setCargandoAsistencias(true);
      const estado = {};

      for (const alumno of alumnos) {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/asistencias/${alumno.idCuentaTutorado}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const asistio = res.data.some(
            (a) => a.asistencia === fechaSeleccionada
          );
          estado[alumno.idCuentaTutorado] = asistio;
        } catch (error) {
          console.error("❌ Error al consultar asistencia:", error);
        }
      }

      setEstadoAsistencias(estado);
      setCargandoAsistencias(false);
    };

    setEstadoAsistencias({});
    fetchAsistencias();
  }, [alumnos, fechaSeleccionada]);

  const toggleAsistencia = (id) => {
    setEstadoAsistencias((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const guardarAsistencias = async () => {
    setIsGuardando(true);
    const token = localStorage.getItem("token");

    for (const [id, asistio] of Object.entries(estadoAsistencias)) {
      try {
        if (asistio) {
          await axios.post(
            "http://localhost:8000/api/asistencias",
            { idCuentaTutorado: id, asistencia: fechaSeleccionada },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          await axios.delete(
            `http://localhost:8000/api/asistencias/${id}/${fechaSeleccionada}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (error) {
        console.error("❌ Error al guardar asistencia:", error);
      }
    }

    setIsGuardando(false);
    setConfirmacionVisible(true);
    setTimeout(() => setConfirmacionVisible(false), 8000);
  };

  return (
    <div className="space-y-6">
      {confirmacionVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl px-12 py-10 text-center shadow-lg max-w-md w-full animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-40 w-40 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                fill="none"
              />
              <path d="M9 12l2 2 4-4" stroke="currentColor" />
            </svg>
            <p className="mt-6 text-3xl font-normal text-black">
              Asistencia Registrada
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl shadow-md max-w-7xl mx-auto flex justify-between items-center">
        <div className="overflow-x-auto">
          <div className="flex items-center gap-2 w-full min-w-max">
            {fechasSemana.length === 0 ? (
              <span className="text-base text-gray-500">
                No hay fechas registradas aún.
              </span>
            ) : (
              fechasSemana.map((fecha) => {
                const activa = fecha === fechaSeleccionada;
                const esPasada = dayjs(fecha).isBefore(dayjs(), "day");
                const formato = dayjs(fecha).format("DD - MMM");

                return (
                  <button
                    key={fecha}
                    onClick={() => setFechaSeleccionada(fecha)}
                    className={`px-4 py-1 text-base rounded-full font-medium whitespace-nowrap transition-all duration-150 ${
                      activa
                        ? "bg-[#FFEEEC] text-[#cc928b] border-red-300"
                        : esPasada
                        ? "text-gray-500 hover:bg-gray-100"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {formato}
                  </button>
                );
              })
            )}
          </div>
        </div>
        <div className="ml-4">
          <button
            onClick={guardarAsistencias}
            disabled={isGuardando}
            className={`px-5 py-1 rounded-lg text-base font-medium whitespace-nowrap transition duration-200 ${
              isGuardando
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 hover:bg-[#ffcbad] hover:border-red-300 text-gray-700"
            }`}
          >
            {isGuardando ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Guardando...
              </div>
            ) : (
              "Terminar"
            )}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-7xl mx-auto h-[75vh] overflow-y-auto">
        {cargandoAsistencias ? (
          <div className="text-center text-base text-gray-500">
            Cargando asistencias...
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {alumnos.map((alumno) => {
              const asistio = estadoAsistencias[alumno.idCuentaTutorado];
              const nombreCompleto = `${alumno.nombres} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`;

              return (
                <div
                  key={alumno.idCuentaTutorado}
                  className="flex justify-between items-center rounded-lg shadow-lg border-b px-4 border-gray-200 pb-4 mb-2"
                >
                  <div>
                    <p className="font-semibold text-base text-gray-800">
                      {nombreCompleto}
                    </p>
                    <p className="text-base text-gray-500">{alumno.carrera}</p>
                  </div>
                  <button
                    onClick={() => toggleAsistencia(alumno.idCuentaTutorado)}
                    className={`text-base px-4 py-1 mt-4 rounded-full font-medium transition-all duration-150 ${
                      asistio
                        ? "bg-green-400 text-white hover:bg-green-500"
                        : "bg-red-400 text-white hover:bg-red-500"
                    }`}
                  >
                    {asistio ? "Asistió" : "No asistió"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaAsistencia;
