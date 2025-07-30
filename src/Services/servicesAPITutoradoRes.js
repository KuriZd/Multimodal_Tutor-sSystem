// Lista simulada de tutorados
const mockTutorados = [
    {
        nombreCompleto: "Luis Alberto Hernández Soto",
        carrera: "Ingeniería en Sistemas",
        asistencia: "12 / 24 (50%)",
        avanceActividades: "75%",
        necesidad: "Sí"
    },
    {
        nombreCompleto: "Andrea Martínez Ruiz",
        carrera: "Ingeniería Industrial",
        asistencia: "22 / 24 (91%)",
        avanceActividades: "100%",
        necesidad: "No"
    },
    {
        nombreCompleto: "Carlos Eduardo Pérez Vega",
        carrera: "Arquitectura",
        asistencia: "18 / 24 (75%)",
        avanceActividades: "60%",
        necesidad: "Sí"
    }
];

// Simular retraso de red
const simulateNetworkDelay = () => Math.random() * 1000 + 200;

// Simular error
const shouldFail = () => Math.random() > 0.9;

/**
 * Simula la obtención de una lista de tutorados
 * @returns {Promise<Array>} Lista de tutorados
 */
export const fetchTutorados = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail()) {
                reject(new Error("No se pudieron cargar los tutorados"));
            } else {
                resolve([...mockTutorados]);
            }
        }, simulateNetworkDelay());
    });
};
