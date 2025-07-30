import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectorGrupo from "../../components/Tutor/SelectorGrupo";

const Asistencias = () => {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const navigate = useNavigate();

  const manejarSeleccion = (grupoId) => {
    setGrupoSeleccionado(grupoId);
    console.log("Grupo seleccionado:", grupoId);
    navigate(`/Asistencias/${grupoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <SelectorGrupo
          titulo="Seleccionar Grupo de Asistencias"
          onSeleccionar={manejarSeleccion}
        />
      </div>
    </div>
  );
};

export default Asistencias;
