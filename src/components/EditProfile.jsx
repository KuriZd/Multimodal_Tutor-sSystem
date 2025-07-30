import React, { useRef, useEffect, useState } from "react";
import { updateTutorInfo } from "../Services/servicesApiPerfilAd";
import Spinner from "../components/Spinner";
import Notification from "../components/Notification";

const Editprofile = ({ tipo, datos, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const modalRef = useRef(null);

  const [tutorInfo, setTutorInfo] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    genero: "",
    curp: "",
    telefono: "",
    estadoCivil: "",
    email: "",
    municipio: "",
    estado: "",
    calleNumero: "",
    codigoPostal: "",
    image: "https://via.placeholder.com/150",
    ...datos,
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose && onClose(), 300);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ ...notification, show: false }), 5000);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!tutorInfo.nombre.trim()) newErrors.nombre = "Requerido";
    if (!tutorInfo.apellidoPaterno.trim())
      newErrors.apellidoPaterno = "Requerido";
    if (!tutorInfo.email.trim()) newErrors.email = "Requerido";
    else if (!/^\S+@\S+\.\S+$/.test(tutorInfo.email))
      newErrors.email = "Email inválido";
    if (!tutorInfo.telefono.trim()) newErrors.telefono = "Requerido";
    if (!tutorInfo.curp.trim()) newErrors.curp = "Requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTutorInfo({ ...tutorInfo, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      showNotification(
        "Por favor seleccione un archivo de imagen válido",
        "error"
      );
    }
  };

  const handleSave = async () => {
    if (!validateFields()) {
      showNotification(
        "Por favor corrija los errores antes de guardar",
        "error"
      );
      return;
    }

    try {
      setSaving(true);
      await updateTutorInfo(tutorInfo);
      showNotification("Perfil actualizado correctamente", "success");
      setTimeout(() => handleClose(), 2000);
    } catch (err) {
      console.error("Error al guardar", err);
      showNotification("Error al actualizar el perfil", "error");
    } finally {
      setSaving(false);
    }
  };

  const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    error,
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {error && <span className="text-red-500 text-xs ml-2">({error})</span>}
      </label>
      <input
        name={name}
        type={type}
        className={`mt-1 p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  const SelectField = ({ label, name, value, onChange, options, error }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {error && <span className="text-red-500 text-xs ml-2">({error})</span>}
      </label>
      <select
        name={name}
        className={`mt-1 p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Seleccione...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen bg-gray-700/40 backdrop-blur-sm z-50">
      <div
        ref={modalRef}
        className="relative flex flex-col bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-4xl mx-auto my-10 border border-gray-300 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-4xl text-gray-600 hover:text-gray-800"
          aria-label="Cerrar"
        >
          &times;
        </button>

        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-2xl text-center font-semibold bg-[#AEFFB8] py-1 px-6 rounded-full">
            Editando perfil: {tipo?.toUpperCase() || "USUARIO"}
          </h2>
        </div>

        {notification.show && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ ...notification, show: false })}
          />
        )}

        <div className="flex items-center mb-6 w-full shadow-xl rounded-lg border-r-2 py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-3/4">
            <InputField
              label="Nombre"
              name="nombre"
              value={tutorInfo.nombre}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, nombre: value })
              }
              error={errors.nombre}
            />
            <InputField
              label="Apellido paterno"
              name="apellidoPaterno"
              value={tutorInfo.apellidoPaterno}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, apellidoPaterno: value })
              }
              error={errors.apellidoPaterno}
            />
            <InputField
              label="Apellido materno"
              name="apellidoMaterno"
              value={tutorInfo.apellidoMaterno}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, apellidoMaterno: value })
              }
            />
            <InputField
              label="Fecha de nacimiento"
              name="fechaNacimiento"
              value={tutorInfo.fechaNacimiento}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, fechaNacimiento: value })
              }
              type="date"
            />
            <SelectField
              label="Género"
              name="genero"
              value={tutorInfo.genero}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, genero: value })
              }
              options={["Masculino", "Femenino", "Otro"]}
            />
            <InputField
              label="CURP"
              name="curp"
              value={tutorInfo.curp}
              onChange={(value) => setTutorInfo({ ...tutorInfo, curp: value })}
              error={errors.curp}
            />
          </div>

          <div className="flex flex-col items-center w-full md:w-1/4">
            <div className="relative group mb-4">
              <img
                src={tutorInfo.image}
                alt="Imagen de perfil"
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-green-600 shadow-lg transition-transform duration-200 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <label className="bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full cursor-pointer">
                  Cambiar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Haz clic para cambiar la foto
            </p>
          </div>
        </div>

        <div className="w-full mt-6 shadow-lg rounded-xl py-10 px-6 border-r-2">
          <div className="flex justify-between items-center mb-4 w-full">
            <h2 className="text-2xl text-center font-semibold bg-[#AEFFB8] py-1 px-6 rounded-full">
              Información adicional
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Teléfono"
              name="telefono"
              value={tutorInfo.telefono}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, telefono: value })
              }
              error={errors.telefono}
            />
            <SelectField
              label="Estado civil"
              name="estadoCivil"
              value={tutorInfo.estadoCivil}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, estadoCivil: value })
              }
              options={["Soltero", "Casado", "Divorciado", "Viudo"]}
            />
            <InputField
              label="Email"
              name="email"
              value={tutorInfo.email}
              onChange={(value) => setTutorInfo({ ...tutorInfo, email: value })}
              type="email"
              error={errors.email}
            />
            <InputField
              label="Municipio"
              name="municipio"
              value={tutorInfo.municipio}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, municipio: value })
              }
            />
            <SelectField
              label="Estado"
              name="estado"
              value={tutorInfo.estado}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, estado: value })
              }
              options={[
                "Aguascalientes",
                "Baja California",
                // ...otros estados
              ]}
            />
            <InputField
              label="Calle y número"
              name="calleNumero"
              value={tutorInfo.calleNumero}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, calleNumero: value })
              }
            />
            <InputField
              label="Código postal"
              name="codigoPostal"
              value={tutorInfo.codigoPostal}
              onChange={(value) =>
                setTutorInfo({ ...tutorInfo, codigoPostal: value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {saving ? (
              <>
                <Spinner size="small" className="inline mr-2" />
                Guardando...
              </>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
