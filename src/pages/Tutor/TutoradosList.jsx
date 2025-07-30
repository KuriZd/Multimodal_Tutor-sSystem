import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardTutorado from "../../components/Tutor/CardTutorado";
import api from "../../Services/api"; // Asegúrate que exista

const VistaTutoradosList = () => {
  const { idGrupo } = useParams();
  const [tutorados, setTutorados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDatos = async () => {
      try {
        const [resTutorados, resAsistencias] = await Promise.all([
          api.get(`/grupos/${idGrupo}/tutorados`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/asistencias/grupo/${idGrupo}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const asistenciasPorAlumno = resAsistencias.data.reduce((acc, asistencia) => {
          const id = asistencia.idCuentaTutorado;
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});

        const tutoradosConDatos = resTutorados.data.map((tutorado) => {
          const asistencias = asistenciasPorAlumno[tutorado.idCuentaTutorado] || 0;
          const porcentaje = Math.round((asistencias / 24) * 100);

          return {
            ...tutorado,
            asistencia: `${asistencias} / 24 (${porcentaje}%)`,
            avanceActividades: tutorado.avanceActividades ?? "0%", // si aplica
            necesidad: tutorado.necesidadEspecial ? "Sí" : "No",
          };
        });

        setTutorados(tutoradosConDatos);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchDatos();
  }, [idGrupo]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        Tutorados del Grupo {idGrupo}
      </h1>

      {tutorados.map((tutorado) => (
        <CardTutorado
          key={tutorado.idCuentaTutorado}
          tutorado={tutorado}
          onVerMas={() =>
            navigate(`/perfil-tutorado/${tutorado.idCuentaTutorado}`)
          }
        />
      ))}
    </div>
  );
};

export default VistaTutoradosList;
