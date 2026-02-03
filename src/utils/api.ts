const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Constructs a full API URL.
 * @param path - The API endpoint path (e.g., '/api/darshan')
 * @returns Full URL (e.g., 'https://backend.com/api/darshan')
 */
export const getApiUrl = (path: string) => {
    // Determine base URL. If local, it's empty string (relative path).
    // If production, it's the env var (e.g. https://my-backend.onrender.com)

    // Normalize: ensure base doesn't end with slash, path starts with slash
    const base = API_BASE_URL.replace(/\/$/, '');
    const endpoint = path.startsWith('/') ? path : `/${path}`;

    return `${base}${endpoint}`;
};

// Simple helper for those who just want the base string
export const API_URL = API_BASE_URL;
