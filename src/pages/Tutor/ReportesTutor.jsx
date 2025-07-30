import { useParams } from "react-router-dom";
import ResumenEstadisticasGrupo from "../../components/Tutor/EstadisticasGrupo";

const VistaEstadisticasGrupo = () => {
  const { idGrupo, idCiclo } = useParams(); // Extraer valores de la URL

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        {idGrupo && idCiclo ? (
          <ResumenEstadisticasGrupo grupo={idGrupo} ciclo={idCiclo} />
        ) : (
          <div className="text-gray-500 text-center">
            Cargando datos del grupo...
          </div>
        )}
      </div>
    </div>
  );
};

export default VistaEstadisticasGrupo;
