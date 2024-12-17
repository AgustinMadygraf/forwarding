<!--
Path: src/App.vue
Este componente es el encargado de redirigir al usuario al servidor de la aplicación.
-->

<template>
  <div id="app" class="container mt-5">
    <NetworkError v-if="error" :message="errorMessage" />
    <div v-else class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Redirigiendo...</span>
      </div>
      <p class="mt-3">Redirigiendo al servidor...</p>
    </div>
  </div>
</template>

<script>
import { checkServerConnection } from "@/utils/checkConnection";
import NetworkError from "@/components/NetworkError.vue";

export default {
  name: "App",
  components: {
    NetworkError,
  },
  data() {
    return {
      error: false,
      errorMessage: "",
      serverUrl: process.env.VUE_APP_BASE_URL || "http://localhost",
    };
  },
  mounted() {
    this.handleServerConnection();
  },
  methods: {
    async handleServerConnection() {
      const isConnected = await checkServerConnection(this.serverUrl);
      if (isConnected) {
        window.location.href = this.serverUrl;
      } else {
        this.error = true;
        this.errorMessage = "No se pudo conectar a la dirección configurada.";
      }
    },
  },
};
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>
