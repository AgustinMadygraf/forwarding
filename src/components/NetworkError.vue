<!--
Path: src/components/NetworkError.vue
Este componente se muestra cuando no se puede conectar al servidor.
-->

<template>
  <div class="network-error container d-flex flex-column align-items-center text-center">
    <div class="alert alert-danger mx-auto p-4" role="alert" style="max-width: 500px;">
      <h4 class="alert-heading fw-bold text-danger">⚠️ No se pudo conectar al servidor</h4>
      <p class="text-muted">{{ message }}</p>
      <hr />
      
      <div class="alert alert-info py-2">
        <p class="fw-bold mb-2">🔍 No se pudo validar el certificado de seguridad.</p>
        <p class="mb-0">Sigue estos pasos:</p>
      </div>

      <hr class="my-4">

      <ol class="list-unstyled d-flex flex-column align-items-center text-center mx-auto">
        <li class="mb-3">
          <strong>Abre el siguiente enlace:</strong>
          <a :href="primaryUrl" class="btn btn-outline-primary fw-bold d-block mx-auto mt-2" target="_blank" style="max-width: 200px;">
            Acceder con HTTPS
          </a>
        </li>
        <li class="text-muted small mb-3">Esto solo es necesario la primera vez.</li>
        <li class="mb-3">
          <strong>"Opciones Avanzadas"</strong>.
        </li>
        <li class="mb-3">
          <strong>"Continuar a 10.176.61.55 (no seguro)"</strong>.
        </li>
      </ol>

      <hr class="my-4">

      <p class="text-muted">O bien, accede directamente sin seguridad:</p>
      <a :href="secondaryUrl" class="btn btn-outline-danger fw-bold d-block mx-auto mt-2" target="_blank" style="max-width: 200px;">
        Acceder sin seguridad
      </a>

      <hr class="my-4">

      <button @click="reloadPage" class="btn btn-primary btn-lg mt-3">
        🔄 Ya me conecté a la red WiFi - Reintentar conexión
      </button>
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
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.network-error {
  max-width: 500px;
  margin: auto;
  text-align: center;
}

.list-unstyled {
  padding-left: 0;
}

.alert a {
  text-decoration: none;
}
</style>
