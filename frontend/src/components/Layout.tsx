
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full min-h-screen relative font-sans">
        <TopBar />
        <main className="flex-1 p-8 ml-64 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
