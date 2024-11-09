import { useBookmarks } from '../context/BookmarksContext';
import { clearError, removeFromBookmarks } from '../store/bookmarkSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ErrorDisplay } from './ErrorDisplay';

export const BookmarksSidebar = () => {
  const dispatch = useAppDispatch();
  const { items, error } = useAppSelector((state) => state.bookmarks);
  const { isOpen, closeBookmarks } = useBookmarks();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'bg-opacity-50 z-40' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={closeBookmarks}
      />

      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Bookmarks</h2>
          <button onClick={closeBookmarks} className="p-2 hover:bg-gray-100 rounded-full">
            ✕
          </button>
        </div>

        {/* Error notification */}
        {error && <ErrorDisplay error={error} onDismiss={() => dispatch(clearError())} />}

        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Your bookmarks are empty</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromBookmarks(item.id!))}
                    className="text-gray-400 hover:text-gray-600"
                    title="Remove from bookmarks"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
