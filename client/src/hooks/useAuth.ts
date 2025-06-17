import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL;

interface User {
  _id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signup = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signup`, {
        username,
        email,
        password,
      });

      setUser(res.data.user);
      // setToken(res.data.token);
      localStorage.setItem('Gtoken', res.data.token);
      navigate('/dashboard'); // Navigate to dashboard after successful signup
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log('login function gets called')
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      setUser(res.data.user);
      
      localStorage.setItem('Gtoken', res.data.token);
      navigate('/dashboard'); // Navigate to dashboard after successful login
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // setToken(null);
    localStorage.removeItem('Gtoken');
    navigate('/'); // Navigate to login page after logout
  };

  return { user, loading, error, signup, login, logout };
};
