const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log('this is api url: ', API_BASE_URL);

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

export const api = {
  setToken(token: string) {
    localStorage.setItem('Gtoken', token);
  },

  getToken(): string | null {
    return localStorage.getItem('Gtoken');
  },

  removeToken() {
    localStorage.removeItem('Gtoken');
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = this.getToken();
    console.log('DEBUGG BEFORE ');
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });
      console.log('DEBUGG: ', response);
      const data = await response.json();
    

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Something went wrong' };
    }
  },

  // Auth endpoints
  auth: {
    async login(email: string, password: string) {
      const response = await api.request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      if (response.data?.token) {
        api.setToken(response.data.token);
      }
      
      return response;
    },

    async signup(name: string, email: string, password: string) {
      const response = await api.request<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      
      if (response.data?.token) {
        api.setToken(response.data.token);
      }
      
      return response;
    },

    logout() {
      api.removeToken();
    },
  },

  // User profile endpoints
  user: {
    async getProfile() {
      console.log('get profile method called')
      return api.request('/user/profile');
    },
  },

  // XP endpoints
  xp: {
    async update(xpAmount: number) {
      return api.request('/user/xp', {
        method: 'POST',
        body: JSON.stringify({ xpAmount }),
      });
    },
  },

  // Streak endpoints
  streak: {
    async update() {
      return api.request('/user/streak', {
        method: 'POST',
      });
    },
    async getCalendar(year: number, month: number) {
      return api.request(`/user/streak/calendar?year=${year}&month=${month}`);
    }
  },

  // Mood endpoints
  mood: {
    async update(mood: string) {
      return api.request('/user/mood', {
        method: 'POST',
        body: JSON.stringify({ mood }),
      });
    },
    async getHistory() {
      return api.request('/user/mood/history');
    },
  },

  // Journal endpoints
  journal: {
    async save(content: string) {
      return api.request('/journal', {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
    },
    async getAll() {
      return api.request('/journal');
    },
  },

  // Habits endpoints
  habits: {
    async getAll() {
      return api.request('/user/habits');
    },

    async add(title: string, xp: number) {
      return api.request('/user/habits', {
        method: 'POST',
        body: JSON.stringify({ title, xp }),
      });
    },

    async update(habitId: string, completed: boolean) {
      return api.request(`/user/habits/${habitId}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
      });
    },

    async delete(habitId: string) {
      return api.request(`/user/habits/${habitId}`, {
        method: 'DELETE',
      });
    },
  },
}; 