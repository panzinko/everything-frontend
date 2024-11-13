import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SearchInput } from '../components/SearchInput';
import { useCharacterSearch } from '../hooks/useCharacterSearch';
import { useInfiniteScroll } from '../hooks/useInifiniteScroll';
import type { SerializedCharacter } from '../loaders/CharacterLoader';
import { addToBookmarks, removeFromBookmarks } from '../store/bookmarkSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Characters = () => {
  const { searchTerm, isLoading, error, characters, handleSearch, loadMore, hasMore } =
    useCharacterSearch();

  const infiniteScrollRef = useInfiniteScroll(loadMore, !isLoading && hasMore);

  const dispatch = useAppDispatch();
  const bookmarksItems = useAppSelector((state) => state.bookmarks.items);

  const handleAddToBookmarks = (character: SerializedCharacter) => {
    const isInBookmarks = bookmarksItems.some((item) => item.id === character.id);

    if (isInBookmarks) {
      dispatch(removeFromBookmarks(character.id!));
    } else {
      dispatch(addToBookmarks(character));
    }
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4">
          <SearchInput value={searchTerm} onChange={handleSearch} />
        </div>
      </div>

      {error && (
        <div
          className={`p-4 rounded-lg ${
            error.message.includes('no results')
              ? 'bg-yellow-50 text-yellow-700'
              : 'bg-red-50 text-red-500'
          }`}
        >
          {error.message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-4" data-testid="characters-list">
        <p className="font-bold mb-4">Select a character:</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((character) => (
            <li key={character.id}>
              <div className="border border-gray-100 rounded-md hover:border-blue-200 p-4">
                <div className="flex flex-row items-center justify-between">
                  <Link
                    to={`character/${character.id}`}
                    data-testid={`character-link-${character.id}`}
                    className="flex flex-row items-center space-x-2"
                  >
                    <img
                      src={character.image}
                      alt={`${character.name} - Profile Image`}
                      className="w-10 h-10 rounded-full"
                    />
                    <p>{character.name}</p>
                  </Link>
                  <button
                    onClick={() => handleAddToBookmarks(character)}
                    className={`w-8 h-8 flex items-center justify-center border border-black rounded-full transition-colors
                    ${
                      bookmarksItems.some((item) => item.id === character.id)
                        ? 'bg-white text-blue-500 hover:text-blue-300 !border-blue-500 hover:!border-blue-300'
                        : 'hover:text-blue-300 hover:border-blue-300'
                    }`}
                    data-testid={`add-to-bookmarks-${character.id}`}
                    title="Add to bookmarks"
                  >
                    {bookmarksItems.some((item) => item.id === character.id) ? (
                      <StarIconSolid className="h-6 w-6" />
                    ) : (
                      <StarIconOutline className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div ref={infiniteScrollRef} className="py-4 text-center" style={{ minHeight: '20px' }}>
            {isLoading && <LoadingSpinner />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;
