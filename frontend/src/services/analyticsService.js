import api from "./api";

const analyticsService = {
  async getOverview() {
    const res = await api.get("/analytics/overview");
    return res.data;
  },

  async getActivity(days = 7) {
    const res = await api.get("/analytics/activity", { params: { days } });
    return res.data;
  },

  async getCategories() {
    const res = await api.get("/analytics/categories");
    return res.data;
  },

  async getTopSenders(limit = 5) {
    const res = await api.get("/analytics/top-senders", { params: { limit } });
    return res.data;
  },

  async getInsights() {
    const res = await api.get("/analytics/insights");
    return res.data;
  },
};

export default analyticsService;