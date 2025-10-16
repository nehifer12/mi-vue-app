<template>
  <div class="info-container">
    <section class="info-content">
      <h2><strong>Entonces, ¿por qué elegir una app de citas como Tinder?</strong></h2>

      <p>
        Cuando se trata de apps de citas, tienes opciones: Badoo, Bumble, Hinge, Match, Happn, Grindr y muchas más.
        No importa si lo que quieres es encontrar el amor, una cita o solo una conversación casual. 
        Lo importante es encontrar la app correcta para ti. 
        Y no siempre es blanco y negro. 
        Cuando quieres conocer gente nueva, tus amigos de Tinder te pueden ayudar con funciones diseñadas para hacer lo imposible posible. 
        Conocer a alguien en línea ahora es más fácil.
      </p>

      <p>
        No vamos a declarar que somos el mejor sitio gratuito. 
        Te dejaremos decidirlo por tu cuenta dándote un resumen de Tinder.
      </p>

      <!-- Botón que lleva al login -->
      <router-link to="/login" class="btn-join">Únete ahora</router-link>
    </section>

    <footer class="info-footer">
      <p>
        Valoramos tu privacidad. Nuestros socios y nosotros utilizamos rastreadores para medir el público de nuestro sitio web 
        y para mostrarte ofertas y mejorar nuestras propias iniciativas de marketing en Tinder.
        <a href="#">Más información sobre las cookies y los proveedores que utilizamos</a>.
        En cualquier momento puedes revocar tu consentimiento en los ajustes.
      </p>

      <div class="footer-buttons">
        <button class="btn-outline">Personalizar mis preferencias</button>
        <button class="btn-accept">Acepto</button>
        <button class="btn-decline">Rechazo</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MasInformacion",
};
</script>

<style scoped>
.info-container {
  background-color: #f7f8fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Inter", "Arial", sans-serif;
  color: #222;
}

.info-content {
  max-width: 800px;
  margin: 100px auto;
  text-align: center;
  line-height: 1.7;
  padding: 0 20px;
}

.info-content h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.info-content p {
  margin-bottom: 20px;
  color: #333;
}

/* Botón principal */
.btn-join {
  background-color: black;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-join:hover {
  background-color: #333;
}

/* Footer */
.info-footer {
  background-color: #fff;
  border-top: 1px solid #ddd;
  padding: 30px 20px;
  text-align: center;
}

.info-footer p {
  font-size: 0.9rem;
  color: #555;
  max-width: 900px;
  margin: 0 auto 15px;
}

.info-footer a {
  color: #007bff;
  text-decoration: underline;
}

/* === CONTENEDOR DE BOTONES === */
.footer-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

/* === ESTILO PROFESIONAL DE BOTONES === */
.footer-buttons button {
  flex: 1;
  max-width: 220px;
  min-width: 160px;
  border-radius: 25px;
  padding: 10px 0;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  background: #e98189;
  border: 1.5px solid #d1d5db;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

/* Personalizar */
.btn-outline:hover {
  background-color: #282b2d;
  border-color: #bbb;
}

/* Acepto */
.btn-accept:hover {
  background-color: #0dad2d;
  border-color: #b6e3b4;
}

/* Rechazo */
.btn-decline:hover {
  background-color: #f1070e;
  border-color: #f5baba;
}

/* Responsive */
@media (max-width: 600px) {
  .footer-buttons {
    flex-direction: column;
    gap: 12px;
  }
  .footer-buttons button {
    max-width: 100%;
  }
}
</style>