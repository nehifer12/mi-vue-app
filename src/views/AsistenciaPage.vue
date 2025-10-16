<template>
  <div class="asistencia-page">
    <!-- Botón superior fijo -->
    <button class="btn-regresar" @click="goHome">Regresar a Tinder</button>

    <!-- Contenido principal -->
    <div class="asistencia-content">
      <h1> ¿Cómo podemos ayudarte?</h1>

      <!-- Buscador -->
      <div class="search-box">
        <input type="text" placeholder="🔍 Buscar..." />
      </div>

      <!-- Secciones de ayuda -->
      <div class="help-sections">
        <button class="help-btn pink">Guía para usar Tinder</button>
        <button class="help-btn orange">Solución de problemas</button>
        <button class="help-btn red">Seguridad y privacidad</button>
        <button class="help-btn dark-pink">Seguridad y denuncias</button>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>Privacidad · Español (Latinoamérica)</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsistenciaPage",
  methods: {
    goHome() {
      this.$router.push("/"); // Redirige a la página principal
    }
  }
};
</script>

<style scoped>
/* === ESTRUCTURA GENERAL === */
.asistencia-page {
  font-family: "Poppins", sans-serif;
  color: #222;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 80px;
}

/* === BOTÓN REGRESAR SUPERIOR === */
.btn-regresar {
  position: fixed;
  top: 20px;
  right: 25px;
  background: #ff4757;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4);
  transition: all 0.3s ease;
}
.btn-regresar:hover {
  background: #e84118;
  transform: scale(1.05);
}

/* === CONTENIDO === */
.asistencia-content {
  max-width: 900px;
  text-align: center;
  padding: 40px 20px;
}

.asistencia-content h1 {
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: #111;
}

/* === BUSCADOR === */
.search-box {
  margin-bottom: 50px;
}

.search-box input {
  width: 100%;
  max-width: 500px;
  padding: 12px 18px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 25px;
  outline: none;
  transition: 0.3s;
}
.search-box input:focus {
  border-color: #ff4757;
  box-shadow: 0 0 10px rgba(255, 71, 87, 0.3);
}

/* === BOTONES DE AYUDA === */
.help-sections {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
}

.help-btn {
  flex: 1 1 200px;
  padding: 15px 25px;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
  max-width: 260px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
}

.help-btn:hover {
  transform: translateY(-4px);
  opacity: 0.9;
}

/* Colores */
.pink {
  background: linear-gradient(135deg, #ff85a2, #ff2975);
}
.orange {
  background: linear-gradient(135deg, #ffb347, #ff6633);
}
.red {
  background: linear-gradient(135deg, #ff6b6b, #ee5253);
}
.dark-pink {
  background: linear-gradient(135deg, #ff4f81, #d10050);
}

/* === FOOTER === */
.footer {
  margin-top: 60px;
  font-size: 14px;
  color: #777;
}

/* === RESPONSIVE === */
@media (max-width: 600px) {
  .help-btn {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .btn-regresar {
    top: 15px;
    right: 15px;
    font-size: 13px;
    padding: 8px 14px;
  }
}
</style>