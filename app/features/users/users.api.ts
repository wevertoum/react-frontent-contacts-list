import { api } from '~/lib/axios';
import type { CreateUserPayload, User } from '~/types';

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/users');
  return data;
};

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  const { data } = await api.post('/users', payload);
  return data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/users/${userId}`);
};
