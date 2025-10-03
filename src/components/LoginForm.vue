<template>
  <div class="login-page">
    <div class="background"></div>
    <div class="overlay"></div>

    <div class="form-container">
      <h2>Iniciar sesión ❤️🔥</h2>
      <form @submit.prevent="login">
        <!-- Campos únicos -->
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />

        <!-- Mensaje dinámico -->
        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <!-- Preferencias -->
        <div class="preferences">
          <label class="preference-label">
            <input type="checkbox" v-model="preferences.friends" />
            <span>Buscar amistades</span>
          </label>
          <label class="preference-label">
            <input type="checkbox" v-model="preferences.relationship" />
            <span>Buscar pareja</span>
          </label>
          <label class="preference-label">
            <input type="checkbox" v-model="preferences.networking" />
            <span>Conocer gente</span>
          </label>
          <label class="preference-label">
            <input type="checkbox" v-model="preferences.casual" />
            <span>Solo cita casual</span>
          </label>
          <label class="preference-label">
            <input type="checkbox" v-model="preferences.sex" />
            <span>Solo sexo</span>
          </label>
          <label class="preference-label">
            <input type="checkbox" v-model="preferences.fun" />
            <span>Pasarla chévere</span>
          </label>
        </div>

        <!-- Botón -->
        <button type="submit">Entrar</button>
      </form>

      <!-- Enlace al registro -->
      <p class="register-link">
        ¿No tienes cuenta? <router-link to="/register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import baseDatos, { EventBus } from "@/baseDatos";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      preferences: {
        friends: false,
        relationship: false,
        networking: false,
        casual: false,
        sex: false,
        fun: false
      },
      errorMessage: "" // mensaje de error
    };
  },
  methods: {
    login() {
      const user = baseDatos.findUser(this.email, this.password);

      if (user) {
        // Guardar preferencias en el usuario
        user.preferences = this.preferences;

        // Guardar sesión
        baseDatos.setSession(user);
        EventBus.$emit("usuarioLogueado", user);

        this.$router.push("/");
      } else {
        // Verificar si existe un usuario con el email
        const userByEmail = baseDatos.findUserByEmail(this.email);

        if (!userByEmail) {
          // Mensaje de cuenta no encontrada
          this.errorMessage = "No encontramos una cuenta con ese correo, por favor regístrate primero.";
          setTimeout(() => {
            this.$router.push("/register"); // redirigir al registro
          }, 1500); // pequeño delay para que vea el mensaje
        } else {
          // Mensaje de contraseña incorrecta
          this.errorMessage = "Correo o contraseña incorrectos.";
        }
      }
    }
  }
};
</script>

<style scoped>
.error-text {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
/* Fondo tipo Tinder */
.login-page {
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
  background: rgba(0, 0, 0, 0.35);
  z-index: -1;
}

/* Tarjeta de login */
.form-container {
  max-width: 450px;
  width: 100%;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.18);
  text-align: center;
  z-index: 10;
}

.form-container h2 {
  margin-bottom: 25px;
  color: #ff3366;
  font-size: 2rem;
}

/* Inputs */
input {
  display: block;
  width: 100%;
  padding: 12px 15px;
  margin: 12px 0;
  border-radius: 12px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
}
input:focus {
  border-color: #ff3366;
  outline: none;
  box-shadow: 0 0 8px rgba(255,51,102,0.4);
}

/* Preferencias */
.preferences {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px 20px;
  margin: 20px 0;
}

/* Ocultar el checkbox real */
.preference-label input[type="checkbox"] {
  display: none;
}

/* Botón estilo 3D */
.preference-label span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 15px;
  text-align: center;
  user-select: none;
  background: linear-gradient(145deg, #ffffff, #f1f1f1);
  box-shadow: 5px 5px 15px rgba(0,0,0,0.15), -5px -5px 15px rgba(255,255,255,0.7);
  transition: all 0.3s ease;
}

/* Efecto hover */
.preference-label span:hover {
  transform: translateY(-2px);
  box-shadow: 6px 6px 18px rgba(0,0,0,0.2), -6px -6px 18px rgba(255,255,255,0.8);
}

/* Cuando está seleccionado */
.preference-label input[type="checkbox"]:checked + span,
.preference-label input[type="checkbox"]:checked {
  background: linear-gradient(145deg, #ff3366, #ff99ac);
  color: white;
  box-shadow: inset 3px 3px 8px rgba(0,0,0,0.2), inset -3px -3px 8px rgba(255,255,255,0.4);
}

/* Botón */
button {
  background: #ff3366;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  transition: all 0.3s ease;
}
button:hover {
  background: #e62e5c;
  transform: translateY(-2px);
}

/* Link de registro */
.register-link {
  margin-top: 18px;
  font-size: 0.95rem;
}
.register-link a {
  color: #ff3366;
  font-weight: bold;
  text-decoration: none;
}
.register-link a:hover {
  text-decoration: underline;
}
</style>