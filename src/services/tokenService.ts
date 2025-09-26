const API_BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN_TYPE = import.meta.env.VITE_AUTHORIZATION_TOKEN_TYPE;

let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/jwt/verify/`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    return response.ok;
  } catch {
    return false;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/jwt/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh: refreshToken })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('authToken', data.access);
      return data.access;
    }
    
    return null;
  } catch {
    return null;
  }
};

export const getValidToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem('authToken');
  
  if (!accessToken) {
    return null;
  }

  const isValid = await verifyToken(accessToken);
  
  if (isValid) {
    return accessToken;
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const newToken = await refreshAccessToken();
    
    if (newToken) {
      processQueue(null, newToken);
      return newToken;
    } else {
      processQueue(new Error('Token refresh failed'), null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return null;
    }
  } catch (error) {
    processQueue(error, null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return null;
  } finally {
    isRefreshing = false;
  }
};

export const apiWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = await getValidToken();
  
  if (!token) {
    throw new Error('No valid token available');
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `${TOKEN_TYPE} ${token}`,
      'Content-Type': 'application/json'
    }
  });
};