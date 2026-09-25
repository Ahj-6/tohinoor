import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

import api from '../services/api.js';
import { getRoleName, isAdminPanelRole } from './roles.js';

const TOKEN_KEY = 'tohinoor_token';
const USER_KEY = 'tohinoor_user';

const AuthContext = createContext(null);

const readStoredUser = () => {
    try {
        const raw = sessionStorage.getItem(USER_KEY);

        return raw ? JSON.parse(raw) : null;
    } catch {
        sessionStorage.removeItem(USER_KEY);

        return null;
    }
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(readStoredUser);

    const clearAuth = useCallback(() => {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);

        setUser(null);
    }, []);

    const storeAuth = useCallback((nextUser, token) => {
        sessionStorage.setItem(TOKEN_KEY, token);
        sessionStorage.setItem(
            USER_KEY,
            JSON.stringify(nextUser),
        );

        setUser(nextUser);
    }, []);

    const login = useCallback(
        async (username, password) => {
            const response = await api.post('/login', {
                username,
                password,
            });

            const {
                token,
                user: nextUser,
            } = response.data;

            if (!token || !nextUser) {
                throw new Error(
                    'پاسخ Login نامعتبر است.',
                );
            }

            storeAuth(nextUser, token);

            return nextUser;
        },
        [storeAuth],
    );

    const logout = useCallback(async () => {
        try {
            const token =
                sessionStorage.getItem(TOKEN_KEY);

            if (token) {
                await api.post('/logout');
            }
        } catch {
            /*
             * حتی در صورت خطای API،
             * Session سمت Client باید پاک شود.
             */
        } finally {
            clearAuth();
        }
    }, [clearAuth]);

    const refreshUser = useCallback(async () => {
        const storedUser = readStoredUser();
        const token = sessionStorage.getItem(TOKEN_KEY);

        if (!token || !storedUser) {
            clearAuth();

            return null;
        }

        setUser(storedUser);

        return storedUser;
    }, [clearAuth]);

    const roleName = user
        ? getRoleName(user.role_id)
        : null;

    const canAccessAdminPanel = user
        ? isAdminPanelRole(user.role_id)
        : false;

    const value = useMemo(
        () => ({
            user,

            /*
             * فعلاً Authentication از روی
             * Session موجود در Browser مشخص می‌شود.
             */
            loading: false,

            isAuthenticated: Boolean(
                user &&
                sessionStorage.getItem(TOKEN_KEY),
            ),

            roleName,
            canAccessAdminPanel,

            login,
            logout,
            refreshUser,
        }),
        [
            user,
            roleName,
            canAccessAdminPanel,
            login,
            logout,
            refreshUser,
        ],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used inside AuthProvider',
        );
    }

    return context;
};