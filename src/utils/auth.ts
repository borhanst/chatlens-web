// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL;
const AUTHORIZATION_TOKEN_TYPE = import.meta.env.VITE_AUTHORIZATION_TOKEN_TYPE;
const API_ENDPOINTS = {
  register: '/api/auth/users/',
  login: '/api/auth/jwt/create/',
  refreshToken: '/api/auth/jwt/refresh/',
  profile: '/api/auth/users/me/'
};

// CSRF token handling
const getCSRFToken = (): string => {
  const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1].trim() : '';
};

// API client function
interface APIRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  data?: any;
  requiresAuth?: boolean;
}

interface APIError {
  message: string;
  errors?: Record<string, string[]>;
}

const apiClient = async <T>({ method, endpoint, data, requiresAuth = false }: APIRequestOptions): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    // 'X-CSRFTOKEN': getCSRFToken(),
  };
  
  if (requiresAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `${AUTHORIZATION_TOKEN_TYPE} ${token}`;
    }
  }
  console.log("api url ", import.meta.env.API_URL);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include', // Include cookies in the request
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw {
        message: responseData.message || 'An error occurred',
        errors: responseData.errors,
        status: response.status
      };
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof Error) {
      throw { message: error.message };
    }
    throw error;
  }
};

// Browser-compatible authentication utilities

// User roles enum
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// User profile interface
export interface UserProfile {
  is_active: boolean;
  first_name: string;
  last_name: string;
}

// User interface
export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // This will be hashed
  profile: UserProfile;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
}

// Registration data interface
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  profile: {
    is_active: boolean;
    first_name: string;
    last_name: string;
  };
  role?: UserRole;
}

// Login data interface
export interface LoginData {
  email: string;
  password: string;
}

// Auth response interface
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
  token?: string;
}

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Mock database - in production, this would be a real database
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@chatlens.com',
    password: 'hashed_AdminPass123!', // Simple hash simulation
    profile: {
      first_name: 'Admin',
      last_name: 'User',
      is_active: true
    },
    role: UserRole.ADMIN,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-12-15')
  },
  {
    id: '2',
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'hashed_UserPass123!', // Simple hash simulation
    profile: {
      first_name: 'John',
      last_name: 'Doe',
      is_active: true
    },
    role: UserRole.USER,
    createdAt: new Date('2024-02-15'),
    lastLogin: new Date('2024-12-14')
  },
  {
    id: '3',
    username: 'janesmith',
    email: 'jane.smith@example.com',
    password: 'hashed_UserPass456!', // Simple hash simulation
    profile: {
      first_name: 'Jane',
      last_name: 'Smith',
      is_active: true
    },
    role: UserRole.USER,
    createdAt: new Date('2024-03-10'),
    lastLogin: new Date('2024-12-13')
  },
  {
    id: '4',
    username: 'guestuser',
    email: 'guest@example.com',
    password: 'hashed_GuestPass789!', // Simple hash simulation
    profile: {
      first_name: 'Guest',
      last_name: 'User',
      is_active: true
    },
    role: UserRole.GUEST,
    createdAt: new Date('2024-04-05')
  },
  {
    id: '5',
    username: 'testuser',
    email: 'test@chatlens.com',
    password: 'hashed_TestPass123!', // Simple hash simulation
    profile: {
      first_name: 'Test',
      last_name: 'User',
      is_active: false
    },
    role: UserRole.USER,
    createdAt: new Date('2024-05-20'),
    lastLogin: new Date('2024-12-12')
  }
];

/**
 * Validates email format using regex
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * Requirements: minimum 8 characters, at least one uppercase, one lowercase, one number
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true, message: 'Password is valid' };
};

/**
 * Validates username format and length
 */
export const validateUsername = (username: string): { isValid: boolean; message: string } => {
  if (username.length < 4 || username.length > 64) {
    return { isValid: false, message: 'Username must be between 4 and 64 characters long' };
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, underscores, and hyphens' };
  }
  
  return { isValid: true, message: 'Username is valid' };
};

/**
 * Rate limiting implementation
 * Limits to 5 attempts per 15 minutes per IP
 */
export const checkRateLimit = (identifier: string): { allowed: boolean; resetTime?: number } => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;
  
  const record = rateLimitStore.get(identifier);
  
  if (!record || now > record.resetTime) {
    // First attempt or window has reset
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }
  
  if (record.count >= maxAttempts) {
    return { allowed: false, resetTime: record.resetTime };
  }
  
  // Increment attempt count
  record.count++;
  rateLimitStore.set(identifier, record);
  return { allowed: true };
};

/**
 * Simple browser-compatible password hashing (for demo purposes only)
 * In production, use proper server-side hashing
 */
