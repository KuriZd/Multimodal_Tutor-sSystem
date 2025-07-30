import { useRef, useEffect, useState } from "react";

const VerPerfil = ({ tipo, datos, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsVisible(false);
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isVisible || !datos) return null;

  const {
    nombre = "",
    apellidoPaterno = "",
    apellidoMaterno = "",
    fechaNacimiento = "",
    genero = "",
    curp = "",
    telefono = "",
    estadoCivil = "",
    email = "",
    municipio = "",
    estado = "",
    calleNumero = "",
    codigoPostal = "",
    image = "https://via.placeholder.com/150",
  } = datos;

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen bg-gray-700/40 backdrop-blur-sm z-50">
      <div
        ref={modalRef}
        className="relative flex flex-col justify-center items-center bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-4xl mx-auto my-10 border border-gray-300"
      >
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="absolute top-4 right-4 text-4xl text-gray-600 hover:text-gray-800"
          aria-label="Cerrar"
        >
          &times;
        </button>

        {/* Título */}
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-2xl text-center font-semibold bg-[#AEFFB8] py-1 px-6 rounded-full">
            Perfil: {tipo?.toUpperCase() || "Usuario"}
          </h2>
        </div>

        {/* Sección principal */}
        <div className="flex items-center mb-6 w-full shadow-xl rounded-lg border-r-2 py-10 px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-md text-gray-700 font-semibold">
              Nombre: {nombre}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Apellido paterno: {apellidoPaterno}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Apellido materno: {apellidoMaterno}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Fecha de nacimiento: {fechaNacimiento}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Género: {genero}
            </p>
            <p className="text-md text-gray-700 font-semibold">CURP: {curp}</p>
          </div>
          <div className="flex justify-center w-[25%] ml-[10%]">
            <img
              src={image}
              alt="Perfil"
              className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-md"
            />
          </div>
        </div>

        {/* Info adicional */}
        <div className="w-full mt-6 shadow-lg rounded-xl py-10 px-6 border-r-2">
          <div className="flex justify-between items-center mb-4 w-full">
            <h2 className="text-2xl text-center font-semibold bg-[#AEFFB8] py-1 px-6 rounded-full">
              Información adicional
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-md text-gray-700 font-semibold">
              Teléfono: {telefono}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Estado civil: {estadoCivil}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Email: {email}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Municipio: {municipio}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Estado: {estado}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Calle y número: {calleNumero}
            </p>
            <p className="text-md text-gray-700 font-semibold">
              Código postal: {codigoPostal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerPerfil;
