<template>
    <div class="actions">
    <button @click="$emit('dislike')">👎</button>
    <button @click="$emit('like')">👍</button>
    </div>
</template>

<script>
export default {
    name: "TinderActions",
};
</script>

<style scoped>
.actions {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    gap: 24px;
}
button {
    font-size: 24px;
    padding: 12px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background: #eee;
    transition: transform 0.2s;
}
button:hover {
    transform: scale(1.2);
}
</style>
