import React, { useEffect, useState } from "react";
import ActividadItem from "../../../components/Tutor/ComLectora";

const ComprensionLectora = () => {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/lectura", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
      console.log("📦 Data recibida:", data); // 👈 AGREGA ESTO
      setResultados(data);
    })
      .catch((err) =>
        console.error("Error al cargar comprensión lectora:", err)
      );
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50 px-4 mt-2 space-y-2">
      {/* ✅ Título general (solo una vez) */}
      <h2 className="text-center font-semibold text-xl text-gray-700">
        Comprensión Lectora
      </h2>

      {/* 🔁 Cards sin repetir el título */}
      {resultados.map((registro) => (
        <ActividadItem
          key={registro.id}
          alumno={`${registro.tutorado.nombres} ${registro.tutorado.apellidoPaterno} ${registro.tutorado.apellidoMaterno}`}
          carrera={registro.tutorado.carrera}
          estado="Terminada"
          resultadoPrueba={registro.nivelComprensionLectora  || "Desconocido"}
          ruta={`/tutorado/${registro.idCuentaTutorado}/lectura`}
          titulo="" // 👈 Esto evita que se pinte otro título dentro
        />
      ))}
    </div>
  );
};

export default ComprensionLectora;
