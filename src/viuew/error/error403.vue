<template>
  <div class="error-page">
    <h1>403</h1>
    <p>🚫 No tienes permiso para acceder a esta sección.</p>
    <img src="@/assets/errors/403.jpg" alt="Acceso Denegado" class="error-img" />
    <router-link to="/" class="back-home">Volver al inicio</router-link>
  </div>
</template>

<script>
export default { name: "Error403" };
</script>

<style scoped>
.error-page {
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 80px 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-page h1 {
  font-size: 6rem;
  color: #ff4b5c;
  margin-bottom: 10px;
}

.error-page p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.error-img {
  width: 260px;
  margin: 30px 0;
  opacity: 0.8;
}

.back-home {
  background: #4ade80;
  color: black;
  padding: 10px 18px;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.3s;
}

.back-home:hover {
  background: #22c55e;
}
</style>