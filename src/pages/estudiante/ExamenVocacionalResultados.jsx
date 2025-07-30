import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutEstudiante from "../../components/layout-Estudiante";

const ExamenVocacionalResultados = () => {
  const navigate = useNavigate();

  return (
    <LayoutEstudiante>
      <div className="min-h-screen flex justify-center items-start py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
          {/* Carreras recomendadas */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="bg-[#86A0FE] text-white px-4 py-2 rounded-full inline-block mb-4">
              Carreras recomendadas
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Top 3 carreras para ti:
            </h3>
            <div className="space-y-3">
              <div className="text-gray-700">
                <strong>1.-</strong> Ingeniería en sistemas computacionales
              </div>
              <div className="text-gray-700">
                <strong>2.-</strong> Ingeniería en desarrollo de videojuegos
              </div>
              <div className="text-gray-700">
                <strong>3.-</strong> Licenciatura en administración
              </div>
            </div>
          </div>

          {/* Resumen de resultados */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="bg-[#BEB1FE] text-white px-4 py-2 rounded-full inline-block mb-4">
              Resumen de resultados
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ¡Aquí están tus resultados!
            </h3>
            <div className="rounded-lg p-4">
              <p className="text-gray-700">
                "Tus respuestas indican que tienes una gran afinidad con áreas
                de ingeniería y de tecnología. ¡Explora estas opciones y encuentra
                tu camino!"
              </p>
            </div>
          </div>

          {/* Recomendaciones generales */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="bg-[#F5A89F] text-white px-4 py-2 rounded-full inline-block mb-4">
              Recomendaciones generales
            </div>
            <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <p>
                Las áreas de ingeniería, tecnología y finanzas requieren habilidades
                analíticas, resolución de problemas y pensamiento lógico. Para destacar,
                es clave fortalecer matemáticas, programación y análisis de datos en
                plataformas como Khan Academy o Coursera. Aprender lenguajes como
                Python o SQL también es fundamental.
              </p>
              <p>
                Además de las habilidades técnicas, la comunicación y el trabajo en
                equipo son esenciales. Desarrollar liderazgo, mejorar la explicación de
                conceptos y fortalecer el inglés técnico facilitarán el crecimiento
                profesional. Explorar distintas especialidades como ingeniería de
                software, ciencia de datos o análisis financiero permitirá elegir el
                camino adecuado.
              </p>
              <p>
                El aprendizaje continuo es clave en estos campos en constante evolución.
                Tomar cursos en línea, seguir blogs especializados y aplicar conocimientos
                en proyectos reales ayudará a mantenerse competitivo. Con esfuerzo y
                dedicación, es posible construir una carrera exitosa en estas áreas,
                aprovechando al máximo las oportunidades de crecimiento.
              </p>
              <button
                onClick={() => navigate("/examen-vocacional")}
                className="bg-gray-300 hover:bg-gray-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutEstudiante>
  );
};

export default ExamenVocacionalResultados;
