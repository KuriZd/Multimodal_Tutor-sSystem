import { useState } from "react";
import ConsultarReporte from "../../components/Tutor/SelectorGrupoCiclo";
import { useNavigate } from "react-router-dom";

const VistaReportes = () => {
  const [seleccion, setSeleccion] = useState({ grupo: null, ciclo: null });
  const navigate = useNavigate();

  const manejarSeleccion = (grupo, ciclo) => {
    setSeleccion({ grupo, ciclo });
    navigate(`/reportes/${grupo}/${ciclo}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <ConsultarReporte
          titulo="Seleccionar Grupo de Reportes"
          onSeleccionar={manejarSeleccion}
        />
      </div>
    </div>
  );
};

export default VistaReportes;
