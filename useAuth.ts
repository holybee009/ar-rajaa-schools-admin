// hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from './app/contexts/AuthContext';

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
