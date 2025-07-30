import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutEstudiante from "../../components/layout-Estudiante";

const ExamenVocacional = () => {
  const navigate = useNavigate();

  return (
    <LayoutEstudiante>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta de instrucciones */}
          <div className="md:col-span-2 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <div className="flex items-start mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400 mt-1 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M12 8v.01M12 12h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-blue-500 font-semibold text-lg">
                Importante leer antes de comenzar el examen de vocación.
              </h2>
            </div>
            <p className="text-gray-800 mb-3">
              La realización de un test vocacional pretende ayudar a la persona a conocer su orientación profesional,
              para saber cuál área se adapta a sus aptitudes.
            </p>
            <p className="text-gray-800 mb-3">
              Este examen no tiene un límite de tiempo, lea cuidadosamente las preguntas y responda con honestidad.
              (Si ya completó el examen y necesita volver a realizarlo, usted puede volver a realizar el examen).
            </p>
            <p className="text-gray-800 font-medium mb-6">
              Este examen consta de 25 preguntas
            </p>
            <div className="text-right">
              <button
                onClick={() => navigate("/examen-vocacionalPreguntas")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Iniciar
              </button>
            </div>
          </div>

          {/* Tarjeta de resultados */}
          <div className="bg-white rounded-r-lg shadow p-4 border-l-4 border-blue-400 self-start">
            <h3 className="text-blue-400 font-semibold text-lg mb-2 bg-blue-50 inline-block px-3 py-1 rounded-full">
              Resultados
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              Si usted ya realizó el examen de vocación, aquí podrá ver sus resultados y se muestran posibles áreas de interés.
            </p>
            <div className="text-right">
              <button
                onClick={() => navigate("/examen-vocacionalResultados")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 text-sm rounded"
              >
                Consultar
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutEstudiante>
  );
};

export default ExamenVocacional;
