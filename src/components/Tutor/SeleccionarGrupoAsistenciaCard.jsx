import { useState } from 'react';

const SeleccionarGrupoAsistenciaCard = () => {
  const [grupo, setGrupo] = useState('');
  const grupos = [
    { id: 1, nombre: 'Grupo A' },
    { id: 2, nombre: 'Grupo B' },
    { id: 3, nombre: 'Grupo C' },
  ];

  const guardar = () => {
    console.log(`Grupo seleccionado: ${grupo}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col sm:flex-row w-full max-w-[550px] h-auto sm:h-[250px]">
      <div className="w-full sm:w-[5px] h-[5px] sm:h-auto bg-red-400 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg"></div>
      <div className="flex justify-center items-center w-full p-4">
        <div className="w-full">
          <div className="bg-[#FFEEEC] text-[#F5A89F] p-2 rounded-full w-max mx-auto sm:mx-0 mb-4 sm:mb-2">
            <span className="font-semibold text-lg">Tomar asistencia</span>
          </div>
          <div className="mb-4">
            <label for="grupo" className="block text-sm font-medium text-gray-700">Grupo</label>
            <select id="grupo" value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Seleccione el grupo</option>
              {grupos.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <button onClick={guardar}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeleccionarGrupoAsistenciaCard;
