import React, { useState } from "react";
import LayoutEstudiante from "../../components/layout-Estudiante";
import { useNavigate } from "react-router-dom";

const MiInformacionE = () => {
  // Estados para mostrar/ocultar preguntas dependientes
  const [disability, setDisability] = useState("");
  const [illness, setIllness] = useState("");
  const [condition, setCondition] = useState("");
  const navigate = useNavigate();

  return (
    <LayoutEstudiante>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sección izquierda - Necesidades especiales */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-blue-400 bg-blue-50 py-2 px-4 rounded-lg mb-6">
              Necesidad especial
            </h2>

            {/* Pregunta 1: Discapacidad */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Cuenta con alguna discapacidad?
              </label>
              <select
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={disability}
                onChange={(e) => setDisability(e.target.value)}
              >
                <option value="">--Seleccione una opción--</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            {disability === "Sí" && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">¿Cuál?</label>
                <textarea
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Explique aquí..."
                ></textarea>
              </div>
            )}

            {/* Pregunta 2: Enfermedad */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Usted tiene alguna enfermedad?
              </label>
              <select
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={illness}
                onChange={(e) => setIllness(e.target.value)}
              >
                <option value="">--Seleccione una opción--</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            {illness === "Sí" && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">¿Cuál?</label>
                <textarea
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Explique aquí..."
                ></textarea>
              </div>
            )}

            {/* Pregunta 3: Condición especial */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                ¿Usted tiene alguna condición especial?
              </label>
              <select
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">--Seleccione una opción--</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            {condition === "Sí" && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">¿Cuál?</label>
                <textarea
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Explique aquí..."
                ></textarea>
              </div>
            )}

            {/* Botón Guardar */}
            <div className="text-right">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Guardar
              </button>
            </div>
          </div>

          {/* Sección derecha - Información general */}
          <div className="space-y-4">
            {/* Info General */}
            <div className="bg-white rounded-lg shadow-md p-6 relative">
              <div className="absolute top-3 right-3 bg-blue-500 text-white py-1 px-3 rounded-full text-sm font-semibold">
                <div>
                  <span className="font-semibold">MATRICULA:</span> 123456
                </div>
              </div>
              <h2 className="text-lg font-medium text-blue-400 bg-blue-50 py-2 px-4 rounded-lg mb-6 mt-7">
                Mi información general
              </h2>
              <div className="flex flex-wrap md:flex-nowrap">
                <div className="w-full md:w-2/3 space-y-2 mb-4 md:mb-0">
                  <p>
                    <strong>Nombre:</strong> Juan Pérez
                  </p>
                  <p>
                    <strong>CURP:</strong> XXXX123456XXXXXX
                  </p>
                  <p>
                    <strong>Correo:</strong> juanperez@gmail.com
                  </p>
                  <p>
                    <strong>Teléfono:</strong> 123-456-7890
                  </p>
                  <p>
                    <strong>Carrera:</strong> Ingeniería en Sistemas
                  </p>
                </div>
                <div className="w-full md:w-1/3 flex justify-center items-start">
                  <div className="w-32 h-32 overflow-hidden rounded-full">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-right">
                <button
                  onClick={() => navigate("/mi-informacionEditar")}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-3 rounded text-sm"
                >
                  Editar datos
                </button>

              </div>
            </div>

            {/* Info Adicional */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-blue-400 bg-blue-50 py-2 px-4 rounded-lg mb-6">
                Información adicional
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Teléfono:</span> 123-456-7890
                  </div>
                  <div>
                    <span className="font-semibold">Estado civil:</span> Soltero
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> juanperez@gmail.com
                  </div>
                  <div>
                    <span className="font-semibold">Municipio:</span> Ciudad de México
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Estado:</span> CDMX
                  </div>
                  <div>
                    <span className="font-semibold">Calle y número:</span> Calle 123
                  </div>
                  <div>
                    <span className="font-semibold">Código postal:</span> 12345
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutEstudiante>
  );
};

export default MiInformacionE;
