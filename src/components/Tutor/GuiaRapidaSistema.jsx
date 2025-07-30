import { Home, Users, BookOpen, CheckSquare, BarChart2 } from "lucide-react";

const GuiaRapidaSistema = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-4">
      <div className="text-base font-semibold text-white bg-[#ff988a] px-3 py-1 rounded-full w-fit">
        Guía rápida del sistema
      </div>

      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex items-start space-x-3">
          <Home className="w-5 h-5 mt-1 text-gray-700" aria-label="Inicio" />
          <div>
            <strong>Inicio:</strong>
            <p>Estás aquí.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users
            className="w-6 h-6 mt-1 text-gray-700"
            aria-label="Tutorados"
          />
          <div>
            <strong>Tutorados:</strong>
            <p>
              Da seguimiento al desempeño y asistencia de tus tutorados, y
              atiende necesidades especiales.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <BookOpen
            className="w-6 h-6 mt-1 text-gray-700"
            aria-label="Actividades"
          />
          <div>
            <strong>Actividades:</strong>
            <p>
              Consulta el banco de actividades y revisa el progreso de tus
              tutorados. Verifica si ya las completaron.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <CheckSquare
            className="w-5 h-5 mt-1 text-gray-700"
            aria-label="Asistencia"
          />
          <div>
            <strong>Asistencia:</strong>
            <p>
              Registra la asistencia de tus tutorados a las sesiones de clase de
              forma sencilla.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <BarChart2
            className="w-6 h-6 mt-1 text-gray-700"
            aria-label="Reportes"
          />
          <div>
            <strong>Reportes:</strong>
            <p>
              Consulta un resumen de tu desempeño y las actividades realizadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiaRapidaSistema;
