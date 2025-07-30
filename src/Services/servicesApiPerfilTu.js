// Importa el archivo de la API (si es necesario en tu estructura)
import api from "./api";

// Esta es la versión mockeada de la función fetchTutorPerfil
const fetchTutorPerfil = async () => {
  try {
    // Aquí simulamos una respuesta de la API con datos mockeados
    const mockResponse = {
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "Gómez",
      fechaNacimiento: "1985-10-20",
      genero: "Masculino",
      curp: "JUAP851020HDFRML02",
      telefono: "5512345678",
      estadoCivil: "Soltero",
      email: "juan.perez@example.com",
      municipio: "Morelia",
      estado: "Michoacán",
      calleNumero: "Calle Ficticia 123",
      codigoPostal: "58000",
      matricula: "A1234567",
      image: "https://images.unsplash.com/photo-1742201835989-4e346e36b364?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Aquí puedes usar una imagen mock
    };

    // Retorna los datos mockeados como si fueran de la API
    return mockResponse;
  } catch (error) {
    console.error("Error al obtener los datos", error);
    throw error; 
  }
};

export { fetchTutorPerfil };
