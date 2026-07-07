import { authApi } from "./api";

const authService = {
  login() {
    // Full redirect, since Google OAuth can't happen via XHR
    window.location.href = `${authApi.defaults.baseURL}/login`;
  },

  async getCurrentUser() {
    const res = await authApi.get("/me");
    return res.data;
  },

  async logout() {
    const res = await authApi.post("/logout");
    return res.data;
  },
};

export default authService;