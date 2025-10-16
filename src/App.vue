<template>
  <div id="app">
    <!-- Mostrar Navbar solo si no estamos en /asistencia -->
    <Navbar v-if="!ocultarNavbar" />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  computed: {
    ocultarNavbar() {
      return this.$route.path.toLowerCase().includes("asistenciaPage");
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #fff;
}
</style>


