// --- "Base de datos" en localStorage ---
import Vue from "vue";
export const EventBus = new Vue();

const baseDatos = {
  init() {
    let users = this.getUsers();
    if (!users.some(u => u.role === "admin")) {
      users.push({
        name: "Administrador",
        email: "admin@admin.com",
        password: "1234",
        avatar: "https://i.pravatar.cc/150?img=1",
        role: "admin"
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

  // Si no existe ningún admin, lo creamos automáticamente
  if (!users.some(u => u.role === "admin")) {
    users.push({
      name: "Administrador",
      email: "nhfer@gmail.com",
      password: "gero123",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      role: "admin"
    });
  }

  users.push({ ...user, role: "user" }); // 👈 por defecto, nuevos usuarios son "user"
  this.saveUsers(users);
  },
  findUserByEmail(email) {
  let users = this.getUsers();
  return users.find(u => u.email === email);
  },
  findUser(email, password) {
    let users = this.getUsers();
    return users.find(u => u.email === email && u.password === password);
  },
  setSession(user) {
    localStorage.setItem("session", JSON.stringify(user));
    EventBus.$emit("session-changed", user);
  },
  getSession() {
    const session = localStorage.getItem("session"); // corregido (antes buscabas "loggedUser")
    return session ? JSON.parse(session) : null;
  },
  clearSession() {
    localStorage.removeItem("session");
    EventBus.$emit("session-changed", null);
  }
};

export default baseDatos;

