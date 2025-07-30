import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../scripts/servicesApiLogin";

const Login = () => {
    const [form, setForm] = useState({ curp: "", contrasena: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.curp || !form.contrasena) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        try {
            const { user } = await login(form.curp, form.contrasena);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
        } catch (err) {
            setError(err.message); // Muestra el mensaje personalizado del backend
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative bg-white p-10 rounded-md shadow-md w-full max-w-md overflow-hidden border-l border-gray-300">

                {/* Franja lateral */}
                <div className="absolute top-0 right-0 h-full w-1 flex flex-col">
                    <div className="h-1/3 bg-green-400 rounded-tr-md"></div>
                    <div className="h-1/3 bg-blue-400"></div>
                    <div className="h-1/3 bg-red-400 rounded-br-md"></div>
                </div>

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/logo.png" alt="MiTutor" className="h-16 mb-2" />
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="curp"
                            value={form.curp}
                            onChange={handleChange}
                            placeholder="CURP"
                            className="w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            name="contrasena"
                            value={form.contrasena}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            className="w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <button type="submit" className="bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>

                {/* Enlaces */}
                <div className="text-center mt-4">
                    <a href="#" className="text-sm text-gray-600 hover:underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <div className="text-center mt-2">
                    <a href="#" className="text-xs text-gray-400 hover:underline">
                        About us
                    </a>
                </div>
            </div>
        </div>
    );
};


export default Login;
