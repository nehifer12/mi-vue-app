const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5"
];

export function getUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function setUser(user) {
  // Si el usuario no trae avatar → se asigna uno aleatorio
  if (!user.avatar) {
    user.avatar = avatars[Math.floor(Math.random() * avatars.length)];
  }
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem("currentUser");
}