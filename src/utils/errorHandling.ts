import { ErrorTypes, type AppError, type ErrorType } from '../types/types';

export const handleError = (error: unknown, type: ErrorType): AppError => {
  console.error(`${type} Error:`, error);

  if (error instanceof Error) {
    return createError(type, error.message);
  }

  if (typeof error === 'string') {
    return createError(type, error);
  }

  return createError(type, 'An unexpected error occurred. Please try again later.');
};

export const getErrorMessage = (error: AppError): string => {
  switch (error.type) {
    case ErrorTypes.API:
      return `Failed to load data: ${error.message}`;
    case ErrorTypes.STORAGE:
      return `Storage error: ${error.message}`;
    case ErrorTypes.GENERAL:
      return error.message;
    default:
      return 'An unexpected error occurred';
  }
};

export const createError = (type: ErrorType, message: string, code?: string): AppError => ({
  type,
  message,
  code,
  timestamp: new Date().toISOString(),
});
