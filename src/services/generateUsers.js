export function generateUsers(count = 70) {
  const cities = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira",
    "Santa Marta", "Cúcuta", "Ibagué", "Manizales", "Villavicencio", "Neiva",
    "Pasto", "Montería", "Armenia", "Sincelejo", "Valledupar", "Riohacha",
    "Tunja", "Florencia", "Quibdó", "Yopal", "San Andrés", "Popayán",
    "Palmira", "Soacha", "Dosquebradas", "Girón", "Itagüí", "Envigado",
    "Rionegro", "Facatativá", "Chía", "Fusagasugá", "Zipaquirá", "Jamundí"
  ];

  const interestCategories = {
    "Aventura y Naturaleza": {
      actividades: [
        "Viajes", "Senderismo", "Camping", "Playa", "Montañismo", "Ciclismo", "Picnic",
        "Escalada", "Surf", "Parques Naturales", "Kayak", "Aventuras extremas", "Parapente"
      ]
    },
    "Deportes": {
      equipo: ["Fútbol", "Baloncesto", "Voleibol"],
      individuales: ["Natación", "Running", "CrossFit", "Tenis", "Golf", "Patinaje", "Esquí acuático"],
      combate: ["Artes Marciales", "Boxeo"],
      fitness: ["Fitness", "Yoga"]
    },
    "Arte y Cultura": {
      visuales: ["Pintura", "Fotografía", "Artes Plásticas", "Manualidades"],
      escénicas: ["Teatro", "Baile"],
      escritura: ["Escritura creativa", "Idiomas", "Lectura"],
      entretenimiento: ["Cine", "Música", "Series y Streaming", "Videojuegos", "E-sports"]
    },
    "Estilo de Vida": {
      bienestar: ["Meditación", "Jardinería", "Pasear Mascotas"],
      social: ["Salir a comer", "Cafés", "Conciertos", "Bares", "Eventos culturales", "Juegos de mesa"],
      moda_y_estilo: ["Moda", "Astrología"]
    },
    "Tecnología y Conocimiento": {
      tech: ["Tecnología", "Programación", "Inteligencia Artificial", "Criptomonedas"],
      aprendizaje: ["Podcasts", "Networking", "Idiomas"]
    },
    "Solidaridad y Comunidad": {
      voluntariado: ["Voluntariado"]
    },
    "Coleccionismo y Hobbies": {
      hobbies: ["Coleccionismo"]
    }
  };

  const flattenInterests = (categories) =>
    Object.values(categories).flatMap(sub => Object.values(sub).flat());

  const mapInterestToCategory = (categories) => {
    const map = {};
    for (const [cat, subs] of Object.entries(categories)) {
      for (const [subcat, items] of Object.entries(subs)) {
        for (const item of items) {
          map[item] = { category: cat, subcategory: subcat };
        }
      }
    }
    return map;
  };

  const interestsFlat = flattenInterests(interestCategories);
  const interestMap = mapInterestToCategory(interestCategories);

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

    const shuffled = [...interestsFlat].sort(() => 0.5 - Math.random());
    const selectedInterests = shuffled.slice(0, Math.floor(Math.random() * 3) + 3).map(interest => ({
      name: interest,
      ...interestMap[interest]
    }));

    profiles.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      age: Math.floor(Math.random() * 65) + 16, // 16-80
      city,
      avatar,
      interests: selectedInterests
    });
  }

  return { profiles, cities, interestCategories };
}