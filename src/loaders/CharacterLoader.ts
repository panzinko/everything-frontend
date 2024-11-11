import type { Character } from '../../lib/rick-and-morty-api-client';
import { DefaultApi } from '../../lib/rick-and-morty-api-client';
import { CharacterRouteParams, ErrorTypes } from '../types/types';
import { handleError } from '../utils/errorHandling';

export type SerializedCharacter = Omit<Character, 'created'> & {
  created?: string;
};

export async function fetchCharacters() {
  try {
    const api = new DefaultApi();
    const response = await api.fetchAllCharacters();
    // return { characters: getTopCharacters(response.results!, 5) };

    console.log(response);

    // serialize the characters
    const serializedCharacters = response.results?.map((character) => ({
      ...character,
      created: character.created?.toISOString(),
    }));

    return { characters: serializedCharacters as SerializedCharacter[] };
  } catch (error) {
    throw handleError(error, ErrorTypes.API);
  }
}

export async function fetchCharacter({ params }: CharacterRouteParams) {
  try {
    const api = new DefaultApi();
    return await api.fetchSingleCharacter({ id: parseInt(params.id) });
  } catch (error) {
    throw handleError(error, ErrorTypes.API);
  }
}
