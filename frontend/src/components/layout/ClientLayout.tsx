import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export function ClientLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
