/**
 * Servicio para manejar las operaciones relacionadas con la información del tutor
 */

// Datos mock iniciales
const mockTutorData = {
  nombre: "Saul",
  apellidoPaterno: "Romero",
  apellidoMaterno: "Cruz",
  fechaNacimiento: "2003-12-23",
  genero: "Masculino",
  telefono: "4434227563",
  estadoCivil: "Soltero",
  email: "saulromero200323@gmail.com",
  municipio: "Morelia",
  estado: "Michoacán",
  calleNumero: "Paseo del ébano 282",
  codigoPostal: "58110",
  imagenPerfil: "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

// Simular retraso de red
const simulateNetworkDelay = () => Math.random() * 1000 + 200; // 200-1200ms

// Simular posible error (10% de probabilidad)
const shouldFail = () => Math.random() > 0.9;

/**
 * Obtiene la información del tutor
 * @returns {Promise<Object>} Datos del tutor
 */
export const fetchTutorInfo = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error("Error al cargar la información del tutor. Por favor intente más tarde."));
      } else {
        resolve({ ...mockTutorData });
      }
    }, simulateNetworkDelay());
  });
};

/**
 * Actualiza la información del tutor
 * @param {Object} updatedData - Datos actualizados del tutor
 * @returns {Promise<Object>} Datos actualizados del tutor
 */
export const updateTutorInfo = async (updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error("Error al guardar los cambios. Por favor intente nuevamente."));
      } else {
        // Validación simple de datos requeridos
        if (!updatedData.nombre || !updatedData.email) {
          reject(new Error("Nombre y email son campos requeridos"));
          return;
        }

        // Actualizar los datos mock (en una app real esto haría una llamada API)
        Object.assign(mockTutorData, updatedData);
        
        // Simular respuesta del servidor
        const response = {
          success: true,
          data: { ...mockTutorData },
          message: "Perfil actualizado correctamente",
          timestamp: new Date().toISOString()
        };
        
        resolve(response);
      }
    }, simulateNetworkDelay());
  });
};

/**
 * Sube una nueva imagen de perfil
 * @param {File} imageFile - Archivo de imagen
 * @returns {Promise<Object>} URL de la imagen subida
 */
export const uploadProfileImage = async (imageFile) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error("Error al subir la imagen. Por favor intente nuevamente."));
      } else if (!imageFile.type.match('image.*')) {
        reject(new Error("El archivo debe ser una imagen"));
      } else {
        // En una aplicación real, aquí subiríamos el archivo a un servidor
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            success: true,
            imageUrl: event.target.result,
            message: "Imagen actualizada correctamente"
          });
        };
        reader.readAsDataURL(imageFile);
      }
    }, simulateNetworkDelay() * 2); // Más tiempo para uploads
  });
};