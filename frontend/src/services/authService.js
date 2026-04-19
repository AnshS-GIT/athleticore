import api from './api';

const authService = {
  async signup({ name, email, password }) {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },

  async login({ email, password }) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  saveAuth(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};

export default authService;
