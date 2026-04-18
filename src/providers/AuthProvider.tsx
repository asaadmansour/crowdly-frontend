import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMyProfile, type UserProfileResponse } from '../services/users';
import { AuthContext } from '../context/AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('access_token');

    if (savedToken) {
      getMyProfile()
        .then(setUser)
        .catch(() => {
          sessionStorage.removeItem('access_token');
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/token/refresh/`,
          {},
          { withCredentials: true }
        )
        .then(({ data }) => {
          sessionStorage.setItem('access_token', data.access);
          return getMyProfile();
        })
        .then(setUser)
        .catch(() => {
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const login = (accessToken: string, userData: UserProfileResponse) => {
    sessionStorage.setItem('access_token', accessToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout/`,
        {},
        { withCredentials: true }
      );
    } finally {
      sessionStorage.removeItem('access_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
