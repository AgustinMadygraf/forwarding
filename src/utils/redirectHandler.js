/*
Path: src/utils/redirectHandler.js

*/

import { checkServerConnection } from "@/utils/checkConnection";

export async function handleServerConnection(primaryUrl, secondaryUrl) {
  let result = await checkServerConnection(primaryUrl);
  if (result.success) {
    window.location.href = primaryUrl;
    return;
  }

  console.warn("URL primaria fallida, intentando con URL secundaria...");
  result = await checkServerConnection(secondaryUrl);

  if (result.success) {
    window.location.href = secondaryUrl;
  } else {
    return {
      error: true,
      errorMessage: "Por favor, verifica tu conexión a la red de la fábrica.",
    };
  }
}