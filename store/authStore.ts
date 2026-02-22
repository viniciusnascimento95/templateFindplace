import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'ORGANIZER' | 'VENUE_OWNER' | 'ADMIN';

export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
}

interface AuthState {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,

            login: (user, token) => {
                set({ user, token });
            },

            logout: () => {
                set({ user: null, token: null });
                if (typeof window !== 'undefined') {
                    // Clear localStorage on logout just to be sure
                    localStorage.removeItem('auth-storage');
                }
            },

            setToken: (token) => {
                set({ token });
            },
        }),
        {
            name: 'auth-storage', // The name of the key in localStorage
        }
    )
);
