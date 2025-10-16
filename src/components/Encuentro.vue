<template>
  <div class="encuentro-page">
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

      <!-- Paso 1: Selección de gustos -->
      <div v-if="step === 1" class="preguntas card-swiper">
        <h2>❤️ Encuentro</h2>
        <h3>Cuéntanos sobre ti</h3>
        <p>Selecciona tus intereses para encontrarte con personas afines:</p>

        <!-- Categorías con acordeón -->
        <div class="categorias">
          <div
            v-for="(subcats, category) in interestCategories"
            :key="category"
            class="categoria"
          >
            <div
              class="categoria-header"
              @click="toggleCategoria(category)"
            >
              <h4 class="categoria-titulo">{{ category }}</h4>
              <span class="toggle-icon">
                {{ expandedCategory === category ? "▲" : "▼" }}
              </span>
            </div>

            <transition name="fade">
              <div v-if="expandedCategory === category" class="subcategorias">
                <div
                  v-for="(items, sub) in subcats"
                  :key="sub"
                  class="subcategoria"
                >
                  <h5 class="subtitulo">{{ sub }}</h5>
                  <div class="opciones">
                    <label
                      v-for="(g, index) in items"
                      :key="index"
                      class="interes-card"
                    >
                      <input
                        type="checkbox"
                        v-model="gustosSeleccionados"
                        :value="g"
                      />
                      <span>{{ g }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </transition>
          </div>
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
            <small>
              Intereses:
              {{ u.interests.map(i => i.name).join(', ') }}
            </small>

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
import { generateUsers } from "@/services/generateUsers";

export default {
  name: "EncuentroPage",
  data() {
    return {
      step: 1,
      usuarios: [],
      gustosSeleccionados: [],
      interestCategories: {},
      usuariosFiltrados: [],
      matchActual: null,
      swipeStates: {},
      expandedCategory: null, // categoría abierta
    };
  },
  mounted() {
    const { profiles, interestCategories } = generateUsers(70);
    this.usuarios = profiles;
    this.interestCategories = interestCategories;
  },
  methods: {
    toggleCategoria(category) {
      this.expandedCategory =
        this.expandedCategory === category ? null : category;
    },
    pasarASugerencias() {
      this.step = 2;
      this.filtrarUsuarios();
    },
    filtrarUsuarios() {
      // filtrar según intereses seleccionados
      this.usuariosFiltrados = this.usuarios.filter((u) =>
        u.interests.some((i) =>
          this.gustosSeleccionados.includes(i.name)
        )
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
      setTimeout(() => (this.matchActual = null), 2500);
    },
    heartStyle() {
      return {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 5}s`,
      };
    },
  },
};
</script>

<style scoped>
/* animación de fade para desplegar */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

/* encabezado de categoría clickeable */
.categoria-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-bottom: 5px;
}
.toggle-icon {
  color: #fff;
  font-size: 18px;
  margin-left: 10px;
}

/* contenedor de categoría */
.categoria {
  margin-bottom: 25px;
  padding: 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
}
.categoria-titulo {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

/* subcategorías */
.subtitulo {
  color: #ffe6e6;
  font-size: 15px;
  margin: 8px 0;
  font-weight: 600;
}
.opciones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  margin: 25px auto;
  max-width: 900px;
  text-align: center;
}

/* Cada opción de gusto */
.interes-card {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 25px;
  padding: 8px 14px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border: 1.5px solid transparent;
  backdrop-filter: blur(6px);
  transition: all 0.25s ease-in-out;
}
.interes-card:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.05);
}

.interes-card input[type="checkbox"] {
  display: none;
}

.interes-card input[type="checkbox"]:checked + span {
  background: #ff69b4;
  color: #fff;
  border-radius: 20px;
  padding: 7px 13px;
  transition: 0.25s;
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

.categoria {
animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.categoria:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(255, 105, 180, 0.35);
}

.categoria-titulo {
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
}

.subtitulo {
  color: #fffaf0;
  font-size: 15px;
  margin: 5px 0 8px;
  font-weight: 600;
}

.opciones {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
  max-width: 600px;
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

