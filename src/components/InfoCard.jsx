import {
  MoreVertical,
  User,
  Pencil,
  BookOpen,
  Users,
  UserPlus,
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import VerPerfil from "./VerPerfilTutor";
import EditarPerfil from "./EditProfile";
import { useNavigate } from "react-router-dom";

// Subcomponente reutilizable
const InfoItem = ({ label, value, extraClass = "" }) => (
  <div className="w-1/2">
    <p className="text-lg font-semibold text-gray-800">
      {label}: <span className={`font-normal ${extraClass}`}>{value}</span>
    </p>
  </div>
);

// Acciones según el tipo
const getAccionesMenu = (tipo) => [
  { icon: <User size={18} />, label: "Ver Perfil" },
  { icon: <Pencil size={18} />, label: "Editar Perfil" },
  { icon: <BookOpen size={18} />, label: "Ver Citas" },
  ...(tipo !== "Tutorados"
    ? [{ icon: <Users size={18} />, label: "Asignar Tutor" }]
    : []),
];

export default function CardInfo({ data, tipo }) {
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [validating, setValidating] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const menuRefs = useRef({});
  const navigate = useNavigate();

  const toggleMenu = useCallback(
    (index) => {
      setMenuOpenIndex(menuOpenIndex === index ? null : index);
    },
    [menuOpenIndex]
  );

  const getEstadoClass = (estado) => {
    switch (estado) {
      case "Disponible":
        return "text-green-600";
      case "Revisión Pendiente":
        return "text-yellow-500 rounded-lg px-2 font-semibold";
      case "No Disponible":
        return "text-red-600 rounded-lg px-2 font-semibold";
      default:
        return "text-red-600";
    }
  };

  const getEstadoBorderClass = (estado) =>
    estado === "Revisión Pendiente" ? "border-l-4 border-yellow-500" : "";

  const validateTutorado = useCallback((id) => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      alert(`Tutorado ${id} validado con éxito`);
      setMenuOpenIndex(null);
    }, 2000);
  }, []);

  const abrirModalPerfil = (item) => {
    setItemSeleccionado(item);
    setMenuOpenIndex(null);
    setShowViewModal(true);
  };

  const abrirModalEditar = (item) => {
    setItemSeleccionado(item);
    setMenuOpenIndex(null);
    setShowEditModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRefs.current[menuOpenIndex] &&
        !menuRefs.current[menuOpenIndex].contains(event.target) &&
        !event.target.closest("button")
      ) {
        setMenuOpenIndex(null);
      }
    };

    if (menuOpenIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpenIndex]);

  if (data.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No hay datos disponibles.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {data.map((item, index) => (
        <div
          key={index}
          className={`relative flex justify-between items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 w-full mx-auto ${getEstadoBorderClass(
            item.estado
          )}`}
        >
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <InfoItem
                label={
                  tipo === "Tutores"
                    ? "Nombre del Tutor"
                    : "Nombre del Responsable"
                }
                value={item.responsable}
              />
              <InfoItem label="Carrera" value={item.carrera} />
            </div>
            <div className="flex justify-between mt-1">
              <InfoItem
                label="Estado"
                value={item.estado}
                extraClass={getEstadoClass(item.estado)}
              />
              <InfoItem label="Grupo" value={item.grupo} />
            </div>
          </div>

          <button
            onClick={() => toggleMenu(index)}
            className="relative text-gray-500 hover:text-gray-700 cursor-pointer w-5 h-5 ml-4 focus:outline-none transition-colors"
            aria-label="Menú de acciones"
            aria-expanded={menuOpenIndex === index}
          >
            <MoreVertical
              className={`transition-transform duration-200 ${
                menuOpenIndex === index ? "rotate-90" : ""
              }`}
            />
          </button>

          {menuOpenIndex === index && (
            <div
              ref={(el) => (menuRefs.current[index] = el)}
              className="absolute right-0 top-16 bg-white border border-gray-200 shadow-lg rounded-lg w-auto min-w-[160px] whitespace-nowrap text-lg transition-all ease-in-out duration-200 z-50"
            >
              <ul className="py-1">
                {getAccionesMenu(tipo).map(({ icon, label }, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      switch (label) {
                        case "Ver Perfil":
                          abrirModalPerfil(item);
                          break;
                        case "Editar Perfil":
                          abrirModalEditar(item);
                          break;
                        case "Ver Citas":
                          navigate("/citas");
                          break;
                        case "Asignar Tutor":
                          console.log("Asignar Tutor clicked");
                          break;
                        default:
                          console.warn(`Acción no manejada: ${label}`);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3 px-4 py-2">
                      <span className="text-gray-600">{icon}</span>
                      <span>{label}</span>
                    </div>
                  </li>
                ))}

                {tipo === "Tutorados" &&
                  item.estado === "Revisión Pendiente" && (
                    <li
                      className={`${
                        validating
                          ? "opacity-50 pointer-events-none"
                          : "cursor-pointer hover:bg-gray-50"
                      } transition-colors`}
                      onClick={() => !validating && validateTutorado(item.id)}
                    >
                      <div className="flex items-center gap-3 px-4 py-2">
                        {validating ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-gray-500"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                d="M4 12a8 8 0 018-8"
                                stroke="#233876"
                                strokeWidth="4"
                                fill="none"
                              />
                            </svg>
                            <span>Validando...</span>
                          </>
                        ) : (
                          <>
                            <UserPlus size={18} className="text-gray-600" />
                            <span>Validar Tutorado</span>
                          </>
                        )}
                      </div>
                    </li>
                  )}
              </ul>
            </div>
          )}
        </div>
      ))}

      {showViewModal && itemSeleccionado && (
        <VerPerfil
          tipo={tipo}
          datos={itemSeleccionado}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {showEditModal && itemSeleccionado && (
        <EditarPerfil
          tipo={tipo}
          datos={itemSeleccionado}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
