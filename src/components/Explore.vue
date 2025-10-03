<template>
  <div class="explore-container">
    <h2 class="explore-title">Explorar Personas 🔍</h2>

    <div class="explore-grid">
      <div v-for="(user, index) in users" :key="index" class="user-card">
        <img :src="user.avatar" alt="avatar" class="user-avatar" />
        <h3 class="user-name">{{ user.name }}, {{ user.age }}</h3>
        <p class="user-bio">{{ user.bio }}</p>
        <div class="card-actions">
          <button class="btn-like" @click="likeUser(user)">❤️ Like</button>
          <button class="btn-pass" @click="passUser(user)">❌ Pass</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppExplore",
  data() {
    return {
      users: [
        {
          name: "Ana",
          age: 24,
          bio: "Me gusta viajar y conocer nuevas personas ✈️",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          name: "Carlos",
          age: 29,
          bio: "Apasionado del cine 🎬 y la música 🎶",
          avatar: "https://randomuser.me/api/portraits/men/46.jpg"
        },
        {
          name: "Lucía",
          age: 27,
          bio: "Amo los animales 🐶🐱",
          avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        }
      ]
    };
  },
  methods: {
    likeUser(user) {
      alert(`Le diste like a ${user.name} 💕`);
    },
    passUser(user) {
      alert(`Pasaste a ${user.name} ❌`);
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.explore-container {
  max-width: 1000px;
  margin: 40px auto;
  text-align: center;
  padding: 20px;
}

/* Título */
.explore-title {
  font-size: 2rem;
  color: #ff3366;
  margin-bottom: 30px;
}

/* Grid */
.explore-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  justify-content: center;
}

/* Tarjeta de usuario */
.user-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 20px;
  transition: transform 0.2s ease;
}
.user-card:hover {
  transform: translateY(-5px);
}

/* Imagen de usuario */
.user-avatar {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 15px;
}

/* Nombre */
.user-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

/* Bio */
.user-bio {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 15px;
}

/* Botones */
.card-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn-like,
.btn-pass {
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
  background: #ddd;
  color: #333;
}
.btn-pass:hover {
  background: white;
  color: #555;
  border: 2px solid #ddd;
}
</style>