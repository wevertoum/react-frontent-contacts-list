import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCharacters } from './characters.api';

const charactersKeys = {
  all: ['characters'] as const,
  infiniteLists: () => [...charactersKeys.all, 'infiniteList'] as const,
};

const RICK_AND_MORTY_API_URL = 'https://rickandmortyapi.com/api/character';

export const useInfiniteCharacters = (name: string) => {
  return useInfiniteQuery({
    queryKey: [...charactersKeys.infiniteLists(), name],
    queryFn: ({ pageParam }) => fetchCharacters(pageParam),
    initialPageParam: `${RICK_AND_MORTY_API_URL}?name=${name}`,
    getNextPageParam: (lastPage) => lastPage.info.next,
    enabled: true,
  });
};
