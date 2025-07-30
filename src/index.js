// src/main.jsx o index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    <mi-bienvenida nombre="Juan Pérez" rfc="ABC123456" grupos="B,D"></mi-bienvenida>
    <usuario-contenedor></usuario-contenedor>
  </React.StrictMode>
);