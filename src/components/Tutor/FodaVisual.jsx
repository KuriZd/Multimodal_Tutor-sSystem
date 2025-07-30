const FodaVisual = ({ tutorado, foda, onSalir }) => {
  return (
    <div className="h-fit w-fit flex flex-col items-center ">
      {/* Header con foto y nombre */}
      <div className="flex items-center space-x-2 bg-[#86A0FE] text-white px-4 mt-10 py-2 rounded-full shadow-md">
        <img
          src={tutorado.fotoPerfil}
          alt="Foto"
          className="h-8 w-8 rounded-full"
        />
        <span className="font-semibold text-sm">
          {tutorado.nombres} {tutorado.apellidoPaterno}{" "}
          {tutorado.apellidoMaterno}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center px-4 h-full">
        {/* Círculo Central para móvil */}
        <div className="block md:hidden w-64 h-64 bg-teal-600 rounded-full flex flex-col items-center justify-center shadow-xl mb-8 mx-auto">
          <div className="grid grid-cols-2 gap-0 w-full h-full text-white text-center font-bold text-4xl">
            <div className="flex items-center justify-center relative border-r border-b border-teal-500 p-2">
              F
              <span className="absolute bottom-2 text-sm font-normal">
                Fortalezas
              </span>
            </div>
            <div className="flex items-center justify-center relative border-b border-teal-500 p-2">
              A
              <span className="absolute bottom-2 text-sm font-normal">
                Amenazas
              </span>
            </div>
            <div className="flex items-center justify-center relative border-r border-teal-500 p-2">
              O
              <span className="absolute top-2 text-sm font-normal">
                Oportunidades
              </span>
            </div>
            <div className="flex items-center justify-center relative p-2">
              D
              <span className="absolute top-2 text-sm font-normal">
                Debilidades
              </span>
            </div>
          </div>
        </div>

        {/* Contenedor principal FODA */}
        <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-x-8 gap-y-6 max-w-6xl w-full mx-auto relative p-4">
          {/* Fortalezas */}
          <div className="p-4 rounded-lg shadow-md bg-white text-left h-48 overflow-y-auto w-full max-w-sm md:w-auto mb-4 md:mb-0 md:col-span-1 md:mr-36">
            <h3 className="font-bold text-gray-800 mb-2">Fortalezas</h3>
            <ul className="list-none text-gray-700">
              <li className="font-semibold mt-2 text-sm">{foda.fortaleza}</li>
            </ul>
          </div>

          {/* Amenazas */}
          <div className="p-4 rounded-lg shadow-md bg-white text-left h-48 overflow-y-auto w-full max-w-sm md:w-auto mb-4 md:mb-0 md:col-span-1 md:ml-36">
            <h3 className="font-bold text-gray-800 mb-2">Amenazas</h3>
            <ul className="list-none text-gray-700">
              <li className="font-semibold mt-2 text-sm">{foda.amenazas}</li>
            </ul>
          </div>

          {/* Círculo Central FODA en desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-64 h-64 md:w-80 md:h-80 bg-teal-600 rounded-full flex flex-col items-center justify-center shadow-xl">
            <div className="grid grid-cols-2 gap-0 w-full h-full text-white text-center font-bold text-4xl">
              <div className="flex items-center justify-center relative border-r border-b border-teal-500 p-2">
                F
                <span className="absolute bottom-2 text-sm font-normal">
                  Fortalezas
                </span>
              </div>
              <div className="flex items-center justify-center relative border-b border-teal-500 p-2">
                A
                <span className="absolute bottom-2 text-sm font-normal">
                  Amenazas
                </span>
              </div>
              <div className="flex items-center justify-center relative border-r border-teal-500 p-2">
                O
                <span className="absolute top-2 text-sm font-normal">
                  Oportunidades
                </span>
              </div>
              <div className="flex items-center justify-center relative p-2">
                D
                <span className="absolute top-2 text-sm font-normal">
                  Debilidades
                </span>
              </div>
            </div>
          </div>

          {/* Oportunidades */}
          <div className="p-4 rounded-lg shadow-md bg-white text-left h-48 overflow-y-auto w-full max-w-sm md:w-auto mb-4 md:mb-0 md:col-span-1 md:mr-36">
            <h3 className="font-bold text-gray-800 mb-2">Oportunidades</h3>
            <ul className="list-none text-gray-700">
              <li className="font-semibold mt-2 text-sm">{foda.oportunidad}</li>
            </ul>
          </div>

          {/* Debilidades */}
          <div className="p-4 rounded-lg shadow-md bg-white text-left h-48 overflow-y-auto w-full max-w-sm md:w-auto mb-4 md:mb-0 md:col-span-1 md:ml-36">
            <h3 className="font-bold text-gray-800 mb-2">Debilidades</h3>
            <ul className="list-none text-gray-700">
              <li className="font-semibold mt-2 text-sm">{foda.debilidad}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FodaVisual;
