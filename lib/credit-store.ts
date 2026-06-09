const CREDIT_KEY = "cineforge_credits";

export function getCredits() {
  if (typeof window === "undefined") return 100;

  const saved = localStorage.getItem(CREDIT_KEY);

  if (!saved) return 100;

  return Number(saved);
}

export function setCredits(amount: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CREDIT_KEY, String(amount));
}

export function spendCredits(amount: number) {
  const current = getCredits();

  if (current < amount) {
    return false;
  }

  setCredits(current - amount);
  return true;
}

export function addCredits(amount: number) {
  const current = getCredits();
  setCredits(current + amount);
}