const mockPerfilTutorado = {
    nombres: "Luis Alberto",
    apellidoPaterno: "Hernández",
    apellidoMaterno: "Soto",
    fechaNacimiento: "2003-05-12",
    curp: "GALA850615HMCRPN08",
    genero: "M",
    idGrupo: 1,
    canalizacion: false,
    carrera: "Ingeniería en Sistemas",
    razonesCarrera: "Me gusta la tecnología",
    telefono: "5512340001",
    estadoCivil: "Soltero/a",
    email: "luis@example.com",
    municipio: "Iztapalapa",
    estado: "CDMX",
    calleYnumero: "Calle 1 #123",
    codigoPostal: "09870",
    discapacidadFisica: null,
    enfemerdad: "Diabetes",
    situacionPsicologica: null,
    necesidadEspecial: "Jugador de fornite",
    fotoPerfil: "https://randomuser.me/api/portraits/men/32.jpg"
};

// Simular retraso de red
const simulateNetworkDelay = () => Math.random() * 1000 + 300;

// Simular fallo aleatorio
const shouldFail = () => Math.random() > 0.9;

/**
 * Simula la obtención del perfil completo de un tutorado
 * @returns {Promise<Object>}
 */
export const fetchPerfilTutorado = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail()) {
                reject(new Error("No se pudo obtener la información del tutorado"));
            } else {
                resolve({ ...mockPerfilTutorado });
            }
        }, simulateNetworkDelay());
    });
};
