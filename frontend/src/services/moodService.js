import api from './api';

const moodService = {
  async addMoodEntry({ mood, note }) {
    const response = await api.post('/mood', { mood, note });
    return response.data;
  },

  async getMoodHistory({ page = 1, limit = 20 } = {}) {
    const response = await api.get('/mood', { params: { page, limit } });
    return response.data;
  },
};

export default moodService;
