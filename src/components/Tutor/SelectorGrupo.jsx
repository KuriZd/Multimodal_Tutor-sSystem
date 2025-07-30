import { useEffect, useState } from "react";

const SelectorGrupo = ({ titulo = "Tutorados", onSeleccionar = () => {} }) => {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
  const [grupos, setGrupos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || !usuario.curp) {
      setError("No se encontró CURP del tutor.");
      setCargando(false);
      return;
    }

    const curp = usuario.curp;

    fetch(`http://localhost:8000/api/tutores/${curp}/grupos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los grupos");
        return res.json();
      })
      .then((data) => setGrupos(data))
      .catch((err) => {
        console.error("Error al cargar grupos:", err);
        setError("No se pudieron cargar los grupos.");
      })
      .finally(() => setCargando(false));
  }, []);

  const manejarCambio = (e) => {
    setGrupoSeleccionado(e.target.value);
  };

  const manejarSeleccion = () => {
    if (grupoSeleccionado) {
      onSeleccionar(grupoSeleccionado); // 👈 Se delega la acción
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-[4px] border-[#f99b94] w-full max-w-md">
      <div className="text-sm font-semibold text-[#cc928b] bg-[#FFEEEC] px-4 py-[2px] rounded-full w-fit mb-4 shadow-sm">
        {titulo}
      </div>

      <div className="mb-6">
        <label
          htmlFor="grupo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Grupo
        </label>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <select
          id="grupo"
          value={grupoSeleccionado}
          onChange={manejarCambio}
          disabled={cargando}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        >
          <option value="">
            {cargando ? "Cargando grupos..." : "Seleccione el grupo"}
          </option>
          {grupos.map((grupo) => (
            <option key={grupo.idGrupo} value={grupo.idGrupo}>
              Grupo {grupo.letra}
            </option>
          ))}
        </select>
      </div>

      <div className="text-right">
        <button
          onClick={manejarSeleccion}
          disabled={!grupoSeleccionado}
          className={`${
            grupoSeleccionado
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          } text-white px-4 py-2 rounded text-sm transition-colors`}
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
};

export default SelectorGrupo;
