import { api } from "~/lib/axios";
import type { Contact } from "~/types";

export const getContacts = async (): Promise<Contact[]> => {
	const { data } = await api.get("/contacts");
	return data;
};

export const getContactById = async (id: string): Promise<Contact> => {
	const { data } = await api.get(`/contacts/${id}`);
	return data;
};
