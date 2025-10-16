// --- "Base de datos" en localStorage ---
import Vue from "vue";
export const EventBus = new Vue();

const adminUser = {
  name: "Administrador",
  email: "admin@admin.com",
  password: "1234",
  avatar:  "https://randomuser.me/api/portraits/men/46.jpg",
  role: "admin"
};

const baseDatos = {
  // Inicialización (ya no crea admin)
  init() {
    // Solo asegura que el localStorage exista
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  },

  // Obtener usuarios desde localStorage + incluir admin virtualmente
  getUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Devuelve admin virtual + usuarios locales
    return [adminUser, ...users];
  },

  // Guardar usuarios (sin incluir al admin)
  saveUsers(users) {
    // Filtramos para evitar que se intente guardar el admin
    const filtered = users.filter(u => u.email !== adminUser.email);
    localStorage.setItem("users", JSON.stringify(filtered));
  },

  // Agregar nuevo usuario
  addUser(user) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Evita duplicar correos (también evita sobreescribir al admin)
    if (user.email === adminUser.email) {
      console.warn("⚠️ No puedes registrar con el correo del administrador.");
      return;
    }

    if (!users.some(u => u.email === user.email)) {
      users.push({ ...user, role: "user" }); // nuevos usuarios = "user"
      this.saveUsers(users);
    } else {
      console.warn("⚠️ El correo ya está registrado:", user.email);
    }
  },

  // Buscar usuario por email
  findUserByEmail(email) {
    if (email === adminUser.email) return adminUser;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(u => u.email === email);
  },

  // Obtener todos los usuarios (incluye admin virtualmente)
  getAllUsers() {
    return this.getUsers();
  },

  // Buscar usuario por email y contraseña
  findUser(email, password) {
    if (email === adminUser.email && password === adminUser.password)
      return adminUser;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(u => u.email === email && u.password === password);
  },

  // Sesión actual
  setSession(user) {
    // No guarda nada adicional, solo la sesión activa
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
  }
};

export default baseDatos;




