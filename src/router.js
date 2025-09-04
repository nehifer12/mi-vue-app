import Vue from "vue";
import Router from "vue-router";

// Importa los componentes que serán tus páginas
import LoginForm from "./components/LoginForm.vue";
import TinderDeck from "./components/TinderDeck.vue";
import MenuLikes from "./components/MenuLikes.vue";

// Activa Vue Router
Vue.use(Router);

// Configuración del enrutador
export default new Router({
  mode: "history", // URLs sin #
    routes: [
    {
        path: "/",
        name: "login",
        component: LoginForm,
    },
    {
        path: "/tinder",
        name: "tinder",
        component: TinderDeck,
    },
    {
        path: "/likes",
        name: "likes",
        component: MenuLikes,
    },
    ],
});

