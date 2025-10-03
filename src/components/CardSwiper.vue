<template>
  <!-- WRAPPER que cubre TODO el viewport -->
  <div class="page-bg">
    <!-- Contenedor de corazones (va detrás) -->
    <div class="hearts-container" aria-hidden="true">
      <div
        v-for="n in heartsCount"
        :key="n"
        class="heart"
        :style="heartStyle(n)"
      ></div>
    </div>

    <!-- Contenedor centrado de las cards (encima de los corazones) -->
    <div class="card-swiper">
      <h2>Explora perfiles 🔥</h2>

      <div class="cards-container">
        <transition-group name="swipe" tag="div">
          <div
            v-for="(u, index) in users"
            :key="u.email"
            class="card"
            :class="{
              'swipe-right': swipeStates[u.email] === 'right',
              'swipe-left': swipeStates[u.email] === 'left'
            }"
          >
            <img :src="u.avatar" alt="avatar" class="card-avatar" />
            <h3>{{ u.name }}</h3>
            <p>{{ u.city }} - {{ u.gender }}</p>

            <div class="preferences">
              <span
                v-for="key in getActivePreferences(u)"
                :key="key"
                class="tag"
              >
                {{ preferenceNames[key] }}
              </span>
            </div>

            <div class="actions">
              <button class="btn-like" @click="swipeRight(index)">❤️ Like</button>
              <button class="btn-skip" @click="swipeLeft(index)">❌ Omitir</button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardSwiper",
  data() {
    return {
      users: [
        { name: "Ana", city: "Bogotá", gender: "F", email: "ana@test.com", avatar: "https://i.pravatar.cc/300?img=32", preferences: { travel: true, food: true } },
        { name: "Carlos", city: "Medellín", gender: "M", email: "carlos@test.com", avatar: "https://i.pravatar.cc/300?img=12", preferences: { sports: true, movies: true } },
        { name: "Lucía", city: "Cali", gender: "F", email: "lucia@test.com", avatar: "https://i.pravatar.cc/300?img=56", preferences: { art: true, fun: true } },
        { name: "Ana", city: "Bogotá", gender: "F", email: "ana@test.com", avatar: "https://i.pravatar.cc/300?img=32", preferences: { travel: true, food: true } },
        { name: "Carlos", city: "Medellín", gender: "M", email: "carlos@test.com", avatar: "https://i.pravatar.cc/300?img=12", preferences: { sports: true, movies: true } },
        { name: "Lucía", city: "Cali", gender: "F", email: "lucia@test.com", avatar: "https://i.pravatar.cc/300?img=56", preferences: { art: true, fun: true } },
        { name: "Javier", city: "Barranquilla", gender: "M", email: "javier@test.com", avatar: "https://i.pravatar.cc/300?img=18", preferences: { music: true, sports: true } },
        { name: "Mariana", city: "Cartagena", gender: "F", email: "mariana@test.com", avatar: "https://i.pravatar.cc/300?img=45", preferences: { travel: true, beach: true } },
        { name: "Sofía", city: "Bucaramanga", gender: "F", email: "sofia@test.com", avatar: "https://i.pravatar.cc/300?img=29", preferences: { reading: true, movies: true } },
        { name: "Andrés", city: "Bogotá", gender: "M", email: "andres@test.com", avatar: "https://i.pravatar.cc/300?img=15", preferences: { technology: true, fun: true } },
        { name: "Valentina", city: "Cali", gender: "F", email: "valentina@test.com", avatar: "https://i.pravatar.cc/300?img=47", preferences: { art: true, dance: true } },
        { name: "Mateo", city: "Medellín", gender: "M", email: "mateo@test.com", avatar: "https://i.pravatar.cc/300?img=36", preferences: { sports: true, travel: true } },
        { name: "Laura", city: "Pereira", gender: "F", email: "laura@test.com", avatar: "https://i.pravatar.cc/300?img=28", preferences: { music: true, food: true } },
        { name: "Felipe", city: "Manizales", gender: "M", email: "felipe@test.com", avatar: "https://i.pravatar.cc/300?img=60", preferences: { coffee: true, movies: true } },
        { name: "Camila", city: "Santa Marta", gender: "F", email: "camila@test.com", avatar: "https://i.pravatar.cc/300?img=49", preferences: { beach: true, yoga: true } },
        { name: "Daniel", city: "Bogotá", gender: "M", email: "daniel@test.com", avatar: "https://i.pravatar.cc/300?img=17", preferences: { technology: true, art: true } },
        { name: "Isabella", city: "Cali", gender: "F", email: "isabella@test.com", avatar: "https://i.pravatar.cc/300?img=31", preferences: { photography: true, travel: true } },
        { name: "Tomás", city: "Medellín", gender: "M", email: "tomas@test.com", avatar: "https://i.pravatar.cc/300?img=40", preferences: { food: true, fun: true } }
      ],
      preferenceNames: {
        travel: "Viajar",
        music: "Música",
        sports: "Deportes",
        food: "Comida",
        movies: "Películas",
        art: "Arte",
        gaming: "Videojuegos",
        friends: "Amigos",
        relationship: "Relación",
        networking: "Networking",
        casual: "Cita casual",
        sex: "Sexo",
        fun: "Diversión"
      },
      // para controlar la animación del swipe por tarjeta (usa email como clave)
      swipeStates: {},
      // número de corazones que se renderizan (lluvia)
      heartsCount: 12
    };
  },
  methods: {
    getActivePreferences(user) {
      if (!user.preferences) return [];
      return Object.keys(user.preferences).filter(key => user.preferences[key]);
    },

    // Calcula estilo inline para cada corazón (varía posición, tamaño y delay)
    heartStyle(n) {
      const left = Math.round((n * 7.5) % 100); // posición horizontal variada
      const delay = (n * 0.45) % 4; // delay repetido cada ciertos elementos
      const size = 28 + (n % 4) * 10; // 28, 38, 48, 58 px etc
      const duration = 5 + (n % 3); // 5s,6s,7s para variedad
      return {
        left: left + "%",
        animationDelay: delay + "s",
        width: size + "px",
        height: size + "px",
        animationDuration: duration + "s"
      };
    },

    // swipe hacia la derecha (like)
    swipeRight(index) {
      const u = this.users[index];
      if (!u) return;
      const key = u.email;

      // marcar estado para aplicar clase css
      if (this.$set) {
        this.$set(this.swipeStates, key, "right");
      } else {
        this.swipeStates[key] = "right";
      }

      // esperar animación y luego eliminar usuario y estado
      setTimeout(() => {
        const foundIndex = this.users.findIndex(x => x.email === key);
        if (foundIndex !== -1) this.users.splice(foundIndex, 1);
        // limpiar estado
        if (this.$delete) {
          this.$delete(this.swipeStates, key);
        } else {
          delete this.swipeStates[key];
        }
      }, 520); // 520ms coincide con la transición CSS
    },

    // swipe hacia la izquierda (omit)
    swipeLeft(index) {
      const u = this.users[index];
      if (!u) return;
      const key = u.email;

      if (this.$set) {
        this.$set(this.swipeStates, key, "left");
      } else {
        this.swipeStates[key] = "left";
      }

      setTimeout(() => {
        const foundIndex = this.users.findIndex(x => x.email === key);
        if (foundIndex !== -1) this.users.splice(foundIndex, 1);
        if (this.$delete) {
          this.$delete(this.swipeStates, key);
        } else {
          delete this.swipeStates[key];
        }
      }, 520);
    }
  }
};
</script>

