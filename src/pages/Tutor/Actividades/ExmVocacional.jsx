import React, { useEffect, useState } from "react";
import ActividadItem from "../../../components/Tutor/CardActividades";

const ExmVocacional = () => {
  const [examenes, setExamenes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/examenes-vocacionales", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setExamenes(data))
      .catch((err) => console.error("Error al cargar examen vocacional:", err));
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50 px-4 mt-10 space-y-4">
      {/* ✅ Solo un título general */}
      <h2 className="text-center font-semibold text-xl text-gray-700 mb-2">
        Examen Vocacional
      </h2>

      {examenes.map((registro) => (
        <ActividadItem
          key={registro.id}
          alumno={`${registro.tutorado.nombres} ${registro.tutorado.apellidoPaterno} ${registro.tutorado.apellidoMaterno}`}
          carrera={registro.tutorado.carrera}
          estado="Terminada"
          ruta={`/ModalExmVocacional/${registro.idCuentaTutorado}`}
          titulo="" // 👈 Para evitar duplicación del título dentro del Card
        />
      ))}
    </div>
  );
};

export default ExmVocacional;
