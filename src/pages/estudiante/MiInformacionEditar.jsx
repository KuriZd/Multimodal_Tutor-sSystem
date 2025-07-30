import React from "react";
import LayoutEstudiante from "../../components/layout-Estudiante";

const MiInformacionEditar = () => {
  return (
    <LayoutEstudiante>
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Nota superior */}
        <div className="max-w-6xl mx-auto mb-4">
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium">
            Nota: Si requiere modificar su CURP, contacte al administrador del sistema.
          </div>
        </div>

        <form className="max-w-6xl mx-auto space-y-6">
          {/* Tarjeta: Información general */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-500 bg-blue-50 px-4 py-2 rounded-lg mb-6 inline-block">
              Editar información general
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Columna izquierda */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="Escribe tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido paterno</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="Escribe tu apellido paterno"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido materno</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="Escribe tu apellido materno"
                  />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
                  <input
                    type="date"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Género</label>
                  <select className="w-full mt-1 rounded-md border-gray-300 shadow-sm">
                    <option value="">Selecciona</option>
                    <option>Masculino</option>
                    <option>Femenino</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="flex justify-center items-start mt-6">
                  <div className="text-center">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Foto de perfil"
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta: Información adicional */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-blue-500 bg-blue-50 px-4 py-2 rounded-lg mb-6 inline-block">
              Editar información adicional
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Columna izquierda */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="123-456-7890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado civil</label>
                  <select className="w-full mt-1 rounded-md border-gray-300 shadow-sm">
                    <option value="">Selecciona</option>
                    <option>Soltero</option>
                    <option>Casado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Municipio</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="Municipio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select className="w-full mt-1 rounded-md border-gray-300 shadow-sm">
                    <option value="">Selecciona</option>
                    <option>Michoacán</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calle y número</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="Calle y número"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Código postal</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Colonia</label>
                  <input
                    type="text"
                    className="w-full mt-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="Colonia"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="max-w-6xl mx-auto flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => window.location.href = "/mi-informacionE"}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
            >
              Regresar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </LayoutEstudiante>
  );
};

export default MiInformacionEditar;
