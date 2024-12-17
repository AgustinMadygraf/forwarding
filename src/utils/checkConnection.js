/*
Path: src/utils/checkConnection.js
Este script se encarga de verificar la conexión con el servidor.
*/

export async function checkServerConnection(serverUrl) {
  try {
    const response = await fetch(serverUrl, { method: "HEAD" });
    if (response.ok) {
      return { success: true }; // Conexión exitosa
    } else {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error de red:", error.message);
    return { success: false, message: error.message };
  }
}
