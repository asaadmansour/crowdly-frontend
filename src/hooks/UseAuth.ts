import { useContext } from 'react';
import { AuthContext, type AuthContextType } from '../context/AuthContext';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
