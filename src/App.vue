<!--
Path: src/App.vue
Este componente es la página de inicio de la aplicación.
-->

<template>
  <div id="app" class="container mt-5">
    <RedirectHandler />
  </div>
</template>

<script>
import RedirectHandler from "@/components/RedirectHandler.vue";

export default {
  name: "App",
  components: {
    RedirectHandler,
  },
};
</script>
