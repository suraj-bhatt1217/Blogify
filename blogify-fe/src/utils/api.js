// API utility for consistent API URL handling

/**
 * Get the API URL from environment variable or use fallback
 * Ensures the URL has a protocol (https:// or http://)
 */
export const getApiUrl = () => {
  let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  // Remove any whitespace
  apiUrl = apiUrl.trim();
  
  // If no protocol is specified, add https:// for production, http:// for localhost
  if (!apiUrl.match(/^https?:\/\//)) {
    if (apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1') || apiUrl.startsWith('192.168.')) {
      apiUrl = `http://${apiUrl}`;
    } else {
      // For Vercel or any other production domain, use https://
      apiUrl = `https://${apiUrl}`;
    }
  }
  
  // Remove trailing slash
  apiUrl = apiUrl.replace(/\/$/, '');
  
  return apiUrl;
};

/**
 * Normalize API URL to avoid duplication
 * If apiUrl is '/api', use empty string to prevent duplication
 */
export const getNormalizedApiUrl = () => {
  const apiUrl = getApiUrl();
  
  // If apiUrl is '/api', use empty string to prevent duplication
  if (apiUrl === '/api') {
    return '';
  }
  
  return apiUrl;
};

/**
 * Make API request with proper URL construction
 */
export const apiRequest = async (method, endpoint, data = null, headers = {}) => {
  const baseUrl = getNormalizedApiUrl();
  const url = `${baseUrl}${endpoint}`;
  
  console.log(`API ${method.toUpperCase()} Request:`, url);
  
  const config = {
    method,
    url,
    headers,
    ...(data && { data })
  };
  
  return config;
};

