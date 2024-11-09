export interface Config {
  appVersion: string;
  openWeatherApiKey: string;
}

export type CharacterRouteParams = { params: { id: string } };

export type ErrorType = 'API' | 'STORAGE' | 'GENERAL';

export const ErrorTypes: Record<ErrorType, ErrorType> = {
  API: 'API',
  STORAGE: 'STORAGE',
  GENERAL: 'GENERAL',
};

export interface AppError {
  type: ErrorType;
  message: string;
  timestamp: string;
  code?: string;
}
