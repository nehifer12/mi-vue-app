<template>
  <div class="explore-container">
    <h2 class="explore-title">Explorar Personas 🔍</h2>

    <!-- Contador de mensajes -->
    <div class="message-counter">
      💬 Mensajes disponibles: <strong>{{ remainingMessages }}</strong> / 10
    </div>

    <!-- Contenedor de cartas -->
    <div class="card-stack">
      <transition-group name="card" tag="div">
        <div
          v-for="(user, index) in visibleUsers"
          :key="user.id"
          class="user-card"
          :style="{ zIndex: users.length - index }"
        >
          <img :src="user.avatar" alt="avatar" class="user-avatar" />
          <h3 class="user-name">{{ user.name }}, {{ user.age }}</h3>
          <p class="user-bio">{{ user.bio || 'Apasionado por la vida 🌎' }}</p>

          <div class="card-actions">
            <button class="btn-pass" @click="passUser(user)">❌ Pasar</button>
            <button class="btn-like" @click="likeUser(user)">❤️ Like</button>
            <button class="btn-message" @click="openMessageModal(user)">💬 Mensaje</button>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Modal de mensaje -->
    <div v-if="showModal" class="message-modal">
      <div class="message-box">
        <h3>Enviar mensaje a {{ selectedUser.name }}</h3>
        <textarea
          v-model="messageText"
          maxlength="200"
          placeholder="Escribe tu mensaje (máx 20 palabras)..."
        ></textarea>
        <button @click="sendMessage">Enviar</button>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-if="!visibleUsers.length" class="empty-state">
      <p>🎉 No hay más usuarios por explorar</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { generateUsers } from "@/services/generateUsers";

/* --- Simulación de base de datos local --- */
export const EventBus = new Vue();

const baseDatos = {
  init() {
    let users = this.getUsers();
    if (!users.some((u) => u.role === "admin")) {
      users.push({
        name: "Administrador",
        email: "admin@admin.com",
        password: "1234",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
        role: "admin",
      });
      this.saveUsers(users);
    }
  },
  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  },
  saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  },
  addUser(user) {
    let users = this.getUsers();
    users.push({ ...user, role: "user" });
    this.saveUsers(users);
  },
  findUser(email, password) {
    let users = this.getUsers();
    return users.find((u) => u.email === email && u.password === password);
  },
  setSession(user) {
    localStorage.setItem("session", JSON.stringify(user));
    EventBus.$emit("session-changed", user);
  },
  getSession() {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  },
  clearSession() {
    localStorage.removeItem("session");
    EventBus.$emit("session-changed", null);
  },
};

export default {
  name: "AppExplore",
  data() {
    return {
      users: [],
      likedUsers: JSON.parse(localStorage.getItem("likedUsers")) || [],
      passedUsers: JSON.parse(localStorage.getItem("passedUsers")) || [],
      messagedUsers: JSON.parse(localStorage.getItem("messagedUsers")) || [],
      maxMessages: 10,
      showModal: false,
      selectedUser: null,
      messageText: "",
      session: baseDatos.getSession(),
    };
  },
  computed: {
    remainingMessages() {
      return this.maxMessages - this.messagedUsers.length;
    },
    visibleUsers() {
      return this.users.filter(
        (u) =>
          !this.likedUsers.includes(u.id) &&
          !this.passedUsers.includes(u.id)
      );
    },
  },
  methods: {
    likeUser(user) {
      if (!this.likedUsers.includes(user.id)) {
        this.animateCard("right");
        this.likedUsers.push(user.id);
        localStorage.setItem("likedUsers", JSON.stringify(this.likedUsers));
        this.showNotification(`💘 ¡Le diste like a ${user.name}!`);
      }
    },
    passUser(user) {
      if (!this.passedUsers.includes(user.id)) {
        this.animateCard("left");
        this.passedUsers.push(user.id);
        localStorage.setItem("passedUsers", JSON.stringify(this.passedUsers));
        this.showNotification(`🚫 Pasaste a ${user.name}`);
      }
    },
    openMessageModal(user) {
      if (this.messagedUsers.includes(user.id)) {
        this.showNotification(`Ya enviaste un mensaje a ${user.name}`);
        return;
      }
      if (this.remainingMessages <= 0) {
        this.showNotification("⚠️ Límite de 10 mensajes alcanzado");
        return;
      }
      this.selectedUser = user;
      this.messageText = "";
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    sendMessage() {
      if (!this.messageText.trim()) {
        this.showNotification("❗ Escribe un mensaje antes de enviarlo");
        return;
      }
      this.messagedUsers.push(this.selectedUser.id);
      localStorage.setItem("messagedUsers", JSON.stringify(this.messagedUsers));
      this.showNotification(
        `💬 Enviando mensaje a ${this.selectedUser.name}: "${this.messageText}"`
      );
      this.showModal = false;
      this.animateCard("up");
    },
    animateCard(direction) {
      const card = document.querySelector(".user-card:last-child");
      if (!card) return;
      card.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      if (direction === "right") card.style.transform = "translateX(400px) rotate(15deg)";
      else if (direction === "left") card.style.transform = "translateX(-400px) rotate(-15deg)";
      else if (direction === "up") card.style.transform = "translateY(-400px)";
      card.style.opacity = "0";
      setTimeout(() => {
        this.users.shift();
      }, 400);
    },
    showNotification(msg) {
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.innerText = msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add("show"), 100);
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    },
  },
  mounted() {
    baseDatos.init();
    const { profiles } = generateUsers(30);

    // 🔥 Ajusta dinámicamente el avatar según género
    this.users = profiles.map((p) => {
      const isMale = p.name.split(" ")[0].endsWith("o") || p.avatar.includes("/men/");
      const randomId = Math.floor(Math.random() * 80);
      return {
        ...p,
        avatar: `https://randomuser.me/api/portraits/${isMale ? "men" : "women"}/${randomId}.jpg`,
      };
    });
  },
};
</script>

