import Vue from "vue";
import Router from "vue-router";

//Componentes
import HomePage from "./components/HomePage.vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import UserProfile from "./components/Profile.vue";
import UserSettings from "./components/Settings.vue";
import Explore from "./components/Explore.vue"; 
import CardSwiper from "@/components/CardSwiper.vue";                   
import Mensajes from "./components/Mensajes.vue";

Vue.use(Router);

// Fix global para NavigationDuplicated
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject);
    }
    return originalReplace.call(this, location).catch(err => err);
};

const router = new Router({
    mode: "history",
    routes: [
    { path: "/", name: "home", component: HomePage },
    { path: "/login", name: "login", component: LoginForm },
    { path: "/register", name: "register", component: RegisterForm },
    { path: "/profile", name: "profile", component: UserProfile },
    { path: "/settings", name: "settings", component: UserSettings },
    {path: "/explore", name: "explore", component: Explore},
    { path: "/cards", component: CardSwiper },
    { path: "/mensajes", component: Mensajes }
    ]
});

export default router;


