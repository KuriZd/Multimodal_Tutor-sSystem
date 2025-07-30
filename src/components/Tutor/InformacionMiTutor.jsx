const InformacionMiTutor = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md h-full max-h-fit">
      {/* Encabezado decorado */}
      <div className="text-base font-semibold text-[#ffffff] bg-[#ff988a] px-4 py-2 rounded-full w-fit mb-3">
        Información de MiTutor
      </div>

      {/* Contenido */}
      <p className="text-lg text-gray-700 leading-relaxed">
        En MiTutor podrás realizar el seguimiento de tus tutorados para no
        perder de vista el cuidado a ellos, podrás darles seguimiento y ver su
        rendimiento. Así como también podrás asignar actividades a tus sesiones,
        e incluso crear nuevas. Sin dejar de lado las asistencias y el registro
        de las actividades.
      </p>
    </div>
  );
};

export default InformacionMiTutor;
