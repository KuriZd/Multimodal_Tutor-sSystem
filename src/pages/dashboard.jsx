import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Solo verificamos si hay user, ya no usamos token
    const userData = localStorage.getItem("user");

    if (!userData) {
      alert("No estás autenticado. Redirigiendo al login...");
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // 🔁 Solo eliminamos user
    alert("Sesión cerrada");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">¡Bienvenido al Dashboard! 🚀</h1>

        {user ? (
          <div className="text-gray-800 space-y-2">
            <p><strong>Nombre:</strong> {user.nombre || "No definido"}</p>
            <p><strong>CURP:</strong> {user.curp || "No definido"}</p>
            <p><strong>Rol:</strong> {user.rol || "No definido"}</p>
          </div>
        ) : (
          <p className="text-gray-500">Cargando datos del usuario...</p>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

