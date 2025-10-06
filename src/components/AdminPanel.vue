<template>
  <div class="admin-panel" v-if="isAdmin">
    <h2>👑 Panel de Administración</h2>

    <div class="users-grid">
      <div 
        v-for="u in users" 
        :key="u.email" 
        class="user-card"
        :class="{ blocked: u.blocked }"
      >
        <img :src="u.avatar" alt="avatar" class="avatar"/>
        <h3>{{ u.name }}</h3>
        <p class="email">{{ u.email }}</p>
        <p class="role">Rol: <span>{{ u.role }}</span></p>

        <p v-if="u.blocked" class="blocked-msg">🚫 Cuenta bloqueada</p>

        <div class="actions">
          <button @click="viewProfile(u)" class="view">👀 Ver</button>
          <button @click="editUser(u)" class="edit">✏️ Editar</button>
          <button @click="deleteUser(u.email)" class="delete">🗑️ Eliminar</button>
          <button @click="toggleBlock(u)" class="block" :class="{unblock: u.blocked}">
            {{ u.blocked ? "🔓 Desbloquear" : "🔒 Bloquear" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Perfil -->
    <div v-if="selectedUser" class="modal">
      <div class="modal-content">
        <span class="close" @click="selectedUser=null">&times;</span>
        <img :src="selectedUser.avatar" class="avatar-large"/>
        <h3>{{ selectedUser.name }}</h3>
        <p>Email: {{ selectedUser.email }}</p>
        <p>Rol: {{ selectedUser.role }}</p>
        <p>Seguidores: {{ selectedUser.followers?.length || 0 }}</p>
        <p>Siguiendo: {{ selectedUser.following?.length || 0 }}</p>
        <p v-if="selectedUser.blocked" style="color:red; font-weight:bold;">🚫 Cuenta bloqueada</p>
      </div>
    </div>
  </div>
</template>

<script>
import baseDatos from "@/baseDatos";

export default {
  name: "AdminPanel",
  data() {
    return {
      users: baseDatos.getUsers(),
      session: baseDatos.getSession(),
      selectedUser: null
    };
  },
  computed: {
    isAdmin() {
      return this.session && this.session.role === "admin";
    }
  },
  methods: {
    viewProfile(user) {
      this.selectedUser = user;
    },
    editUser(user) {
      alert(`Aquí podrías abrir un formulario para editar a ${user.name}`);
    },
    deleteUser(email) {
      if (confirm("¿Seguro que deseas eliminar este usuario?")) {
        this.users = this.users.filter(u => u.email !== email);
        baseDatos.saveUsers(this.users);
      }
    },
    toggleBlock(user) {
      user.blocked = !user.blocked;
      baseDatos.saveUsers(this.users);
    }
  }
};
</script>

<style scoped>
.admin-panel {
  margin: 30px auto;
  padding: 20px;
  max-width: 1000px;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  color: #fff;
  text-align: center;
}

h2 {
  margin-bottom: 25px;
  font-size: 2rem;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.user-card {
  background: #fff;
  color: #333;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  transition: transform 0.2s ease, opacity 0.3s;
}
.user-card:hover {
  transform: translateY(-5px);
}

.user-card.blocked {
  opacity: 0.6;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid #ff4b2b;
}

.email {
  font-size: 0.9rem;
  color: #666;
}

.role {
  font-weight: bold;
  margin: 10px 0;
}

.role span {
  color: #ff416c;
}

.blocked-msg {
  color: red;
  font-size: 0.9rem;
  font-weight: bold;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
  justify-content: center;
}

.actions button {
  flex: 1 1 45%;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
}

.actions .view {
  background: #e6f0ff;
  color: #003366;
}

.actions .edit {
  background: #fff3e6;
  color: #ff6600;
}

.actions .delete {
  background: #ff4b2b;
  color: #fff;
}

.actions .block {
  background: #333;
  color: #fff;
}

.actions .block.unblock {
  background: #00b894;
}

.actions button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 25px;
  border-radius: 20px;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.avatar-large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 4px solid #ff416c;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>