<template>
  <div class="error-page">
    <h1>401</h1>
    <p>🔐 Tu sesión ha expirado o no tienes autorización.</p>
    <img src="@/assets/401.png" alt="No autorizado" class="error-img" />
    <router-link to="/login" class="back-home">Iniciar sesión</router-link>
  </div>
</template>

<script>
export default { name: "ErrorPage401" };
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