// src/pages/EditProfile.jsx

import React, { useEffect, useState } from "react";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    nombres: "",
    fechaNacimiento: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    genero: "M",
    curp: "",
    RFC: "",
    idGrupo: "",
    estadoCivil: "Soltero/a",
    telefono: "",
    email: "",
    codigoPostal: "",
    estado: "",
    municipio: "",
    calleYnumero: "",
    cedulaProfesional: "",
    titulo: "",
    especialidad: "",
    carrera: "",
    razonesCarrera: "",
    enfemerdad: "",
    discapacidadFisica: "",
    situacionPsicologica: "",
    necesidadEspecial: "",
  });

  // Flags para condicionales (inicialmente "No" para ocultar textareas)
  const [enfermedad, setEnfermedad] = useState("No");
  const [discapacidad, setDiscapacidad] = useState("No");
  const [psicologica, setPsicologica] = useState("No");
  const [necesidadEsp, setNecesidadEsp] = useState("No");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token en localStorage");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar usuario");
        return res.json();
      })
      .then((usuario) => {
        setUser(usuario);
        setData((prev) => ({
          ...prev,
          nombres: usuario.nombres || "",
          fechaNacimiento: usuario.fechaNacimiento || "",
          apellidoPaterno: usuario.apellidoPaterno || "",
          apellidoMaterno: usuario.apellidoMaterno || "",
          genero: usuario.genero || "M",
          curp: usuario.curp || "",
          RFC: usuario.RFC || "",
          idGrupo: usuario.grupo?.idGrupo || "",
          estadoCivil: usuario.estadoCivil || "Soltero/a",
          telefono: usuario.telefono || "",
          email: usuario.email || "",
          codigoPostal: usuario.codigoPostal || "",
          estado: usuario.estado || "",
          municipio: usuario.municipio || "",
          calleYnumero: usuario.calleYnumero || "",
          cedulaProfesional: usuario.cedulaProfesional || "",
          titulo: usuario.titulo || "",
          especialidad: usuario.especialidad || "",
          carrera: usuario.carrera || "",
          razonesCarrera: usuario.razonesCarrera || "",
          enfemerdad: usuario.enfemerdad || "",
          discapacidadFisica: usuario.discapacidadFisica || "",
          situacionPsicologica: usuario.situacionPsicologica || "",
          necesidadEspecial: usuario.necesidadEspecial || "",
        }));

        if (usuario.enfemerdad && usuario.enfemerdad.trim() !== "") {
          setEnfermedad("Si");
        }
        if (
          usuario.discapacidadFisica &&
          usuario.discapacidadFisica.trim() !== ""
        ) {
          setDiscapacidad("Si");
        }
        if (
          usuario.situacionPsicologica &&
          usuario.situacionPsicologica.trim() !== ""
        ) {
          setPsicologica("Si");
        }
        if (
          usuario.necesidadEspecial &&
          usuario.necesidadEspecial.trim() !== ""
        ) {
          setNecesidadEsp("Si");
        }

        if (usuario.curp) {
          return fetch(
            `http://localhost:8000/api/tutores/curp/${usuario.curp}/grupos`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          return null;
        }
      })
      .then((res) => {
        if (!res) return [];
        if (!res.ok) throw new Error("Error al cargar grupos");
        return res.json();
      })
      .then((listaGrupos) => {
        if (Array.isArray(listaGrupos)) {
          setGrupos(listaGrupos);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFlagChange = (e, setter) => {
    const { name, value } = e.target;
    setter(value);
    if (value === "No") {
      if (name === "enfermedad") {
        setData((prev) => ({ ...prev, enfemerdad: "" }));
      } else if (name === "discapacidad") {
        setData((prev) => ({ ...prev, discapacidadFisica: "" }));
      } else if (name === "psicologica") {
        setData((prev) => ({ ...prev, situacionPsicologica: "" }));
      } else if (name === "necesidadEsp") {
        setData((prev) => ({ ...prev, necesidadEspecial: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar perfil");
        return res.json();
      })
      .then((resp) => {
        alert("Perfil guardado correctamente.");
        setUser(resp);
      })
      .catch((err) => {
        console.error(err);
        alert("Hubo un problema al guardar los cambios.");
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Cargando datos...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-4xl mx-auto">
      <h3 className="text-3xl font-medium">Editar Perfil</h3>

      {/* ==================== INFORMACIÓN GENERAL ==================== */}
      <div className="mt-5 p-6 bg-white font-medium rounded-lg shadow-[0_5px_3px_#909497] overflow-x-clip">
        <h4 className="w-fit px-7 py-1 rounded-full font-medium bg-[#D1FFAE] text-xl">
          Información general
        </h4>
        <div className="w-full mt-5 grid grid-cols-[auto_auto_20%] grid-rows-4 gap-8">
          {/* Nombre */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Nombre</label>
            <input
              name="nombres"
              value={data.nombres}
              onChange={handleChange}
              type="text"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">
              Fecha de nacimiento
            </label>
            <input
              name="fechaNacimiento"
              value={data.fechaNacimiento}
              onChange={handleChange}
              type="date"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* Foto de perfil (con optional chaining) */}
          <div className="flex flex-col items-center justify-center row-span-4">
            <img
              className="border-double border-[8px] border-gray-500 w-[200px] h-[200px] rounded-full object-cover"
              src={user?.photoURL || "/images/Chad.jpg"}
              alt="Foto de perfil"
            />
            <label className="mt-3 px-4 py-2 rounded-lg text-lg bg-green-200 flex items-center cursor-pointer">
              <img
                className="w-[35px] mr-2"
                src="/icons/foto-perfil.png"
                alt="Ícono cambiar foto"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                // Aquí podrías implementar el handler para subir la imagen
              />
              Cambiar Foto
            </label>
          </div>

          {/* Apellido paterno */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Apellido paterno</label>
            <input
              name="apellidoPaterno"
              value={data.apellidoPaterno}
              onChange={handleChange}
              type="text"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* Género */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Género</label>
            <select
              name="genero"
              value={data.genero}
              onChange={handleChange}
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>

          {/* Apellido materno */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Apellido materno</label>
            <input
              name="apellidoMaterno"
              value={data.apellidoMaterno}
              onChange={handleChange}
              type="text"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* CURP */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">CURP</label>
            <input
              name="curp"
              value={data.curp}
              onChange={handleChange}
              type="text"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* RFC (solo si el usuario ya lo tiene) */}
          {user?.RFC != null && (
            <div className="flex flex-col justify-center">
              <label className="ml-1 text-md font-medium">RFC</label>
              <input
                name="RFC"
                value={data.RFC}
                onChange={handleChange}
                type="text"
                className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
              />
            </div>
          )}

          {/* Grupo (solo si existe user.grupo.letra) */}
          {user?.grupo?.letra && (
            <div className="flex flex-col justify-center">
              <label className="ml-1 text-md font-medium">Grupo</label>
              <select
                name="idGrupo"
                value={data.idGrupo}
                onChange={handleChange}
                className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
              >
                <option value="">-- Selecciona un grupo --</option>
                {grupos.map((g) => (
                  <option key={g.idGrupo} value={g.idGrupo}>
                    {g.letra}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Estado civil */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Estado civil</label>
            <select
              name="estadoCivil"
              value={data.estadoCivil}
              onChange={handleChange}
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            >
              <option value="Soltero/a">Soltero/a</option>
              <option value="Casado/a">Casado/a</option>
              <option value="Viudo/a">Viudo/a</option>
            </select>
          </div>
        </div>
      </div>

      {/* ==================== INFORMACIÓN DE CONTACTO ==================== */}
      <div className="mt-5 p-6 bg-white font-medium rounded-lg shadow-[0_5px_3px_#909497] overflow-x-clip">
        <h4 className="w-fit px-7 py-1 rounded-full font-medium bg-[#D1FFAE] text-xl">
          Información de contacto
        </h4>
        <div className="w-full mt-5 grid grid-cols-2 grid-rows-3 gap-8">
          {/* Teléfono */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Teléfono</label>
            <input
              name="telefono"
              value={data.telefono}
              onChange={handleChange}
              type="text"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Email</label>
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              type="email"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* Código Postal */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Código Postal</label>
            <input
              name="codigoPostal"
              value={data.codigoPostal}
              onChange={handleChange}
              type="text"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* Estado */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Estado</label>
            <input
              name="estado"
              value={data.estado}
              onChange={handleChange}
              type="text"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* Municipio */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Municipio</label>
            <input
              name="municipio"
              value={data.municipio}
              onChange={handleChange}
              type="text"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>

          {/* Calle y número */}
          <div className="flex flex-col justify-center">
            <label className="ml-1 text-md font-medium">Calle y número</label>
            <input
              name="calleYnumero"
              value={data.calleYnumero}
              onChange={handleChange}
              type="text"
              className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
            />
          </div>
        </div>
      </div>

      {/* ==================== SECCIÓN PARA TUTORES (si tiene cedulaProfesional) ==================== */}
      {user?.cedulaProfesional ? (
        <div className="mt-5 p-6 bg-white font-medium rounded-lg shadow-[0_5px_3px_#909497] overflow-x-clip">
          <h4 className="w-fit px-7 py-1 rounded-full font-medium bg-[#D1FFAE] text-xl">
            Información de profesional
          </h4>
          <div className="w-full mt-5 grid grid-cols-3 gap-8">
            {/* Cédula */}
            <div className="flex flex-col justify-center">
              <label className="ml-1 text-md font-medium">Cédula</label>
              <input
                name="cedulaProfesional"
                value={data.cedulaProfesional}
                onChange={handleChange}
                type="text"
                className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
              />
            </div>

            {/* Título */}
            <div className="flex flex-col justify-center">
              <label className="ml-1 text-md font-medium">Título</label>
              <input
                name="titulo"
                value={data.titulo}
                onChange={handleChange}
                type="text"
                className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
              />
            </div>

            {/* Especialidad */}
            <div className="flex flex-col justify-center">
              <label className="ml-1 text-md font-medium">Especialidad</label>
              <input
                name="especialidad"
                value={data.especialidad}
                onChange={handleChange}
                type="text"
                className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ==================== SECCIÓN TUTORADO: INFORMACIÓN ASPIRACIONAL ==================== */}
          <div className="mt-5 p-6 bg-white font-medium rounded-lg shadow-[0_5px_3px_#909497] overflow-x-clip">
            <h4 className="w-fit px-7 py-1 rounded-full font-medium bg-[#D1FFAE] text-xl">
              Información aspiracional
            </h4>
            <div className="w-full mt-5 grid grid-cols-1 gap-8">
              {/* Carrera */}
              <div className="flex flex-col justify-center">
                <label className="ml-1 text-md font-medium">Carrera</label>
                <input
                  name="carrera"
                  value={data.carrera}
                  onChange={handleChange}
                  type="text"
                  className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
                />
              </div>

              {/* Razones para la carrera */}
              <div className="flex flex-col">
                <label className="ml-1 text-md font-medium">
                  Razones para la carrera
                </label>
                <textarea
                  name="razonesCarrera"
                  rows="5"
                  value={data.razonesCarrera}
                  onChange={handleChange}
                  className="py-1 px-3 rounded-lg border border-gray-400 resize-none text-md font-normal"
                ></textarea>
              </div>
            </div>
          </div>

          {/* ==================== SECCIÓN TUTORADO: CONDICIONES ==================== */}
          <div className="mt-5 p-6 bg-white font-medium rounded-lg shadow-[0_5px_3px_#909497] overflow-x-clip">
            <h4 className="w-fit px-7 py-1 rounded-full font-medium bg-[#D1FFAE] text-xl">
              Condiciones
            </h4>
            <div className="w-full mt-5 grid grid-cols-3 grid-rows-2 gap-8">
              {/* Enfermedad crónica */}
              <div className="flex flex-col justify-center">
                <label className="ml-1 text-md font-medium">
                  ¿Enfermedad Crónica?
                </label>
                <select
                  name="enfermedad"
                  value={enfermedad}
                  onChange={(e) => handleFlagChange(e, setEnfermedad)}
                  className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>

                {enfermedad === "Si" ? (
                  <>
                    <label className="ml-1 mt-2 text-md font-medium">
                      Descripción
                    </label>
                    <textarea
                      name="enfemerdad"
                      rows="5"
                      value={data.enfemerdad}
                      onChange={handleChange}
                      className="py-1 px-3 rounded-lg border border-gray-400 resize-none text-md font-normal"
                    ></textarea>
                  </>
                ) : (
                  <>
                    <label className="ml-1 mt-2 text-md font-medium">
                      Descripción
                    </label>
                    <textarea
                      rows="5"
                      disabled
                      className="py-1 px-3 rounded-lg bg-gray-200 border border-gray-400 resize-none text-md font-normal"
                    ></textarea>
                  </>
                )}
              </div>

              {/* Discapacidad */}
              <div className="flex flex-col justify-center">
                <label className="ml-1 text-md font-medium">
                  ¿Discapacidad?
                </label>
                <select
                  name="discapacidad"
                  value={discapacidad}
                  onChange={(e) => handleFlagChange(e, setDiscapacidad)}
                  className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>

                {discapacidad === "Si" ? (
                  <>
                    <label className="ml-1 mt-2 text-md font-medium">
                      Descripción
                    </label>
                    <textarea
                      name="discapacidadFisica"
                      rows="5"
                      value={data.discapacidadFisica}
                      onChange={handleChange}
                      className="py-1 px-3 rounded-lg border border-gray-400 resize-none text-md font-normal"
                    ></textarea>
                  </>
                ) : (
                  <>
                    <label className="ml-1 mt-2 text-md font-medium">
                      Descripción
                    </label>
                    <textarea
                      rows="5"
                      disabled
                      className="py-1 px-3 rounded-lg bg-gray-200 border border-gray-400 resize-none text-md font-normal"
                    ></textarea>
                  </>
                )}
              </div>

              {/* Condición psicológica */}
              <div className="flex flex-col justify-center">
                <label className="ml-1 text-md font-medium">
                  ¿Condición Psicológica?
                </label>
                <select
                  name="psicologica"
                  value={psicologica}
                  onChange={(e) => handleFlagChange(e, setPsicologica)}
                  className="py-1 px-3 rounded-lg border border-gray-400 text-md font-normal"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>

                {psicologica === "Si" ? (
                  <>
                    <label className="ml-1 mt-2 text-md font-medium">
                      Descripción
                    </label>
                    <textarea
                      name="situacionPsicologica"
                      rows="5"
                      value={data.situacionPsicologica}
                      onChange={handleChange}
                      className="py-1 px-3 rounded-lg border border-gray-400 resize-none text-md font-normal"
                    ></textarea>
                  </>
                ) : (
                  <>
                    <label className="ml-1 mt-2 text-md font-medium">
                      Descripción
                    </label>
                    <textarea
                      rows="5"
                      disabled
                      className="py-1 px-3 rounded-lg bg-gray-200 border border-gray-400 resize-none text-md font-normal"
                    ></textarea>
                  </>
                )}
              </div>

              {/* Necesidad especial */}
              <div className="flex flex-col justify-center col-span-3">
                <label className="ml-1 text-md font-medium">
                  Necesidad Especial
                </label>
                <select
                  name="necesidadEsp"
                  value={necesidadEsp}
                  onChange={(e) => handleFlagChange(e, setNecesidadEsp)}
                  className="w-fit py-1 px-3 pr-20 rounded-lg border border-gray-400 text-md font-normal"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>

                {necesidadEsp === "Si" ? (
                  <>
                    <label className="ml-1 mt-2 text-md font-medium">
                      Descripción
                    </label>
                    <textarea
                      name="necesidadEspecial"
                      rows="5"
                      value={data.necesidadEspecial}
                      onChange={handleChange}
                      className="py-1 px-3 rounded-lg border border-gray-400 resize-none text-md font-normal"
                    ></textarea>
                  </>
                ) : (
                  <>
                    <label className="ml-1 mt-2 text-md font-medium">
                      Descripción
                    </label>
                    <textarea
                      rows="5"
                      disabled
                      className="py-1 px-3 rounded-lg bg-gray-200 border border-gray-400 resize-none text-md font-normal"
                    ></textarea>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ==================== BOTONES ==================== */}
      <div className="p-10 pb-20 flex w-full justify-end">
        <button
          type="submit"
          className="flex items-center ml-10 px-10 py-4 shadow-[0px_1px_5px_#a3be8c] text-xl font-medium rounded-lg bg-[#86DE91]"
        >
          <img
            className="w-[18px] h-[18px] mr-4"
            src="/icons/guardar-el-archivo.png"
            alt="Guardar"
          />
          Guardar
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="ml-10 px-10 py-4 shadow-[0px_1px_5px_#a3be8c] text-xl font-medium rounded-lg bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
