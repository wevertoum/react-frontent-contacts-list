import { useQuery } from "@tanstack/react-query";
import * as api from "./contacts.api";

export const contactsKeys = {
	all: ["contacts"] as const,
	lists: () => [...contactsKeys.all, "list"] as const,
	list: (filters: string) => [...contactsKeys.lists(), { filters }] as const,
	details: () => [...contactsKeys.all, "detail"] as const,
	detail: (id: string) => [...contactsKeys.details(), id] as const,
};

export const useContacts = () => {
	return useQuery({
		queryKey: contactsKeys.lists(),
		queryFn: api.getContacts,
	});
};

export const useContactById = (id: string) => {
	return useQuery({
		queryKey: contactsKeys.detail(id),
		queryFn: () => api.getContactById(id),
		enabled: !!id,
	});
};
