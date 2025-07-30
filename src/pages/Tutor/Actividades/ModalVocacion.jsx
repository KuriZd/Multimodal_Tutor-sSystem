import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResultadosVocacionalesPage = () => {
  const { idCuentaTutorado } = useParams();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/examenes-vocacionales/${idCuentaTutorado}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDatos(data))
      .catch((err) =>
        console.error("Error al cargar resultado vocacional:", err)
      );
  }, [idCuentaTutorado]);

  if (!datos) return <p className="mt-10 text-center">Cargando...</p>;

  const { tutorado, carrerasRecomendadas, areasDeEspecialidad, recomendaciones } = datos;

  const handleSalir = () => navigate(-1);

  return (
    <div className="h-full flex flex-col items-center px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2 bg-[#86A0FE] text-white px-4 mt-10 py-2 rounded-full shadow-md">
          <img
            src={tutorado.fotoPerfil || "https://i.pravatar.cc/100"}
            alt="Foto de perfil"
            className="h-8 w-8 rounded-full"
          />
          <span className="font-semibold text-sm">
            {tutorado.nombres} {tutorado.apellidoPaterno} {tutorado.apellidoMaterno}
          </span>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full mt-10">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="bg-[#86A0FE] text-white px-4 py-2 rounded-full inline-block mb-4">
            Carreras recomendadas
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top 3 carreras para ti:
          </h3>
          <div className="space-y-3 text-gray-700">
            <p>{carrerasRecomendadas}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="bg-[#a086fe] text-white px-4 py-2 rounded-full inline-block mb-4">
            Áreas Recomendadas
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            ¡Aquí están tus resultados!
          </h3>
          <div className="rounded-lg p-4 text-gray-700">
            <p>{areasDeEspecialidad}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="bg-[#f98ba2] text-white px-4 py-2 rounded-full inline-block mb-4">
            Recomendaciones generales
          </div>
          <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
            <p>{recomendaciones}</p>
            <button
              onClick={handleSalir}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadosVocacionalesPage;

