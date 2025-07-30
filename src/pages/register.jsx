import { useState } from "react";
import { Lock, User } from "lucide-react";
import { store } from "../Services/servicesApiRegister";

export default function Register() {
  //VARIABLES PARA EL FORMULARIO
  const [form, setForm] = useState({ curp: "", contrasena: "", rol: "A" });

  //CAMBIA LAS VAIABLES CONFORME SE ESCRIBE EN EL FORMULAIO
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //MANDA A LLAMAR LA FUNCION STORE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await store(form.curp, form.contrasena, form.rol);
      console.log("Registro exitoso:", response);
      alert("Usuario registrado con éxito!");
    } catch (err) {
      console.log("Error en el registro:", err);
      alert("Error en el registro: " + (err.message || "Inténtalo de nuevo"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="curp"
              placeholder="CURP"
              value={form.curp}
              onChange={handleChange}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={form.contrasena}
              onChange={handleChange}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <select
            name="rol"
            onChange={handleChange}
            className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
          >
            <option value="A">Administrador</option>
            <option value="E">Tutorado</option>
            <option value="P">Tutor</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Registrarse
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
