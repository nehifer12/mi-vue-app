<template>
  <div class="register-page">
    <div class="background"></div>
    <div class="overlay"></div>

    <div class="form-container">
      <h2>Crear cuenta ❤️🔥</h2>
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Nombre completo" required />

        <select v-model="gender" required>
          <option disabled value="">Selecciona tu género</option>
          <option>Hombre</option>
          <option>Mujer</option>
          <option>Transgénero</option>
          <option>Persona en transición</option>
          <option>No binario</option>
        </select>

        <select v-model="sexuality" required>
          <option disabled value="">Selecciona tu sexualidad</option>
          <option>Heterosexual</option>
          <option>Homosexual</option>
          <option>Bisexual</option>
          <option>Pansexual</option>
          <option>Asexual</option>
          <option>Otros</option>
        </select>

        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <input v-model="phone" type="tel" placeholder="Teléfono" />
        <input v-model="birthdate" type="date" placeholder="Fecha de nacimiento" />

        <div class="autocomplete">
          <input
            v-model="city"
            type="text"
            placeholder="Ciudad"
            @input="filtrarCiudades"
            @focus="mostrarSugerencias = true"
            @blur="ocultarSugerencias"
          />
          <ul v-if="mostrarSugerencias && ciudadesFiltradas.length" class="suggestions">
            <li
              v-for="(c, index) in ciudadesFiltradas"
              :key="index"
              @mousedown.prevent="seleccionarCiudad(c)"
            >
              {{ c }}
            </li>
          </ul>
        </div>

        <!-- Avatar dinámico -->
        <div class="avatar-section">
          <p>Avatar según tu género:</p>
          <div class="avatar-preview">
            <img :src="computedAvatar" alt="Avatar principal" />
          </div>
        </div>

        <!-- Preferencias -->
        <div class="preferences">
          <p>¿Qué te gusta?</p>
          <label v-for="(value,key) in preferences" :key="key" class="preference-label">
            <input type="checkbox" v-model="preferences[key]" />
            <span :class="{selected: preferences[key]}">{{ preferenceNames[key] }}</span>
          </label>
        </div>

        <button type="submit">Registrarme</button>
      </form>

      <p class="login-link">
        ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import baseDatos, { EventBus } from "@/baseDatos";

export default {
  name: "RegisterForm",
  data() {
    return {
      name: "",
      gender: "",
      sexuality: "",
      email: "",
      password: "",
      phone: "",
      city: "",
      birthdate: "",
      preferences: {
        travel: false,
        music: false,
        sports: false,
        food: false,
        movies: false,
        art: false,
        gaming: false
      },
      preferenceNames: {
        travel: "Viajar",
        music: "Música",
        sports: "Deportes",
        food: "Comida",
        movies: "Películas",
        art: "Arte",
        gaming: "Videojuegos"
      },
      avatarMap: {
        Hombre: "https://i.pravatar.cc/150?img=20",
        Mujer: "https://i.pravatar.cc/150?img=26",
        Transgénero: "https://i.pravatar.cc/150?img=32",
        "Persona en transición": "https://i.pravatar.cc/150?img=38",
        "No binario": "https://i.pravatar.cc/150?img=44"
      }
    };
  },
  computed: {
    computedAvatar() {
      if (!this.gender) return "https://i.pravatar.cc/150?img=50";
      return this.avatarMap[this.gender] || "https://i.pravatar.cc/150?img=50";
    }
  },
  mounted() {
    const users = baseDatos.getUsers();
    this.todasLasCiudades = [
      ...new Set(users.map(u => u.city).filter(c => c && c.trim() !== ""))
    ];
  },
  methods: {
    filtrarCiudades() {
      const term = this.city.toLowerCase();
      this.ciudadesFiltradas = this.todasLasCiudades.filter(c =>
        c.toLowerCase().startsWith(term)
      );
    },
    seleccionarCiudad(ciudad) {
      this.city = ciudad;
      this.mostrarSugerencias = false;
    },
    ocultarSugerencias() {
      setTimeout(() => (this.mostrarSugerencias = false), 150);
    },

    register() {
      let users = baseDatos.getUsers();
      const exists = users.find(u => u.email === this.email);

      if (exists) {
        alert("Ya existe un usuario con este correo.");
        return;
      }

      const newUser = {
        name: this.name,
        gender: this.gender,
        sexuality: this.sexuality,
        email: this.email,
        password: this.password,
        phone: this.phone,
        city: this.city,
        birthdate: this.birthdate,
        preferences: this.preferences,
        avatar: this.computedAvatar
      };

      baseDatos.addUser(newUser);
      baseDatos.setSession(newUser);

      EventBus.$emit("usuarioRegistrado", newUser);

      alert("Registro exitoso, bienvenid@ " + this.name);
      this.$router.push("/");
    }
  }
};
</script>

