import { http } from "./http";

export type MenuItem = {
    name: string;
    content: string;
    icon?: string;
};

export const menuApi = {
    getByRole: (roleId: string): Promise<MenuItem[]> => {
        return http<MenuItem[]>(`/api/menu/${roleId}`);
    },
};
