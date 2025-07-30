import React, { useState } from "react";
import LayoutEstudiante from "../../components/layout-Estudiante";
import { useNavigate } from "react-router-dom";

const AnalisisFodae = () => {
  const navigate = useNavigate();

  // Actualizado con 4 preguntas en Fortalezas
  const sections = [
    {
      name: "Fortalezas",
      questions: [
        {
          question: "¿Cuáles son tus habilidades más fuertes?",
          options: [
            "Comunicación efectiva",
            "Resolución de problemas",
            "Creatividad",
            "Liderazgo",
            "Pensamiento crítico",
            "Disciplina",
            "Trabajo en equipo",
            "Adaptabilidad",
            "Organización",
            "Empatía",
          ],
        },
        {
          question: "¿Qué cosas se te facilitan en la escuela?",
          options: [
            "Matemáticas",
            "Ciencias",
            "Literatura",
            "Idiomas",
            "Educación física",
            "Artes",
            "Historia",
            "Tecnología",
            "Debate",
            "Investigación",
          ],
        },
        {
          question: "¿Qué te diferencia de los demás estudiantes?",
          options: [
            "Pensamiento innovador",
            "Perseverancia",
            "Curiosidad insaciable",
            "Habilidad para escuchar",
            "Autodidacta",
            "Capacidad de motivar a otros",
            "Rapidez para aprender",
            "Sentido del humor",
            "Originalidad",
            "Conocimiento especializado",
          ],
        },
        {
          question: "¿Cuáles son tus logros más importantes?",
          options: [
            "Buenas calificaciones constantes",
            "Ganar un concurso o premio",
            "Superar un gran desafío académico",
            "Aprender un nuevo idioma o habilidad",
            "Ser parte de un equipo deportivo o club exitoso",
            "Voluntariado o servicio comunitario",
            "Desarrollar un proyecto personal",
            "Mejorar en una materia difícil",
            "Ser mentor/a de otros",
            "Obtener una beca o reconocimiento",
          ],
        },
      ],
    },
    {
      name: "Oportunidades",
      questions: [
        {
          question: "¿Qué recursos o apoyo tienes disponibles?",
          options: [
            "Acceso a buena biblioteca",
            "Internet de alta velocidad",
            "Apoyo familiar/tutores",
            "Becas o ayudas financieras",
            "Programas de tutorías",
            "Tecnología educativa",
            "Conexiones con profesionales",
            "Eventos o talleres gratuitos",
            "Mentores",
            "Tiempo libre para estudiar",
          ],
        },
        {
          question: "¿Qué nuevas habilidades podrías aprender?",
          options: [
            "Programación",
            "Diseño gráfico",
            "Edición de video",
            "Hablar en público",
            "Gestión de proyectos",
            "Análisis de datos",
            "Marketing digital",
            "Un nuevo idioma",
            "Primeros auxilios",
            "Habilidades artísticas",
          ],
        },
        {
          question: "¿Hay personas que puedan ayudarte a crecer?",
          options: [
            "Profesores inspiradores",
            "Compañeros de estudio motivados",
            "Familiares con experiencia",
            "Amigos con diferentes perspectivas",
            "Mentores o consejeros",
            "Expertos en mi campo de interés",
            "Comunidad online de aprendizaje",
            "Grupos de estudio",
            "Personas de diferentes culturas",
            "Voluntarios",
          ],
        },
        {
          question: "¿Qué tendencias actuales te benefician?",
          options: [
            "Mayor acceso a cursos online",
            "Demanda creciente en mi área de estudio",
            "Tecnología emergente",
            "Globalización",
            "Sostenibilidad y conciencia ambiental",
            "Trabajo remoto",
            "Inteligencia Artificial",
            "Economía colaborativa",
            "Salud y bienestar",
            "Diversidad e inclusión",
          ],
        },
      ],
    },
    {
      name: "Debilidades",
      questions: [
        {
          question: "¿Qué áreas te resultan difíciles en el estudio?",
          options: [
            "Matemáticas avanzadas",
            "Escritura académica",
            "Concentración",
            "Gestión del tiempo",
            "Memorización",
            "Presentaciones orales",
            "Resolver problemas complejos",
            "Trabajo en grupo",
            "Investigación",
            "Análisis crítico",
          ],
        },
        {
          question: "¿Qué hábitos te impiden avanzar?",
          options: [
            "Procrastinación",
            "Distracción (redes sociales, juegos)",
            "Falta de sueño",
            "Dieta poco saludable",
            "No hacer ejercicio",
            "Exceso de perfeccionismo",
            "Miedo al fracaso",
            "Falta de planificación",
            "Autocrítica excesiva",
            "No pedir ayuda",
          ],
        },
        {
          question: "¿Qué cosas podrías mejorar de ti mismo/a?",
          options: [
            "Autoconfianza",
            "Disciplina",
            "Paciencia",
            "Control emocional",
            "Resiliencia",
            "Habilidad para negociar",
            "Toma de decisiones",
            "Escucha activa",
            "Empatía",
            "Creatividad",
          ],
        },
        {
          question: "¿Qué críticas has recibido sobre tu desempeño?",
          options: [
            "Falta de participación",
            "Descuidos en los detalles",
            "Problemas de puntualidad",
            "Dificultad para trabajar en equipo",
            "Ser demasiado callado/a",
            "Ser demasiado dominante",
            "Falta de iniciativa",
            "No pedir ayuda a tiempo",
            "Entrega tardía de trabajos",
            "Falta de seguimiento",
          ],
        },
      ],
    },
    {
      name: "Amenazas",
      questions: [
        {
          question: "¿Qué obstáculos externos enfrentas en tus estudios?",
          options: [
            "Carga académica pesada",
            "Presión de exámenes",
            "Distracciones familiares/sociales",
            "Problemas de salud",
            "Recursos limitados",
            "Falta de motivación en el entorno",
            "Cambios en los planes de estudio",
            "Competencia académica alta",
            "Problemas económicos",
            "Ruido o ambiente poco propicio para estudiar",
          ],
        },
        {
          question: "¿Qué situaciones te causan estrés o distracción?",
          options: [
            "Exámenes finales",
            "Proyectos en grupo",
            "Conflictos interpersonales",
            "Presión por resultados",
            "Cambios inesperados",
            "Problemas tecnológicos",
            "Eventos sociales",
            "Expectativas de otros",
            "Incertidumbre sobre el futuro",
            "Multitarea",
          ],
        },
        {
          question: "¿Hay alguna competencia o presión que te afecte?",
          options: [
            "Competencia con compañeros",
            "Presión por entrar a cierta universidad/carrera",
            "Expectativas familiares altas",
            "Presión de la sociedad",
            "Comparación con otros",
            "Necesidad de una beca",
            "Mercado laboral competitivo",
            "Estándares académicos exigentes",
            "Presión por ser 'el mejor'",
            "Tiempo limitado",
          ],
        },
        {
          question: "¿Qué riesgos podrían afectar tus metas?",
          options: [
            "Enfermedad o lesión",
            "Problemas financieros",
            "Desinterés por el estudio",
            "Cambio de carrera/intereses",
            "Fracaso en un examen importante",
            "Pérdida de un mentor/apoyo",
            "Desastres naturales",
            "Problemas tecnológicos",
            "Pérdida de motivación",
            "Conflictos personales",
          ],
        },
      ],
    },
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [fodaCompleted, setFodaCompleted] = useState(false);

  const currentSection = sections[currentSectionIndex];

  const handleCheckboxChange = (sectionName, questionIndex, option) => {
    setAnswers((prevAnswers) => {
      const sectionAnswers = prevAnswers[sectionName] || {};
      const questionAnswers = sectionAnswers[questionIndex] || [];
      const updatedAnswers = questionAnswers.includes(option)
        ? questionAnswers.filter((item) => item !== option)
        : [...questionAnswers, option];

      return {
        ...prevAnswers,
        [sectionName]: {
          ...sectionAnswers,
          [questionIndex]: updatedAnswers,
        },
      };
    });
  };

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      setFodaCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleSalir = () => {
    navigate("/cuaderno-actividades");
  };

  return (
    <LayoutEstudiante>
      <div className="h-fit w-fit mx-auto">
        {!fodaCompleted && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg my-8">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div className="bg-[#86A0FE] text-white p-2 rounded-full w-max mx-auto sm:mx-0 mb-4 sm:mb-2">
                <span className="font-semibold text-lg">
                  Análisis FODA ({currentSection.name})
                </span>
              </div>
              <span className="text-gray-600">
                {currentSectionIndex + 1} / {sections.length}
              </span>
            </div>

            {/* Descripción */}
            <div className="mb-6 text-gray-700 text-sm italic">
              {currentSection.name === "Fortalezas" && (
                <p>
                  En esta sección, identifica las <strong>Fortalezas</strong> de tu
                  proyecto. Piensa en atributos internos y positivos que te dan
                  ventaja competitiva.
                </p>
              )}
              {currentSection.name === "Oportunidades" && (
                <p>
                  Explora las <strong>Oportunidades</strong>: factores externos y
                  positivos que podrías aprovechar para impulsar tu proyecto.
                </p>
              )}
              {currentSection.name === "Debilidades" && (
                <p>
                  Reflexiona sobre las <strong>Debilidades</strong> de tu
                  proyecto: atributos internos y negativos que limitan tu
                  capacidad.
                </p>
              )}
              {currentSection.name === "Amenazas" && (
                <p>
                  Identifica las <strong>Amenazas</strong>: factores externos que
                  podrían perjudicar tu proyecto.
                </p>
              )}
            </div>

            {/* Preguntas */}
            <div className="space-y-8 max-h-96 overflow-y-auto pr-4">
              {currentSection.questions.map((qData, qIndex) => (
                <div key={qIndex}>
                  <hr className="w-full bg-[#86A0FE] h-2 rounded-t-md" />
                  <label className="block text-gray-700 font-medium mb-3 text-lg">
                    {qIndex + 1}. {qData.question}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                    {qData.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`q_${currentSectionIndex}_${qIndex}_${oIndex}`}
                          checked={
                            answers[currentSection.name]?.[qIndex]?.includes(option) ||
                            false
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              currentSection.name,
                              qIndex,
                              option
                            )
                          }
                          className="form-checkbox h-5 w-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <label
                          htmlFor={`q_${currentSectionIndex}_${qIndex}_${oIndex}`}
                          className="ml-2 text-gray-700"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navegación */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentSectionIndex === 0}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Atrás
              </button>
              {currentSectionIndex < sections.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  onClick={() => setFodaCompleted(true)}
                  className="px-6 py-2 bg-[#86A0FE] text-white rounded-md"
                >
                  Terminar
                </button>
              )}
            </div>
          </div>
        )}

        {fodaCompleted && (
          <div className="flex flex-col items-center justify-center p-4 min-h-screen">
            {/* Círculo Central para Mobile */}
            <div className="block md:hidden w-64 h-64 bg-teal-600 rounded-full flex flex-col items-center justify-center shadow-xl mb-8 mx-auto">
              <div className="grid grid-cols-2 gap-0 w-full h-full text-white text-center font-bold text-4xl">
                <div className="flex items-center justify-center relative border-r border-b border-teal-500 p-2">
                  F
                  <span className="absolute bottom-2 text-sm font-normal">Fortalezas</span>
                </div>
                <div className="flex items-center justify-center relative border-b border-teal-500 p-2">
                  A
                  <span className="absolute bottom-2 text-sm font-normal">Amenazas</span>
                </div>
                <div className="flex items-center justify-center relative border-r border-teal-500 p-2">
                  <span className="absolute top-2 text-sm font-normal">Oportunidades</span>
                  O
                </div>
                <div className="flex items-center justify-center relative p-2">
                  <span className="absolute top-2 text-sm font-normal">Debilidades</span>
                  D
                </div>
              </div>
            </div>

            {/* Contenedor principal del diagrama FODA */}
            <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-x-8 gap-y-6 max-w-6xl w-full mx-auto relative p-4">
              
              {/* Fortalezas */}
              <div className="p-4 rounded-lg shadow-md bg-white text-left h-48 overflow-y-auto w-full max-w-sm md:w-auto mb-4 md:mb-0 md:col-span-1 md:mr-36">
                <h3 className="font-bold text-gray-800 mb-2">Fortalezas</h3>
                {answers["Fortalezas"] ? (
                  <ul className="list-none text-gray-700">
                    {Object.entries(answers["Fortalezas"]).map(([qIndex, selectedOptions]) => (
                      selectedOptions.length > 0 && (
                        <li key={qIndex} className="font-semibold mt-2 text-sm">
                          {sections[0].questions[qIndex].question}
                          <ul className="list-disc list-inside ml-4 text-xs text-gray-600">
                            {selectedOptions.map((option, idx) => (
                              <li key={idx}>{option}</li>
                            ))}
                          </ul>
                        </li>
                      )
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">Sin resultados.</p>
                )}
              </div>

              {/* Amenazas */}
              <div className="p-4 rounded-lg shadow-md bg-white text-left h-48 overflow-y-auto w-full max-w-sm md:w-auto mb-4 md:mb-0 md:col-span-1 md:ml-36">
                <h3 className="font-bold text-gray-800 mb-2">Amenazas</h3>
                {answers["Amenazas"] ? (
                  <ul className="list-none text-gray-700">
                    {Object.entries(answers["Amenazas"]).map(([qIndex, selectedOptions]) => (
                      selectedOptions.length > 0 && (
                        <li key={qIndex} className="font-semibold mt-2 text-sm">
                          {sections[3].questions[qIndex].question}
                          <ul className="list-disc list-inside ml-4 text-xs text-gray-600">
                            {selectedOptions.map((option, idx) => (
                              <li key={idx}>{option}</li>
                            ))}
                          </ul>
                        </li>
                      )
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">Sin resultados.</p>
                )}
              </div>

              {/* Círculo Central FODA para Desktop */}
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-64 h-64 md:w-80 md:h-80 bg-teal-600 rounded-full flex flex-col items-center justify-center shadow-xl">
                <div className="grid grid-cols-2 gap-0 w-full h-full text-white text-center font-bold text-4xl">
                  <div className="flex items-center justify-center relative border-r border-b border-teal-500 p-2">
                    F
                    <span className="absolute bottom-2 text-sm font-normal">Fortalezas</span>
                  </div>
                  <div className="flex items-center justify-center relative border-b border-teal-500 p-2">
                    A
                    <span className="absolute bottom-2 text-sm font-normal">Amenazas</span>
                  </div>
                  <div className="flex items-center justify-center relative border-r border-teal-500 p-2">
                    O
                    <span className="absolute top-2 text-sm font-normal">Oportunidades</span>
                  </div>
                  <div className="flex items-center justify-center relative p-2">
                    D
                    <span className="absolute top-2 text-sm font-normal">Debilidades</span>
                  </div>
                </div>
              </div>

              {/* Oportunidades */}
              <div className="p-4 rounded-lg shadow-md bg-white text-left h-48 overflow-y-auto w-full max-w-sm md:w-auto mb-4 md:mb-0 md:col-span-1 md:mr-36">
                <h3 className="font-bold text-gray-800 mb-2">Oportunidades</h3>
                {answers["Oportunidades"] ? (
                  <ul className="list-none text-gray-700">
                    {Object.entries(answers["Oportunidades"]).map(([qIndex, selectedOptions]) => (
                      selectedOptions.length > 0 && (
                        <li key={qIndex} className="font-semibold mt-2 text-sm">
                          {sections[1].questions[qIndex].question}
                          <ul className="list-disc list-inside ml-4 text-xs text-gray-600">
                            {selectedOptions.map((option, idx) => (
                              <li key={idx}>{option}</li>
                            ))}
                          </ul>
                        </li>
                      )
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">Sin resultados.</p>
                )}
              </div>

              {/* Debilidades */}
              <div className="p-4 rounded-lg shadow-md bg-white text-left h-48 overflow-y-auto w-full max-w-sm md:w-auto md:col-span-1 md:ml-36">
                <h3 className="font-bold text-gray-800 mb-2">Debilidades</h3>
                {answers["Debilidades"] ? (
                  <ul className="list-none text-gray-700">
                    {Object.entries(answers["Debilidades"]).map(([qIndex, selectedOptions]) => (
                      selectedOptions.length > 0 && (
                        <li key={qIndex} className="font-semibold mt-2 text-sm">
                          {sections[2].questions[qIndex].question}
                          <ul className="list-disc list-inside ml-4 text-xs text-gray-600">
                            {selectedOptions.map((option, idx) => (
                              <li key={idx}>{option}</li>
                            ))}
                          </ul>
                        </li>
                      )
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">Sin resultados.</p>
                )}
              </div>
            </div>

            {/* Botones Inferiores */}
            <div className="mt-8 flex space-x-4 justify-center w-full max-w-6xl">
              <button
                onClick={handleSalir}
                className="px-6 py-2 bg-[#86A0FE] text-white rounded-md transition duration-200 ease-in-out"
              >
                Salir
              </button>
            </div>
          </div>
        )}

      </div>
    </LayoutEstudiante>
  );
};

export default AnalisisFodae;
