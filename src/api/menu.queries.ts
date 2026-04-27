import { useQuery } from "@tanstack/react-query";
import { menuApi, type MenuItem } from "./menu";

const keys = {
    all: (roleId: string) => [{ scope: "menu", roleId }] as const,
};

export function useMenu(roleId: string) {
    return useQuery<MenuItem[]>({
        queryKey: keys.all(roleId),
        queryFn: () => menuApi.getByRole(roleId),
        enabled: !!roleId,
    });
}
