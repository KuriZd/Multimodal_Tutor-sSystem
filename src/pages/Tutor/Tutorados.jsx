import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectorGrupoTutorado from "../../components/Tutor/SelectorGrupo";

const Tutorados = () => {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const navigate = useNavigate();

  const manejarSeleccion = (grupoId) => {
    setGrupoSeleccionado(grupoId);
    console.log("Grupo seleccionado:", grupoId);
    navigate(`/tutorados/${grupoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <SelectorGrupoTutorado
          titulo="Seleccionar Grupo de Tutorados"
          onSeleccionar={manejarSeleccion}
        />
      </div>
    </div>
  );
};

export default Tutorados;
