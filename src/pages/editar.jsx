    import React, { useState } from "react";

    export default function EditUser() {
    const [form, setForm] = useState({ password: "", role: "Usuario" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Usuario editado:", form);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold text-center mb-6">Editar Usuario</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700">Contraseña</label>
                <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
                required
                />
            </div>
            <div>
                <label className="block text-gray-700">Rol</label>
                <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
                required
                >
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Usuario</option>
                <option value="Moderador">Moderador</option>
                </select>
            </div>
            <div className="flex justify-between">
                <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                Guardar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    }