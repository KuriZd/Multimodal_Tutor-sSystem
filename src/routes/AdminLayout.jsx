// src/layouts/TutorLayout.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout-Tutor";
import { fetchTutorInfo } from "../Services/servicesApiPerfilAd";
import { FiHome, FiUser, FiBookOpen } from "react-icons/fi";
import logo from "../assets/AdmLogo.png";

const routes = [
  { icon: <FiHome />, text: "Inicio", route: "/Home" },
  { icon: <FiUser />, text: "Perfil", route: "/Profile" },
  { icon: <FiBookOpen />, text: "Citas", route: "/Citas" },
];

export default function TutorLayout() {
  const [nombreTutor, setNombreTutor] = useState("Cargando...");
  const [rfc, setRfc] = useState("N/A");

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      setNombreTutor("Usuario no encontrado");
      return;
    }

    const curp = usuario.curp;

    // Intentamos primero obtener datos vía axios
    axios
      .get(`http://localhost:8000/api/tutores/curp/${curp}`)
      .then((res) => {
        const tutor = res.data;
        // Si el objeto tutor está vacío o no tiene nombres, hacemos fallback
        if (!tutor || !tutor.nombres) {
          throw new Error("Datos incompletos desde API; realizando fallback");
        }
        const nombreCompleto =
          `${tutor.nombres} ${tutor.apellidoPaterno} ${tutor.apellidoMaterno}`.trim();
        setNombreTutor(nombreCompleto || "Nombre no disponible");
        setRfc(tutor.curp || "N/A");
      })
      .catch((err) => {
        console.warn(
          "⚠️ No se obtuvieron datos válidos de /api/tutores, intentando fetchTutorInfo():",
          err
        );

        // Fallback: fetchTutorInfo()
        fetchTutorInfo()
          .then((data) => {
            // Asumimos que fetchTutorInfo() devuelve objeto con { nombre, apellidoPaterno, apellidoMaterno }
            const nombreFallback =
              `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`.trim();
            setNombreTutor(nombreFallback || "Nombre no disponible");
            // Si fetchTutorInfo no devuelve CURP, dejamos rfc en "N/A"
            setRfc(data.curp || "N/A");
          })
          .catch((errorFetch) => {
            console.error("❌ Error en fetchTutorInfo():", errorFetch);
            setNombreTutor("No encontrado");
            setRfc("N/A");
          });
      });
  }, []);

  return (
    <Layout
      sidebarRoutes={routes}
      logo={logo}
      userImage="https://i.pravatar.cc/300"
      customUserName={nombreTutor}
      theme="green"
      userProfileRoute="/Profile"
    >
      <Outlet context={{ rfc }} />
    </Layout>
  );
}