export const hashPassword = async (password: string): Promise<string> => {
  // Simple hash simulation for browser compatibility
  return `hashed_${password}`;
};

/**
 * Compares plain password with hashed password
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  // Simple comparison for browser compatibility
  return hashedPassword === `hashed_${password}`;
};

/**
 * Generates a simple token for authenticated user (browser-compatible)
 * In production, use proper JWT on the server side
 */
export const generateToken = (user: Omit<User, 'password'>): string => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
  };
  
  // Simple base64 encoding for browser compatibility
  return btoa(JSON.stringify(payload));
};

/**
 * Verifies and decodes simple token (browser-compatible)
 */
export const verifyToken = (token: string): any => {
  try {
    const decoded = JSON.parse(atob(token));
    
    // Check if token is expired
    if (decoded.exp && Date.now() > decoded.exp) {
      throw new Error('Token expired');
    }
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Finds user by email in mock database
 */
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Finds user by username in mock database
 */
export const findUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(user => user.username.toLowerCase() === username.toLowerCase());
};

/**
 * Finds user by ID in mock database
 */
export const findUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

/**
 * Creates a new user via API
 */
export const createUser = async (userData: RegisterData): Promise<User> => {
  try {
    const apiResponse = await apiClient<User>({
      method: 'POST',
      endpoint: API_ENDPOINTS.register,
      data: {
        email: userData.email,
        username: userData.username,
        password: userData.password,
        profile: {
          is_active: userData.profile.is_active,
          first_name: userData.profile.first_name,
          last_name: userData.profile.last_name
        }
      }
    });

    return {
      ...apiResponse,
      role: userData.role || UserRole.USER,
      createdAt: new Date()
    };
  } catch (error) {
    const apiError = error as APIError;
    throw new Error(apiError.message || 'Failed to create user');
  }
};

/**
 * Updates user's last login timestamp
 */
export const updateLastLogin = (userId: string): void => {
  const user = findUserById(userId);
  if (user) {
    user.lastLogin = new Date();
  }
};

/**
 * Removes sensitive data from user object
 */
export const sanitizeUser = (user: User): Omit<User, 'password'> => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

/**
 * Registers a new user with validation and security checks
 */
export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    // Input validation
    const usernameValidation = validateUsername(userData.username);
    if (!usernameValidation.isValid) {
      return { success: false, message: usernameValidation.message };
    }
    
    if (!validateEmail(userData.email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }
    
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      return { success: false, message: passwordValidation.message };
    }
    
    if (!userData.profile || !userData.profile.first_name.trim() || !userData.profile.last_name.trim()) {
      return { success: false, message: 'First name and last name are required' };
    }
    
    // Create new user via API
    const newUser = await createUser(userData);
    
    return {
      success: true,
      message: 'Account created successfully',
      user: newUser
    };
    
  } catch (error) {
    console.error('Registration error:', error);
    const apiError = error as APIError;
    
    // Handle specific API error messages
    if (apiError.errors) {
      const errorMessages = Object.entries(apiError.errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('; ');
      return { success: false, message: errorMessages };
    }
    
    return { 
      success: false, 
      message: apiError.message || 'An error occurred during registration. Please try again.' 
    };
  }
};

/**
 * Authenticates user login with validation and security checks
 */
export const loginUser = async (loginData: LoginData): Promise<AuthResponse> => {
  try {
    // Input validation
    if (!validateEmail(loginData.email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }
    
    if (!loginData.password) {
      return { success: false, message: 'Password is required' };
    }

    // Make API request
    const response = await apiClient<{ access: string; refresh: string }>({
      method: 'POST',
      endpoint: API_ENDPOINTS.login,
      data: {
        username: loginData.email,  // API expects username field
        password: loginData.password
      }
    });
    
    if (response.access && response.refresh) {
      // Store tokens
      localStorage.setItem('authToken', response.access);
      localStorage.setItem('refreshToken', response.refresh);

      // Get user profile
      const userProfile = await apiClient<User>({
        method: 'GET',
        endpoint: API_ENDPOINTS.profile,
        requiresAuth: true
      });

      return {
        success: true,
        message: 'Login successful',
        user: userProfile
      };
    }

    return {
      success: false,
      message: 'Authentication failed'
    };
  } catch (error) {
    const apiError = error as APIError;
    return {
      success: false,
      message: apiError.message || 'An error occurred during login'
    };
  }
};




/**
 * Logs out user (in a real app, you might want to blacklist the token)
 */
export const logoutUser = (): { success: boolean; message: string } => {
  // In a real application, you might want to:
  // 1. Add the token to a blacklist
  // 2. Clear server-side session data
  // 3. Log the logout event
  
  return {
    success: true,
    message: 'Logged out successfully'
  };
};

