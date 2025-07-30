import { useEffect, useState } from "react";
import axios from "axios";
import ListaAsistencia from "../../components/Tutor/ListaAsistencia";

import { useParams } from "react-router-dom";

const VistaAsistencias = () => {
  const { idGrupo } = useParams();

  const [alumnos, setAlumnos] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("2025-06-01");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/grupos/${idGrupo}/tutorados`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("🎓 Tutorados cargados:", res.data);
        setAlumnos(res.data);
      })
      .catch((err) => console.error("❌ Error al obtener tutorados:", err));
  }, [idGrupo]);

  return (
    <div className="p-6">
      <ListaAsistencia
        alumnos={alumnos}
        fechaSeleccionada={fechaSeleccionada}
      />
    </div>
  );
};

export default VistaAsistencias;
