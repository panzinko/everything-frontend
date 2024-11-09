import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ErrorTypes } from './types/types';
import { createError } from './utils/errorHandling';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const appError = createError(
        ErrorTypes.GENERAL,
        'Something went wrong. Please try refreshing the page.',
      );

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <ErrorDisplay
              error={appError}
              onDismiss={() => this.setState({ hasError: false, error: null })}
            />
            <button
              onClick={() => window.location.reload()}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
