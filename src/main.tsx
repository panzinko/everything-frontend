import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { BookmarksSidebar } from './components/BookmarksSidebar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { BookmarksProvider } from './context/BookmarksContext';
import { ConfigProvider } from './context/ConfigContext';
import { ErrorBoundary } from './ErrorBoundry';
import { fetchCharacter, fetchCharacters } from './loaders/CharacterLoader';
import { RouteError } from './RouteError';
import { store } from './store/store';
import { CharacterRouteParams } from './types/types';

const Characters = lazy(() => import('./pages/Characters'));
const CharacterDetails = lazy(() => import('./pages/CharacterDetails'));

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        loader: fetchCharacters,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Characters />
          </Suspense>
        ),
        errorElement: <RouteError />,
      },
      {
        path: 'character/:id',
        loader: async ({ params }) => {
          return fetchCharacter({ params } as CharacterRouteParams);
        },
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CharacterDetails />
          </Suspense>
        ),
        errorElement: <RouteError />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ConfigProvider>
        <Provider store={store}>
          <BookmarksProvider>
            <RouterProvider router={router} />
            <BookmarksSidebar />
          </BookmarksProvider>
        </Provider>
      </ConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
