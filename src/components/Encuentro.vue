<template>
  <div class="encuentro-page">
    <!-- Fondo degradado -->
    <div class="page-bg">
      <!-- Corazones animados -->
      <div class="hearts-container">
        <div
          v-for="(h, index) in 20"
          :key="index"
          class="heart"
          :style="heartStyle()"
        ></div>
      </div>

      <!-- Paso 1: Preguntar gustos -->
      <div v-if="step === 1" class="preguntas card-swiper">
        <h2>❤️ Encuentro</h2>
        <h3>Cuéntanos sobre ti</h3>
        <p>Selecciona tus intereses para encontrarte con personas afines:</p>

        <div class="intereses">
          <label
            v-for="(g, index) in gustosDisponibles"
            :key="index"
            class="interes-card"
          >
            <input type="checkbox" v-model="gustosSeleccionados" :value="g" />
            <span>{{ g }}</span>
          </label>
        </div>

        <div class="btn-container">
          <button
            class="btn-like"
            @click="pasarASugerencias"
            :disabled="gustosSeleccionados.length === 0"
          >
            Continuar 
          </button>
        </div>
      </div>

      <!-- Paso 2: Mostrar personas -->
      <div v-else class="card-swiper">
        <h2>❤️ Personas que podrían interesarte</h2>

        <div class="card-stack">
          <div
            v-for="(u, index) in usuariosFiltrados"
            :key="u.email + index"
            class="card"
            :class="swipeStates[u.email]"
            :style="{ zIndex: usuariosFiltrados.length - index }"
          >
            <img :src="u.avatar" alt="avatar" class="card-avatar" />
            <h4>{{ u.name }}</h4>
            <p>{{ u.city }}</p>
            <small>Intereses: {{ u.interests.join(', ') }}</small>

            <div class="actions">
              <button class="btn-like" @click="swipeRight(index)">❤️ Match</button>
              <button class="btn-skip" @click="swipeLeft(index)">❌ Saltar</button>
            </div>
          </div>
        </div>

        <div v-if="!usuariosFiltrados.length">
          <p>No encontramos más personas con tus gustos 😢</p>
        </div>
      </div>

      <!-- Notificación de Match -->
      <div v-if="matchActual" class="match-popup">
        🎉 ¡Tienes un match con {{ matchActual.name }}!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EncuentroPage",
  data() {
    return {
      step: 1,
      gustosDisponibles: ["Música", "Viajes", "Deportes", "Comida", "Tecnología", "Arte"],
      gustosSeleccionados: [],
        usuarios: [
        // 🎵 Música
        { name: "Ana", city: "Bogotá", gender: "F", email: "ana@test.com", avatar: "https://i.pravatar.cc/300?img=32", interests: ["Música", "Comida"] },
        { name: "Javier", city: "Barranquilla", gender: "M", email: "javier@test.com", avatar: "https://i.pravatar.cc/300?img=18", interests: ["Música", "Deportes"] },
        { name: "Laura", city: "Pereira", gender: "F", email: "laura@test.com", avatar: "https://i.pravatar.cc/300?img=28", interests: ["Música", "Viajes"] },
        { name: "Mateo", city: "Medellín", gender: "M", email: "mateo@test.com", avatar: "https://i.pravatar.cc/300?img=36", interests: ["Música", "Tecnología"] },
        { name: "Camila", city: "Santa Marta", gender: "F", email: "camila@test.com", avatar: "https://i.pravatar.cc/300?img=49", interests: ["Música", "Yoga"] },
        { name: "Felipe", city: "Manizales", gender: "M", email: "felipe@test.com", avatar: "https://i.pravatar.cc/300?img=60", interests: ["Música", "Cine"] },
        { name: "Sofía", city: "Bucaramanga", gender: "F", email: "sofia@test.com", avatar: "https://i.pravatar.cc/300?img=29", interests: ["Música", "Lectura"] },
        { name: "Andrés", city: "Bogotá", gender: "M", email: "andres@test.com", avatar: "https://i.pravatar.cc/300?img=15", interests: ["Música", "Tecnología", "Comida"] },
        { name: "Daniela", city: "Medellín", gender: "F", email: "daniela@test.com", avatar: "https://i.pravatar.cc/300?img=21", interests: ["Música", "Arte"] },
        { name: "Ricardo", city: "Cali", gender: "M", email: "ricardo@test.com", avatar: "https://i.pravatar.cc/300?img=55", interests: ["Música", "Viajes"] },

        // 🏀 Deportes
        { name: "Carlos", city: "Medellín", gender: "M", email: "carlos@test.com", avatar: "https://i.pravatar.cc/300?img=12", interests: ["Deportes", "Cine"] },
        { name: "Lucía", city: "Cali", gender: "F", email: "lucia@test.com", avatar: "https://i.pravatar.cc/300?img=56", interests: ["Deportes", "Arte"] },
        { name: "Tomás", city: "Medellín", gender: "M", email: "tomas@test.com", avatar: "https://i.pravatar.cc/300?img=40", interests: ["Deportes", "Comida"] },
        { name: "Mariana", city: "Cartagena", gender: "F", email: "mariana@test.com", avatar: "https://i.pravatar.cc/300?img=45", interests: ["Deportes", "Viajes"] },
        { name: "Isabella", city: "Cali", gender: "F", email: "isabella@test.com", avatar: "https://i.pravatar.cc/300?img=31", interests: ["Deportes", "Fotografía"] },
        { name: "Sebastián", city: "Bogotá", gender: "M", email: "sebastian@test.com", avatar: "https://i.pravatar.cc/300?img=19", interests: ["Deportes", "Música"] },
        { name: "Valentina", city: "Cali", gender: "F", email: "valentina@test.com", avatar: "https://i.pravatar.cc/300?img=47", interests: ["Deportes", "Baile"] },
        { name: "Diego", city: "Medellín", gender: "M", email: "diego@test.com", avatar: "https://i.pravatar.cc/300?img=37", interests: ["Deportes", "Tecnología"] },
        { name: "Laura", city: "Pereira", gender: "F", email: "laura2@test.com", avatar: "https://i.pravatar.cc/300?img=23", interests: ["Deportes", "Lectura"] },
        { name: "Gabriel", city: "Bucaramanga", gender: "M", email: "gabriel@test.com", avatar: "https://i.pravatar.cc/300?img=25", interests: ["Deportes", "Viajes"] },

        // 💻 Tecnología
        { name: "Andrés", city: "Bogotá", gender: "M", email: "andres@test.com", avatar: "https://i.pravatar.cc/300?img=15", interests: ["Tecnología", "Diversión"] },
        { name: "Daniel", city: "Bogotá", gender: "M", email: "daniel@test.com", avatar: "https://i.pravatar.cc/300?img=17", interests: ["Tecnología", "Arte"] },
        { name: "Mateo", city: "Medellín", gender: "M", email: "mateo@test.com", avatar: "https://i.pravatar.cc/300?img=36", interests: ["Tecnología", "Viajes"] },
        { name: "Lucía", city: "Cali", gender: "F", email: "lucia2@test.com", avatar: "https://i.pravatar.cc/300?img=44", interests: ["Tecnología", "Lectura"] },
        { name: "Felipe", city: "Manizales", gender: "M", email: "felipe@test.com", avatar: "https://i.pravatar.cc/300?img=60", interests: ["Tecnología", "Café"] },
        { name: "Sofía", city: "Bucaramanga", gender: "F", email: "sofia2@test.com", avatar: "https://i.pravatar.cc/300?img=30", interests: ["Tecnología", "Música"] },
        { name: "Mariana", city: "Cartagena", gender: "F", email: "mariana2@test.com", avatar: "https://i.pravatar.cc/300?img=26", interests: ["Tecnología", "Comida"] },
        { name: "Julián", city: "Cúcuta", gender: "M", email: "julian@test.com", avatar: "https://i.pravatar.cc/300?img=42", interests: ["Tecnología", "Viajes"] },
        { name: "Natalia", city: "Bogotá", gender: "F", email: "natalia@test.com", avatar: "https://i.pravatar.cc/300?img=41", interests: ["Tecnología", "Cine"] },
        { name: "Esteban", city: "Cali", gender: "M", email: "esteban@test.com", avatar: "https://i.pravatar.cc/300?img=48", interests: ["Tecnología", "Deportes"] },

        // ✈️ Viajes
        { name: "Mariana", city: "Cartagena", gender: "F", email: "mariana@test.com", avatar: "https://i.pravatar.cc/300?img=45", interests: ["Viajes", "Playa"] },
        { name: "Isabella", city: "Cali", gender: "F", email: "isabella@test.com", avatar: "https://i.pravatar.cc/300?img=31", interests: ["Viajes", "Fotografía"] },
        { name: "Laura", city: "Pereira", gender: "F", email: "laura@test.com", avatar: "https://i.pravatar.cc/300?img=28", interests: ["Viajes", "Música"] },
        { name: "Tomás", city: "Medellín", gender: "M", email: "tomas@test.com", avatar: "https://i.pravatar.cc/300?img=40", interests: ["Viajes", "Comida"] },
        { name: "Ana", city: "Bogotá", gender: "F", email: "ana@test.com", avatar: "https://i.pravatar.cc/300?img=32", interests: ["Viajes", "Comida"] },
        { name: "Daniel", city: "Bogotá", gender: "M", email: "daniel@test.com", avatar: "https://i.pravatar.cc/300?img=17", interests: ["Viajes", "Arte"] },
        { name: "Mateo", city: "Medellín", gender: "M", email: "mateo@test.com", avatar: "https://i.pravatar.cc/300?img=36", interests: ["Viajes", "Deportes"] },
        { name: "Gabriela", city: "Santa Marta", gender: "F", email: "gabriela@test.com", avatar: "https://i.pravatar.cc/300?img=39", interests: ["Viajes", "Playa"] },
        { name: "Julián", city: "Cúcuta", gender: "M", email: "julian@test.com", avatar: "https://i.pravatar.cc/300?img=42", interests: ["Viajes", "Tecnología"] },
        { name: "Valeria", city: "Medellín", gender: "F", email: "valeria@test.com", avatar: "https://i.pravatar.cc/300?img=33", interests: ["Viajes", "Deportes"] },

        // 🍔 Comida
        { name: "Laura", city: "Pereira", gender: "F", email: "laura@test.com", avatar: "https://i.pravatar.cc/300?img=28", interests: ["Comida", "Música"] },
        { name: "Tomás", city: "Medellín", gender: "M", email: "tomas@test.com", avatar: "https://i.pravatar.cc/300?img=40", interests: ["Comida", "Viajes"] },
        { name: "Felipe", city: "Manizales", gender: "M", email: "felipe@test.com", avatar: "https://i.pravatar.cc/300?img=60", interests: ["Comida", "Café"] },
        { name: "Ana", city: "Bogotá", gender: "F", email: "ana@test.com", avatar: "https://i.pravatar.cc/300?img=32", interests: ["Comida", "Viajes"] },
        { name: "Daniela", city: "Medellín", gender: "F", email: "daniela@test.com", avatar: "https://i.pravatar.cc/300?img=21", interests: ["Comida", "Música"] },
        { name: "Camila", city: "Santa Marta", gender: "F", email: "camila@test.com", avatar: "https://i.pravatar.cc/300?img=49", interests: ["Comida", "Yoga"] },
        { name: "Andrés", city: "Bogotá", gender: "M", email: "andres@test.com", avatar: "https://i.pravatar.cc/300?img=15", interests: ["Comida", "Tecnología"] },
        { name: "Sebastián", city: "Cali", gender: "M", email: "sebastian2@test.com", avatar: "https://i.pravatar.cc/300?img=34", interests: ["Comida", "Deportes"] },
        { name: "Valentina", city: "Cali", gender: "F", email: "valentina@test.com", avatar: "https://i.pravatar.cc/300?img=47", interests: ["Comida", "Arte"] },
        { name: "Nicolás", city: "Bogotá", gender: "M", email: "nicolas@test.com", avatar: "https://i.pravatar.cc/300?img=46", interests: ["Comida", "Viajes"] },
        ],
      usuariosFiltrados: [],
      matchActual: null,
      swipeStates: {}
    };
  },
  methods: {
    pasarASugerencias() {
      this.step = 2;
      this.filtrarUsuarios();
    },
    filtrarUsuarios() {
      this.usuariosFiltrados = this.usuarios.filter(u =>
        u.interests.some(interes => this.gustosSeleccionados.includes(interes))
      );
    },
    swipeRight(index) {
      const user = this.usuariosFiltrados[index];
      this.$set(this.swipeStates, user.email, "swipe-right");
      setTimeout(() => {
        this.hacerMatch(user);
        this.usuariosFiltrados.splice(index, 1);
        this.$delete(this.swipeStates, user.email);
      }, 500);
    },
    swipeLeft(index) {
      const user = this.usuariosFiltrados[index];
      this.$set(this.swipeStates, user.email, "swipe-left");
      setTimeout(() => {
        this.usuariosFiltrados.splice(index, 1);
        this.$delete(this.swipeStates, user.email);
      }, 500);
    },
    hacerMatch(usuario) {
      this.matchActual = usuario;
      setTimeout(() => {
        this.matchActual = null;
      }, 2500);
    },
    heartStyle() {
      return {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 5}s`
      };
    }
  }
};
</script>

<style scoped>
/* Contenedor de las cartas */
.card-stack {
  position: relative;
  width: 100%;
  max-width: 360px;
  margin: 30px auto;
  height: 480px;
  perspective: 1000px;
}

/* Cada carta */
.card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.25);
  padding: 20px;
  transition: transform 0.4s ease, opacity 0.4s ease;
  text-align: center;
}

/* Imagen del usuario */
.card-avatar {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 15px;
}

/* Nombre y ciudad */
.card h4 {
  font-size: 20px;
  font-weight: bold;
  margin: 8px 0;
}
.card p {
  color: #666;
  margin: 4px 0;
}
.card small {
  display: block;
  margin-top: 5px;
  font-size: 13px;
  color: #888;
}

/* Botones de acción */
.actions {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.btn-skip {
  background: #ff3b30;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 40px;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);
  transition: all 0.3s ease;
}
.btn-skip:hover {
  transform: scale(1.07);
  box-shadow: 0 10px 20px rgba(255,59,48,0.4);
}

/* Animaciones swipe */
.swipe-right {
  transform: translateX(150%) rotate(15deg);
  opacity: 0;
}
.swipe-left {
  transform: translateX(-150%) rotate(-15deg);
  opacity: 0;
}

/* Fondo degradado */
.page-bg {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb);
  overflow: hidden;
  padding: 20px;
  text-align: center;
}

/* Corazones animados */
.hearts-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0; left: 0;
  pointer-events: none;
}
.heart {
  position: absolute;
  bottom: -20px;
  font-size: 20px;
  color: rgba(255, 0, 76, 0.6);
  animation: floatUp linear infinite;
}
.heart::before {
  content: "❤️";
}
@keyframes floatUp {
  0% { transform: translateY(0) scale(0.8); opacity: 1; }
  100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
}

/* Títulos */
.card-swiper h2 {
  margin-bottom: 10px;
  font-size: 26px;
  color: #fff;
  text-shadow: 0 2px 6px rgba(0,0,0,0.3);
}
.card-swiper h3, 
.card-swiper p {
  color: #fff;
  margin: 5px 0;
}

/* Contenedor de intereses */
.intereses {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
  margin: 20px auto;
  max-width: 520px;
}

/* Cada opción de gusto */
.interes-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  color: #fff;
  position: relative;
}
.interes-card:hover {
  border: 2px solid;
  border-image: linear-gradient(45deg, #ff4d6d, #ff9a9e, #fbc2eb) 1;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
}

/* Ocultar checkbox */
.interes-card input {
  display: none;
}

/* Estado seleccionado */
.interes-card input:checked + span {
  color: #fff;
  background: linear-gradient(135deg, #ff4d6d, #f72585);
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 0, 76, 0.4);
}

/* Texto del gusto */
.interes-card span {
  font-size: 14px;
  transition: 0.3s;
}

/* Contenedor del botón */
.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

/* Botón principal */
.btn-like {
    background: linear-gradient(135deg, #ff4d6d, #ff758c);
    color: #fff;
    border: none;
    padding: 14px 32px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 40px;
    cursor: pointer;
    box-shadow: 0 6px 15px rgba(0,0,0,0.25);
    transition: all 0.3s ease;
    display: inline-block; 
    width: auto;
}
.btn-like:hover:not(:disabled) {
  transform: scale(1.07);
  box-shadow: 0 10px 20px rgba(255,0,76,0.4);
}
.btn-like:disabled {
  background: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}
</style>

