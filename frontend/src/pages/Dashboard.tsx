
import { useStore } from '../store/useStore';
import { XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, FileText, AlertTriangle, CheckCircle, Activity, WifiOff, CloudRain, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const chartData = [
  { day: 'Mon', claims: 12 },
  { day: 'Tue', claims: 15 },
  { day: 'Wed', claims: 18 },
  { day: 'Thu', claims: 14 },
  { day: 'Fri', claims: 22 },
  { day: 'Sat', claims: 45 },
  { day: 'Sun', claims: 130 },
];

export const Dashboard: React.FC = () => {
  const { workers, rainfallEventActive } = useStore();

  const totalWorkers = workers.length;
  const activeClaims = workers.filter(w => w.decision !== 'Pending').length;
  const fraudAlerts = workers.filter(w => w.riskScore === 'HIGH' || w.clusterStatus).length;
  const approvedPayouts = workers.filter(w => w.decision === 'Approved').length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-6">
        {[
          { title: 'Total Workers', value: totalWorkers, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { title: 'Active Claims', value: activeClaims, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { title: 'Fraud Alerts', value: fraudAlerts, icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/10' },
          { title: 'Approved Payouts', value: approvedPayouts, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl flex items-center justify-between hover:-translate-y-1 transition-transform cursor-default">
            <div>
              <p className="text-zinc-400 text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold mt-2 text-white">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-2 glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Claim Activity (Last 7 Days)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
                <XAxis dataKey="day" stroke="#a1a1aa" tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Area type="monotone" dataKey="claims" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorClaims)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Live Disruption Panel
          </h3>
          <div className="flex-1 space-y-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <CloudRain className="w-16 h-16 text-blue-400" />
              </div>
              <p className="text-zinc-400 text-sm">Rainfall (mm)</p>
              <div className="flex items-end gap-3 mt-1">
                <span className="text-3xl font-bold text-white">{rainfallEventActive ? '124' : '12'}</span>
                <span className={`text-sm mb-1 ${rainfallEventActive ? 'text-red-400' : 'text-emerald-400'}`}>
                  {rainfallEventActive ? 'Extreme' : 'Normal'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <WifiOff className="w-16 h-16 text-amber-400" />
              </div>
              <p className="text-zinc-400 text-sm">Network Condition</p>
              <div className="flex items-end gap-3 mt-1">
                <span className="text-xl font-bold text-white">{rainfallEventActive ? 'Unstable' : 'Stable'}</span>
                <span className={`text-sm mb-1 ${rainfallEventActive ? 'text-red-400' : 'text-emerald-400'}`}>
                  {rainfallEventActive ? '85% Latency' : '99% Uptime'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingDown className="w-16 h-16 text-rose-400" />
              </div>
              <p className="text-zinc-400 text-sm">Delivery Drop %</p>
              <div className="flex items-end gap-3 mt-1">
                <span className="text-3xl font-bold text-white">{rainfallEventActive ? '78%' : '5%'}</span>
                <span className="text-sm mb-1 text-zinc-400">vs yesterday</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-2xl">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          Worker Preview Table
        </h3>
        <div className="overflow-x-auto rounded-xl border border-zinc-800/50">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-800/30 text-xs uppercase bg-black/20 text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Name</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Zone</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Activity</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Movement Pattern</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Network</th>
                <th className="px-6 py-4 font-semibold tracking-wider border-l border-zinc-800/50">Risk Score</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {workers.map((worker) => (
                <tr key={worker.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{worker.name}</td>
                  <td className="px-6 py-4">{worker.zone}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      worker.activity === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${worker.activity === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      {worker.activity}
                    </span>
                  </td>
                  <td className={`px-6 py-4 ${
                    worker.movementPattern === 'Anomaly' ? 'text-red-400 font-semibold' : 
                    worker.movementPattern === 'Suspicious' ? 'text-amber-400 font-semibold' : 'text-emerald-400'
                  }`}>
                    {worker.movementPattern}
                  </td>
                  <td className="px-6 py-4">{worker.networkCondition}</td>
                  <td className="px-6 py-4 border-l border-zinc-800/50">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      worker.riskScore === 'HIGH' ? 'bg-red-500/20 text-red-500 border border-red-500/30' :
                      worker.riskScore === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                      'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    }`}>
                      {worker.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      worker.status === 'Eligible' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {worker.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
