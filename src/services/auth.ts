import api from "../lib/api";

export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  await api.get("/sanctum/csrf-cookie");
  const res = await api.post("/api/register", {
    name,
    email,
    password,
    password_confirmation,
  });
  return res.data;
}

export async function login(email: string, password: string) {
  await api.get("/sanctum/csrf-cookie");
  const res = await api.post("/api/login", { email, password });
  return res.data;
}

export async function logout() {
  const res = await api.post("/api/logout");
  return res.data;
}

export async function getUser() {
  const res = await api.get("/api/user");
  return res.data;
}
