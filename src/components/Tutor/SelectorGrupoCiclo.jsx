import { useEffect, useState } from "react";

const SelectorGrupoCiclo = ({
  titulo = "Consultar Reporte",
  onSeleccionar = () => {},
}) => {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
  const [cicloSeleccionado, setCicloSeleccionado] = useState("");
  const [grupos, setGrupos] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const curp = usuario?.curp;

    if (!curp) {
      setError("No se encontró información del tutor.");
      setCargando(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [resGrupos, resCiclos] = await Promise.all([
          fetch(`http://localhost:8000/api/tutores/${curp}/grupos`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8000/api/ciclos-escolares", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const dataGrupos = await resGrupos.json();
        const dataCiclos = await resCiclos.json();

        // Eliminar duplicados por ciclo + year
        const ciclosUnicos = dataCiclos.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) => t.ciclo === value.ciclo && t.year === value.year
            )
        );

        setCiclos(ciclosUnicos);

        setGrupos(dataGrupos);
        setCiclos(dataCiclos);
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  const manejarSeleccion = () => {
    if (grupoSeleccionado && cicloSeleccionado) {
      onSeleccionar(grupoSeleccionado, cicloSeleccionado); // 👈 se delega a la prop
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-400 w-full max-w-md space-y-5">
      <div className="text-base font-semibold text-[#cc928b] bg-[#FFEEEC] px-4 py-1 rounded-full w-fit">
        {titulo}
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-1">
          Grupo
        </label>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <select
          value={grupoSeleccionado}
          onChange={(e) => setGrupoSeleccionado(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={cargando}
        >
          <option value="">
            {cargando ? "Cargando grupos..." : "Seleccione el grupo"}
          </option>
          {grupos.map(({ idGrupo, letra }) => (
            <option key={idGrupo} value={idGrupo}>
              Grupo {letra}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-1">
          Ciclo Escolar
        </label>
        <select
          value={cicloSeleccionado}
          onChange={(e) => setCicloSeleccionado(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={cargando}
        >
          <option value="">
            {cargando ? "Cargando ciclos..." : "Seleccione el ciclo"}
          </option>
          {ciclos.map(({ idCicloEscolar, ciclo, year }) => (
            <option key={idCicloEscolar} value={idCicloEscolar}>
              {ciclo} - {year}
            </option>
          ))}
        </select>
      </div>

      <div className="text-right pt-2">
        <button
          onClick={manejarSeleccion}
          disabled={!grupoSeleccionado || !cicloSeleccionado}
          className={`px-4 py-2 rounded text-base font-medium transition-colors ${
            grupoSeleccionado && cicloSeleccionado
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
};

export default SelectorGrupoCiclo;
