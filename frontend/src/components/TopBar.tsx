
import { Bell, MapPin, User, AlertCircle, PlayCircle, FastForward, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const TopBar: React.FC = () => {
  const { rainfallEventActive, simulationState, setSimulationState, workers, selectedCity, setSelectedCity } = useStore();

  const fraudAlertsCount = workers.filter(w => w.riskScore === 'HIGH' || w.clusterStatus).length;

  const handleStateCycle = () => {
    if (simulationState === 'BEFORE') setSimulationState('DURING');
    else if (simulationState === 'DURING') setSimulationState('AFTER');
    else setSimulationState('BEFORE');
  };

  const getSimIcon = () => {
    if (simulationState === 'BEFORE') return <PlayCircle className="w-4 h-4" />;
    if (simulationState === 'DURING') return <FastForward className="w-4 h-4" />;
    return <CheckCircle2 className="w-4 h-4" />;
  };

  const getSimText = () => {
    if (simulationState === 'BEFORE') return 'Simulate Rainfall';
    if (simulationState === 'DURING') return 'Complete Event';
    return 'Reset Simulation';
  };

  return (
    <header className="h-20 border-b border-[#3f3f4666] bg-[#18181b99] backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-30 ml-64">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
          <MapPin className="w-4 h-4 text-indigo-400" />
          <select 
            className="bg-transparent text-sm text-zinc-200 outline-none cursor-pointer appearance-none pr-4"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="All India Districts" className="bg-zinc-900">All India Districts</option>
            <option value="Mumbai" className="bg-zinc-900">Mumbai</option>
            <option value="Delhi" className="bg-zinc-900">Delhi</option>
            <option value="Bangalore" className="bg-zinc-900">Bangalore</option>
          </select>
        </div>

        <AnimatePresence mode="popLayout">
          {rainfallEventActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Rainfall Event Active
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6">
        {/* Simulation Controls */}
        <div className="flex items-center gap-3 mr-6 border-r border-zinc-800 pr-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono mb-1">State</span>
            <span className="text-sm font-bold text-zinc-200">{simulationState}</span>
          </div>
          <button
            onClick={handleStateCycle}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 hover:from-indigo-600 to-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
          >
            {getSimIcon()}
            {getSimText()}
          </button>
        </div>

        <div className="relative">
          <Bell className="w-5 h-5 text-zinc-400 hover:text-white transition-colors cursor-pointer" />
          <AnimatePresence>
            {fraudAlertsCount > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
              >
                {fraudAlertsCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {fraudAlertsCount > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-xs font-semibold"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {fraudAlertsCount} Fraud Alerts
          </motion.div>
        )}

        <div className="flex items-center gap-3 pl-6 border-l border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center border border-zinc-500 shadow-inner">
            <User className="w-4 h-4 text-zinc-200" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white leading-tight">Admin</span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">GigSafe HQ</span>
          </div>
        </div>
      </div>
    </header>
  );
};
