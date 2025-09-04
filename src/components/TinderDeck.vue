<template>
    <div>
    <TinderCard
        v-if="currentCard"
        :name="currentCard.name"
        :description="currentCard.description"
        :image="currentCard.image"
    />
    <TinderActions
        v-if="currentCard"
        @like="handleLike"
        @dislike="handleDislike"
    />
    <p v-else>No hay más perfiles 🚀</p>
    </div>
</template>

<script>
import TinderCard from "./TinderCard.vue";
import TinderActions from "./TinderActions.vue";

export default {
    name: "TinderDeck",
    components: { TinderCard, TinderActions },
    data() {
    return {
        currentIndex: 0,
        cards: [
        { name: "Laura, 24", description: "Amante de los viajes ✈️", image: "https://picsum.photos/300/200?1" },
        { name: "Carlos, 29", description: "Fan del fútbol ⚽", image: "https://picsum.photos/300/200?2" },
        { name: "Marta, 27", description: "Me encanta la música 🎶", image: "https://picsum.photos/300/200?3" },
        ],
    };
    },
    computed: {
    currentCard() {
        return this.cards[this.currentIndex] || null;
    },
    },
    methods: {
    handleLike() {
        alert(`👍 Te gustó ${this.currentCard.name}`);
        this.currentIndex++;
    },
    handleDislike() {
        alert(`👎 No te gustó ${this.currentCard.name}`);
        this.currentIndex++;
    },
    },
};
</script>
