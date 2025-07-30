import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PerfilTutoradoDetalle from "../../components/Tutor/PerfilTutoradoDetalle";
import ActividadesTutorado from "../../components/Tutor/ActividadesTutorado";

const PerfilTutorado = () => {
  const { idCuentaTutorado } = useParams();
  const [tutorado, setTutorado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/tutorados/${idCuentaTutorado}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const grupo = data.grupo;
        const tutor = grupo?.tutor;

        const tutorAsignado = tutor
          ? `${tutor.nombres} ${tutor.apellidoPaterno} ${tutor.apellidoMaterno}`
          : "Sin tutor asignado";

        setTutorado({
          ...data,
          tutorAsignado,
          discapacidadFisica: data.discapacidadFisica ?? "No aplica",
          enfemerdad: data.enfemerdad ?? "Ninguna",
          necesidadEspecial: data.necesidadEspecial ?? "Ninguna",
        });
      })

      .catch((err) => console.error("Error al cargar tutorado:", err));
  }, [idCuentaTutorado]);

  if (!tutorado) return <p className="p-6">Cargando perfil...</p>;

  return (
    <div className="space-y-6 px-4 mt-10">
      <PerfilTutoradoDetalle data={tutorado} onConsultar={() => { }} />

      {/* Aquí agregamos las actividades */}
      <ActividadesTutorado actividades={tutorado.actividades || []} />
    </div>
  );
};

export default PerfilTutorado;
