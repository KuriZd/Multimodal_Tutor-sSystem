import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LineaDeVidaPage = () => {
  const { idCuentaTutorado } = useParams();
  const navigate = useNavigate();
  const [tutorado, setTutorado] = useState(null);
  const [respuestaVida, setRespuestaVida] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/vida/${idCuentaTutorado}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTutorado(data.tutorado);
        setRespuestaVida(data);
      })
      .catch((err) =>
        console.error("Error al cargar línea de vida:", err)
      );
  }, [idCuentaTutorado]);

  const handleSalir = () => navigate(-1);

  if (!respuestaVida || !tutorado) return <p className="mt-10 text-center">Cargando...</p>;

  const hitos = [
    { fecha: respuestaVida.fechaHitoUno, descripcion: respuestaVida.hitoUno },
    { fecha: respuestaVida.fechaHitoDos, descripcion: respuestaVida.hitoDos },
    { fecha: respuestaVida.fechaHitoTres, descripcion: respuestaVida.hitoTres },
    { fecha: respuestaVida.fechaHitoCuatro, descripcion: respuestaVida.hitoCuatro },
    { fecha: respuestaVida.fechaHitoCinco, descripcion: respuestaVida.hitoCinco },
  ].filter(h => h.descripcion);

  return (
    <div className="min-h-screen flex flex-col items-center w-[90%] sm:w-[80%] mx-auto py-10">
      {/* Header con nombre y foto */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-2 bg-[#86A0FE] text-white px-4 py-2 rounded-full shadow-md">
          <img
            src={tutorado.fotoPerfil || "https://i.pravatar.cc/100"}
            alt="Foto de perfil"
            className="h-8 w-8 rounded-full"
          />
          <span className="font-semibold text-base">
            {tutorado.nombres} {tutorado.apellidoPaterno} {tutorado.apellidoMaterno}
          </span>
        </div>
      </div>

      {/* Lista de hitos */}
      <div className="w-full sm:w-3/4 h-full space-y-[10px]">
        {hitos.map((hito, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 shadow-gray-300"
          >
            <div className="flex-grow flex flex-col md:flex-row items-center justify-between space-y-1 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <span className="font-semibold text-gray-800 text-base text-center md:text-left">
                {hito.fecha}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 ml-0 sm:ml-auto w-full sm:w-[75%] justify-center">
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-md text-base font-semibold bg-gray-200 text-gray-800">
                  {hito.descripcion}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineaDeVidaPage;

