import { configureStore } from '@reduxjs/toolkit';
import type { AppError } from '../types/types';
import bookmarksReducer, { setError } from './bookmarkSlice';
import { storage } from './localStorage';

const STORAGE_KEY = 'bookmarks';

export const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['bookmarks.error'],
      },
    }),
});

export const saveBookmarksState = (state: ReturnType<typeof store.getState>['bookmarks']) => {
  try {
    storage.save(STORAGE_KEY, state.items);
  } catch (error) {
    const appError = error as AppError;
    // Only dispatch error if it's not already the same error
    if (!state.error || state.error.timestamp !== appError.timestamp) {
      store.dispatch(setError(appError));
    }
  }
};

// Debounce the save operation to prevent too frequent storage writes
let saveTimeout: NodeJS.Timeout;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const state = store.getState();
    // Only save if there's no error state
    if (!state.bookmarks.error) {
      saveBookmarksState(state.bookmarks);
    }
  }, 1000);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
