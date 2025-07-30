import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutEstudiante from "../../components/layout-Estudiante";

const LineaVida = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([
    { fecha: "", descripcion: "" },
    { fecha: "", descripcion: "" },
    { fecha: "", descripcion: "" },
    { fecha: "", descripcion: "" },
    { fecha: "", descripcion: "" },
  ]);

  const handleChange = (index, field, value) => {
    const nuevosEventos = [...eventos];
    nuevosEventos[index][field] = value;
    setEventos(nuevosEventos);
  };

  const handleFinalizar = () => {
    // Aquí podrías guardar en backend o mostrar un mensaje
    console.log("Datos de la Línea de Vida:", eventos);
    alert("Actividad finalizada");
  };

  const handleSalir = () => {
    navigate("/cuaderno-actividades");
  };

  return (
    <LayoutEstudiante>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Instrucciones */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <h2 className="text-blue-500 font-semibold text-lg mb-4">
              Instrucciones para realizar la actividad:
            </h2>
            <p className="text-gray-800 mb-4">
              <strong>Paso 1:</strong> Piensa en eventos clave de tu vida:
              Identifica de 3 a 5 momentos importantes que hayan marcado tu
              desarrollo personal, académico o emocional. Pueden ser logros,
              desafíos o aprendizajes significativos.
            </p>
            <p className="text-gray-800">
              <strong>Paso 2:</strong> Registra cada evento en la Línea de Vida.
              Para cada evento, completa los siguientes campos:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Año en que ocurrió</li>
                <li>
                  Descripción del hito (Explica en una o dos frases por qué ese
                  evento es importante para ti)
                </li>
              </ul>
            </p>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 text-left font-medium">Fecha</th>
                  <th className="px-4 py-2 text-left font-medium">
                    Nombre y descripción del hito
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventos.map((evento, index) => (
                  <tr key={index}>
                    {/* Fecha */}
                    <td className="px-4 py-2 border-b">
                      <input
                        type="date"
                        className="w-full rounded border-gray-300 shadow-sm"
                        value={evento.fecha}
                        onChange={(e) =>
                          handleChange(index, "fecha", e.target.value)
                        }
                      />
                    </td>
                    {/* Descripción */}
                    <td className="px-4 py-2 border-b">
                      <textarea
                        rows="2"
                        className="w-full rounded border-gray-300 shadow-sm"
                        value={evento.descripcion}
                        onChange={(e) =>
                          handleChange(index, "descripcion", e.target.value)
                        }
                      ></textarea>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleFinalizar}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>

        {/* Botón Salir */}
        <div className="mt-4">
          <button
            onClick={handleSalir}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Salir
          </button>
        </div>
      </div>
    </LayoutEstudiante>
  );
};

export default LineaVida;
