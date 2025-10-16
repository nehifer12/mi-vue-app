<template>
  <div class="admin-panel" v-if="isAdmin">
    <h2>🔥 Panel de Administración</h2>

    <!-- 🔍 Controles -->
    <div class="controls">
      <input 
        v-model="searchQuery" 
        placeholder="Buscar usuario por nombre o correo..."
        class="search-input"
      />
      <select v-model="sortBy" class="sort-select">
        <option value="name">Ordenar por nombre</option>
        <option value="role">Ordenar por rol</option>
      </select>
    </div>

    <!-- 👥 Usuarios -->
    <div class="users-grid">
      <div 
        v-for="u in filteredAndSortedUsers" 
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
          <button @click="openEditModal(u)" class="edit">✏️ Editar</button>
          <button @click="confirmDelete(u.email)" class="delete">🗑️ Eliminar</button>
          <button @click="toggleBlock(u)" class="block" :class="{unblock: u.blocked}">
            {{ u.blocked ? "🔓 Desbloquear" : "🔒 Bloquear" }}
          </button>
        </div>
      </div>
    </div>

    <!-- 👤 Modal de perfil -->
    <div v-if="selectedUser" class="modal" @click.self="selectedUser=null">
      <div class="modal-content">
        <span class="close" @click="selectedUser=null">&times;</span>
        <img :src="selectedUser.avatar" class="avatar-large"/>
        <h3>{{ selectedUser.name }}</h3>
        <p>Email: {{ selectedUser.email }}</p>
        <p>Rol: {{ selectedUser.role }}</p>
        <p>Seguidores: {{ selectedUser.followers?.length || 0 }}</p>
        <p>Siguiendo: {{ selectedUser.following?.length || 0 }}</p>
        <p v-if="selectedUser.blocked" class="blocked-msg">🚫 Cuenta bloqueada</p>
      </div>
    </div>

    <!-- ✏️ Modal de edición -->
    <div v-if="editUserData" class="modal" @click.self="editUserData=null">
      <div class="modal-content edit-modal">
        <span class="close" @click="editUserData=null">&times;</span>
        <h3>Editar Usuario</h3>
        <form @submit.prevent="saveEdit">
          <label>Nombre</label>
          <input v-model="editUserData.name" required />
          <label>Email</label>
          <input v-model="editUserData.email" disabled />
          <label>Rol</label>
          <select v-model="editUserData.role">
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit" class="save">💾 Guardar cambios</button>
        </form>
      </div>
    </div>
  </div>

  <div v-else class="no-access">
    <h3>🚫 No tienes acceso al panel de administración</h3>
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
      selectedUser: null,
      editUserData: null,
      searchQuery: "",
      sortBy: "name",
    };
  },
  computed: {
    isAdmin() {
      return this.session && this.session.role === "admin";
    },
    filteredAndSortedUsers() {
      let filtered = this.users.filter(
        u =>
          u.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      return filtered.sort((a, b) => {
        if (this.sortBy === "name") return a.name.localeCompare(b.name);
        if (this.sortBy === "role") return a.role.localeCompare(b.role);
        return 0;
      });
    }
  },
  methods: {
    viewProfile(user) {
      this.selectedUser = user;
    },
    openEditModal(user) {
      this.editUserData = { ...user };
    },
    saveEdit() {
      const index = this.users.findIndex(u => u.email === this.editUserData.email);
      if (index !== -1) {
        this.users[index] = { ...this.editUserData };
        baseDatos.saveUsers(this.users);
        this.editUserData = null;
        alert("✅ Usuario actualizado correctamente");
      }
    },
    confirmDelete(email) {
      if (confirm("¿Seguro que deseas eliminar este usuario?")) {
        this.users = this.users.filter(u => u.email !== email);
        baseDatos.saveUsers(this.users);
        alert("🗑️ Usuario eliminado correctamente");
      }
    },
    toggleBlock(user) {
      user.blocked = !user.blocked;
      baseDatos.saveUsers(this.users);
      alert(user.blocked ? "🚫 Usuario bloqueado" : "🔓 Usuario desbloqueado");
    }
  }
};
</script>

<style scoped>
/* 🎨 Fondo Tinder */
.admin-panel {
  margin: 40px auto;
  padding: 30px;
  max-width: 1100px;
  border-radius: 25px;
  background: linear-gradient(135deg, #ff6a88, #ff99ac, #fd3a69);
  box-shadow: 0 10px 30px rgba(255, 58, 105, 0.3);
  color: #fff;
  text-align: center;
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

h2 {
  margin-bottom: 25px;
  font-size: 2.3rem;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

/* 🔍 Controles */
.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
}

.search-input {
  width: 60%;
  padding: 12px 15px;
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.sort-select {
  border-radius: 25px;
  padding: 12px;
  border: none;
  background: #fff;
  color: #ff3e6c;
  font-weight: bold;
}

/* 🧑 Usuarios */
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.user-card {
  background: #fff;
  color: #333;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.1);
  transition: transform 0.25s ease, box-shadow 0.25s;
}
.user-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 8px 25px rgba(255, 58, 105, 0.25);
}

.user-card.blocked {
  opacity: 0.7;
  border: 2px dashed #ff4b6e;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid #ff3e6c;
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
  color: #fd3a69;
}

/* 🔘 Botones */
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
  border-radius: 25px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
}

.view { background: #ffe6ef; color: #ff3e6c; }
.edit { background: #fff3cd; color: #ff6f00; }
.delete { background: #ff4b6e; color: #fff; }
.block { background: #333; color: #fff; }
.block.unblock { background: #00b894; }

.actions button:hover {
  transform: scale(1.08);
  opacity: 0.9;
}

/* 💬 Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #fff;
  padding: 25px;
  border-radius: 25px;
  max-width: 400px;
  text-align: center;
  position: relative;
  color: #333;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.edit-modal {
  background: linear-gradient(135deg, #fff, #ffe6ec);
}

.avatar-large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 4px solid #ff6a88;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.8rem;
  cursor: pointer;
  color: #ff4b6e;
}

/* 💾 Formulario */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, select {
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #ccc;
}

.save {
  background: #ff4b6e;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
}

.save:hover {
  background: #fd3a69;
}

/* 🚫 Sin acceso */
.no-access {
  text-align: center;
  padding: 50px;
  font-size: 1.3rem;
  color: #ff4b6e;
}
</style>