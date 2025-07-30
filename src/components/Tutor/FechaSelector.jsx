import React, { useState, useEffect } from 'react';

const FechaSelector = ({ fechas }) => {
    // Inicializamos fechaSeleccionada con la primera fecha del array, si existe
    const [fechaSeleccionada, setFechaSeleccionada] = useState(fechas.length > 0 ? fechas[0] : '');

    // Si las fechas cambian, actualizamos la fecha seleccionada
    useEffect(() => {
        if (fechas.length > 0) {
            setFechaSeleccionada(fechas[0]);
        }
    }, [fechas]);

    const handleSelectFecha = (fecha) => {
        setFechaSeleccionada(fecha);
    };

    return (
        <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4 p-4 bg-white rounded-lg shadow-md w-[85%]">
            {/* Fecha seleccionada */}
            <div
                className="bg-[#FFEEEC] text-[#cc928b] px-4 py-2 flex-shrink-0 rounded-full lg:w-40 w-full overflow-x-auto flex justify-center"
                onClick={() => handleSelectFecha(fechaSeleccionada)}
            >
                {fechaSeleccionada}
            </div>

            {/* Contenedor de fechas (scrollable) */}
            <div className="flex overflow-x-auto space-x-2 lg:space-x-4 w-full">
                {fechas.map((fecha, index) => (
                    <button
                        key={index}
                        className={`w-32 flex-shrink-0 px-4 py-2 rounded-full text-sm ${fecha === fechaSeleccionada
                            ? 'bg-[#FFEEEC] text-[#cc928b]'
                            : 'text-gray-700 hover:bg-[#FFEEEC] hover:text-[#cc928b]'
                            }`}
                        onClick={() => setFechaSeleccionada(fecha)}
                    >
                        {fecha}
                    </button>
                ))}
            </div>

            {/* Botón de guardar */}
            <button className="bg-gray-300 text-black px-4 py-1 rounded-md lg:w-40 w-full">
                Terminar
            </button>
        </div>
    );
};

export default FechaSelector;
