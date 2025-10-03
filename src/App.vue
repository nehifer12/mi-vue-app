<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: "App",
  components: {
    Navbar 
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
  background: #f9f9f9;
}
</style>


