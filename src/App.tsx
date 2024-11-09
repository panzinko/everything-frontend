import { Outlet } from 'react-router-dom';
import { BookmarksIndicator } from './components/BookmarksIndicator';

const App = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold">🚀 Rick and Morty - Fan Service</h1>
          <BookmarksIndicator />
          {/* <Suspense fallback={<div className="animate-pulse">Loading weather...</div>}>
            <WeatherWidget />
          </Suspense> */}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
