import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs - renamed from authAPI to userAPI to match the import in useAuth
export const userAPI = {
  register: (userData: any) => api.post('/users', userData),
  login: (email: string, password: string) => api.post('/users/login', { email, password }),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData: any) => api.put('/users/profile', userData),
  deleteProfile: () => api.delete('/users/profile'),
};

// For backward compatibility - keeping authAPI to avoid breaking other components
export const authAPI = userAPI;

// Vaccine APIs
export const vaccineAPI = {
  getAllVaccines: () => api.get('/vaccines'),
  getVaccinationSchedule: () => api.get('/vaccines/schedule'),
  recordMissedVaccination: (vaccineId: string, missedDays: number) => 
    api.post('/vaccines/missed', { vaccineId, missedDays }),
};

// Health Calculator APIs
export const healthAPI = {
  calculateWeight: (data: { gender: string; ageMonths: number; weight: number }) =>
    api.post('/health/weight', data),
  calculateHeight: (data: { gender: string; ageMonths: number; height: number }) =>
    api.post('/health/height', data),
  calculateHealth: (data: { gender: string; ageMonths: number; weight?: number; height?: number }) =>
    api.post('/health/calculate', data),
};

// Chat APIs
export const chatAPI = {
  getMidwives: () => api.get('/chats/midwives'),
  getUsers: () => api.get('/chats/users'),
  getChatHistory: (userId: string) => api.get(`/chats/${userId}`),
  sendMessage: (receiverId: string, text: string) => 
    api.post('/chats', { receiverId, text }),
  markMessagesAsRead: (userId: string) => api.put(`/chats/read/${userId}`),
};

// FAQ APIs
export const faqAPI = {
  getAllFAQs: () => api.get('/faqs'),
  getFAQsByCategory: (category: string) => api.get(`/faqs/category/${category}`),
};

export default api;
