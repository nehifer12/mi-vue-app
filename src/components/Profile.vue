<template>
  <div class="profile-page">
    <div class="overlay"></div>

    <!-- Card de perfil -->
    <div v-if="!editing" class="profile-card">
      <h1>👤 Mi Perfil</h1>

      <!-- Avatar -->
      <div class="avatar-container">
        <img :src="user.avatar" alt="avatar" class="profile-avatar" />
      </div>

      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p v-if="user.city">📍 {{ user.city }}</p>
      <p v-if="user.age">🎂 {{ user.age }} años</p>
      <p v-if="user.bio" class="bio">"{{ user.bio }}"</p>
      <p v-if="user.likes">⭐ Gustos: {{ user.likes }}</p>

      <!-- Redes Sociales -->
      <div class="social-links" v-if="hasSocialLinks">
        <a v-if="user.whatsapp" :href="'https://wa.me/' + user.whatsapp" target="_blank">💬 WhatsApp</a>
        <a v-if="user.instagram" :href="user.instagram" target="_blank">📸 Instagram</a>
        <a v-if="user.facebook" :href="user.facebook" target="_blank">📘 Facebook</a>
        <a v-if="user.tiktok" :href="user.tiktok" target="_blank">🎵 TikTok</a>
      </div>

      <!-- Preferencias -->
      <div v-if="user.preferences.length" class="preferences">
        <h4>Preferencias ❤️</h4>
        <ul>
          <li v-for="(pref, index) in user.preferences" :key="index">{{ pref }}</li>
        </ul>
      </div>

      <!-- Botón para volver a editar -->
      <button class="edit-btn" @click="editing = true">✏️ Editar Perfil</button>
    </div>

    <!-- Editar Perfil -->
    <div v-else class="edit-section">
      <h3>Editar Perfil</h3>
      <form @submit.prevent="saveProfile">
        <input v-model="user.name" type="text" placeholder="Nombre y Apellido" @blur="updateAvatar" />
        <input v-model="user.age" type="number" placeholder="Edad" min="1" step="1" />
        <input v-model="user.email" type="email" placeholder="Correo" />

        <select v-model="user.gender" @change="updateAvatar">
          <option disabled value="">Selecciona tu género</option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
        </select>

        <select v-model="user.city" @change="updateAvatar">
          <option disabled value="">Selecciona la Ciudad</option>
          <option value="Bogotá">Bogotá</option>
          <option value="Medellín">Medellín</option>
          <option value="Cali">Cali</option>
          <option value="Barranquilla">Barranquilla</option>
          <option value="Cartagena">Cartagena</option>
          <option value="Santa Marta">Santa Marta</option>
          <option value="Cúcuta">Cúcuta</option>
          <option value="Bucaramanga">Bucaramanga</option>
          <option value="Villavicencio">Villavicencio</option>
          <option value="Pereira">Pereira</option>
          <option value="Manizales">Manizales</option>
          <option value="Ibagué">Ibagué</option>
          <option value="Montería">Montería</option>
          <option value="Valledupar">Valledupar</option>
          <option value="Neiva">Neiva</option>
          <option value="Pasto">Pasto</option>
          <option value="Popayán">Popayán</option>
          <option value="Armenia">Armenia</option>
          <option value="Sincelejo">Sincelejo</option>
          <option value="Riohacha">Riohacha</option>
          <option value="Yopal">Yopal</option>
          <option value="Florencia">Florencia</option>
          <option value="Quibdó">Quibdó</option>
          <option value="San Andrés">San Andrés</option>
          <option value="Tunja">Tunja</option>
          <option value="Leticia">Leticia</option>
          <option value="Soacha">Soacha</option>
          <option value="Itagüí">Itagüí</option>
          <option value="Envigado">Envigado</option>
          <option value="Bello">Bello</option>
          <option value="Chía">Chía</option>
          <option value="Girardot">Girardot</option>
          <option value="Zipaquirá">Zipaquirá</option>
          <option value="Facatativá">Facatativá</option>
          <option value="Sogamoso">Sogamoso</option>
          <option value="Duitama">Duitama</option>
          <option value="Paipa">Paipa</option>
          <option value="Tuluá">Tuluá</option>
          <option value="Palmira">Palmira</option>
          <option value="Jamundí">Jamundí</option>
          <option value="Buenaventura">Buenaventura</option>
          <option value="Turbo">Turbo</option>
          <option value="Apartadó">Apartadó</option>
          <option value="Rionegro">Rionegro</option>
          <option value="La Ceja">La Ceja</option>
          <option value="Copacabana">Copacabana</option>
          <option value="Sabaneta">Sabaneta</option>
          <option value="Malambo">Malambo</option>
          <option value="Soledad">Soledad</option>
          <option value="Puerto Colombia">Puerto Colombia</option>
          <option value="Magangué">Magangué</option>
          <option value="Turbaco">Turbaco</option>
          <option value="El Carmen de Bolívar">El Carmen de Bolívar</option>
          <option value="Maicao">Maicao</option>
          <option value="San Juan del Cesar">San Juan del Cesar</option>
          <option value="Fundación">Fundación</option>
          <option value="Ciénaga">Ciénaga</option>
          <option value="Plato">Plato</option>
          <option value="Chibolo">Chibolo</option>
          <option value="Aracataca">Aracataca</option>
          <option value="El Banco">El Banco</option>
          <option value="Pivijay">Pivijay</option>
          <option value="Acacías">Acacías</option>
          <option value="Granada">Granada</option>
          <option value="San Martín">San Martín</option>
          <option value="Puerto López">Puerto López</option>
          <option value="Mocoa">Mocoa</option>
          <option value="Puerto Asís">Puerto Asís</option>
          <option value="San José del Guaviare">San José del Guaviare</option>
        </select>


        <input v-model="user.whatsapp" type="text" placeholder="WhatsApp (ej: 573001112233)" />
        <input v-model="newPref" type="text" placeholder="Agregar preferencia"/>
        <input v-model="user.likes" type="text" placeholder="Tus gustos (ej: música, viajes...)" />  
        <textarea v-model="user.bio" placeholder="Escribe algo sobre ti..."></textarea>
        <input v-model="user.instagram" type="text" placeholder="Link Instagram" />
        <input v-model="user.facebook" type="text" placeholder="Link Facebook" />
        <input v-model="user.tiktok" type="text" placeholder="Link TikTok" />

        <!-- Preferencias -->
        <div class="pref-box">
          <button type="button" class="action-btn" @click="addPreference">➕ Agregar</button>
        </div>

        <div class="pref-box">
          <button type="submit" class="action-btn">Guardar cambios</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/baseDatos';
