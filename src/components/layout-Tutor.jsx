import { useState, useEffect } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchTutorInfo } from "../Services/servicesApiPerfilAd";
import themes from "../Theme/colors";

const Layout = ({
  children,
  sidebarRoutes = [],
  logo,
  userImage = "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80",
  customUserName = null,
  theme = "green",
  userProfileRoute = "/perfil", // Ruta a la que navegará al hacer clic en el nombre
}) => {
  const colors = themes[theme] || themes.green;
  const [expanded, setExpanded] = useState(false);
  const [userName, setUserName] = useState("Cargando...");
  const navigate = useNavigate();

  // Cargar nombre de usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (customUserName) {
          setUserName(customUserName);
        } else {
          const data = await fetchTutorInfo();
          const fullName = `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
          setUserName(fullName || "Nombre de Usuario");
        }
      } catch (error) {
        console.error("Error al obtener el nombre de usuario", error);
        setUserName("Error al cargar el nombre");
      }
    };

    fetchUserData();
  }, [customUserName]);

  const handleLogout = () => {
    localStorage.removeItem("activeRoute");
    navigate("/login");
  };

  // Nuevo manejador para ir al perfil
  const handleUserNameClick = () => {
    if (userProfileRoute) {
      navigate(userProfileRoute);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-auto">
      {/* Sidebar */}
      <div
        className={`fixed left-0 h-full ${
          expanded ? "w-48" : "w-16"
        } transition-all duration-300 flex flex-col bg-white shadow-md border-r justify-between items-center z-50`}
      >
        {/* Toggle */}
        <div
          className={`w-full flex justify-center ${
            !expanded ? "mt-3" : "mt-[3px]"
          }`}
        >
          <button
            className={`text-xl w-4/5 flex items-center gap-2 py-3 transition-all duration-300 ${
              !expanded ? "justify-center" : "px-2"
            }`}
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Contraer menú" : "Expandir menú"}
            aria-expanded={expanded}
          >
            <FiMenu
              className={`transition-transform duration-300 flex-shrink-0 ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
            />
            {expanded && logo && (
              <img src={logo} alt="Logo" className="h-10 w-15 ml-1" />
            )}
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col items-center gap-3 w-full flex-1 mt-4">
          {sidebarRoutes.map(({ icon, text, route }) => (
            <NavLink
              key={route}
              to={route}
              className={({ isActive }) =>
                `flex items-center gap-3 w-4/5 px-4 py-2 text-lg rounded-md transition-all duration-300 ${
                  isActive
                    ? `${colors.sidebarLink.activeBg} ${colors.sidebarLink.activeText}`
                    : `${colors.sidebarLink.inactiveText} ${colors.sidebarLink.hover}`
                }`
              }
              aria-label={text}
              title={!expanded ? text : undefined}
            >
              <span className="text-2xl flex-shrink-0">{icon}</span>
              {expanded && (
                <span className="whitespace-nowrap text-xl">{text}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mb-4 w-full flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-4/5 px-4 py-2 text-lg rounded-md transition-all duration-300 text-black hover:bg-gray-100"
            aria-label="Salir"
            title={!expanded ? "Salir" : undefined}
          >
            <span className="text-2xl text-black flex-shrink-0">
              <FiLogOut />
            </span>
            {expanded && (
              <span className="text-xl whitespace-nowrap">Salir</span>
            )}
          </button>
        </div>
      </div>

      {/* Main */}
      <div
        className={`flex-1 flex flex-col h-full ${
          expanded ? "ml-48" : "ml-16"
        } transition-all duration-300 relative z-40`}
      >
        <nav className="sticky top-0 p-4 flex justify-between items-center bg-white shadow-md z-30 h-16">
          <div
            className={`${
              expanded ? "invisible" : "visible"
            } flex items-center`}
          >
            {logo && <img src={logo} alt="Logo" className="h-10 w-15" />}
          </div>

          {/* Información del usuario (ahora clicable) */}
          <div
            onClick={handleUserNameClick}
            className={`
              flex items-center gap-2 px-4 py-[6px] 
              rounded-full transition-colors cursor-pointer ${colors.userInfo.bg} ${colors.userInfo.hover}
            `}
            title={userProfileRoute ? "Ver perfil" : undefined}
          >
            <div
              className={`w-7 h-7 ${colors.userInfo.avatarBg} rounded-full overflow-hidden`}
            >
              <img
                src={userImage}
                alt="user"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className={`text-lg font-semibold ${colors.userInfo.text}`}>
              {userName}
            </span>
          </div>
        </nav>

        {children}
      </div>
    </div>
  );
};

export default Layout;
