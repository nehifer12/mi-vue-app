<template>
    <div class="card">
    <img :src="image" alt="Foto" />
    <h2>{{ name }}</h2>
    <p>{{ description }}</p>
    </div>
</template>

<script>
export default {
    name: "TinderCard",
    props: {
    name: String,
    description: String,
    image: String,
    },
};
</script>

<style scoped>
.card {
    width: 300px;
    padding: 16px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    text-align: center;
}
.card img {
    width: 100%;
    border-radius: 12px;
}
</style>
