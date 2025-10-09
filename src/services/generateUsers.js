// src/services/generateUsers.js
export function generateUsers(count = 70) {
  const cities = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira",
    "Santa Marta", "Cúcuta", "Ibagué", "Manizales", "Villavicencio", "Neiva",
    "Pasto", "Montería", "Armenia", "Sincelejo", "Valledupar", "Riohacha",
    "Tunja", "Florencia", "Quibdó", "Yopal", "San Andrés", "Popayán",
    "Palmira", "Soacha", "Dosquebradas", "Girón", "Itagüí", "Envigado",
    "Rionegro", "Facatativá", "Chía", "Fusagasugá", "Zipaquirá", "Jamundí"
  ];

  const interests = [
    "Viajes", "Senderismo", "Camping", "Playa", "Montañismo", "Ciclismo", "Picnic",
    "Escalada", "Surf", "Parques Naturales", "Jardinería", "Pasear Mascotas",
    "Aventuras extremas", "Parapente", "Kayak",
    "Fútbol", "Baloncesto", "Voleibol", "Natación", "Running", "CrossFit",
    "Artes Marciales", "Boxeo", "Tenis", "Golf", "Patinaje", "Esquí acuático",
    "Cine", "Música", "Videojuegos", "Lectura", "Cocina", "Baile", "Yoga", "Meditación",
    "Teatro", "Artes Plásticas", "Pintura", "Fotografía", "Manualidades",
    "Coleccionismo", "Escritura creativa", "Idiomas", "Tecnología", "Programación",
    "Salir a comer", "Cafés", "Conciertos", "Bares", "Eventos culturales",
    "Voluntariado", "Networking", "Juegos de mesa",
    "Podcasts", "Criptomonedas", "Astrología", "Moda", "Fitness",
    "Series y Streaming", "E-sports", "Inteligencia Artificial"
  ];

  const maleNames = ["Carlos", "Juan", "Andrés", "Julián", "Mateo", "Santiago", "Camilo", "Felipe", "Esteban", "David"];
  const femaleNames = ["Laura", "Mariana", "Ana", "Valentina", "Carolina", "Isabella", "Paula", "Camila", "Natalia", "Andrea"];
  const lastNames = ["Gómez", "Pérez", "Rodríguez", "Martínez", "López", "Fernández", "García", "Torres", "Ramírez", "Castro"];

  const profiles = [];

  for (let i = 0; i < count; i++) {
    const isMale = Math.random() > 0.5;
    const firstName = isMale
      ? maleNames[Math.floor(Math.random() * maleNames.length)]
      : femaleNames[Math.floor(Math.random() * femaleNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    const avatarId = Math.floor(Math.random() * 100);
    const avatar = `https://randomuser.me/api/portraits/${isMale ? "men" : "women"}/${avatarId}.jpg`;

    const city = cities[Math.floor(Math.random() * cities.length)];

    const shuffled = [...interests].sort(() => 0.5 - Math.random());
    const userInterests = shuffled.slice(0, Math.floor(Math.random() * 3) + 3);

    profiles.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      age: Math.floor(Math.random() * 65) + 16, // 16-80
      city,
      avatar,
      interests: userInterests
    });
  }

  return { profiles, cities, interests };
}