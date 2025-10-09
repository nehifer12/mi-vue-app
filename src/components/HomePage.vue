<template>
  <div class="home-page">
    <!-- Video de fondo -->
    <video autoplay muted loop playsinline class="background-video">
      <source src="@/assets/friends.mp4" type="video/mp4" />
      Tu navegador no soporta videos.
    </video>

    <!-- Capa oscura sobre el video -->
    <div class="overlay"></div>

    <!-- Encabezado -->
    <header class="hero">
      <h1>Bienvenido a Tinder Clone ❤️🔥</h1>
      <p>
        Conoce nuevas personas, haz amigos, encuentra pareja o simplemente comparte momentos inolvidables.
      </p>
    </header>

      <!-- Secciones principales -->
      <section class="features">
        <router-link to="/conecta" class="feature-card">
          <img src="@/assets/amigos.jpeg" alt="Conecta" class="feature-img" />
          <h2>💬 Conecta</h2>
          <p>Envía y recibe likes, inicia conversaciones y conoce a personas de tu ciudad y del mundo.</p>
        </router-link>

        <router-link to="/explore" class="feature-card">
          <img src="@/assets/explora.jpeg" alt="Explora" class="feature-img" />
          <h2>🌍 Explora</h2>
          <p>Descubre perfiles auténticos en tu área o en cualquier parte del mundo con un solo desliz.</p>
        </router-link>

        <router-link to="/encuentra" class="feature-card">
          <img src="@/assets/encuentra.png" alt="Encuentra" class="feature-img" />
          <h2>❤️ Encuentra</h2>
          <p>Ya sea amistad, pareja o conexiones únicas, nuestra app es tu punto de encuentro.</p>
        </router-link>
      </section>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 Tinder Clone - La mejor Copia es la que se hace en Casa</p>
      <div class="social-icons">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      user: null,
      menuOpen: false,
    };
  },
  mounted() {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      this.user = JSON.parse(loggedUser);
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    logout() {
      localStorage.removeItem("loggedUser");
      this.user = null;
      this.menuOpen = false;
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
/* Video de fondo */
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  z-index: -1;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ff3366;
}

.dropdown {
  position: absolute;
  background: white;
  border-radius: 10px;
  padding: 10px;
  top: 60px;
  right: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
}

.dropdown a,
.dropdown button {
  padding: 10px;
  text-align: left;
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  color: #444;
}

.dropdown a:hover,
.dropdown button:hover {
  background: #f8f8f8;
}

/* Menú superior */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: center;                 /* 🔑 Ocupa todo el ancho de la ventana */
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.95);
  position: sticky;
  top: 0;
  z-index: 100;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.nav-left {
  flex: 0 0;                     /* 🔑 Ocupa la parte izquierda */
  max-width: 20%;              /* 🔑 Solo un tercio del ancho */
  display: flex;
  align-items: center;
}

.nav-logo {
  height: 70px;          /* 🔑 Controla el alto del logo */
  width: auto;           /* 🔑 Se ajusta proporcionalmente */
  max-height: 50px;      /* 🔑 Límite para que no se pase */
  object-fit: contain;   /* 🔑 Mantiene proporciones */
  display: block;
}

.brand {
  display: none;                /* 🔑 Si no quieres texto al lado del logo */
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Encabezado */
.hero {
  text-align: center;
  padding: 80px 20px 40px;
  color: white;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 15px;
}

.hero p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
}

/* Features */
.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 25px;
  margin: 60px auto;
  max-width: 1100px;
  flex-wrap: wrap;
}

.feature-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  flex: 1 1 300px;
  max-width: 320px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
  transition: transform 0.3s ease;
  text-decoration: none; /* quita subrayado del enlace */
  color: inherit; /* mantiene colores de los textos */
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.feature-img {
  width: 100%;
  height: 380px; /* 🔑 Fijamos la altura para que todas sean iguales */
  object-fit: cover; /* 🔑 Recorta la imagen manteniendo proporción */
  border-radius: 12px;
  margin-bottom: 15px;
}

.feature-card h2 {
  font-size: 1.5rem;
  margin: 10px 0;
  min-height: 40px; /* 🔑 asegura que los títulos ocupen el mismo espacio */
}

.feature-card p {
  flex-grow: 1; /* 🔑 hace que los párrafos se expandan igual en altura */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70px; /* 🔑 altura mínima para igualar bloques de texto */
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 992px) {
  .features {
    justify-content: center;
  }
  .feature-card {
    max-width: 45%; /* dos por fila en tablets */
  }
}

@media (max-width: 600px) {
  .feature-card {
    max-width: 100%; /* una por fila en móviles */
  }
}

/* Botones */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
}

.btn-register {
  background: #ff3366;
  color: white;
}

.btn-register:hover {
  background: #e62e5c;
}

.btn-login {
  background: white;
  color: #ff3366;
  border: 2px solid #ff3366;
}

.btn-login:hover {
  background: #ff3366;
  color: white;
}

/* Footer */
.footer {
  background: white;
  color: #444;
  text-align: center;
  padding: 20px;
  margin: 60px auto 30px auto; /* más separación hacia arriba y abajo */
  border-top: 1px solid #ddd;
  max-width: 400px;  /* 🔑 ancho limitado */
  border-radius: 10px; /* opcional: esquinas redondeadas */
  box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* opcional: sombra ligera */
}

.social-icons {
  margin-top: 10px;
}

.social-icons a {
  margin: 0 10px;
  font-size: 1.4rem;
  color: #ff3366;
  transition: 0.3s;
}

.social-icons a:hover {
  color: #e62e5c;
}
</style>
