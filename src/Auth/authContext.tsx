import React, { createContext, useContext, useState, useEffect } from 'react';

interface RegisteredUser {
  email: string;
  password: string;
}

interface AuthContextType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  login: () => void;
  signup: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  currentUserEmail: string | null;
  setCurrentUserEmail: (email: string | null) => void;
  users: RegisteredUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [users, setUsers] = useState<RegisteredUser[]>([]);

  const signup = () => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) throw new Error('User already exists, Prefer to login');
    setUsers([...users, { email, password }]);
    setIsLoggedIn(true);
    setCurrentUserEmail(email);
  };

  const login = () => {
    const existingUser = users.find(u => u.email === email);
    if (!existingUser) throw new Error('User not found, Prefer to signup');
    if (existingUser.password !== password) throw new Error('Incorrect password');
    setIsLoggedIn(true);
    setCurrentUserEmail(email);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentUserEmail(null);
      setEmail('');
      setPassword('');
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        email, setEmail, password, setPassword,
        login, signup,
        isLoggedIn, setIsLoggedIn,
        currentUserEmail, setCurrentUserEmail,
        users,
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