<style scoped>
/* ---- Fondo general: ocupa todo el viewport ---- */
.page-bg {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Fondo global de la vista (ocupa toda la pantalla) */
  background: linear-gradient(180deg, #120617 0%, #381121 45%, #6a103f 100%);
}

/* Hearts container (detrás de todo) */
.hearts-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* estilo general del corazón (usa tamaño/duración/delay inline) */
.heart {
  position: absolute;
  top: -15vh; /* empiezan por encima del viewport */
  transform: rotate(-45deg);
  opacity: 0.95;
  filter: drop-shadow(0 8px 18px rgba(255, 60, 120, 0.25));
  background: radial-gradient(circle at 30% 30%, #ff7b9e, #ff2b6d);
  border-radius: 6px;
  animation-name: fallDown;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* los semicírculos que forman el corazón */
.heart::before,
.heart::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: inherit;
  width: 100%;
  height: 100%;
}
.heart::before { top: -50%; left: 0; }
.heart::after { left: 50%; top: 0; }

/* animación: baja y desaparece */
@keyframes fallDown {
  0% {
    transform: translateY(-25vh) rotate(-45deg) scale(0.85);
    opacity: 0;
  }
  10% { opacity: 1; }
  100% {
    transform: translateY(120vh) rotate(-45deg) scale(1.15);
    opacity: 0;
  }
}

/* ---- Card swiper (centrado, arriba de corazones) ---- */
.card-swiper {
  max-width: 520px;
  width: 100%;
  margin: 20px;
  text-align: center;
  color: #fff;
  position: relative;
  z-index: 2; /* encima de los corazones */
  padding: 8px;
  box-sizing: border-box;
}

/* contenedor de las cartas */
.cards-container {
  position: relative;
  height: 560px;
}

/* tarjeta: TRANSLÚCIDA para dejar ver background */
.card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255,255,255,0.06); /* muy translúcido para no opacar corazones */
  border-radius: 18px;
  padding: 28px;
  backdrop-filter: blur(10px); /* glassmorphism */
  box-shadow: 0 26px 40px rgba(0,0,0,0.45);
  transition: transform 0.5s ease, opacity 0.5s ease;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Avatar */
.card-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 6px solid #ff3366;
  box-shadow: 0 8px 30px rgba(255, 51, 102, 0.15);
  margin-bottom: 10px;
}

/* Preferencias y tags */
.preferences {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 20px 0;
  width: 90%;
}
.tag {
  display: inline-block;
  background: rgba(255,51,102,0.95);
  color: #fff;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  margin: 3px;
  text-align: center;
}

/* botones */
.actions {
  margin-top: 15px;
  display: flex;
  gap: 18px;
  justify-content: center;
  width: 100%;
}
.actions button {
  border: none;
  border-radius: 28px;
  padding: 12px 34px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  font-weight: 700;
  box-shadow: 0px 8px 18px rgba(0,0,0,0.2);
}
.btn-like {
  background: linear-gradient(90deg,#ff4d7b,#ff2b6d);
  color: #fff;
}
.btn-skip {
  background: #e9e9ea;
  color: #333;
}
.actions button:hover { transform: translateY(-4px); }

/* swipe - animaciones aplicadas por clase (usadas con swipeStates) */
.swipe-right {
  transform: translateX(650px) rotate(18deg);
  opacity: 0;
}
.swipe-left {
  transform: translateX(-650px) rotate(-18deg);
  opacity: 0;
}

/* Responsivo */
@media (max-width: 480px) {
  .card-swiper { margin: 12px; }
  .cards-container { height: 640px; }
  .card-avatar { width: 120px; height: 120px; }
  .tag { font-size: 12px; padding: 6px 10px; }
}
</style>