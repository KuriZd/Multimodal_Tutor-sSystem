// src/services/ServicesApiCitas.js

/**
 * Simula una petición a la API para obtener citas de tutorados.
 * Puedes usar esto para pruebas sin necesidad de un backend real.
 */
export const fetchMockCitas = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockCitas = [
                {
                    id: "1",
                    title: "Reunión inicial",
                    start: "2025-06-05 09:00",
                    end: "2025-06-05 10:00",
                },
                {
                    id: "2",
                    title: "Revisión de proyecto",
                    start: "2025-06-06 14:00",
                    end: "2025-06-06 15:30",
                },
                {
                    id: "3",
                    title: "Almuerzo con equipo",
                    start: "2025-06-07 13:00",
                    end: "2025-06-07 14:00",
                },
                {
                    id: "4",
                    title: "Capacitación",
                    start: "2025-06-08 11:00",
                    end: "2025-06-08 13:00",
                },
            ];
            resolve(mockCitas);
        }, 1000); // Simula retraso de red de 1 segundo
    });
};
