import { createContext, ReactNode, useContext, useState } from 'react';

interface BookmarksContextType {
  isOpen: boolean;
  openBookmarks: () => void;
  closeBookmarks: () => void;
  toggleBookmarks: () => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookmarks = () => setIsOpen(true);
  const closeBookmarks = () => setIsOpen(false);
  const toggleBookmarks = () => setIsOpen((prev) => !prev);

  return (
    <BookmarksContext.Provider value={{ isOpen, openBookmarks, closeBookmarks, toggleBookmarks }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
}
