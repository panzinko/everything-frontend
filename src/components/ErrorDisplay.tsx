import { ErrorTypes, type AppError } from '../types/types';
import { getErrorMessage } from '../utils/errorHandling';

interface ErrorDisplayProps {
  error: AppError;
  onDismiss?: () => void;
}

export const ErrorDisplay = ({ error, onDismiss }: ErrorDisplayProps) => {
  const message = getErrorMessage(error);
  const getBackgroundColor = () => {
    switch (error.type) {
      case ErrorTypes.API:
        return 'bg-yellow-50';
      case ErrorTypes.STORAGE:
        return 'bg-red-50';
      default:
        return 'bg-orange-50';
    }
  };

  return (
    <div className={`p-4 ${getBackgroundColor()} rounded-md mb-4 animate-fadeIn`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">{message}</p>
          {error.code && <p className="text-xs text-gray-500 mt-1">Error code: {error.code}</p>}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-2 text-gray-400 hover:text-gray-600 p-1"
            title="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