import { generateUsers } from '@/services/generateUsers';

export default {
  name: "UserProfile",
  data() {
    return {
      editing: true, // comienza en modo edición
      user: {
        name: "",
        email: "",
        avatar: "https://randomuser.me/api/portraits/neutral/3.jpg", // avatar neutro por defecto
        gender: "",
        age: "",
        city: "",
        whatsapp: "",
        instagram: "",
        facebook: "",
        tiktok: "",
        bio: "",
        likes: "",
        preferences: []
      },
      newPref: "",
      generatedUsers: [],
      availableCities: [],
      availableInterests: []
    };
  },
  computed: {
    hasSocialLinks() {
      return (
        this.user.whatsapp ||
        this.user.instagram ||
        this.user.facebook ||
        this.user.tiktok
      );
    }
  },
  mounted() {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      this.user = JSON.parse(loggedUser);
    }

    // Generar lista de usuarios aleatorios
    const { profiles, cities, interests } = generateUsers(70);
    this.generatedUsers = profiles;
    this.availableCities = cities;
    this.availableInterests = interests;

    this.updateAvatar();

    EventBus.$on("session-changed", (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    saveProfile() {
      localStorage.setItem("loggedUser", JSON.stringify(this.user));
      EventBus.$emit("perfil-actualizado", this.user);
      this.editing = false;
    },
    addPreference() {
      if (this.newPref.trim() !== "") {
        this.user.preferences.push(this.newPref.trim());
        this.newPref = "";
        EventBus.$emit("perfil-actualizado", this.user);
      } else {
        alert("Escribe una preferencia antes de agregarla ⚠️");
      }
    },
    updateAvatar() {
      // Asigna avatar según el género usando randomuser.me
      if (this.user.gender === "hombre") {
        const id = Math.floor(Math.random() * 80); // hay 0–99 disponibles
        this.user.avatar = `https://randomuser.me/api/portraits/men/${id}.jpg`;
      } else if (this.user.gender === "mujer") {
        const id = Math.floor(Math.random() * 80);
        this.user.avatar = `https://randomuser.me/api/portraits/women/${id}.jpg`;
      } else {
        const id = Math.floor(Math.random() * 80);
        this.user.avatar = `https://randomuser.me/api/portraits/lego/${id % 10}.jpg`; // neutro tipo lego 😄
      }
    },
    loadRandomUser() {
      const random = this.generatedUsers[Math.floor(Math.random() * this.generatedUsers.length)];
      if (random) {
        this.user.name = random.name;
        this.user.age = random.age;
        this.user.city = random.city;
        this.user.avatar = random.avatar;
        this.user.preferences = random.interests;
        this.user.gender = random.avatar.includes("/men/") ? "hombre" : "mujer";
      }
    }
  }
};
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  background: linear-gradient(to bottom, #ff416c, #ff4b2b);
  color: #fff;
  padding: 20px;
  position: relative;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.2);
  z-index: -1;
}
.profile-card {
  background: linear-gradient(145deg, #ffffff, #ffe4ec);
  color: #333;
  padding: 35px;
  border-radius: 25px;
  box-shadow: 0 12px 25px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}
.profile-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
}
.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.profile-avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid;
  border-image-slice: 1;
  border-width: 4px;
  border-image-source: linear-gradient(45deg, #ff3366, #ff4b2b);
  box-shadow: 0 6px 15px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}
