/*
Path: vue.config.js
Este archivo se encarga de configurar el proyecto Vue.js.
*/

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    port: 8081
  }
})
