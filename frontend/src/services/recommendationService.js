import api from './api';

const recommendationService = {
  async getRecommendations(mood) {
    const response = await api.get(`/recommendations/${mood}`);
    return response.data;
  },
};

export default recommendationService;
