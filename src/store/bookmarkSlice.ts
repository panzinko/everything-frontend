import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SerializedCharacter } from '../loaders/CharacterLoader';
import type { AppError } from '../types/types';
import { storage } from './localStorage';

interface BookmarksState {
  items: SerializedCharacter[];
  error: AppError | null;
}

const STORAGE_KEY = 'bookmarks';

const loadState = (): BookmarksState => {
  try {
    return {
      items: storage.load(STORAGE_KEY, []),
      error: null,
    };
  } catch (error) {
    const appError = error as AppError;
    return {
      items: [],
      error: appError,
    };
  }
};

const initialState: BookmarksState = loadState();

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addToBookmarks: (state, action: PayloadAction<SerializedCharacter>) => {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
      state.error = null;
    },
    removeFromBookmarks: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.error = null;
    },
    setError: (state, action: PayloadAction<AppError>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addToBookmarks, removeFromBookmarks, setError, clearError } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
