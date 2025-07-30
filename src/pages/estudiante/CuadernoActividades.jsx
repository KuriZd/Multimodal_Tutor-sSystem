import React from "react";
import LayoutEstudiante from "../../components/layout-Estudiante";
import { useNavigate } from "react-router-dom";

const CuadernoActividades = () => {
  const navigate = useNavigate();

  return (
    <LayoutEstudiante>
    <div className="min-h-screen py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        ¡Hola Saul, aquí están tus actividades!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Actividad 1 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="bg-[#86A0FE] text-white px-4 py-2 rounded-full inline-block mb-4">
            Análisis FODA
          </div>
          <p className="text-gray-700 mb-6">
            El Análisis FODA (Fortalezas, Oportunidades, Debilidades y Amenazas)
            es una herramienta de autoconocimiento que ayuda a evaluar la
            situación personal de un estudiante. Se utiliza para identificar
            puntos fuertes y áreas de mejora.
          </p>
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/analisis-fodae")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm"
            >
              Volver a realizar
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm"
            >
              Resultados
            </button>
          </div>
        </div>

        {/* Actividad 2 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="bg-[#86A0FE] text-white px-4 py-2 rounded-full inline-block mb-4">
            Línea de vida
          </div>
          <p className="text-gray-700 mb-6">
            La Línea de Vida ayuda a visualizar momentos importantes de la vida,
            tanto positivos como desafiantes. Sirve para proyectar metas y
            aprendizajes clave.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/linea-vida")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm"
            >
              Continuar actividad
            </button>
          </div>
        </div>

        {/* Actividad 3 */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="bg-[#86A0FE] text-white px-4 py-2 rounded-full inline-block mb-4">
            Comprensión lectora
          </div>
          <p className="text-gray-700 mb-6">
            La Comprensión Lectora es la habilidad de leer, interpretar y
            analizar un texto para entender su significado. Permite captar ideas
            principales y reflexionar sobre el contenido.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/comprension-lectora")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm"
            >
              Iniciar actividad
            </button>
          </div>
        </div>

        {/* Aquí podrían ir las actividades 4 a 6 en un futuro */}
      </div>
    </div>
    </LayoutEstudiante>
  );
};

export default CuadernoActividades;
