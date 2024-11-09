import { ErrorTypes } from '../types/types';
import { handleError } from '../utils/errorHandling';

export const storage = {
  save: <T>(key: string, data: T): void => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      throw handleError(error, ErrorTypes.STORAGE);
    }
  },

  load: <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return fallback;
      }
      return JSON.parse(item);
    } catch (error) {
      throw handleError(error, ErrorTypes.STORAGE);
    }
  },
};
