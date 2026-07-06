import axios from "axios";

const BASE_URL = "http://localhost:8000";

// For /api/* routes (emails, sync, ai, etc.)
export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// For /auth/* routes (login, me, logout)
export const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
  withCredentials: true,
});

export default api;