import { http } from "./http";

export type AuthUser = {
    username: string;
    role: string;
    token: string;
};

type AuthRequest = {
    username: string;
    password: string;
    role?: string; // Para registro
};

export const authApi = {
    register: async (credentials: AuthRequest): Promise<AuthUser> => {
        const response = await http<{ token: string; username: string; role: string }>(
            "/api/auth/register",
            {
                method: "POST",
                body: JSON.stringify(credentials),
            }
        );
        return {
            token: response.token,
            username: response.username,
            role: response.role,
        };
    },

    login: async (credentials: AuthRequest): Promise<AuthUser> => {
        const response = await http<{ token: string; username: string; role: string }>(
            "/api/auth/login",
            {
                method: "POST",
                body: JSON.stringify(credentials),
            }
        );
        return {
            token: response.token,
            username: response.username,
            role: response.role,
        };
    },
};
