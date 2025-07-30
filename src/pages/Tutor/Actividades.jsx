import { useState } from "react";
import ConsultarActividad from "../../components/Tutor/SelectorGrupoCiclo";
import { useNavigate } from "react-router-dom";

const Actividades = () => {
  const [seleccion, setSeleccion] = useState({ grupo: null, ciclo: null });
  const navigate = useNavigate();

  const manejarSeleccion = (grupo, ciclo) => {
    setSeleccion({ grupo, ciclo });
    navigate(`/actividades/${grupo}/${ciclo}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <ConsultarActividad
          titulo="Seleccionar Grupo de Actividades"
          onSeleccionar={manejarSeleccion}
        />
      </div>
    </div>
  );
};

export default Actividades;
