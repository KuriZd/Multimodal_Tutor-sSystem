import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getTutorAutenticado = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getGruposPorCurp = async (curp) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/tutores/${curp}/grupos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
