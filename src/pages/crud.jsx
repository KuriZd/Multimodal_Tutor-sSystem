    import React, { useState } from "react";

    export default function UsersTable() {
    const [users, setUsers] = useState([
        { id: 1, curp: "ABC123456XYZ", role: "Administrador" },
        { id: 2, curp: "DEF789012UVW", role: "Usuario" },
        { id: 3, curp: "GHI345678RST", role: "Moderador" },
    ]);

    const handleEdit = (id) => {
        alert(`Editar usuario con ID: ${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold text-center mb-6">Usuarios Registrados</h2>
            <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">CURP</th>
                <th className="border border-gray-300 p-2">Rol</th>
                <th className="border border-gray-300 p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id} className="text-center">
                    <td className="border border-gray-300 p-2">{user.curp}</td>
                    <td className="border border-gray-300 p-2">{user.role}</td>
                    <td className="border border-gray-300 p-2 space-x-2">
                    <button
                        onClick={() => handleEdit(user.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    }