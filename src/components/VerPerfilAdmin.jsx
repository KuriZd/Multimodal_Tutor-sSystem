import React, { useState, useEffect } from "react";
import {
  fetchTutorInfo,
  updateTutorInfo,
} from "../Services/servicesApiPerfilAd";
import Spinner from "./Spinner"; // Componente de carga (crear uno simple)
import Notification from "./Notification"; // Componente de notificación (crear uno simple)

const VerPerfilAdmin = () => {
  // Estado principal
  const [tutorInfo, setTutorInfo] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    genero: "",
    telefono: "",
    estadoCivil: "",
    email: "",
    municipio: "",
    estado: "",
    calleNumero: "",
    codigoPostal: "",
    imagenPerfil: "",
  });

  // Estados adicionales
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTutorInfo();
        setTutorInfo(data);
      } catch (err) {
        setError("Error al cargar los datos del tutor");
        console.error(err);
        showNotification("Error al cargar los datos", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Manejo de notificaciones
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ ...notification, show: false }), 5000);
  };

  // Validación de campos
  const validateFields = () => {
    const newErrors = {};
    if (!tutorInfo.nombre.trim()) newErrors.nombre = "Requerido";
    if (!tutorInfo.apellidoPaterno.trim())
      newErrors.apellidoPaterno = "Requerido";
    if (!tutorInfo.email.trim()) newErrors.email = "Requerido";
    else if (!/^\S+@\S+\.\S+$/.test(tutorInfo.email))
      newErrors.email = "Email inválido";
    if (!tutorInfo.telefono.trim()) newErrors.telefono = "Requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios en imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTutorInfo({ ...tutorInfo, imagenPerfil: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      showNotification(
        "Por favor seleccione un archivo de imagen válido",
        "error"
      );
    }
  };

  // Guardar cambios
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
    } catch (err) {
      console.error("Error al guardar", err);
      showNotification("Error al actualizar el perfil", "error");
    } finally {
      setSaving(false);
    }
  };

  // Componentes reutilizables mejorados
  const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    error,
  }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {error && <span className="text-red-500 text-xs ml-2">({error})</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`mt-1 p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400`}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  const SelectField = ({ label, name, value, onChange, options, error }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {error && <span className="text-red-500 text-xs ml-2">({error})</span>}
      </label>
      <select
        id={name}
        name={name}
        className={`mt-1 p-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400`}
        value={value}
        onChange={onChange}
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}

      <div className="mx-6 mt-4 p-4 text-3xl font-semibold text-gray-700">
        Bienvenido, <span className="text-green-600">{tutorInfo.nombre}</span>
      </div>

      {/* Sección Información Personal */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="xl:w-[30%] md:w-[50%] mb-6">
          <h2 className="text-xl text-center font-semibold bg-green-100 py-2 px-4 rounded-full">
            Información Personal
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-3/4">
            <InputField
              label="Nombre"
              name="nombre"
              value={tutorInfo.nombre}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, nombre: e.target.value })
              }
              error={errors.nombre}
            />
            <InputField
              label="Apellido paterno"
              name="apellidoPaterno"
              value={tutorInfo.apellidoPaterno}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, apellidoPaterno: e.target.value })
              }
              error={errors.apellidoPaterno}
            />
            <InputField
              label="Apellido materno"
              name="apellidoMaterno"
              value={tutorInfo.apellidoMaterno}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, apellidoMaterno: e.target.value })
              }
            />
            <InputField
              label="Fecha de nacimiento"
              name="fechaNacimiento"
              value={tutorInfo.fechaNacimiento}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, fechaNacimiento: e.target.value })
              }
              type="date"
            />
            <SelectField
              label="Género"
              name="genero"
              value={tutorInfo.genero}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, genero: e.target.value })
              }
              options={["Masculino", "Femenino", "Otro"]}
            />
          </div>

          <div className="flex flex-col items-center w-full md:w-1/4">
            <div className="relative group mb-4">
              <img
                src={tutorInfo.imagenPerfil || "/default-profile.png"}
                alt="Imagen de perfil"
                className="w-40 h-40 md:w-40 md:h-40 object-cover rounded-full border-4 border-green-600 shadow-lg transition-transform duration-200 group-hover:opacity-75"
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
          </div>
        </div>
      </div>

      {/* Sección Información Adicional */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="xl:w-[30%] md:w-[50%] mb-6">
          <h2 className="text-xl text-center font-semibold bg-green-100 py-2 px-4 rounded-full">
            Información Adicional
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputField
              label="Teléfono"
              name="telefono"
              value={tutorInfo.telefono}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, telefono: e.target.value })
              }
              error={errors.telefono}
            />
            <SelectField
              label="Estado civil"
              name="estadoCivil"
              value={tutorInfo.estadoCivil}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, estadoCivil: e.target.value })
              }
              options={["Soltero", "Casado", "Divorciado", "Viudo"]}
            />
            <InputField
              label="Email"
              name="email"
              value={tutorInfo.email}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, email: e.target.value })
              }
              type="email"
              error={errors.email}
            />
          </div>

          <div>
            <InputField
              label="Municipio"
              name="municipio"
              value={tutorInfo.municipio}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, municipio: e.target.value })
              }
            />
            <SelectField
              label="Estado"
              name="estado"
              value={tutorInfo.estado}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, estado: e.target.value })
              }
              options={[
                "Aguascalientes",
                "Baja California" /* ...otros estados */,
              ]}
            />
            <InputField
              label="Calle y número"
              name="calleNumero"
              value={tutorInfo.calleNumero}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, calleNumero: e.target.value })
              }
            />
            <InputField
              label="Código postal"
              name="codigoPostal"
              value={tutorInfo.codigoPostal}
              onChange={(e) =>
                setTutorInfo({ ...tutorInfo, codigoPostal: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors ${
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
  );
};

export default VerPerfilAdmin;
