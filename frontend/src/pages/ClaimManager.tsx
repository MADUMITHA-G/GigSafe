import { useState } from 'react';
import { useStore, type WorkerInfo } from '../store/useStore';
import { Eye, ShieldAlert, WifiOff, FileSearch, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ClaimManager: React.FC = () => {
  const { workers } = useStore();
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedWorker, setSelectedWorker] = useState<WorkerInfo | null>(null);

  const zones = ['All', ...Array.from(new Set(workers.map(w => w.zone)))];
  const risks = ['All', 'LOW', 'MEDIUM', 'HIGH'];

  const filteredWorkers = workers.filter(w => {
    if (selectedZone !== 'All' && w.zone !== selectedZone) return false;
    if (selectedRisk !== 'All' && w.riskScore !== selectedRisk) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border-b-2 border-b-indigo-500/20">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">Claim & Worker Manager</h2>
          <p className="text-zinc-400 text-sm mt-1">Review parametric claims, inspect worker behavior, and analyze AI risk assessments.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs uppercase text-zinc-500 font-bold mb-1 tracking-wider">Filter by Zone</span>
            <select 
              value={selectedZone}
              onChange={e => setSelectedZone(e.target.value)}
              className="bg-black/40 text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none focus:border-indigo-500 transition-colors w-40"
            >
              {zones.map(z => <option key={z} className="bg-zinc-900">{z}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase text-zinc-500 font-bold mb-1 tracking-wider">Filter by Risk</span>
            <select 
              value={selectedRisk}
              onChange={e => setSelectedRisk(e.target.value)}
              className="bg-black/40 text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none focus:border-indigo-500 transition-colors w-40"
            >
              {risks.map(r => <option key={r} className="bg-zinc-900">{r}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl">
        <div className="overflow-x-auto rounded-xl border border-zinc-800/50">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-black/20 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Worker ID</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Name & Zone</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Movement</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Network</th>
                <th className="px-6 py-4 font-semibold tracking-wider border-l border-zinc-800/50">Risk Score</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-center">Cluster</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Decision</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Amount</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredWorkers.map(w => (
                <tr key={w.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{w.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{w.name}</p>
                    <p className="text-xs text-zinc-500">{w.zone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${
                      w.movementPattern === 'Anomaly' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      w.movementPattern === 'Suspicious' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                      'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {w.movementPattern}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${
                      w.networkCondition === 'Unstable' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {w.networkCondition}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-l border-zinc-800/50 uppercase tracking-widest font-bold">
                    <span className={`${
                      w.riskScore === 'HIGH' ? 'text-red-500' :
                      w.riskScore === 'MEDIUM' ? 'text-amber-500' :
                      'text-emerald-500'
                    }`}>{w.riskScore}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {w.clusterStatus ? (
                      <span className="inline-flex w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]" title="Fraud Ring Detected" />
                    ) : (
                      <span className="text-zinc-600">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                      w.decision === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      w.decision === 'Rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      'bg-zinc-800 text-zinc-300 border border-zinc-700'
                    }`}>
                      {w.decision}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-white tracking-widest">
                    ₹{w.payoutAmount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedWorker(w)}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 hover:text-indigo-400 rounded-lg text-zinc-400 transition-colors border border-zinc-700"
                      title="Inspect Profile"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredWorkers.length === 0 && (
            <div className="p-8 text-center text-zinc-500">No workers match the selected filters.</div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedWorker && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-3xl p-8 max-w-2xl w-full relative"
            >
              <button 
                onClick={() => setSelectedWorker(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-6 mb-8 border-b border-zinc-800 pb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <User className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedWorker.name} <span className="text-sm font-mono text-zinc-500 ml-2">#{selectedWorker.id}</span></h3>
                  <p className="text-zinc-400 mt-1">{selectedWorker.zone} • {selectedWorker.activity}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="text-xs uppercase text-zinc-500 font-bold tracking-widest">Signals</h4>
                  {selectedWorker.signals.length === 0 ? (
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-3">
                      <ShieldAlert className="w-5 h-5" />
                      No risk signals detected.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedWorker.signals.map(s => (
                        <div key={s} className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
                          <WifiOff className="w-4 h-4" />
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase text-zinc-500 font-bold tracking-widest mb-3">Risk Assessment</h4>
                    <div className="p-5 bg-gradient-to-br from-black to-zinc-900 border border-zinc-800 rounded-xl">
                      <p className="text-sm text-zinc-300 font-medium mb-2 opacity-90 leading-relaxed">
                        {selectedWorker.riskScore === 'HIGH' ? `High risk due to ${selectedWorker.signals.length} suspicious signals detected during event window.` :
                         selectedWorker.riskScore === 'MEDIUM' ? `Elevated risk due to inconsistent behavior patterns.` :
                         'Normal behavior consistent with historical baseline. Proceeding normally.'}
                      </p>
                      {selectedWorker.clusterStatus && (
                        <div className="mt-3 pt-3 border-t border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                           🔥 Part of localized Sybil fraud ring
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                     <h4 className="text-xs uppercase text-zinc-500 font-bold tracking-widest mb-3">System Decision</h4>
                     <div className={`p-4 rounded-xl border flex items-center gap-4 ${
                       selectedWorker.decision === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                       selectedWorker.decision === 'Rejected' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                       'bg-zinc-800 border-zinc-700 text-zinc-300'
                     }`}>
                       <FileSearch className="w-6 h-6 flex-shrink-0" />
                       <div className="flex flex-col">
                         <span className="font-bold text-lg">{selectedWorker.decision}</span>
                         <span className="text-xs opacity-75 mt-0.5">
                           {selectedWorker.decision === 'Approved' ? 'Validated against criteria. Releasing funds.' :
                            selectedWorker.decision === 'Rejected' ? 'Rejected due to coordinated fraud detection and anomalies.' :
                            'Criteria pending event trigger.'}
                         </span>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-6 border-t border-zinc-800">
                <button 
                  onClick={() => setSelectedWorker(null)}
                  className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/30"
                >
                  Close Case File
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
