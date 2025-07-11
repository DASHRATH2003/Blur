import axios from 'axios';

const api = axios.create({
  baseURL: window.location.origin.includes('localhost') ? 'http://localhost:5000' : window.location.origin,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  },
  // Add retry configuration
  retry: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // time interval between retries
  }
});

// Create a custom event for auth errors
export const AUTH_ERROR_EVENT = 'auth_error';

// Add retry logic
api.interceptors.response.use(undefined, async (err) => {
  const { config } = err;
  if (!config || !config.retry) {
    return Promise.reject(err);
  }

  // Don't retry on 401 errors
  if (err.response?.status === 401) {
    return Promise.reject(err);
  }

  config.__retryCount = config.__retryCount || 0;

  if (config.__retryCount >= config.retry) {
    return Promise.reject(err);
  }

  config.__retryCount += 1;

  // Create new promise to handle backoff
  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay(config.__retryCount));
  });

  // Return promise that retries the request
  await backoff;
  return await api(config);
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add request timestamp for timeout tracking
    config.metadata = { startTime: new Date() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata.startTime;
    console.debug(`Request to ${response.config.url} took ${duration}ms`);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Only clear token and dispatch event if we have a token
        // This prevents unnecessary events during already logged-out state
        if (localStorage.getItem('userToken')) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('user');
          // Dispatch custom event instead of direct navigation
          window.dispatchEvent(new CustomEvent(AUTH_ERROR_EVENT));
        }
      }
      
      // Log detailed error information
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        url: error.config.url,
        method: error.config.method
      });
    } else if (error.request) {
      // Request was made but no response
      console.error('Network Error:', {
        request: error.request,
        config: error.config
      });
    } else {
      // Something happened in setting up the request
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 