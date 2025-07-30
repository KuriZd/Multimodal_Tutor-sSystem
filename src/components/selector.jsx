import { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import CardInfo from "./InfoCard";
import { fetchTutoradoInfo } from "../Services/servicesApiTutoradoInfo";
import { fetchTutorInfo } from "../Services/servicesApiTutorinfo";

// Estilo dinámico para botones de pestaña
const tabButtonStyle = (isActive) =>
  `flex items-center gap-2 px-6 py-2 text-lg font-medium rounded-lg transition-all duration-200 
   ${
     isActive
       ? "bg-green-400 text-black shadow-md"
       : "text-black hover:text-green-700"
   }`;

// Skeleton loader visual
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-24 bg-gray-200 rounded-lg w-full"></div>
    ))}
  </div>
);

// Lógica de obtención de datos según pestaña activa
const getData = async (tab, setState, setLoading, setError) => {
  setLoading(true);
  setError(null);
  try {
    const result =
      tab === "Tutores" ? await fetchTutorInfo() : await fetchTutoradoInfo();
    setState(result);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    setError(
      "Hubo un problema al cargar los datos. Intenta de nuevo más tarde."
    );
    setState([]);
  } finally {
    setLoading(false);
  }
};

export default function ToggleTabs() {
  const [activeTab, setActiveTab] = useState("Tutores");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData(activeTab, setData, setLoading, setError);
  }, [activeTab]);

  const renderPanel = (titulo, tipo) => (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${tipo.toLowerCase()}`}
      aria-hidden={activeTab !== tipo}
      hidden={activeTab !== tipo}
      className="w-full mt-6 px-4"
    >
      <h1 className="text-3xl font-semibold mb-4 ml-2">Lista de {titulo}</h1>
      {error && <p className="text-center text-red-500 font-medium">{error}</p>}
      {loading ? <SkeletonLoader /> : <CardInfo data={data} tipo={tipo} />}
    </div>
  );

  return (
    <div className="relative">
      {/* Selector + Título fijos */}
      <div className="sticky top-0 z-50 bg-white pb-2 pt-4 px-4 shadow-sm">
        {/* Selector de pestañas */}
        <div className="flex justify-start items-center mb-4">
          <div
            role="tablist"
            aria-label="Selector de pestañas"
            className="flex bg-gray-200 rounded-xl p-2 shadow-md"
          >
            <button
              role="tab"
              id="tab-tutores"
              aria-selected={activeTab === "Tutores"}
              aria-controls="panel-tutores"
              onClick={() => setActiveTab("Tutores")}
              className={tabButtonStyle(activeTab === "Tutores")}
            >
              <FaGraduationCap size={20} />
              Tutores
            </button>
            <button
              role="tab"
              id="tab-tutorados"
              aria-selected={activeTab === "Tutorados"}
              aria-controls="panel-tutorados"
              onClick={() => setActiveTab("Tutorados")}
              className={tabButtonStyle(activeTab === "Tutorados")}
            >
              <HiOutlineDocumentText size={20} />
              Tutorados
            </button>
          </div>
        </div>

        {/* Título dinámico */}
        <h1 className="text-3xl font-semibold ml-2">Lista de {activeTab}</h1>
      </div>

      {/* Paneles de contenido */}
      <div className="w-full mt-4 px-4 pb-8">
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <CardInfo data={data} tipo={activeTab} />
        )}
      </div>
    </div>
  );
}
