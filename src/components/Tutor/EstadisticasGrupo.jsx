import { useEffect, useState } from "react";
import axios from "axios";

const ResumenEstadisticasGrupo = ({ grupo, ciclo }) => {
  const [estadisticas, setEstadisticas] = useState({
    sesiones: 0,
    asistencia: 0,
    atenciones: 0,
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchEstadisticas = async () => {
      try {
        // Tutorados
        const resAlumnos = await axios.get(
          `http://localhost:8000/api/grupos/${grupo}/tutorados`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const tutorados = resAlumnos.data;
        const totalTutorados = tutorados.length;

        // Asistencias
        const resAsistencias = await axios.get(
          `http://localhost:8000/api/asistencias/grupo/${grupo}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const asistencias = resAsistencias.data;

        const fechasUnicas = [...new Set(asistencias.map((a) => a.asistencia))];
        const totalSesiones = fechasUnicas.length;

        const totalAsistencias = asistencias.length;
        const porcentajeAsistencia =
          totalTutorados && totalSesiones
            ? Math.round(
                (totalAsistencias / (totalTutorados * totalSesiones)) * 100
              )
            : 0;

        // Citas
        const resCitas = await axios.get(
          `http://localhost:8000/api/citas/grupo/${grupo}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const totalCitas = resCitas.data.length;

        setEstadisticas({
          sesiones: totalSesiones,
          asistencia: porcentajeAsistencia,
          atenciones: totalCitas,
        });
      } catch (error) {
        console.error("❌ Error al cargar estadísticas:", error);
      } finally {
        setCargando(false);
      }
    };

    if (grupo) fetchEstadisticas();
  }, [grupo, ciclo]);

  if (cargando) {
    return (
      <div className="text-center text-gray-500">Cargando estadísticas...</div>
    );
  }

  const { sesiones, asistencia, atenciones } = estadisticas;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-400 w-full max-w-5xl space-y-4">
      {/* Encabezados de grupo y ciclo */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-semibold text-[#cc928b] bg-[#FFEEEC] px-4 py-1 rounded-full">
          Grupo {grupo}
        </span>
        <span className="text-sm font-semibold text-[#cc928b] bg-[#FFEEEC] px-4 py-1 rounded-full">
          {ciclo}
        </span>
      </div>

      {/* Estadísticas */}
      <div className="bg-gray-100 rounded-lg px-8 py-6 flex justify-around text-center">
        <div>
          <p className="text-6xl font-bold text-gray-900">{sesiones}</p>
          <p className="text-sm text-gray-600 mt-1">Sesiones</p>
        </div>
        <div>
          <p className="text-6xl font-bold text-gray-900">{asistencia}%</p>
          <p className="text-sm text-gray-600 mt-1">Asistencia alumnos</p>
        </div>
        <div>
          <p className="text-6xl font-bold text-gray-900">{atenciones}</p>
          <p className="text-sm text-gray-600 mt-1">Atenciones</p>
        </div>
      </div>
    </div>
  );
};

export default ResumenEstadisticasGrupo;
