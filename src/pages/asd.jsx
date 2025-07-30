import { useEffect, useState } from "react";
import ActividadesTutorado from "../components/Tutor/ActividadesTutorado";

const VistaDetalleTutorado = () => {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    // Simulamos una petición a la API
    setActividades([
      {
        id: 1,
        nombre: "Lectura inicial",
        estado: "Completada",
        onVer: () => alert("Viendo actividad 1"),
      },
      {
        id: 2,
        nombre: "Ensayo reflexivo",
        estado: "En curso",
        onVer: () => alert("Viendo actividad 2"),
      },
      {
        id: 3,
        nombre: "Cierre de unidad",
        estado: "Sin comenzar",
        onVer: () => alert("Viendo actividad 3"),
      },
      {
        id: 3,
        nombre: "Cierre de unidad",
        estado: "Sin comenzar",
        onVer: () => alert("Viendo actividad 3"),
      },
      {
        id: 3,
        nombre: "Cierre de unidad",
        estado: "Sin comenzar",
        onVer: () => alert("Viendo actividad 3"),
      },
      {
        id: 3,
        nombre: "Cierre de unidad",
        estado: "Sin comenzar",
        onVer: () => alert("Viendo actividad 3"),
      },
      {
        id: 3,
        nombre: "Cierre de unidad",
        estado: "Sin comenzar",
        onVer: () => alert("Viendo actividad 3"),
      },

      {
        id: 3,
        nombre: "Cierre de unidad",
        estado: "Sin comenzar",
        onVer: () => alert("Viendo actividad 3"),
      },
      {
        id: 3,
        nombre: "Cierre de unidad",
        estado: "Sin comenzar",
        onVer: () => alert("Viendo actividad 3"),
      },
      {
        id: 3,
        nombre: "Cierre de unidad",
        estado: "Sin comenzar",
        onVer: () => alert("Viendo actividad 3"),
      },
      {
        id: 3,
        nombre: "Cierre de unidad",
        estado: "Sin comenzar",
        onVer: () => alert("Viendo actividad 3"),
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Detalle del Tutorado
        </h1>
        <ActividadesTutorado actividades={actividades} />
      </div>
    </div>
  );
};

export default VistaDetalleTutorado;
