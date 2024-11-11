import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DefaultApi } from '../../lib/rick-and-morty-api-client';
import type { SerializedCharacter } from '../loaders/CharacterLoader';
import type { AppError } from '../types/types';
import { ErrorTypes } from '../types/types';
import { debounce } from '../utils/debounce';
import { handleError } from '../utils/errorHandling';

interface UseCharacterSearchResult {
  searchTerm: string;
  isLoading: boolean;
  error: AppError | null;
  characters: SerializedCharacter[];
  handleSearch: (value: string) => void;
}

export function useCharacterSearch(): UseCharacterSearchResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [characters, setCharacters] = useState<SerializedCharacter[]>([]);

  const searchTerm = searchParams.get('search') || '';

  const fetchCharacters = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const api = new DefaultApi();
      const response = await api.fetchAllCharacters({
        name: query || undefined,
      });

      const serializedCharacters = response.results?.map((character) => ({
        ...character,
        created: character.created?.toISOString(),
      })) as SerializedCharacter[];

      setCharacters(serializedCharacters);
    } catch (error) {
      setError(handleError(error, ErrorTypes.API));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback(
    debounce<(query: string) => Promise<void>>((query: string) => fetchCharacters(query), 300),
    [fetchCharacters],
  );

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
  };
}
