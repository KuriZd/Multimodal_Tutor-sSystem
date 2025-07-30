import React, { useState } from "react";
import LayoutEstudiante from "../../components/layout-Estudiante";

const CitasTutorados = () => {
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Estado local del mes
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

  // Funciones de navegación de mes
  const previousMonth = () => {
    setCurrentMonthIndex((prevIndex) =>
      prevIndex === 0 ? 11 : prevIndex - 1
    );
  };

  const nextMonth = () => {
    setCurrentMonthIndex((prevIndex) =>
      prevIndex === 11 ? 0 : prevIndex + 1
    );
  };

  const currentMonth = monthNames[currentMonthIndex].toUpperCase();

  // Citas simuladas (7 citas)
  const citas = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    descripcion: "Cita psicológica, en el aula D2 con el dr. Jorge Ramos.",
    fecha: `Lunes, 02 ${currentMonth}. 11:30AM-1:30PM`,
  }));

  return (
    <LayoutEstudiante>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          {/* Encabezado del mes */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={previousMonth}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800 uppercase">
              {currentMonth}
            </h2>
            <button
              onClick={nextMonth}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Lista de citas */}
          <div className="space-y-3">
            {citas.map((cita) => (
              <div
                key={cita.id}
                className="flex justify-between items-center bg-[#86A0FE] text-white px-4 py-2 rounded-lg"
              >
                <div className="text-sm">{cita.descripcion}</div>
                <div className="text-sm">{cita.fecha}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutEstudiante>
  );
};

export default CitasTutorados;
