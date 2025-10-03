// --- "Base de datos" en localStorage ---
import Vue from "vue";
export const EventBus = new Vue();

const baseDatos = {
  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  },
  saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  },
  addUser(user) {
    let users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
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
    const session = localStorage.getItem("loggedUser");
    return session ? JSON.parse(session) : null;
  },
  clearSession() {
    localStorage.removeItem("session");
    EventBus.$emit("session-changed", null);
  }
};

export default baseDatos;

