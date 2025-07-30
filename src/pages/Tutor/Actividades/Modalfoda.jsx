import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FodaVisual from "../../../components/Tutor/FodaVisual";

const MFoda = () => {
  const { idCuentaTutorado } = useParams();
  const [foda, setFoda] = useState(null);
  const [tutorado, setTutorado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/foda/${idCuentaTutorado}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setFoda(data);
        setTutorado(data.tutorado);
      })
      .catch(err =>
        console.error("Error al cargar FODA del tutorado:", err)
      );
  }, [idCuentaTutorado]);

  if (!foda || !tutorado) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="flex items-center justify-center h-screen">
      <FodaVisual
        tutorado={tutorado}
        foda={foda}
        onSalir={() => window.history.back()}
      />
    </div>
  );
};

export default MFoda;

