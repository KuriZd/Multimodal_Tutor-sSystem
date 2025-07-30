import React, { useEffect, useState } from "react";
import ActividadItem from "../../../components/Tutor/CardActividades";

const Foda = () => {
  const [fodaCompletados, setFodaCompletados] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/foda", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFodaCompletados(data))
      .catch((err) => console.error("Error al cargar FODA:", err));
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50 px-4 mt-10 space-y-4">
      {/* ✅ Título principal solo una vez */}
      <h2 className="text-center font-semibold text-xl text-gray-700">FODA</h2>

      {fodaCompletados.map((registro) => (
        <ActividadItem
          key={registro.idFoda}
          alumno={`${registro.tutorado.nombres} ${registro.tutorado.apellidoPaterno} ${registro.tutorado.apellidoMaterno}`}
          carrera={registro.tutorado.carrera}
          estado="Terminada"
          ruta={`/ModalFoda/${registro.idCuentaTutorado}`}
          titulo="" // 👈 Evita que el Card muestre el título dentro
        />
      ))}
    </div>
  );
};

export default Foda;
