import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true
});

// Mock user data
const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  addresses: [
    {
      id: 1,
      name: 'Home',
      line1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      isDefault: true,
      phone: '555-123-4567'
    }
  ],
  paymentMethods: [
    {
      id: 1,
      cardType: 'Visa',
      lastFour: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    }
  ]
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Very basic validation for demo purposes
        if (email && password.length >= 6) {
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Basic validation
        if (name && email && password.length >= 6) {
          const newUser = {
            ...mockUser,
            name,
            email
          };
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};