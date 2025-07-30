import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PerfilTutoradoDetalle from "../../components/Tutor/PerfilTutoradoNecesidad";
import api from "../../Services/api"; // Asegúrate de tener esta instancia de axios configurada

const TutoradosNecesidad = () => {
  const { idCuentaTutorado } = useParams();
  const [tutorado, setTutorado] = useState(null);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDatos = async () => {
      try {
        const [resTutorado, resCitas] = await Promise.all([
          api.get(`/tutorados/${idCuentaTutorado}`),
          api.get(`/citas/tutorado/${idCuentaTutorado}`),
        ]);

        const grupo = resTutorado.data.grupo;
        const tutor = grupo?.tutor;

        const tutorAsignado = tutor
          ? `${tutor.nombres} ${tutor.apellidoPaterno} ${tutor.apellidoMaterno}`
          : "Sin tutor asignado";

        setTutorado({
          ...resTutorado.data,
          tutorAsignado,
          discapacidadFisica: resTutorado.data.discapacidadFisica ?? "No aplica",
          enfemerdad: resTutorado.data.enfemerdad ?? "Ninguna",
          necesidadEspecial: resTutorado.data.necesidadEspecial ?? "Ninguna",
        });


        setCitas(resCitas.data);
      } catch (err) {
        console.error("Error al cargar tutorado o citas:", err);
      }
    };

    fetchDatos();
  }, [idCuentaTutorado]);

  if (!tutorado) return <p className="p-6">Cargando perfil...</p>;

  return (
    <PerfilTutoradoDetalle
      data={tutorado}
      citas={citas}
      setCitas={setCitas}
    />
  );
};

export default TutoradosNecesidad;