.profile-avatar:hover {
  transform: scale(1.1);
}
.bio {
  font-style: italic;
  color: #777;
}
.edit-section {
  background: linear-gradient(145deg, #fff, #ffe4f0);
  border-radius: 25px;
  box-shadow: 0 12px 25px rgba(0,0,0,0.2);
}
.edit-section input,
.edit-section select,
.edit-section textarea {
  display: block;
  width: 100%;
  margin: 14px 0;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 15px;
  box-shadow: inset 0 1px 4px rgba(0,0,0,0.1);
  box-sizing: border-box; /* asegura que no se salga del contenedor */
}
.pref-box {
  display: flex;
  align-items: center; /* centra verticalmente el input y el botón */
  gap: 12px;
  margin: 15px 0;
}
.pref-box input {
  flex: 1;
}
.pref-box button:hover {
  background: linear-gradient(135deg, #e62e5c, #ff1f3a);
  transform: scale(1.05);
}
.action-btn {
  display: block;
  width: 100%;
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #ff3366, #ff4b2b);
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.25);
  margin-top: 10px;
  transition: all 0.2s ease;
}
.action-btn:hover {
  background: linear-gradient(135deg, #e62e5c, #ff1f3a);
  transform: scale(1.02);
}
.save-btn:hover {
  background: linear-gradient(135deg, #e62e5c, #ff1f3a);
  transform: scale(1.02);
}
.social-links {
  margin-top: 15px;
}
.social-links a {
  display: inline-block;
  margin: 5px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #ff3366;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
}
.social-links a:hover {
  background: #e62e5c;
  transform: scale(1.05);
}
.preferences ul {
  list-style: none;
  padding: 0;
}
.preferences li {
  background: #ffebf0;
  color: #ff3366;
  padding: 5px 10px;
  border-radius: 12px;
  display: inline-block;
  margin: 5px;
}
.edit-btn {
  margin-top: 15px;
  background: #ff4b2b;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
}
.edit-btn:hover {
  background: #e62e5c;
  transform: scale(1.05);
}
</style>