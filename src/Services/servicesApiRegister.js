import api from "./api";

export const store = async (curp, contrasena, rol) => {
  try {
    const response = await api.post("/users", { curp, contrasena, rol });
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    throw error.response?.data || "Error en el guardado";
  }
};
