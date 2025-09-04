<template>
    <div class="likes">
    <h2>Personas que me gustan 💖</h2>

    <!-- Grid de personas -->
    <div class="grid">
        <div v-for="(person, index) in likedPeople" :key="index" class="card">
        <img :src="person.image" :alt="person.name" />
        <p>{{ person.name }}</p>
        </div>
    </div>

    <!-- Botones de navegación -->
    <div class="menu-buttons">
        <button @click="$router.push('/tinder')">Ir al Tinder</button>
        <button @click="$router.push('/')">Cerrar Sesión</button>
    </div>
    </div>
</template>

<script>
export default {
    name: "MenuLikes",
    data() {
    return {
        likedPeople: [
        { name: "Ana", image: "https://picsum.photos/150/150?4" },
        { name: "David", image: "https://picsum.photos/150/150?5" },
        { name: "Lucía", image: "https://picsum.photos/150/150?6" },
        ],
    };
    },
};
</script>

<style scoped>
.likes {
    margin-top: 20px;
    text-align: center;
}
.grid {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
}
.card {
    background: #fff;
    padding: 12px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    text-align: center;
    width: 150px;
}
.card img {
    width: 100%;
    border-radius: 10px;
}
.menu-buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
}
button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #ff5a5f;
    color: white;
    cursor: pointer;
    font-weight: bold;
}
button:hover {
    background-color: #e04848;
}
</style>
