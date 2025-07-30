import { useState } from "react";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/servicesApiLogin";
import logo from "../assets/logo.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setValidationErrors({});
    setLoading(true);

    const currentErrors = {};
    if (!form.email) {
      currentErrors.email = "El campo email es obligatorio.";
    }
    if (!form.password) {
      currentErrors.password = "El campo contraseña es obligatorio.";
    }

    if (Object.keys(currentErrors).length > 0) {
      setValidationErrors(currentErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await login(form.email, form.password);

      // Guardar token y usuario completo en localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("usuario", JSON.stringify(response.user));

      const rol = response.user.rol.toLowerCase();

      switch (rol) {
        case "admin":
          navigate("/Home");
          break;
        case "profesor":
          navigate("/TutorHome");
          break;
        case "estudiante":
          navigate("/inicio-estudiante");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.";

      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setLoginError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-white p-10 rounded-md shadow-md w-full max-w-md overflow-hidden border-l border-gray-300">
        <div className="absolute top-0 right-0 h-full w-1 flex flex-col">
          <div className="h-1/3 bg-green-400 rounded-tr-md"></div>
          <div className="h-1/3 bg-blue-400"></div>
          <div className="h-1/3 bg-red-400 rounded-br-md"></div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="MiTutor" className="h-16 mb-2" />
        </div>

        {loginError && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="email"
                name="email"
                placeholder="CURP"
                value={form.email}
                onChange={handleChange}
                className="pl-10 w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {validationErrors.email && (
              <span className="text-sm text-red-600">
                {validationErrors.email}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="pl-10 w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {validationErrors.password && (
              <span className="text-sm text-red-600">
                {validationErrors.password}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <button
              type="submit"
              disabled={loading}
              className={`bg-black text-white py-2 rounded transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <a
            href="/password/request"
            className="text-sm text-gray-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div className="text-center mt-2">
          <a href="/about-us" className="text-xs text-gray-400 hover:underline">
            About us
          </a>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          ¿No tienes cuenta?{" "}
          <button
            onClick={handleRegisterRedirect}
            className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
