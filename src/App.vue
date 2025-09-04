<template>
  <div id="app">
    <h1>Mini Tinder Vue</h1>
    <!-- Aquí se cargan las vistas del router -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  background: #f7f7f7;
  font-family: Arial, sans-serif;
  margin: 0;
}
#app {
  text-align: center;
  padding: 20px;
  min-height: 100vh;
}
</style>


