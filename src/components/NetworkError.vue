<!--
Path: src/components/NetworkError.vue
Este componente muestra un mensaje de error cuando no se puede conectar al servidor.
-->

<template>
  <div class="alert alert-danger" role="alert">
    <h4 class="alert-heading">⚠️ Problema en la red</h4>
    <p>{{ message }}</p>
    <hr />
    <p class="mb-0">Por favor, verifica tu conexión o intenta más tarde.</p>
    <div class="mt-3">
      <p><strong>URL primaria:</strong> <a :href="primaryUrl" target="_blank">{{ primaryUrl }}</a></p>
      <p><strong>URL secundaria:</strong> <a :href="secondaryUrl" target="_blank">{{ secondaryUrl }}</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NetworkError",
  props: {
    message: {
      type: String,
      required: true,
    },
    primaryUrl: {
      type: String,
      required: false,
    },
    secondaryUrl: {
      type: String,
      required: false,
    },
  },
};
</script>
