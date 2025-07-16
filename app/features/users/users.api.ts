import { api } from "~/lib/axios";
import type { User } from "~/types";

export const getUsers = async (): Promise<User[]> => {
	const { data } = await api.get("/users");
	return data;
};

export const getUserById = async (id: string): Promise<User> => {
	const { data } = await api.get(`/users/${id}`);
	return data;
};
