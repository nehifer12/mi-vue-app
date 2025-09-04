<template>
    <div class="login">
    <h2>Iniciar Sesión 🔑</h2>
    <form @submit.prevent="handleLogin">
        <input
        type="text"
        v-model="username"
        placeholder="Usuario"
        required
        />
        <input
        type="password"
        v-model="password"
        placeholder="Contraseña"
        required
        />
        <button type="submit">Entrar</button>
    </form>

    <!-- Enlace para crear cuenta -->
    <p class="register-link">
        ¿No tienes cuenta?
        <a @click.prevent="$router.push('/register')">Crear cuenta</a>
    </p>
    </div>
</template>

<script>
export default {
    name: "LoginForm",
    data() {
    return {
        username: "",
        password: "",
    };
    },
    methods: {
    handleLogin() {
        if (this.username && this.password) {
        alert(`Bienvenido, ${this.username} 🎉`);
        // 👇 Después del login redirige al menú principal
        this.$router.push("/likes");
        } else {
        alert("Por favor, completa todos los campos.");
        }
    },
    },
};
</script>

<style scoped>
.login {
    max-width: 300px;
    margin: 40px auto;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    text-align: center;
}
form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
}
button {
    padding: 10px;
    background: #42b983;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
}
button:hover {
    background: #36976d;
}
.register-link {
    margin-top: 12px;
    font-size: 14px;
}
.register-link a {
    color: #42b983;
    cursor: pointer;
    text-decoration: underline;
}
</style>
