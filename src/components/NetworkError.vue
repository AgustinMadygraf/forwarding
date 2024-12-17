<template>
    <div class="alert alert-danger" role="alert">
      ⚠️ Problema en la red: {{ message }}
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
  
  <style scoped>
  .alert {
    margin-top: 20px;
  }
  </style>
  