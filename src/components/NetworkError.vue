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
  },
};
</script>
