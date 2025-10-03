<template>
  <div class="settings-page">
    <h1>⚙️ Configuración</h1>

    <div class="settings-card">
      <h3>Preferencias</h3>
      <label>
        <input type="checkbox" v-model="settings.darkMode" />
        Modo oscuro
      </label>
      <label>
        <input type="checkbox" v-model="settings.notifications" />
        Notificaciones
      </label>
      <label>
        <input type="checkbox" v-model="settings.showOnline" />
        Mostrar en línea
      </label>
      <button @click="saveSettings">Guardar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSettings",
  data() {
    return {
      settings: {
        darkMode: false,
        notifications: true,
        showOnline: true
      }
    };
  },
  mounted() {
    const saved = localStorage.getItem("userSettings");
    if (saved) {
      this.settings = JSON.parse(saved);
    }
  },
  methods: {
    saveSettings() {
      localStorage.setItem("userSettings", JSON.stringify(this.settings));
      alert("Configuración guardada ✅");
    }
  }
};
</script>

<style scoped>
.settings-page {
  text-align: center;
  padding: 30px;
  font-family: "Poppins", sans-serif;
}

.settings-card {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  display: inline-block;
  text-align: left;
}

.settings-card label {
  display: block;
  margin: 10px 0;
}

.settings-card button {
  margin-top: 15px;
  background: #ff3366;
  color: #fff;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.settings-card button:hover {
  background: #e62e5c;
}
</style>