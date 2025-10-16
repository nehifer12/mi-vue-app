<template>
  <section class="conecta-page">
    <!-- Encabezado -->
    <header class="conecta-header">
      <h1>💬 Conecta</h1>
      <p>
        Encuentra nuevas amistades, posibles matches o simplemente conecta con
        personas cerca de ti.
      </p>
    </header>

    <!-- Filtros -->
    <div class="filters">
      <!-- Buscar nombre -->
      <input
        type="text"
        v-model="searchName"
        placeholder="🔎 Buscar por nombre"
        @input="onFilterChange"
      />

      <select v-model="selectedCity" @change="onFilterChange">
        <option value="">🌍 Ciudades </option>
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>

      <select v-model="selectedInterest" @change="onFilterChange">
        <option value="">🔥 Intereses </option>
        <option v-for="interest in interests" :key="interest">{{ interest }}</option>
      </select>

      <div class="age-filter">
        <input type="range" v-model="ageRange" min="18" max="80" @input="onFilterChange" />
        <span>{{ ageRange }} años</span>
      </div>
    </div>

    <div class="filter-actions">
      <button class="reset-btn" @click="resetFilters">
        <span>⟲</span>
      </button>
    </div>

    <!-- Perfiles filtrados -->
    <div v-if="filtersApplied" class="profiles">
      <h2>👥 Perfiles encontrados</h2>
      <div class="features">
        <router-link
          v-for="(profile, index) in filteredProfiles"
          :key="index"
          :to="'/profile/' + profile.id"
          class="feature-card"
        >
          <img :src="profile.avatar" :alt="profile.name" class="feature-img" />
          <h2>{{ profile.name }}, {{ profile.age }}</h2>
          <p>{{ profile.bio }}</p>
        </router-link>
      </div>
      <p v-if="filteredProfiles.length === 0">😕 No se encontraron resultados.</p>
    </div>

    <!-- Sección extra: destacados -->
    <div v-else class="highlight">
      <h2>⭐ Lo mas gustoso en la semana </h2>
      <div class="highlight-list">
        <div v-for="(top, i) in topProfiles" :key="i" class="top-card">
          <img :src="top.avatar" :alt="top.name" />
          <span>{{ top.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { generateUsers } from "@/services/generateUsers.js";

export default {
  name: "ConectaPage",
  data() {
    const { profiles, cities, interests } = generateUsers(70);
    return {
      searchName: "",
      selectedCity: "",
      selectedInterest: "",
      ageRange: 80,
      filtersApplied: false,
      profiles,
      cities,
      interests,
      topProfiles: [],
    };
  },
  created() {
    this.shuffleTopProfiles();
  },
  computed: {
    filteredProfiles() {
      return this.profiles.filter((p) => {
        const byName = this.searchName
          ? p.name.toLowerCase().includes(this.searchName.toLowerCase())
          : true;
        const byCity = this.selectedCity ? p.city === this.selectedCity : true;
        const byInterest = this.selectedInterest
          ? p.interests.includes(this.selectedInterest)
          : true;
        const byAge = p.age <= this.ageRange;
        return byName && byCity && byInterest && byAge;
      });
    },
  },
  methods: {
    applyFilters() {
      this.filtersApplied = true;
    },
    onFilterChange() {
      this.filtersApplied = true;
    },
    resetFilters() {
      this.searchName = "";
      this.selectedCity = "";
      this.selectedInterest = "";
      this.ageRange = 80;
      this.filtersApplied = false;

      const resetBtn = document.querySelector(".reset-btn");
      if (resetBtn) {
        resetBtn.classList.add("shake");
        setTimeout(() => resetBtn.classList.remove("shake"), 500);
      }
    },
    shuffleTopProfiles() {
      const shuffled = [...this.profiles].sort(() => Math.random() - 0.5);
      this.topProfiles = shuffled.slice(0, 5);
    },
  },
};
</script>

<style scoped>
.conecta-page {
  padding: 40px;
  max-width: 1200px;
  margin: auto;
}
.conecta-header {
  text-align: center;
  margin-bottom: 40px;
}
.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.filters select,
.filters input[type="text"] {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 200px;
  text-align: center;
}
.age-filter {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-actions {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 12px;
}
.search-btn,
.reset-btn {
 padding: 12px 24px;
  border: none;
  border-radius: 12px; /* Bordes más suaves */
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  background: linear-gradient(135deg, #ff6a88, #ff4d6d);
  color: #fff;
  box-shadow: 0 6px 15px rgba(255, 77, 109, 0.4); /* Sombra 3D */
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  position: relative;
  overflow: hidden;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

/* Buscar estilizado en rojo */
.search-btn {
  background: linear-gradient(135deg, #ff5252, #d32f2f);
  color: #fff;
  border: 2px solid #c62828;
  box-shadow: 0 3px 8px rgba(255, 82, 82, 0.4);
}
.search-btn:hover {
  background: linear-gradient(135deg, #ff4d6d, #ff2e55);
  transform: translateY(-3px) scale(1.05); /* Levanta y aumenta */
  box-shadow: 0 10px 20px rgba(255, 77, 109, 0.5); /* Sombra más grande */
}

/* Reset compacto y minimalista */
.reset-btn {
  background: linear-gradient(135deg, #ff6a88, #ff4d6d);
  color: #fff;
}
.reset-btn:hover {
  background: linear-gradient(135deg, #ff4d6d, #ff2e55);
  transform: scale(1.05);
}
.reset-btn:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 4px 10px rgba(255, 77, 109, 0.3);
}

/* Animación reset */
.shake {
  animation: shake 0.5s;
}
@keyframes shake {
  0% { transform: rotate(0); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0); }
}

/* Tarjetas */
.features {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
.feature-card {
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  flex: 1 1 240px;
  max-width: 280px;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  text-decoration: none;
  color: inherit;
}
.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
}
.feature-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
}

/* Highlight */
.highlight {
  margin-top: 50px;
  text-align: center;
}
.highlight-list {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
  flex-wrap: wrap;
}
.top-card {
  text-align: center;
}
.top-card img {
  width: 140px;   /* más grande */
  height: 140px;
  border-radius: 50%;
  border: 4px solid #4CAF50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;
}
.top-card img:hover {
  transform: scale(1.1);
}
.top-card span {
  display: block;
  margin-top: 8px;
  font-weight: 600;
  font-size: 16px;
  color: #333;
}
</style>