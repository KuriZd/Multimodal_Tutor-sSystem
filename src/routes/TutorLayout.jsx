// src/layouts/TutorLayout.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout-Tutor";
import {
  FiHome,
  FiUser,
  FiBookOpen,
  FiCheckSquare,
  FiBarChart2,
} from "react-icons/fi";
import logo from "../assets/TutLogo.png";

const routes = [
  { icon: <FiHome />, text: "Inicio", route: "/TutorHome" },
  { icon: <FiUser />, text: "Tutorados", route: "/tutorados" },
  { icon: <FiBookOpen />, text: "Actividades", route: "/actividades" },
  { icon: <FiCheckSquare />, text: "Asistencias", route: "/asistencias" },
  { icon: <FiBarChart2 />, text: "Reportes", route: "/reportes" },
];

export default function TutorLayout() {
  const [nombreTutor, setNombreTutor] = useState("Cargando...");
  const [rfc, setRfc] = useState("N/A");

  useEffect(() => {
    // ► Extraer el objeto "usuario" de localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      // Si no existe, podemos dejar "Cargando..." o mostrar un mensaje alternativo
      setNombreTutor("Usuario no encontrado");
      return;
    }

    const curp = usuario.curp;

    // ► Llamada a la API para obtener datos completos del tutor
    axios
      .get(`http://localhost:8000/api/tutores/curp/${curp}`)
      .then((res) => {
        const tutor = res.data;
        const nombreCompleto =
          `${tutor.nombres} ${tutor.apellidoPaterno} ${tutor.apellidoMaterno}`.trim();
        setNombreTutor(nombreCompleto || "Nombre no disponible");
        setRfc(tutor.curp || "N/A");
      })
      .catch((err) => {
        console.error("❌ Error al obtener tutor:", err);
        setNombreTutor("No encontrado");
        setRfc("N/A");
      });
  }, []);

  return (
    <Layout
      sidebarRoutes={routes}
      logo={logo}
      userImage="https://i.pravatar.cc/300"
      customUserName={nombreTutor} // ← Aquí pasamos el nombre obtenido
      theme="orange"
      userProfileRoute="/perfil-tutor" // ← Ajusta según tu ruta real de perfil
    >
      {/* Si necesitas pasar "rfc" o más props al contenido hijo, hazlo a través de Outlet context */}
      <Outlet context={{ rfc }} />
    </Layout>
  );
}
