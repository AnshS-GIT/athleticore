import api from './api';

const chatbotService = {
  async sendMessage(message) {
    const response = await api.post('/chatbot', { message });
    return response.data;
  },
};

export default chatbotService;
