import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoEstudiante from '../assets/logoEstudiante.png';
import HeaderEstudiante from "./HeaderEstudiante"; // Ajusta la ruta según corresponda
import { FiHome, FiUser, FiFileText, FiBook, FiCalendar, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LayoutEstudiante = ({ children }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (paths) => paths.includes(location.pathname);

  const handleLogout = () => {
    // 1. Borra el token o cualquier dato de sesión
    localStorage.removeItem("token");
    // 2. Redirige al login
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`h-screen bg-white shadow transition-all duration-300 fixed z-30 ${open ? 'w-64' : 'w-16'}`}>
        {/* Logo y toggle */}
        <div className="relative">
          <div className="flex items-center justify-center p-4 space-x-2">
            {open && (
              <div className="w-full flex justify-center">
                <img src={logoEstudiante} alt="Logo MiTutor" className="h-7 w-auto object-contain" />
              </div>
            )}
            <button
              onClick={() => setOpen(!open)}
              className="hidden lg:block ml-auto absolute right-4 top-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {open && <div className="border-t border-gray-200 mx-4"></div>}
        </div>

        {/* Nav Links */}
        <nav className="mt-6 px-4 space-y-3">
          <SidebarLink to="/inicio-estudiante" icon={<FiHome />} text="Inicio" active={isActive(['/inicio-estudiante'])} open={open} />
          <SidebarLink to="/mi-informacionE" icon={<FiUser />} text="Mi Información" active={isActive(['/mi-informacionE', '/mi-informacionEditar'])} open={open} />
          <SidebarLink to="/examen-vocacional" icon={<FiFileText />} text="Examen Vocación" active={isActive(['/examen-vocacional', '/examen-vocacionalPreguntas', '/examen-vocacionalResultados'])} open={open} />
          <SidebarLink to="/cuaderno-actividades" icon={<FiBook />} text="Cuaderno Actividades" active={isActive(['/cuaderno-actividades', '/analisis-fodae', '/linea-vida', '/comprension-lectora'])} open={open} />
          <SidebarLink to="/citas-tutorados" icon={<FiCalendar />} text="Citas" active={isActive(['/citas-tutorados'])} open={open} />
        </nav>

        {/* Logout */}
      <div className="absolute bottom-4 w-full px-3">
        {open && <div className="border-t border-gray-200 mx-4 mb-2"></div>}
        <button
          onClick={handleLogout}
          className={`flex items-center w-full transition-colors duration-200 text-gray-700 hover:bg-gray-100 ${
            open ? "p-3 rounded-md gap-3" : "justify-center p-2 rounded-full"
          }`}
        >
          <FiLogOut className="h-6 w-6" />
          {open && <span>Cerrar Sesión</span>}
        </button>
      </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${open ? 'lg:ml-64' : 'lg:ml-16'}`}>
          <HeaderEstudiante />
          <main className="flex-1 px-4 md:px-6">
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, text, active, open }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 font-medium text-sm transition-all duration-200
      ${active ? 'bg-[#86A0FE] text-white' : 'text-black hover:bg-[#dcdcdc]'}
      ${open ? 'rounded-full' : 'justify-center rounded-full w-10 h-10 p-0'}
    `}
  >
    <div className={`p-2`}>
      {icon}
    </div>
    {open && <span>{text}</span>}
  </Link>
);

export default LayoutEstudiante;
