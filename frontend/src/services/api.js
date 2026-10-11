import axios from 'axios';

// Mock data for initial development without a backend
const mockData = {
  profile: {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Software Engineer',
    experience: 'Mid-Level',
    avatar: null,
    joinDate: '2024-01-15'
  },
  interviews: [
    { id: '1', role: 'Frontend Developer', date: '2024-10-01', score: 85, status: 'Completed' },
    { id: '2', role: 'Full Stack Engineer', date: '2024-10-05', score: null, status: 'In Progress' }
  ],
  interview: { id: '1', role: 'Frontend Developer', questions: ['Tell me about React', 'Explain closure'] },
  results: { score: 85, strengths: ['React', 'JavaScript'], improvements: ['System Design'], feedback: 'Great job overall.' },
  performance: { averageScore: 82, interviewsCompleted: 5, technicalRating: 4.5, communicationRating: 4.2 },
  history: [
    { date: '2024-09-01', score: 75 },
    { date: '2024-09-15', score: 80 },
    { date: '2024-10-01', score: 85 }
  ]
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper for simulating network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  login: async (credentials) => {
    await delay();
    return { data: { token: 'mock-jwt-token', user: { ...mockData.profile, email: credentials.email } } };
  },
  register: async (userData) => {
    await delay();
    return { data: { token: 'mock-jwt-token', user: { ...mockData.profile, ...userData } } };
  },
  getProfile: async () => {
    await delay();
    return { data: mockData.profile };
  },
  updateProfile: async (data) => {
    await delay();
    return { data: { ...mockData.profile, ...data } };
  }
};

export const interviewAPI = {
  create: async (data) => {
    await delay();
    return { data: { id: 'int_' + Date.now(), ...data, status: 'Created' } };
  },
  getAll: async () => {
    await delay();
    return { data: mockData.interviews };
  },
  getById: async (id) => {
    await delay();
    return { data: { ...mockData.interview, id } };
  },
  start: async (id) => {
    await delay();
    return { data: { success: true, status: 'In Progress' } };
  },
  submit: async (id, answers) => {
    await delay();
    return { data: { success: true, resultId: 'res_' + id } };
  }
};

export const resultsAPI = {
  getById: async (id) => {
    await delay();
    return { data: mockData.results };
  },
  getAll: async () => {
    await delay();
    return { data: [mockData.results] };
  }
};

export const performanceAPI = {
  getOverview: async () => {
    await delay();
    return { data: mockData.performance };
  },
  getHistory: async () => {
    await delay();
    return { data: mockData.history };
  }
};

export default api;
