import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userAPI } from '@/api';
import { useToast } from './use-toast';

interface User {
  updatedAt: string;
  createdAt: string;
  _id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin' | 'midwife';
  dateOfBirth: string;
  profilePicture?: string;
  phone?: string;
  address?: string;
  medicalNotes?: string;
  guardianDetails?: {
    name?: string;
    relationship?: string;
    contact?: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  register: (userData: any) => Promise<void>;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const register = async (userData: any) => {
    setLoading(true);
    try {
      const response = await userAPI.register(userData);
      const { token: newToken, ...user } = response.data;
      
      // Save to state
      setToken(newToken);
      setUser(user);
      
      // Save to localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast({
        title: "Registration Successful",
        description: "Welcome to BabyBloom!",
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Could not create account.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    try {
      const response = await userAPI.login(email, password);
      const { token: newToken, ...user } = response.data;
      
      // Verify role matches
      if (user.role !== role) {
        throw new Error('Invalid role for this account');
      }
      
      // Save to state
      setToken(newToken);
      setUser(user);
      
      // Save to localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Role-based navigation
      if (user.role === 'midwife') {
        window.location.href = '/midwife';
      } else {
        window.location.href = '/';
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.fullName}!`,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || error.message || "Invalid credentials.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear state
    setUser(null);
    setToken(null);
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const updateProfile = async (userData: any) => {
    setLoading(true);
    try {
      const response = await userAPI.updateProfile(userData);
      const updatedUser = response.data;
      
      // Update state
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Could not update profile.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
