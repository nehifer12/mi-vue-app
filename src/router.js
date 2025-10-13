import Vue from "vue";
import Router from "vue-router";
import baseDatos from "@/baseDatos";

//Errores
import error401 from "./viuew/error/error401.vue";
import error403 from "./viuew/error/error403.vue";
import error404 from "./viuew/error/error404.vue";
import error500 from "./viuew/error/error500.vue";
import error503 from "./viuew/error/error503.vue";

// Componentes
import HomePage from "./components/HomePage.vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import UserProfile from "./components/Profile.vue";
import UserSettings from "./components/Settings.vue";
import Explore from "./components/Explore.vue"; 
import CardSwiper from "@/components/CardSwiper.vue";                   
import Mensajes from "./components/Mensajes.vue";
import EncuentroPage from "./components/Encuentro.vue";
import ConectaPage from "./components/ConectaPage.vue";


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
    { 
      path: "/admin", 
      name: "AdminPanel", 
      component: () => import("@/components/AdminPanel.vue"), 
      meta: { requiresAdmin: true } 
    },
    { path: "/login", name: "login", component: LoginForm },
    { path: "/register", name: "register", component: RegisterForm },
    { path: "/profile", name: "profile", component: UserProfile },
    { path: "/settings", name: "settings", component: UserSettings },
    { path: "/explore", name: "explore", component: Explore },
    { path: "/cards", name: "cards", component: CardSwiper },
    { path: "/mensajes", name: "mensajes", component: Mensajes },
    { path: "/encuentra", name: "encuentra", component: EncuentroPage },
    { path: "/conecta", name: "conecta", component: ConectaPage },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: Error404 },
    { path: "/error/401", component: Error401 },
    { path: "/error/403", component: Error403 },
    { path: "/error/500", component: Error500 },
    { path: "/error/503", component: Error503 },
  ]
});

// Protege rutas con meta.requiresAdmin
router.beforeEach((to, from, next) => {
  const session = baseDatos.getSession();

  if (to.meta.requiresAdmin && (!session || session.role !== "admin")) {
    next("/login"); // Redirige si no es admin
  } else {
    next();
  }
});

export default router;


