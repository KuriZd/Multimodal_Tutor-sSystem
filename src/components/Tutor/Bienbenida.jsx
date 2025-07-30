import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import axios from "axios";

const BienvenidaTutor = () => {
  const [nombreTutor, setNombreTutor] = useState("Cargando...");
  const [rfc, setRfc] = useState("Cargando...");
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    const curp = usuario.curp;

    // Obtener datos del tutor
    axios
      .get(`http://localhost:8000/api/tutores/curp/${curp}`)
      .then((res) => {
        const tutor = res.data;
        const nombreCompleto = `${tutor.nombres} ${tutor.apellidoPaterno} ${tutor.apellidoMaterno}`;
        setNombreTutor(nombreCompleto);
        setRfc(tutor.curp || "N/A");
      })
      .catch((err) => {
        console.error("❌ Error al obtener tutor:", err);
        setNombreTutor("No encontrado");
        setRfc("N/A");
      });

    // Obtener grupos
    axios
      .get(`http://localhost:8000/api/tutores/${curp}/grupos`)
      .then((res) => setGrupos(res.data))
      .catch((err) => {
        console.error("❌ Error al obtener los grupos:", err);
        setGrupos([]);
      });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-2xl">
      {/* Encabezado */}
      <div className="bg-red-400 text-white text-lg font-semibold text-center py-3">
        Bienvenido/a {nombreTutor}
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4 text-base text-gray-700">
        <div className="flex justify-between items-center">
          <p className="text-start text-lg w-full">
            Seleccione la opción que requiera de acuerdo a sus actividades en:
          </p>
          <Menu className="w-6 h-6 text-gray-700 ml-2" />
        </div>

        {/* Datos generales */}
        <div>
          <span className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-base font-medium">
            Datos generales:
          </span>
          <p className="mt-3 font-medium">
            CURP: <span className="font-normal">{rfc}</span>
          </p>
          <div className="mt-1">
            <p className="font-medium mb-1">Grupos tutorados:</p>
            {grupos.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {grupos.map((g, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    Grupo {g.letra}
                  </span>
                ))}
              </div>
            ) : (
              <p className="italic text-gray-500">Ninguno asignado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BienvenidaTutor;
