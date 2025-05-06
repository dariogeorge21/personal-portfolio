import Cookies from 'js-cookie';

// Token management
export const setToken = (token: string) => {
  Cookies.set('auth_token', token, { expires: 1 }); // Expires in 1 day
};

export const getToken = () => {
  return Cookies.get('auth_token');
};

export const removeToken = () => {
  Cookies.remove('auth_token');
};

// Authentication status
export const isAuthenticated = () => {
  return !!getToken();
};

// Login function
export const login = async (username: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    setToken(data.token);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Logout function
export const logout = () => {
  removeToken();
  window.location.href = '/admin/login';
};

// API request with authentication
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    ...options,
    headers,
  });
};
