import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useBookmarks } from '../context/BookmarksContext';
import { useAppSelector } from '../store/hooks';

export const BookmarksIndicator = () => {
  const bookmarksItems = useAppSelector((state) => state.bookmarks.items);
  const { toggleBookmarks } = useBookmarks();

  return (
    <button onClick={toggleBookmarks} className="relative inline-flex items-center">
      <BookmarkIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
      {bookmarksItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {bookmarksItems.length}
        </span>
      )}
    </button>
  );
};
