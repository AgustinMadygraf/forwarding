<!--
Path: src/components/RedirectHandler.vue
Este componente se encarga de redirigir al usuario a la página principal de la aplicación.
-->

<template>
  <div class="redirect-handler container d-flex flex-column align-items-center mt-5">
    <transition name="fade">
      <NetworkError 
        v-if="error" 
        :message="errorMessage" 
        :primary-url="serverUrl" 
        :secondary-url="secondaryUrl" 
      />
    </transition>

    <transition name="fade">
      <div v-if="!error" class="text-center">
        <p class="mt-3 text-muted">{{ statusMessage }}</p>
        <p class="fw-bold text-primary mt-2">
          Redirigiendo en <span class="countdown">{{ countdownSeconds }}</span> segundos...
        </p>
        <div class="gif-container mt-3">
          <img :src="selectedGif" alt="Cargando..." class="loading-gif img-fluid"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { attemptServerConnection, GifManager } from "@/utils/redirectHandler";
import NetworkError from "@/components/NetworkError.vue";

export default {
  name: "RedirectHandler",
  components: {
    NetworkError,
  },
  data() {
    return {
      error: false,
      errorMessage: "",
      serverUrl: process.env.VUE_APP_PRIMARY_URL,
      secondaryUrl: process.env.VUE_APP_SECONDARY_URL,
      statusMessage: "Intentando conectar al servidor...",
      countdownSeconds: "3.0",
      selectedGif: "",
      gifManager: new GifManager(), // Instancia de GifManager
    };
  },
  mounted() {
    this.selectRandomGif();
    this.handleServerConnection();
  },
  methods: {
    async handleServerConnection() {
      const result = await attemptServerConnection(
        this.serverUrl,
        this.secondaryUrl,
        (newTime) => { this.countdownSeconds = newTime; }
      );

      if (result && result.error) {
        this.error = true;
        this.errorMessage = result.errorMessage;
      }
    },
    
    selectRandomGif() {
      this.selectedGif = this.gifManager.getRandomGif();
    },
  },
};
</script>
