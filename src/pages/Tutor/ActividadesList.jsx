import { useEffect, useState } from "react";
import axios from "axios";
import ActividadCard from "../../components/Tutor/ActividadesCard";

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
    <div className="flex items-center justify-center bg-gray-50 px-4 mt-10">
      <div className="w-full max-w-7xl">
        <ActividadCard
          actividades={[
            {
              id: 1,
              nombre: "Comprensión Lectora",
              tipo: "Análisis",
              estado: "TERMINADO",
              ruta: "/ComprencionLectora",
            },
            {
              id: 2,
              nombre: "Analisis FODA",
              tipo: "Reflexión",
              estado: "EN PROCESO",
              ruta: "/foda",
            },
            {
              id: 1,
              nombre: "Linea de Vida",
              tipo: "Análisis",
              estado: "TERMINADO",
              ruta: "/lineaDvida",
            },
            {
              id: 2,
              nombre: "Examen Vocacional",
              tipo: "Reflexión",
              estado: "EN PROCESO",
              ruta: "/ExmVocacional",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default VistaAsistencias;
