import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

// Request interceptor to attach token
api.interceptors.request.use(
    (config) => {
        // Determine where we are storing the token. Usually localStorage for web.
        // However, in Next.js SSR, localStorage is not available, so we check for window.
        if (typeof window !== 'undefined') {
            const authStorage = localStorage.getItem('auth-storage');
            if (authStorage) {
                try {
                    const { state } = JSON.parse(authStorage);
                    if (state.token) {
                        config.headers.Authorization = `Bearer ${state.token}`;
                    }
                } catch (error) {
                    console.error('Failed to parse auth token from storage:', error);
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling common errors like 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                // Optional: Trigger a logout action here if needed or clear storage
                // localStorage.removeItem('auth-storage');
                // window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
