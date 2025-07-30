import React from "react";
import LayoutEstudiante from "../../components/layout-Estudiante";

const InicioEstudiante = () => {
  return (
    <LayoutEstudiante>
    <div className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel izquierdo */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos generales */}
          <div className="bg-white rounded-lg shadow">
            <div className="bg-[#86A0FE] text-white p-1 rounded-t-lg shadow-sm mb-2 text-center">
              <h2 className="text-xl font-medium">¡Bienvenido!</h2>
            </div>
            <div className="p-4 pl-0">
              <h3 className="text-black font-normal mb-4 pl-3 flex items-center gap-2">
                Seleccione la opción que requiera de acuerdo a sus actividades en:
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </h3>
              <h3 className="bg-[#D9D9D9] rounded-r-lg px-4 py-0 text-black font-normal inline-block">
                Datos generales:
              </h3>

              <div className="rounded-md p-1">
                <div className="space-y-2">
                  <p className="pl-3">
                    <span className="font-medium">Matrícula:</span> 123456
                  </p>
                  <p className="pl-3">
                    <span className="font-medium">Carrera deseada:</span> Ingeniería en Sistemas
                  </p>
                  <p className="pl-3">
                    <span className="font-medium">Necesidad especial:</span>
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-semibold">
                      Sí/No
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guía rápida del sistema */}
          <div className="bg-white rounded-r-lg shadow overflow-hidden border-l-4 border-[#86A0FE]">
            <div className="p-4">
              <h3 className="text-[#86A0FE] bg-[#EEF2FF] font-semibold mb-6 inline-block px-4 py-1 rounded-full">
                Guía rápida del sistema
              </h3>

              <div className="space-y-5">
                {[
                  {
                    title: "Inicio",
                    description: "Estás aquí.",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    ),
                  },
                  {
                    title: "Mi información",
                    description:
                      "Aquí puedes consultar tu información general, editar tu información y si tienes alguna necesidad especial, puedes indicarlo.",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    ),
                  },
                  {
                    title: "Examen de vocación",
                    description:
                      "Aquí puedes realizar el examen de vocación y consultar los resultados del examen.",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    ),
                  },
                  {
                    title: "Libreta de actividades",
                    description:
                      "Aquí puedes realizar diferentes test y consultar resultados.",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    ),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-gray-700 shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{item.title}:</p>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="space-y-6">
          <div className="bg-white rounded-r-lg shadow overflow-hidden border-l-4 border-[#86A0FE]">
            <div className="p-6">
              <h3 className="text-[#86A0FE] bg-[#EEF2FF] font-semibold mb-6 inline-block px-4 py-1 rounded-full">
                Información de MiTutor
              </h3>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p>
                  En MiTutor podrás encontrar diferentes test para tu formación, entre los principales tenemos el examen de vocación, análisis FODA, línea de vida, examen de comprensión lectora entre otros.
                </p>
                <p>
                  Tu tutor estará al pendiente de tus resultados en estos test.
                </p>
                <p>
                  Si requieres atención especial lo puedes pedir en el módulo de “Mi información” y llenar el formulario (tu tutor te dará seguimiento).
                </p>
                <p>
                  Puedes consultar los resultados de los test en el cuaderno de actividades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </LayoutEstudiante>

  );
};

export default InicioEstudiante;
