import React, { useState } from 'react';

const AsistenciaCard = ({ nombre, carrera }) => {
    // Estado para manejar el estado de la asistencia
    const [estadoAsistencia, setEstadoAsistencia] = useState('No asistió');

    // Función para cambiar el estado de la asistencia
    const cambiarEstadoAsistencia = () => {
        setEstadoAsistencia(prevState => (prevState === 'Asistió' ? 'No asistió' : 'Asistió'));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center justify-between w-full max-w-[950px] my-[1px]">
            <span className="font-semibold text-gray-800 text-base">{nombre}</span>
            <span className="text-sm text-gray-600 hidden md:block">{carrera}</span>
            <button
                onClick={cambiarEstadoAsistencia}
                className={`py-2 px-4 rounded-full text-sm w-24 text-center ${estadoAsistencia === 'Asistió' ? 'bg-green-400 text-white' : 'bg-red-400 text-white'
                    }`}
            >
                {estadoAsistencia === 'Asistió' ? 'Asistió' : 'No asistió'}
            </button>
        </div>
    );
};

export default AsistenciaCard;
