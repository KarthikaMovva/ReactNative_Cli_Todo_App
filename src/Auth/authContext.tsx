import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from '../Types/Auth.Types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail(null);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentUserEmail(null);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUserEmail,
        setCurrentUserEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
