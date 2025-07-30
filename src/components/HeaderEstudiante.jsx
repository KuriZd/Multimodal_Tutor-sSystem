import React, { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const HeaderEstudiante = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full p-4 bg-transparent">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800"></h1>

        {/* Dropdown del usuario */}
        <div className="relative">
          {/* Botón de perfil */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-2 bg-[#86A0FE] text-white px-4 py-2 rounded-full shadow-md"
          >
            {/* Foto de perfil */}
            <img
              src="/path/to/avatar.png"
              alt="Foto de perfil"
              className="h-6 w-6 rounded-full object-cover"
            />
            {/* Nombre completo */}
            <span className="font-medium">Nombre Usuario</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Menú desplegable */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <div className="py-1 border border-gray-100 rounded-md">
                {/* Opción Mi Información */}
                <Link
                  to="/mi-informacion"
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <FiUser className="h-5 w-5 mr-2 text-gray-600" />
                  Mi Información
                </Link>

                {/* Opción Cerrar Sesión */}
                <button
                  className="flex items-center w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => {
                    // Aquí podrías implementar la lógica de logout
                    console.log("Cerrar sesión");
                  }}
                >
                  <FiLogOut className="h-5 w-5 mr-2 text-gray-600" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderEstudiante;
