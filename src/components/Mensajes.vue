<template>
  <div class="mensajes">
    <h2>📩 Mis Mensajes</h2>

    <div v-if="mensajesRecibidos.length">
      <div 
        class="mensaje-card" 
        v-for="(m, index) in mensajesRecibidos" 
        :key="index"
      >
        <h3>De: {{ getUserName(m.from) }}</h3>
        <p class="contenido">"{{ m.content }}"</p>
        <small>{{ formatDate(m.date) }}</small>

        <div class="acciones">
          <button @click="responder(m.from)">💬 Responder</button>
          <button @click="eliminar(index)">🗑 Eliminar</button>
        </div>
      </div>
    </div>

    <p v-else>No tienes mensajes recibidos.</p>
  </div>
</template>

<script>
import baseDatos from "@/baseDatos";

export default {
  name: "MensajeCard",
  data() {
    return {
      mensajesRecibidos: [],
      session: null
    };
  },
  created() {
    this.session = baseDatos.getSession();
    this.cargarMensajes();
  },
  methods: {
    cargarMensajes() {
      let allMessages = JSON.parse(localStorage.getItem("messages")) || [];
      if (this.session) {
        this.mensajesRecibidos = allMessages.filter(
          m => m.to === this.session.email
        );
      }
    },
    responder(emailDestino) {
      const msg = prompt(`Escribe tu respuesta para ${this.getUserName(emailDestino)}:`);
      if (msg) {
        let allMessages = JSON.parse(localStorage.getItem("messages")) || [];
        allMessages.push({
          from: this.session.email,
          to: emailDestino,
          content: msg,
          date: new Date().toISOString()
        });
        localStorage.setItem("messages", JSON.stringify(allMessages));
        alert("Respuesta enviada ✅");
      }
    },
    eliminar(index) {
      this.mensajesRecibidos.splice(index, 1);
      let allMessages = JSON.parse(localStorage.getItem("messages")) || [];
      allMessages = allMessages.filter(m => !(m.to === this.session.email));
      localStorage.setItem("messages", JSON.stringify(allMessages));
    },
    getUserName(email) {
      let user = baseDatos.getUsers().find(u => u.email === email);
      return user ? user.name : email;
    },
    formatDate(dateStr) {
      let d = new Date(dateStr);
      return d.toLocaleString();
    }
  }
};
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4); /* degradado animado */
  background-size: cover;
  background-attachment: fixed;
  font-family: Arial, sans-serif;
}

/* Contenedor principal de los mensajes en carrusel */
.mensajes {
  display: flex;
  overflow-x: auto; /* scroll horizontal */
  gap: 20px;
  padding: 20px;
  scroll-snap-type: x mandatory; /* efecto carrusel */
  max-width: 100%;
  height: 100vh; /* ocupa toda la pantalla */
  box-sizing: border-box;
}

/* Ocultar scrollbar en algunos navegadores */
.mensajes::-webkit-scrollbar {
  display: none;
}
.mensajes {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Cada tarjeta de mensaje */
.mensaje-card {
  flex: 0 0 300px; /* ancho fijo para cada tarjeta */
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  text-align: left;
  scroll-snap-align: start; /* alinea cada tarjeta al inicio */
  transition: transform 0.3s ease;
}

.mensaje-card:hover {
  transform: scale(1.05); /* efecto de agrandado */
}

/* Contenido del mensaje */
.contenido {
  font-size: 1.1em;
  margin: 10px 0;
  color: #333;
}

/* Botones */
.acciones {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.acciones button {
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  cursor: pointer;
  transition: 0.2s;
}
.acciones button:first-child {
  background: #ff3366;
  color: #fff;
}
.acciones button:last-child {
  background: #ddd;
}
.acciones button:hover {
  transform: scale(1.1);
}
</style>