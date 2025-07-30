import api from "./api";

export const login = async (curp, contrasena) => {
  try {
    const response = await api.post("/loginUser", { curp, contrasena });
    const { user } = response.data;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return { user };
    } else {
      throw new Error("La respuesta no contiene datos de usuario.");
    }
  } catch (error) {
    const backendMsg = error.response?.data?.message;
    throw new Error(backendMsg || "Ocurrió un error al intentar iniciar sesión.");
  }
};


