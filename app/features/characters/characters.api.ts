import { api } from '~/lib/axios';
import type { Character } from '~/types';

interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersApiResponse {
  info: ApiInfo;
  results: Character[];
}

export const fetchCharacters = async (
  pageUrl: string,
): Promise<CharactersApiResponse> => {
  const { data } = await api.get(pageUrl);
  return data;
};
