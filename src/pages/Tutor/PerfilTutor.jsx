// src/pages/EditTutorProfile.jsx

import React, { useEffect, useState } from "react";

const EditTutorProfile = () => {
  // Estado para los campos del formulario
  const [data, setData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    genero: "",
    foto: "", // URL de la foto actual
    telefono: "",
    estadoCivil: "",
    email: "",
    municipio: "",
    estado: "",
    calleYnumero: "",
    codigoPostal: "",
    colonia: "",
  });

  // Para manejar el nuevo archivo de foto y su preview
  const [nuevaFoto, setNuevaFoto] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  // Errores de validación por campo (objeto donde keys = nombre de campo)
  const [errors, setErrors] = useState({});

  // Mensaje de éxito después de guardar
  const [successMessage, setSuccessMessage] = useState("");
  const [tutorId, setTutorId] = useState(null);

  // Cargar datos iniciales del usuario (equivalente a los valores que antes llenaba Livewire)
  useEffect(() => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const curp = usuario?.curp;

  if (!token || !curp) {
    console.error("No hay token o CURP");
    return;
  }

  
  fetch(`http://localhost:8000/api/tutores/curp/${curp}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al cargar tutor");
      return res.json();
    })
    .then((tutor) => {
      setData({
        nombres: tutor.nombres || "",
        apellidoPaterno: tutor.apellidoPaterno || "",
        apellidoMaterno: tutor.apellidoMaterno || "",
        fechaNacimiento: tutor.fechaNacimiento || "",
        genero: tutor.genero || "",
        foto: tutor.fotoPerfil || "",
        telefono: tutor.telefono || "",
        estadoCivil: tutor.estadoCivil || "",
        email: tutor.email || "",
        municipio: tutor.municipio || "",
        estado: tutor.estado || "",
        calleYnumero: tutor.calleYnumero || "",
        codigoPostal: tutor.codigoPostal || "",
        colonia: tutor.colonia || "",
      });
      setTutorId(tutor.idCuentaTutor); // 🔑 Guarda el ID para PUT
    })
    .catch((err) => console.error(err));
}, []);

  // Cuando cambie `nuevaFoto`, generar preview
  useEffect(() => {
    if (nuevaFoto) {
      const objectUrl = URL.createObjectURL(nuevaFoto);
      setPreviewURL(objectUrl);

      // Liberar memoria cuando ya no se necesite
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [nuevaFoto]);

  // Handler genérico para inputs de texto, select y date
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler para input file (foto)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNuevaFoto(file || null);
  };

  // Submit del formulario: envía via multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token en localStorage");
      return;
    }

    // Preparar FormData (porque incluye foto opcional)
    const formData = new FormData();
    formData.append("nombres", data.nombres);
    formData.append("apellidoPaterno", data.apellidoPaterno);
    formData.append("apellidoMaterno", data.apellidoMaterno);
    formData.append("fechaNacimiento", data.fechaNacimiento);
    formData.append("genero", data.genero);
    if (nuevaFoto) {
      formData.append("foto", nuevaFoto); // ✅ nombre esperado
    }
    formData.append("telefono", data.telefono);
    formData.append("estadoCivil", data.estadoCivil);
    formData.append("email", data.email);
    formData.append("municipio", data.municipio);
    formData.append("estado", data.estado);
    formData.append("calleYnumero", data.calleYnumero);
    formData.append("codigoPostal", data.codigoPostal);
    formData.append("colonia", data.colonia);

// Solo para depuración opcional
for (let pair of formData.entries()) {
  console.log(pair[0] + ": " + pair[1]);
}
    try {
      const res = await fetch(`http://localhost:8000/api/tutores/${tutorId}`, {
  method: "POST", // o "PUT" si no usas el override
  headers: {
    Authorization: `Bearer ${token}`,
    "X-HTTP-Method-Override": "PUT", // ✅ necesario si usas POST para simular PUT
  },
  body: formData, // sin JSON.stringify, sin Content-Type
});

      if (res.status === 422) {
        // Errores de validación
        const result = await res.json();
        setErrors(result.errors || {});
      } else if (!res.ok) {
        throw new Error("Error al guardar cambios");
      } else {
        const result = await res.json();
        setSuccessMessage("Información actualizada correctamente.");
        // Si la API retorna la nueva URL de la foto, actualizarla:
        if (result.foto) {
          setData((prev) => ({ ...prev, foto: result.foto }));
        }
        // Limpiar preview de foto nueva
        setNuevaFoto(null);
        setPreviewURL("");
      }
    } catch (err) {
      console.error(err);
      // Si quieres un mensaje genérico:
      setErrors({ general: "Hubo un problema al guardar. Intenta de nuevo." });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-sans">
      {/* Mensaje informativo superior */}
      <div className="max-w-6xl mx-auto mb-4">
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium">
          Nota: Si requiere modificar su CURP, contacte al administrador del
          sistema.
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto space-y-6"
        encType="multipart/form-data"
      >
        {/* ==================== Bloque: Información General ==================== */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-[#FFEEEC] text-[#F5A89F] p-2 rounded-full w-max mx-auto sm:mx-0 mb-4 sm:mb-2">
            <span className="font-semibold text-lg">Información General</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Columna Izquierda: nombres, apellidos */}
            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="nombres"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  value={data.nombres}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  maxLength="30"
                />
                {errors.nombres && (
                  <span className="text-red-500 text-sm">{errors.nombres}</span>
                )}
              </div>

              {/* Apellido paterno */}
              <div>
                <label
                  htmlFor="apellidoPaterno"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido paterno
                </label>
                <input
                  type="text"
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  value={data.apellidoPaterno}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  maxLength="20"
                />
                {errors.apellidoPaterno && (
                  <span className="text-red-500 text-sm">
                    {errors.apellidoPaterno}
                  </span>
                )}
              </div>

              {/* Apellido materno */}
              <div>
                <label
                  htmlFor="apellidoMaterno"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido materno
                </label>
                <input
                  type="text"
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  value={data.apellidoMaterno}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  maxLength="20"
                />
                {errors.apellidoMaterno && (
                  <span className="text-red-500 text-sm">
                    {errors.apellidoMaterno}
                  </span>
                )}
              </div>
            </div>

            {/* Columna Derecha: fecha nacimiento, género, foto */}
            <div className="space-y-4">
              {/* Fecha de nacimiento */}
              <div>
                <label
                  htmlFor="fechaNacimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={data.fechaNacimiento}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.fechaNacimiento && (
                  <span className="text-red-500 text-sm">
                    {errors.fechaNacimiento}
                  </span>
                )}
              </div>

              {/* Género */}
              <div>
                <label
                  htmlFor="genero"
                  className="block text-sm font-medium text-gray-700"
                >
                  Género
                </label>
                <select
                  id="genero"
                  name="genero"
                  value={data.genero}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
                {errors.genero && (
                  <span className="text-red-500 text-sm">{errors.genero}</span>
                )}
              </div>

              <div className="flex justify-center mt-6">
                <div className="text-center space-y-2">
                  {/* La imagen actúa como botón */}
                  <label
                    htmlFor="fotoPerfil"
                    className="cursor-pointer group block w-fit mx-auto relative"
                  >
                    <img
                      src={
                        previewURL ||
                        data.foto ||
                        "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80"
                      }
                      className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 shadow-md group-hover:opacity-80 transition duration-200"
                      alt="Foto de perfil"
                    />
                    <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow text-xs text-gray-600 group-hover:text-blue-600 transition">
                      📷
                    </div>
                  </label>

                  <input
                    id="fotoPerfil"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {errors.foto && (
                    <p className="text-red-500 text-sm">{errors.foto}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== Bloque: Editar Información Adicional ==================== */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="bg-[#FFEEEC] text-[#F5A89F] p-2 rounded-full w-max mx-auto sm:mx-0 mb-4 sm:mb-2">
            <span className="font-semibold text-lg">
              Editar Información Adicional
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Columna Izquierda: teléfono, estado civil, email */}
            <div className="space-y-4">
              {/* Teléfono */}
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={data.telefono}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  maxLength="11"
                  pattern="[0-9]{10,11}"
                  title="Ingresa un número de teléfono válido (10 u 11 dígitos)"
                />
                {errors.telefono && (
                  <span className="text-red-500 text-sm">
                    {errors.telefono}
                  </span>
                )}
              </div>

              {/* Estado civil */}
              <div>
                <label
                  htmlFor="estadoCivil"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estado civil
                </label>
                <select
                  id="estadoCivil"
                  name="estadoCivil"
                  value={data.estadoCivil}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="Soltero/a">Soltero/a</option>
                  <option value="Casado/a">Casado/a</option>
                  <option value="Viudo/a">Viudo/a</option>
                </select>
                {errors.estadoCivil && (
                  <span className="text-red-500 text-sm">
                    {errors.estadoCivil}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  maxLength="50"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
            </div>

            {/* Columna Derecha: municipio, estado, calle y número, código postal, colonia */}
            <div className="space-y-4">
              {/* Municipio */}
              <div>
                <label
                  htmlFor="municipio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Municipio
                </label>
                <input
                  type="text"
                  id="municipio"
                  name="municipio"
                  value={data.municipio}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  maxLength="30"
                />
                {errors.municipio && (
                  <span className="text-red-500 text-sm">
                    {errors.municipio}
                  </span>
                )}
              </div>

              {/* Estado */}
              <div>
                <label
                  htmlFor="estado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={data.estado}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="Michoacán">Michoacán</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.estado && (
                  <span className="text-red-500 text-sm">{errors.estado}</span>
                )}
              </div>

              {/* Calle y número */}
              <div>
                <label
                  htmlFor="calleYnumero"
                  className="block text-sm font-medium text-gray-700"
                >
                  Calle y número
                </label>
                <input
                  type="text"
                  id="calleYnumero"
                  name="calleYnumero"
                  value={data.calleYnumero}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  maxLength="70"
                />
                {errors.calleYnumero && (
                  <span className="text-red-500 text-sm">
                    {errors.calleYnumero}
                  </span>
                )}
              </div>

              {/* Código postal */}
              <div>
                <label
                  htmlFor="codigoPostal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código postal
                </label>
                <input
                  type="text"
                  id="codigoPostal"
                  name="codigoPostal"
                  value={data.codigoPostal}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  maxLength="5"
                  pattern="[0-9]{5}"
                  title="Ingresa un código postal de 5 dígitos"
                />
                {errors.codigoPostal && (
                  <span className="text-red-500 text-sm">
                    {errors.codigoPostal}
                  </span>
                )}
              </div>

              {/* Colonia (opcional) */}
              <div>
                <label
                  htmlFor="colonia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Colonia
                </label>
                <input
                  type="text"
                  id="colonia"
                  name="colonia"
                  value={data.colonia}
                  onChange={handleChange}
                  className="w-full mt-1 border py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  maxLength="50"
                />
                {errors.colonia && (
                  <span className="text-red-500 text-sm">{errors.colonia}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mostrar mensaje de éxito si aplica */}
        {successMessage && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-green-100 text-green-700 border border-green-300 px-4 py-3 rounded-md text-sm font-medium">
              {successMessage}
            </div>
          </div>
        )}

        {/* Errores generales */}
        {errors.general && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium">
              {errors.general}
            </div>
          </div>
        )}

        {/* Botones al final */}
        <div className="max-w-6xl mx-auto flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => (window.location.href = "/tutor")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Regresar
          </button>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTutorProfile;
