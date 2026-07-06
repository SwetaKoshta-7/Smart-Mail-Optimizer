import api from "./api";

const emailService = {
  async getEmails({ page = 1, limit = 20, label = "INBOX" } = {}) {
    const res = await api.get("/emails", { params: { page, limit, label } });
    return res.data;
  },

  async getEmail(gmailId) {
    const res = await api.get(`/emails/${gmailId}`);
    return res.data;
  },

  async searchEmails(query) {
    const res = await api.get("/emails/search", { params: { q: query } });
    return res.data;
  },

  async syncEmails(maxResults = 20) {
    const res = await api.post("/emails/sync", null, { params: { max_results: maxResults } });
    return res.data;
  },

  async markRead(gmailId, unread = false) {
    const res = await api.patch(`/emails/${gmailId}/read`, null, { params: { unread } });
    return res.data;
  },

  async toggleStar(gmailId, starred = true) {
    const res = await api.patch(`/emails/${gmailId}/star`, null, { params: { starred } });
    return res.data;
  },

  async archiveEmail(gmailId) {
    const res = await api.patch(`/emails/${gmailId}/archive`);
    return res.data;
  },

  async trashEmail(gmailId) {
    const res = await api.delete(`/emails/${gmailId}`);
    return res.data;
  },

  async sendEmail({ to, subject, body, threadId, inReplyTo }) {
    const res = await api.post("/emails/send", {
      to,
      subject,
      body,
      thread_id: threadId || null,
      in_reply_to: inReplyTo || null,
    });
    return res.data;
  },

  async getSummary(gmailId) {
    const res = await api.get(`/emails/${gmailId}/summary`);
    return res.data;
  },

  async getSmartReplies(gmailId) {
    const res = await api.get(`/emails/${gmailId}/smart-replies`);
    return res.data;
  },

  async getCounts() {
    const res = await api.get("/emails/counts");
    return res.data;
  },
};

export default emailService;