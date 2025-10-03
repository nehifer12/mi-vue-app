<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="nav-left">
      <img src="@/assets/logo.png" alt="Logo" class="nav-logo" />
    </div>

    <!-- Menú derecho -->
    <div class="nav-right">
      <!-- Si hay sesión -->
      <template v-if="session">
        <div class="user-menu-wrapper">
          <img :src="session.avatar || defaultAvatar" alt="Avatar" class="avatar" @click="toggleMenu" />
          <span class="username">{{ session.username }}</span>
          <div v-if="menuOpen" class="dropdown">
            <router-link to="/profile" class="dropdown-item">👤 Perfil</router-link>
            <router-link to="/settings" class="dropdown-item">⚙️ Configuración</router-link>
            <!-- Nuevo botón de mensajes -->
            <router-link to="/mensajes" class="nav-btn">📩 Mensajes</router-link>
            <button class="dropdown-item" @click="cerrarSesion">🚪 Cerrar sesión</button>
          </div>
        </div>
      </template>

      <template v-if="session">
        <router-link to="/cards" class="btn btn-swipe">💖 Explorar</router-link>
      </template>

      <!-- Si NO hay sesión -->
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
    // 🔥 Escuchar cambios de sesión
    EventBus.$on("session-changed", (user) => {
      this.session = user;
    });

    // 🔥 Escuchar registro
    EventBus.$on("usuarioRegistrado", (user) => {
      this.usuarioActivo = user;
      this.session = user;
      console.log("Nuevo usuario registrado:", user);
    });

    // 🔥 Escuchar login
    EventBus.$on("usuarioLogueado", (user) => {
      this.usuarioActivo = user;
      this.session = user;
      console.log("Usuario en sesión:", user);
    });

    // 🔥 Escuchar actualización de perfil
    EventBus.$on("perfil-actualizado", (user) => {
      this.session = user;
      baseDatos.setSession(user);
    });
  },
  methods: {
    cerrarSesion() {
      // Limpiar sesión de baseDatos y localStorage
      baseDatos.clearSession();
      localStorage.removeItem("loggedUser");
      this.session = null;

      // Avisar a otros componentes
      EventBus.$emit("session-changed", null);

      // Redirigir a login
      if (this.$route.path !== "/login") {
        this.$router.push("/login");
      }
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    setAvatar(user) {
      if (user?.avatar) return user.avatar;
      if (user?.gender && this.avatarMap[user.gender]) {
        const avatars = this.avatarMap[user.gender];
        return avatars[Math.floor(Math.random() * avatars.length)];
      }
      return this.defaultAvatar;
    }
  }
};
</script>

<style scoped>
/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  padding: 10px 25px;
}
.nav-left img {
  height: 60px;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Botones */
.btn {
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}
.btn-home, .btn-register {
  background: #ff3366;
  color: #fff;
}
.btn-login {
  background: #fff;
  color: #ff3366;
  border: 2px solid #ff3366;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-swipe {
  background: linear-gradient(45deg, #ff3366, #ff6699);
  color: #fff;
  font-weight: bold;
}

/* Usuario */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ff3366;
  cursor: pointer;
}
.username {
  margin-left: 8px;
  font-weight: bold;
}

/* Dropdown */
.dropdown {
  position: absolute;
  right: 25px;
  top: 70px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  overflow: hidden;
  z-index: 200;
}
.dropdown-item {
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
}
.dropdown-item:hover {
  background: #ff3366;
  color: #fff;
}
</style>
