export function setDevUser(email: string) {
  localStorage.setItem("cineforge_dev_user", email);
}

export function getDevUser() {
  return localStorage.getItem("cineforge_dev_user");
}

export function clearDevUser() {
  localStorage.removeItem("cineforge_dev_user");
}