import api from "./api"; 

const fetchTutorInfo = async () => {
  // Mock temporal
  return [
    {
      responsable: "Ing. Luis Eduardo García Martínez",
      carrera: "Ingeniería en Tecnologías de la Información y Comunicaciones",
      estado: "No Disponible",
      grupo: "6B - Redes Avanzadas y Ciberseguridad",
      nombre: "Luis Eduardo",
      apellidoPaterno: "García",
      apellidoMaterno: "Martínez",
      fechaNacimiento: "1985-10-20",
      genero: "Masculino",
      curp: "JUAP851020HDFRML02",
      telefono: "5512345678",
      estadoCivil: "Soltero",
      email: "juan.perez@example.com",
      municipio: "Morelia",
      calleNumero: "Calle Ficticia 123",
      codigoPostal: "58000",
      matricula: "A1234567",
      image: "https://images.unsplash.com/photo-1742201835989-4e346e36b364?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      responsable: "Mtra. Laura Elena Jiménez Soto",
      carrera: "Ingeniería en Sistemas Computacionales",
      estado: "Disponible",
      grupo: "7A - Desarrollo Web",
      nombre: "Laura Elena",
      apellidoPaterno: "Jiménez",
      apellidoMaterno: "Soto",
      fechaNacimiento: "1990-05-14",
      genero: "Femenino",
      curp: "JILA901514MDFLRR07",
      telefono: "5531234567",
      estadoCivil: "Casada",
      email: "laura.jimenez@example.com",
      municipio: "Morelia",
      calleNumero: "Av. Michoacán 45",
      codigoPostal: "58010",
      matricula: "B2345678",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      responsable: "Dr. José Manuel Herrera Pineda",
      carrera: "Ingeniería en Electrónica",
      estado: "Disponible",
      grupo: "5C - Automatización Industrial",
      nombre: "José Manuel",
      apellidoPaterno: "Herrera",
      apellidoMaterno: "Pineda",
      fechaNacimiento: "1982-08-22",
      genero: "Masculino",
      curp: "HEPJ820822HDFRZZ09",
      telefono: "5576543210",
      estadoCivil: "Divorciado",
      email: "jose.herrera@example.com",
      municipio: "Morelia",
      calleNumero: "Calle Luna 100",
      codigoPostal: "58020",
      matricula: "C3456789",
      image: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      responsable: "Mtro. Ernesto Rodríguez López",
      carrera: "Licenciatura en Informática",
      estado: "No Disponible",
      grupo: "4A - Bases de Datos",
      nombre: "Ernesto",
      apellidoPaterno: "Rodríguez",
      apellidoMaterno: "López",
      fechaNacimiento: "1979-02-10",
      genero: "Masculino",
      curp: "RORE790210HDFLRR03",
      telefono: "5598765432",
      estadoCivil: "Casado",
      email: "ernesto.rodriguez@example.com",
      municipio: "Morelia",
      calleNumero: "Calle del Sol 200",
      codigoPostal: "58030",
      matricula: "D4567890",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];
};

export { fetchTutorInfo };
