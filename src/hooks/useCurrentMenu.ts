import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { menuApi, type MenuItem } from "../api/menu";

const keys = {
    all: (roleId: string | null) => [{ scope: "menu", roleId }] as const,
};

export function useCurrentMenu() {
    const { user } = useAuth();
    const roleId = user?.role || null;

    return useQuery<MenuItem[]>({
        queryKey: keys.all(roleId),
        queryFn: () => {
            if (!roleId) {
                return Promise.resolve([]);
            }
            return menuApi.getByRole(roleId);
        },
        enabled: !!roleId,
    });
}
