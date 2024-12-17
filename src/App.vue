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
      serverUrl: process.env.VUE_APP_PRIMARY_URL,
      secondaryUrl: process.env.VUE_APP_SECONDARY_URL,
    };
  },
  mounted() {
    this.handleServerConnection();
  },
  methods: {
    async handleServerConnection() {
      // Intentar con la URL primaria
      let result = await checkServerConnection(this.serverUrl);
      if (result.success) {
        window.location.href = this.serverUrl;
        return;
      }

      // Si falla, intentar con la URL secundaria
      console.warn("URL primaria fallida, intentando con URL secundaria...");
      result = await checkServerConnection(this.secondaryUrl);

      if (result.success) {
        window.location.href = this.secondaryUrl;
      } else {
        // Ambas URLs fallaron
        this.error = true;
        this.errorMessage =
          "No se pudo conectar ni a la URL primaria ni secundaria.";
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
