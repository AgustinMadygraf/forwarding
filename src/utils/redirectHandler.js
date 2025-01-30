/*
Path: src/utils/redirectHandler.js
Este archivo maneja la lógica de redirección, cuenta regresiva y gestión de GIFs utilizando POO y SOLID.
*/

import { checkServerConnection } from "@/utils/checkConnection";

// Clase que maneja la conexión al servidor
export class ServerConnectionHandler {
  constructor(primaryUrl, secondaryUrl) {
    this.primaryUrl = primaryUrl;
    this.secondaryUrl = secondaryUrl;
  }

  async connect() {
    let result = await checkServerConnection(this.primaryUrl);
    if (result.success) {
      window.location.href = this.primaryUrl;
      return { success: true };
    }

    console.warn("URL primaria fallida, intentando con URL secundaria...");
    result = await checkServerConnection(this.secondaryUrl);

    if (result.success) {
      window.location.href = this.secondaryUrl;
      return { success: true };
    }

    return {
      error: true,
      errorMessage: "Por favor, verifica tu conexión a la red de la fábrica.",
    };
  }
}

// Clase que maneja la cuenta regresiva
export class CountdownTimer {
  constructor(duration, callback) {
    this.duration = duration;
    this.callback = callback;
  }

  start() {
    return new Promise((resolve) => {
      let remainingTime = this.duration;
      const interval = setInterval(() => {
        remainingTime -= 0.1;
        this.callback(remainingTime.toFixed(1)); // Actualiza la UI
        if (remainingTime <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }
}

export class GifManager {
  static defaultGifList = [
    "/gifs/01.gif",
    "/gifs/02.gif",
    "/gifs/03.gif",
    "/gifs/04.gif",
    "/gifs/05.gif",
    "/gifs/06.gif",
    "/gifs/07.gif",
    "/gifs/08.gif",
    "/gifs/09.gif",
    "/gifs/10.gif",
    "/gifs/11.gif",
    "/gifs/12.gif",
    "/gifs/13.gif",
    "/gifs/14.gif",
    "/gifs/15.gif",
    "/gifs/16.gif",
    "/gifs/17.gif",
  ];

  constructor(gifList = GifManager.defaultGifList) {
    if (!Array.isArray(gifList) || gifList.length === 0) {
      throw new Error("La lista de GIFs no puede estar vacía.");
    }

    this.gifList = [...gifList]; // Copia para evitar modificaciones accidentales
    this.lastGif = null;
    this.shuffleGifList(); // Mezcla la lista inicialmente
  }

  // Método para obtener un GIF aleatorio sin repetir inmediatamente
  getRandomGif() {
    if (this.gifList.length === 1) return this.gifList[0]; // Si hay un solo GIF, no hay rotación

    const gif = this.gifList.pop(); // Toma el último GIF de la lista
    this.gifList.unshift(this.lastGif); // Reincorpora el anterior al inicio
    this.lastGif = gif; // Guarda el último GIF usado

    return gif;
  }

  // Método para mezclar aleatoriamente la lista de GIFs (Fisher-Yates Shuffle)
  shuffleGifList() {
    for (let i = this.gifList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.gifList[i], this.gifList[j]] = [this.gifList[j], this.gifList[i]];
    }
  }
}

// Función que coordina el proceso de conexión con cuenta regresiva
export async function attemptServerConnection(primaryUrl, secondaryUrl, countdownCallback) {
  const countdown = new CountdownTimer(3.0, countdownCallback);
  await countdown.start();

  const connectionHandler = new ServerConnectionHandler(primaryUrl, secondaryUrl);
  return await connectionHandler.connect();
}
