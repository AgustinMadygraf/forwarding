<!-- 
Path: src/components/RedirectHandler.vue 
Este componente redirige al usuario a la URL del servidor que esté disponible.
-->

<template>
    <div v-if="error" class="container mt-5">
      <NetworkError 
        :message="errorMessage" 
        :primary-url="serverUrl" 
        :secondary-url="secondaryUrl" 
      />
    </div>
    <div v-else class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Redirigiendo...</span>
      </div>
    </div>
  </template>
  
  <script>
  import { handleServerConnection } from "@/utils/redirectHandler";
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
      };
    },
    mounted() {
      this.handleServerConnection();
    },
    methods: {
      async handleServerConnection() {
        const result = await handleServerConnection(this.serverUrl, this.secondaryUrl);
        if (result && result.error) {
          this.error = true;
          this.errorMessage = result.errorMessage;
        }
      },
    },
  };
  </script>