import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DefaultApi } from '../../lib/rick-and-morty-api-client';
import type { SerializedCharacter } from '../loaders/CharacterLoader';
import type { AppError } from '../types/types';
import { ErrorTypes } from '../types/types';
import { debounce } from '../utils/debounce';
import { handleError } from '../utils/errorHandling';

const DEBOUNCE_TIME = 300;
const PAGE_SIZE = 20;
const MESSAGE_NO_RESULTS = 'Search returned no results, you can check out these instead';

interface UseCharacterSearchResult {
  searchTerm: string;
  isLoading: boolean;
  error: AppError | null;
  characters: SerializedCharacter[];
  handleSearch: (value: string) => void;
  hasMore: boolean;
  loadMore: () => void;
}

export function useCharacterSearch(): UseCharacterSearchResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [characters, setCharacters] = useState<SerializedCharacter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchTerm = searchParams.get('search') || '';

  const fetchRandomCharacters = useCallback(async () => {
    const api = new DefaultApi();
    const randomPage = Math.floor(Math.random() * totalPages) + 1;
    const response = await api.fetchAllCharacters({ page: randomPage });

    const serializedCharacters = response.results?.map((character) => ({
      ...character,
      created: character.created?.toISOString(),
    })) as SerializedCharacter[];

    setCharacters(serializedCharacters);
  }, [totalPages]);

  const fetchCharacters = useCallback(
    async (query: string, page: number, append = false) => {
      setIsLoading(true);
      setError(null);

      try {
        const api = new DefaultApi();
        const response = await api.fetchAllCharacters({
          name: query || undefined,
          page,
        });

        setTotalPages(response.info?.pages ?? 1);

        const serializedCharacters = response.results?.map((character) => ({
          ...character,
          created: character.created?.toISOString(),
        })) as SerializedCharacter[];

        setCharacters((prev) =>
          append ? [...prev, ...serializedCharacters] : serializedCharacters,
        );

        setHasMore((response.results?.length ?? 0) === PAGE_SIZE && response.info?.next !== null);
      } catch (error: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any).response?.status === 404) {
          setError({
            message: MESSAGE_NO_RESULTS,
            type: ErrorTypes.API,
            timestamp: new Date().toISOString(),
          });
          setHasMore(false);

          await fetchRandomCharacters();
        } else {
          setError(handleError(error, ErrorTypes.API));
          setHasMore(false);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchRandomCharacters],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce<(query: string) => Promise<void>>((query: string) => {
      setCurrentPage(1);
      return fetchCharacters(query, 1);
    }, DEBOUNCE_TIME),
    [fetchCharacters],
  );

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCharacters(searchTerm, nextPage, true).catch((error) => {
        setError(handleError(error, ErrorTypes.API));
      });
    }
  }, [currentPage, fetchCharacters, hasMore, isLoading, searchTerm]);

  useEffect(() => {
    debouncedFetch(searchTerm);
  }, [searchTerm, debouncedFetch]);

  const handleSearch = useCallback(
    (value: string) => {
      if (value) {
        setSearchParams({ search: value });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams],
  );

  return {
    searchTerm,
    isLoading,
    error,
    characters,
    handleSearch,
    hasMore,
    loadMore,
  };
}
