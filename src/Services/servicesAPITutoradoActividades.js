// Lista simulada de actividades del tutorado
const mockActividades = [
    {
        nombre: "Comprensión Lectora",
        estado: "Completada",
    },
    {
        nombre: "FODA",
        estado: "En curso",
    },
    {
        nombre: "Autoevaluación",
        estado: "Sin comenzar",
    },
];

// Simula latencia de red
const simulateNetworkDelay = () => Math.random() * 1000 + 200;

// Simula fallo (opcional)
const shouldFail = () => Math.random() > 0.95;

/**
 * Simula la obtención de actividades del tutorado
 * @returns {Promise<Array>}
 */
export const fetchActividadesTutorado = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail()) {
                reject(new Error("No se pudieron cargar las actividades"));
            } else {
                resolve([...mockActividades]);
            }
        }, simulateNetworkDelay());
    });
};
