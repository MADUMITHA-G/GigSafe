
import { useStore } from '../store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Banknote, FileCheck, FileX, FileClock, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export const PayoutDashboard: React.FC = () => {
  const { workers } = useStore();

  const totalPayouts = workers.reduce((acc, w) => acc + w.payoutAmount, 0);
  const approvedTotal = workers.filter(w=>w.decision === 'Approved').reduce((acc, w) => acc + w.payoutAmount, 0);
  const rejectedCount = workers.filter(w=>w.decision === 'Rejected').length;
  const pendingCount = workers.filter(w=>w.decision === 'Pending').length;
  const approvedCount = workers.filter(w=>w.decision === 'Approved').length;

  const pieData = [
    { name: 'Approved', value: approvedCount, color: '#10b981' },
    { name: 'Rejected', value: rejectedCount, color: '#ef4444' },
    { name: 'Pending', value: pendingCount, color: '#facc15' },
  ].filter(d => d.value > 0);
  
  // If simulation is BEFORE, show dummy data so chart looks nice
  const displayPieData = pieData.length > 0 ? pieData : [
    { name: 'Pending Simulation', value: 1, color: '#3f3f46' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-xl">
          <Banknote className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">Ledger & Payouts</h2>
          <p className="text-zinc-400 text-sm mt-1">Smart contract parametric trigger results and capital allocation.</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-6">
        {[
          { title: 'Total Capital Pool', value: `₹${totalPayouts.toLocaleString()}`, icon: Wallet, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { title: 'Approved Payouts', value: `₹${approvedTotal.toLocaleString()}`, icon: FileCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { title: 'Pending', value: pendingCount, icon: FileClock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
          { title: 'Rejected Claims', value: rejectedCount, icon: FileX, color: 'text-red-400', bg: 'bg-red-400/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <p className="text-zinc-400 text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold mt-2 text-white tracking-widest">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg} border border-white/5`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-white self-start w-full border-b border-zinc-800 pb-4">Decision Distribution</h3>
          <div className="w-full h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {displayPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-2 glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold mb-6 text-white border-b border-zinc-800 pb-4">Detailed Payout Ledger</h3>
          <div className="flex-1 overflow-x-auto rounded-xl border border-zinc-800/50 bg-black/20">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-800/50">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Worker</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Zone</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Decision</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Amount</th>
                  <th className="px-6 py-4 font-semibold tracking-wider w-1/3">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {workers.map((w) => (
                  <tr key={w.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{w.name}</td>
                    <td className="px-6 py-4 text-zinc-400">{w.zone}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                        w.decision === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        w.decision === 'Rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                        'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}>
                        {w.decision}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-mono font-bold tracking-widest ${
                       w.decision === 'Approved' ? 'text-emerald-400' :
                       w.decision === 'Rejected' ? 'text-zinc-600 line-through' :
                       'text-zinc-400'
                    }`}>
                      ₹{w.payoutAmount}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-400 italic">
                      {w.decision === 'Approved' ? 'Cleared all fraud checks.' :
                       w.decision === 'Rejected' ? (w.clusterStatus ? 'Coordinated fraud ring detected.' : 'Multiple risk anomalies.') :
                       'Pending trigger event.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