<style>
/* Autocompletar */
.autocomplete {
  position: relative;
  width: 100%;
}
.suggestions {
  position: absolute;
  background: white;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  margin-top: 2px;
  list-style: none;
  padding: 0;
  z-index: 50;
  max-height: 160px;
  overflow-y: auto;
}
.suggestions li {
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.2s;
}
.suggestions li:hover {
  background: #ffebef;
  color: #ff3366;
}

select {
  display: block;
  width: 100%;
  padding: 14px;
  margin: 10px 0;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 1.1rem;
  background: #fff;
  transition: all 0.3s ease;
}
select:focus {
  border-color: #ff3366;
  outline: none;
  box-shadow: 0 0 8px rgba(255,51,102,0.4);
}
/* Fondo degradado tipo Tinder */
.register-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
}

.background {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, #ff6a88, #ff99ac);
  z-index: -2;
}

.overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.35);
  z-index: -1;
}

.form-container {
  max-width: 520px;
  width: 100%;
  background: #fff0f5;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  text-align: center;
  z-index: 10;
}

.form-container h2 {
  margin-bottom: 25px;
  color: #ff3366;
  font-size: 2.2rem;
  font-weight: 700;
}

/* Inputs */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="tel"],
input[type="date"] {
  display: block;
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #ff3366;
  outline: none;
  box-shadow: 0 0 8px rgba(255,51,102,0.4);
}

/* Avatar dinámico */
.avatar-section {
  margin: 15px 0;
}
.avatar-preview img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ff3366;
  transition: all 0.5s ease;
}
.avatar-hint {
  font-size: 0.9rem;
  color: #888;
}

/* Preferencias */
.preferences {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 15px;
  margin: 20px 0;
}

.preference-label input[type="checkbox"] {
  display: none;
}

.preference-label span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 15px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  background: linear-gradient(145deg, #fff, #f1f1f1);
  box-shadow: 5px 5px 15px rgba(0,0,0,0.15), -5px -5px 15px rgba(255,255,255,0.7);
  transition: all 0.3s ease;
}

.preference-label span:hover {
  transform: translateY(-2px);
  box-shadow: 6px 6px 18px rgba(0,0,0,0.2), -6px -6px 18px rgba(255,255,255,0.8);
}

.preference-label input[type="checkbox"]:checked + span {
  background: linear-gradient(135deg, #ff3366, #ff99ac);
  color: white;
  box-shadow: inset 3px 3px 8px rgba(0,0,0,0.2), inset -3px -3px 8px rgba(255,255,255,0.4);
  animation: pulse 0.3s ease;
}

@keyframes pulse {
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Botón registrar 3D */
button {
  background: #ff3366;
  color: white;
  padding: 14px 25px;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: all 0.3s ease;
  box-shadow: 4px 4px 12px rgba(0,0,0,0.2), -4px -4px 12px rgba(255,255,255,0.6);
}

button:hover {
  background: #e62e5c;
  transform: translateY(-2px);
}

.login-link {
  margin-top: 18px;
  font-size: 1rem;
}
.login-link a {
  color: #ff3366;
  font-weight: bold;
  text-decoration: none;
}
.login-link a:hover {
  text-decoration: underline;
}
</style>