<style scoped>
/* --- CONTENEDOR --- */
.explore-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  font-family: "Poppins", sans-serif;
  height: 100vh;
  background: linear-gradient(135deg, #fff8f9, #ffe3eb);
}

/* --- TÍTULO --- */
.explore-title {
  font-size: 2.3rem;
  color: #ff3366;
  font-weight: 600;
  margin-bottom: 10px;
}

/* Modal de mensaje - encima de todo */
.message-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Fondo oscuro transparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* 🔥 Esto asegura que quede encima de todo */
}

/* Caja del mensaje */
.message-box {
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  position: relative;
  z-index: 10000; /* Aún más alto, por si acaso */
}

/* Campo de texto */
.message-box textarea {
  width: 100%;
  height: 100px;
  resize: none;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  outline: none;
}

/* Botones del modal */
.message-box button {
  margin: 10px 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.message-box button:first-child {
  background: #ff3366;
  color: white;
}

.message-box button:first-child:hover {
  background: white;
  color: #ff3366;
  border: 2px solid #ff3366;
}

.message-box button:last-child {
  background: #ddd;
}

.message-box button:last-child:hover {
  background: white;
  border: 2px solid #ddd;
}

/* --- CONTADOR --- */
.message-counter {
  color: #333;
  margin-bottom: 20px;
}

/* --- STACK --- */
.card-stack {
  position: relative;
  width: 320px;
  height: 460px;
}

/* --- TARJETA --- */
.user-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 460px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}
.user-avatar {
  width: 100%;
  height: 280px;
  border-radius: 15px;
  object-fit: cover;
  margin-bottom: 15px;
}
.user-name {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}
.user-bio {
  font-size: 0.95rem;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
}

/* --- BOTONES --- */
.card-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}
.btn-like,
.btn-pass,
.btn-message {
  flex: 1;
  padding: 10px 0;
  border-radius: 25px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-like {
  background: #ff3366;
  color: white;
}
.btn-like:hover {
  background: white;
  color: #ff3366;
  border: 2px solid #ff3366;
}
.btn-pass {
  background: #e0e0e0;
  color: #444;
}
.btn-pass:hover {
  background: white;
  border: 2px solid #ccc;
}
.btn-message {
  background: #4caf50;
  color: white;
}
.btn-message:hover {
  background: white;
  color: #4caf50;
  border: 2px solid #4caf50;
}

/* --- MODAL --- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  border-radius: 15px;
  padding: 25px;
  width: 300px;
  text-align: center;
}
.modal textarea {
  width: 100%;
  height: 80px;
  margin: 10px 0;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
}
.btn-cancel,
.btn-send {
  flex: 1;
  padding: 8px;
  border-radius: 10px;
  border: none;
  margin: 0 5px;
  cursor: pointer;
  font-weight: bold;
}
.btn-cancel {
  background: #ccc;
  color: #333;
}
.btn-send {
  background: #4caf50;
  color: white;
}
.btn-send:hover {
  background: #45a049;
}

/* --- TOAST --- */
.toast {
  position: fixed;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff3366;
  color: white;
  padding: 10px 25px;
  border-radius: 30px;
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 9999;
}
.toast.show {
  bottom: 40px;
  opacity: 1;
}

/* --- ANIMACIONES --- */
.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}
.card-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.card-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>