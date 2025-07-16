
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock users for demo
    const mockUsers = [
      { id: '1', email: 'patient@demo.com', username: 'patient', phone: '1234567890', role: 'patient', name: 'Ram Kumar' },
      { id: '2', email: 'doctor@demo.com', username: 'doctor', phone: '0987654321', role: 'doctor', name: 'Dr. Sharma' },
      { id: '3', email: 'assistant@demo.com', username: 'assistant', phone: '1122334455', role: 'assistant', name: 'Smarth kumar' },
      { id: '4', email: 'pathology@demo.com', username: 'pathology', phone: '5544332211', role: 'pathology', name: 'Lab Tech' }
    ];

    const foundUser = mockUsers.find(u => 
      u.email === identifier || u.username === identifier || u.phone === identifier
    );

    if (foundUser && password === 'demo123') {
      setUser(foundUser as User);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (userData: any, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock registration - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      role,
      name: userData.name || `${userData.firstName} ${userData.lastName}`,
      phone: userData.phone,
      username: userData.username
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
