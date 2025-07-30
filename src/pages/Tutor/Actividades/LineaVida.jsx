import React, { useEffect, useState } from "react";
import ActividadItem from "../../../components/Tutor/CardActividades";

const LineaVida = () => {
  const [lineas, setLineas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/vida", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLineas(data))
      .catch((err) => console.error("Error al cargar Línea de Vida:", err));
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50 px-4 mt-10 space-y-4">
      <h2 className="text-center font-semibold text-xl text-gray-700 mb-2">
        Línea de Vida
      </h2>

      {lineas.map((registro) => (
        <ActividadItem
          key={registro.id} // Asegúrate que tengas este ID
          alumno={`${registro.tutorado.nombres} ${registro.tutorado.apellidoPaterno} ${registro.tutorado.apellidoMaterno}`}
          carrera={registro.tutorado.carrera}
          estado="Terminada"
          ruta={`/ModalLineaVida/${registro.idCuentaTutorado}`}
          titulo="" // ✅ Para no repetir el encabezado por cada card
        />
      ))}
    </div>
  );
};

export default LineaVida;
