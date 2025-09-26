import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, LoginData, RegisterData, loginUser, registerUser, logoutUser } from '../utils/auth';
import { getValidToken } from '../services/tokenService';

// Auth context interface
interface AuthContextType {
  user: Omit<User, 'password'> | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (loginData: LoginData) => Promise<AuthResponse>;
  register: (registerData: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
  checkAuth: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Local storage keys
const TOKEN_KEY = 'authToken';
const USER_KEY = 'chatlens_user_data';

/**
 * Auth Provider Component
 * Manages authentication state and provides auth methods to the app
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Computed property for authentication status
  const isAuthenticated = !!user && !!token;



  /**
   * Saves authentication data to localStorage
   */
  const saveAuthData = (userData: Omit<User, 'password'>, authToken: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, authToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
      setToken(authToken);
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  /**
   * Clears authentication data from localStorage and state
   */
  const clearAuthData = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  /**
   * Checks if stored authentication data is valid
   */
  const checkAuth = async () => {
    setIsLoading(true);
    
    try {
      const validToken = await getValidToken();
      
      if (!validToken) {
        clearAuthData();
        return;
      }

      // Get user data with valid token
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/me/`, {
        headers: {
          'Authorization': `${import.meta.env.VITE_AUTHORIZATION_TOKEN_TYPE} ${validToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setToken(validToken);
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles user login
   */
  const login = async (loginData: LoginData): Promise<AuthResponse> => {
    try {
      const response = await loginUser(loginData);

      if (response.success && response.user) {
        const token = localStorage.getItem('authToken');
        if (token) {
          saveAuthData(response.user, token);
        }
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred during login'
      };
    }
  };

  /**
   * Handles user registration
   */
  const register = async (registerData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await registerUser(registerData);

      if (response.success && response.user) {
        const token = localStorage.getItem('authToken');
        if (token) {
          saveAuthData(response.user, token);
        }
      }

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred during registration'
      };
    }
  };

  /**
   * Handles user logout
   */
  const logout = () => {
    try {
      // Clear refresh token on server if needed
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        fetch(`${import.meta.env.VITE_API_URL}/api/auth/jwt/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken })
        }).catch(() => {}); // Ignore errors
      }
      
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      clearAuthData();
    } catch (error) {
      console.error('Logout error:', error);
      clearAuthData();
    }
  };

  // Check authentication status on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Context value
  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * Throws error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

/**
 * Higher-order component for protecting routes
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // In a real app, you might redirect to login page
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};