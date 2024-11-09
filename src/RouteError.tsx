import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { ErrorDisplay } from './components/ErrorDisplay';
import type { AppError } from './types/types';
import { createError } from './utils/errorHandling';

export const RouteError = () => {
  const error = useRouteError();
  let appError: AppError;

  if (isRouteErrorResponse(error)) {
    // Handle known route errors
    appError = createError('API', error.statusText || 'Page not found', error.status.toString());
  } else if (error instanceof Error) {
    // Handle other errors
    appError = createError('GENERAL', error.message);
  } else {
    // Handle unknown errors
    appError = createError('GENERAL', 'An unexpected error occurred');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-4">
        <ErrorDisplay error={appError} />
        <div className="text-center space-y-4">
          <p className="text-gray-600">Don&apos;t worry, you can try one of these:</p>

          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Go to Home Page
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
