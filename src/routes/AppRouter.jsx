// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Crud from "../pages/crud";
import Editar from "../pages/editar";

import AdminHome from "../pages/admin/AdminHome";
import ProfileAdm from "../pages/admin/ProfileAdm";
import Citas from "../pages/admin/AdminCitas";
import Pruebas from "../pages/admin/ProfileAdm";

//Rutas para estudiantes saul y sinuhe
import InicioEstudiante from "../pages/estudiante/InicioEstudiante";
import MiInformacionE from "../pages/estudiante/MiInformacionE";
import MiInformacionEditar from "../pages/estudiante/MiInformacionEditar";
import TutorHome from "../pages/Tutor/TutorHome";
import Asd from "../pages/asd";
import PerfilTutorado from "../pages/Tutor/PerfilTutorado";
import TutoradosList from "../pages/Tutor/TutoradosList";
import Tutorados from "../pages/Tutor/Tutorados";
import Asistencias from "../pages/Tutor/Asistencias";
import AsistenciasList from "../pages/Tutor/AsistenciasList";
import VistaReportes from "../pages/Tutor/ReportesTutor";
import Reportes from "../pages/Tutor/Reportes";

//Rutas KuriZd-kevin

import TutorLayout from "../routes/TutorLayout";
import AdminLayout from "../routes/AdminLayout";
import CuadernoActividades from "../pages/estudiante/CuadernoActividades";
import AnalisisFodae from "../pages/estudiante/AnalisisFodae";
import LineaVida from "../pages/estudiante/LineaVida";
import ComprensionLectora from "../pages/estudiante/ComprensionLectora";
import ExamenVocacional from "../pages/estudiante/ExamenVocacional";
import ExamenVocacionalPreguntas from "../pages/estudiante/ExamenVocacionalPreguntas";
import ExamenVocacionalResultados from "../pages/estudiante/ExamenVocacionalResultados";
import CitasTutorados from "../pages/estudiante/CitasTutorados";
import Actividades from "../pages/Tutor/Actividades";
import ActividadesList from "../pages/Tutor/ActividadesList";
import TutoradoNecesidad from "../pages/Tutor/TutoradoNecesidad";
import ComprencionLectora from "../pages/Tutor/Actividades/ComprencionLectora";

import Foda from "../pages/Tutor/Actividades/foda";
import LineaDVida from "../pages/Tutor/Actividades/LineaVida";
import ExmVocacional from "../pages/Tutor/Actividades/ExmVocacional";
import MLineaVida from "../pages/Tutor/Actividades/ModalLinea";
import MFoda from "../pages/Tutor/Actividades/Modalfoda";
import MExmVocacional from "../pages/Tutor/Actividades/ModalVocacion";
import PerfilTutor from "../pages/Tutor/PerfilTutor";

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas sin layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/crud" element={<Crud />} />
      <Route path="/editar" element={<Editar />} />
      <Route path="/pruebas" element={<Pruebas />} />

      {/* KuriZd Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/Home" element={<AdminHome />} />
        <Route path="/Profile" element={<ProfileAdm />} />
        <Route path="/Citas" element={<Citas />} />
      </Route>

      {/* Rutas de Kevin con Layout */}
      <Route element={<TutorLayout />}>
        <Route path="/TutorHome" element={<TutorHome />} />
        <Route path="/asd" element={<Asd />} />
        <Route path="tutorados/:idGrupo" element={<TutoradosList />} />
        <Route path="tutorados" element={<Tutorados />} />
        <Route
          path="/perfil-tutorado/:idCuentaTutorado"
          element={<PerfilTutorado />}
        />
        <Route
          path="/tutorado-necesidad/:idCuentaTutorado"
          element={<TutoradoNecesidad />}
        />
        <Route path="/asistencias" element={<Asistencias />} />
        <Route path="/asistencias/:idGrupo" element={<AsistenciasList />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/reportes/:idGrupo/:idCiclo" element={<VistaReportes />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route
          path="/actividades/:idGrupo/:idCiclo"
          element={<ActividadesList />}
        />
        <Route path="/ComprencionLectora" element={<ComprencionLectora />} />
        <Route path="/foda" element={<Foda />} />
        <Route path="/lineaDvida" element={<LineaDVida />} />
        <Route path="/ExmVocacional" element={<ExmVocacional />} />

        <Route path="/ModalFoda/:idCuentaTutorado" element={<MFoda />} />
        <Route
          path="/ModalLineaVida/:idCuentaTutorado"
          element={<MLineaVida />}
        />
        <Route
          path="/ModalExmVocacional/:idCuentaTutorado"
          element={<MExmVocacional />}
        />
        <Route path="/perfil-tutor" element={<PerfilTutor />} />
      </Route>
      {/* Rutas de Kevin con Layout */}

      {/* Rutas Estudiante */}
      <Route path="/inicio-estudiante" element={<InicioEstudiante />} />
      <Route path="/mi-informacionE" element={<MiInformacionE />} />
      <Route path="/mi-informacionEditar" element={<MiInformacionEditar />} />
      <Route path="/cuaderno-actividades" element={<CuadernoActividades />} />
      <Route path="/analisis-fodae" element={<AnalisisFodae />} />
      <Route path="/linea-vida" element={<LineaVida />} />
      <Route path="/comprension-lectora" element={<ComprensionLectora />} />
      <Route path="/examen-vocacional" element={<ExamenVocacional />} />
      <Route
        path="/examen-vocacionalPreguntas"
        element={<ExamenVocacionalPreguntas />}
      />
      <Route
        path="/examen-vocacionalResultados"
        element={<ExamenVocacionalResultados />}
      />
      <Route path="/citas-tutorados" element={<CitasTutorados />} />

      {/* Redirección por defecto si la ruta no existe */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
