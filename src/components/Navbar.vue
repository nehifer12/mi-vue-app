<template>
  <nav class="navbar">
    <!-- 🔹 Sección izquierda: logo + menú -->
    <div class="nav-left">
      <img src="@/assets/logo.png" alt="Logo" class="nav-logo" />

      <!-- 🔹 Menú alineado al logo -->
      <div class="nav-links">
        <router-link to="/productos" class="nav-link">Productos</router-link>
        <router-link to="/informacion" class="nav-link">Más información</router-link>
        <router-link to="/seguridad" class="nav-link">Seguridad</router-link>
        <router-link to="/asistencia" class="nav-link">Asistencia</router-link>

        <!-- 🔹 Panel de descarga -->
        <div class="nav-link descarga" @click="toggleDescargaPanel">
          Descarga
          <div v-if="descargaPanel" class="descarga-panel">
            <h4>Preparar descarga 🚀</h4>
            <p>Haz clic en continuar para iniciar el proceso.</p>
            <button class="btn-descargar" @click="iniciarDescarga">Continuar</button>
            <button class="btn-cancelar" @click="descargaPanel = false">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔹 Menú derecho (sesión) -->
    <div class="nav-right">
      <template v-if="session">
        <div class="user-menu-wrapper">
          <img :src="session.avatar || defaultAvatar" alt="Avatar" class="avatar" @click="toggleMenu" />
          <span class="username">{{ session.username }}</span>

          <div v-if="menuOpen" class="dropdown">
            <router-link to="/profile" class="dropdown-item">👤 Perfil</router-link>
            <router-link to="/settings" class="dropdown-item">⚙️ Configuración</router-link>
            <router-link to="/mensajes" class="nav-btn">📩 Mensajes</router-link>
            <button class="dropdown-item" @click="cerrarSesion">🚪 Cerrar sesión</button>
          </div>
        </div>

        <router-link to="/cards" class="btn btn-swipe">💖 Explorar</router-link>
      </template>

      <template v-else>
        <router-link to="/" class="btn btn-home">Inicio</router-link>
        <router-link to="/register" class="btn btn-register">Crear cuenta</router-link>
        <router-link to="/login" class="btn btn-login">Iniciar sesión</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import baseDatos, { EventBus } from "@/baseDatos";

export default {
  name: "AppNavbar",
  data() {
    return {
      session: baseDatos.getSession(),
      usuarioActivo: null,
      menuOpen: false,
      descargaPanel: false,
      defaultAvatar: "https://i.pravatar.cc/150?img=50",
      avatarMap: {
        Hombre: ["https://i.pravatar.cc/150?img=20"],
        Mujer: ["https://i.pravatar.cc/150?img=26"],
        Transgénero: ["https://i.pravatar.cc/150?img=32"],
        "Persona en transición": ["https://i.pravatar.cc/150?img=38"],
        "No binario": ["https://i.pravatar.cc/150?img=44"]
      }
    };
  },
  created() {
    EventBus.$on("session-changed", (user) => (this.session = user));
    EventBus.$on("usuarioRegistrado", (user) => (this.session = user));
    EventBus.$on("usuarioLogueado", (user) => (this.session = user));
    EventBus.$on("perfil-actualizado", (user) => {
      this.session = user;
      baseDatos.setSession(user);
    });
  },
  methods: {
    cerrarSesion() {
      baseDatos.clearSession();
      localStorage.removeItem("loggedUser");
      this.session = null;
      EventBus.$emit("session-changed", null);
      if (this.$route.path !== "/login") this.$router.push("/login");
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    toggleDescargaPanel() {
      this.descargaPanel = !this.descargaPanel;
    },
    iniciarDescarga() {
      this.descargaPanel = false;
      alert("✅ Descarga iniciada correctamente...");
      // Ejemplo real: window.open('/downloads/app.zip', '_blank');
    }
  }
};
</script>

<style scoped>
/* ===== NAVBAR GENERAL ===== */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  max-width: 1400px;
  margin: 10px auto;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 12px;
  padding: 10px 25px;
  position: sticky;
  top: 10px;
  z-index: 100;
}

/* ===== SECCIÓN IZQUIERDA (logo + menú) ===== */
.nav-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-logo {
  height: 45px;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.nav-logo:hover {
  transform: scale(1.05);
}

/* ===== MENÚ AL LADO DEL LOGO ===== */
.nav-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  position: relative;
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  font-size: 14.5px;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: color 0.3s;
}
.nav-link:hover {
  color: #ffffff;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #fff;
  transition: width 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
}

/* ===== PANEL DESCARGA ===== */
.descarga {
  position: relative;
}
.descarga-panel {
  position: absolute;
  top: 35px;
  left: -20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 15px 20px;
  width: 220px;
  text-align: center;
  color: #333;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  z-index: 200;
}
.btn-descargar,
.btn-cancelar {
  margin-top: 10px;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-descargar {
  background: linear-gradient(45deg, #ff3366, #ff6699);
  color: #fff;
}
.btn-cancelar {
  background: #ccc;
  color: #333;
}
.btn-descargar:hover {
  transform: scale(1.05);
}

/* ===== SECCIÓN DERECHA (sesión) ===== */
.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* ===== BOTONES SESIÓN ===== */
.btn {
  padding: 8px 18px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-home,
.btn-register {
  background: linear-gradient(45deg, #ff3366, #ff6699);
  color: #fff;
}
.btn-login {
  background: transparent;
  color: #ff3366;
  border: 2px solid #ff3366;
}
.btn:hover {
  transform: translateY(-2px);
}

/* ===== USUARIO ===== */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ff3366;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.avatar:hover {
  transform: scale(1.1);
}
.username {
  margin-left: 8px;
  font-weight: 600;
  color: #fff;
}

/* ===== DROPDOWN ===== */
.dropdown {
  position: absolute;
  right: 25px;
  top: 70px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 200;
}
.dropdown-item {
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
}
.dropdown-item:hover {
  background: #ff3366;
  color: #fff;
}
</style>