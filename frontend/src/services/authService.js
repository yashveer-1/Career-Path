import { api } from "../api/client.js";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const PATHFINDER_USER_KEY = "pathfinder-user-id";

const storeSession = ({ token, user }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(PATHFINDER_USER_KEY, user._id);
  return user;
};

export const authService = {
  async register(credentials) {
    const response = await api.post("/auth/register", credentials);
    storeSession(response.data);
    return response.data;
  },

  async login(credentials) {
    const response = await api.post("/auth/login", credentials);
    storeSession(response.data);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me");
    localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
    localStorage.setItem(PATHFINDER_USER_KEY, response.data.user._id);
    return response.data.user;
  },

  async logout(navigate) {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(PATHFINDER_USER_KEY);
      if (navigate) navigate("/login", { replace: true });
    }
  },

  getStoredUser() {
    try {
      const value = localStorage.getItem(USER_KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PATHFINDER_USER_KEY);
  }
};
