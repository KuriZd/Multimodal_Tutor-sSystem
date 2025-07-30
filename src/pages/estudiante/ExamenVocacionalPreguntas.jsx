import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutEstudiante from "../../components/layout-Estudiante";

const ExamenVocacionalPreguntas = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const totalSteps = 4;

  const handleAnswerChange = (questionKey, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /*
  const finishExam = () => {
    // Aquí podrías manejar el envío de las respuestas, guardarlas en localStorage, etc.
    console.log("Respuestas:", answers);
    navigate("/examen-vocacional-resultado");
  };*/

  // Preguntas por sección
  const preguntas = {
    1: [
      "¿Qué tipo de actividades disfrutas más en tu tiempo libre?",
      "Si tuvieras un día libre para hacer lo que quisieras, ¿qué harías?",
      "¿Cómo te sientes al hablar en público?",
      "¿Te gusta trabajar con computadoras y tecnología?",
      "¿Prefieres resolver problemas matemáticos o escribir ensayos?",
    ],
    2: [
      "¿Cómo te sientes al analizar datos o resolver problemas lógicos?",
      "¿Qué tan bien se te da trabajar en equipo?",
      "¿Qué tipo de tareas disfrutas más?",
      "¿Te gustaría trabajar en un laboratorio haciendo investigaciones?",
      "¿Qué prefieres: Diseñar una campaña publicitaria o escribir un código de software?",
    ],
    3: [
      "¿Qué es lo más importante para ti en una carrera profesional?",
      "¿En qué ambiente de trabajo te sentirías más cómodo?",
      "¿Qué tipo de problemas te gustaría resolver en el futuro?",
      "¿Prefieres un trabajo con horarios fijos o uno con más flexibilidad?",
      "¿Cómo te gustaría que fuera tu día de trabajo ideal?",
    ],
    4: [
      "¿Cuál de estas materias disfrutas más?",
      "¿Te gustaría trabajar en salud o ciencias médicas?",
      "¿Qué tipo de herramientas disfrutas más usar?",
      "Si tuvieras que elegir, ¿Qué prefieres?",
      "¿Te gustaría liderar un equipo de trabajo?",
    ],
  };

  const opciones = {
    1: [
      ["Deporte", "Arte", "Lectura"],
      ["Viajar", "Estudiar", "Descansar"],
      ["Cómodo", "Nervioso", "Lo evito"],
      ["Sí", "No"],
      ["Matemáticos", "Ensayos"],
    ],
    2: [
      ["Muy cómodo", "Algo cómodo", "No me gusta mucho"],
      ["Muy bien", "Regular", "No mucho"],
      ["Tareas manuales", "Tareas analíticas", "Tareas creativas"],
      ["Sí, mucho", "Me da igual", "No me interesa"],
      ["Diseñar una campaña publicitaria", "Escribir un código de software", "Ambos me interesan"],
    ],
    3: [
      ["Salario competitivo", "Estabilidad laboral", "Crecimiento profesional"],
      ["En equipo", "Independiente", "Flexible"],
      ["Técnicos", "Humanos o sociales", "Creativos"],
      ["Horarios fijos", "Flexibilidad horaria"],
      ["Con rutinas definidas", "Con variedad de actividades", "En constante cambio"],
    ],
    4: [
      ["Matemáticas", "Lengua y Literatura", "Ciencias Naturales"],
      ["Sí, me interesa", "No mucho", "Indeciso"],
      ["Herramientas manuales", "Computadoras y software", "Materiales artísticos"],
      ["Trabajar con personas", "Trabajar con datos", "Trabajar con cosas"],
      ["Sí", "No", "Tal vez"],
    ],
  };

  return (
    <LayoutEstudiante>
    <div className="min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <h2 className="text-blue-400 text-lg font-semibold mb-4">Examen vocacional</h2>
        <div className="text-right text-gray-500 mb-4">
          {currentStep} / {totalSteps}
        </div>

        {/* Preguntas */}
        <div className="space-y-4">
          {preguntas[currentStep].map((pregunta, index) => {
            const questionKey = `s${currentStep}_q${index + 1}`;
            return (
              <div key={questionKey}>
                <p className="font-medium mb-1">
                  {index + 1 + (currentStep - 1) * 5}. {pregunta}
                </p>
                <select
                  className="w-full border-gray-300 rounded-md shadow-sm"
                  value={answers[questionKey] || ""}
                  onChange={(e) => handleAnswerChange(questionKey, e.target.value)}
                >
                  <option value="" disabled>
                    --Seleccione una opción--
                  </option>
                  {opciones[currentStep][index].map((opcion, idx) => (
                    <option key={idx} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-6">
          {currentStep === 1 ? (
            <>
              <button
                onClick={() => navigate("/examen-vocacional")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
              >
                Salir
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Siguiente
              </button>
            </>
          ) : currentStep < totalSteps ? (
            <>
              <button
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
              >
                Regresar
              </button>
              <button
                onClick={nextStep}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Siguiente
              </button>
            </>
          ) : (
            <>
              <button
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
              >
                Regresar
              </button>
              <button
                onClick={() => navigate("/examen-vocacionalResultados")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Terminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </LayoutEstudiante>

  );
};

export default ExamenVocacionalPreguntas;
