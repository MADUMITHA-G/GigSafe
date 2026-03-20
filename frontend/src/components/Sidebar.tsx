
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Users, CircleDollarSign, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Fraud Risk Map', icon: Map, path: '/map' },
  { name: 'Claim & Worker Manager', icon: Users, path: '/manager' },
  { name: 'Payout Dashboard', icon: CircleDollarSign, path: '/payout' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen border-r border-[#3f3f4666] bg-[#18181b99] backdrop-blur-xl flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
          GigSafe
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? 'text-white font-medium bg-white/5'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : ''}`} />
                  {item.name}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-6 border-t border-[#3f3f4666]">
        <div className="text-xs text-zinc-500 mb-2 font-mono uppercase tracking-wider">System Status</div>
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-sm text-zinc-300">Operational</span>
        </div>
      </div>
    </aside>
  );
};
