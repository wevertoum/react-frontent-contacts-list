import { useQuery } from "@tanstack/react-query";
import * as api from "./users.api";

export const usersKeys = {
	all: ["users"] as const,
	lists: () => [...usersKeys.all, "list"] as const,
	list: (filters: string) => [...usersKeys.lists(), { filters }] as const,
	details: () => [...usersKeys.all, "detail"] as const,
	detail: (id: string) => [...usersKeys.details(), id] as const,
};

export const useUsers = () => {
	return useQuery({
		queryKey: usersKeys.lists(),
		queryFn: api.getUsers,
	});
};

export const useUserById = (id: string) => {
	return useQuery({
		queryKey: usersKeys.detail(id),
		queryFn: () => api.getUserById(id),
		enabled: !!id,
	});
};
