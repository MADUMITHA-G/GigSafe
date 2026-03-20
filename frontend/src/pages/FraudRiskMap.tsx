import { useEffect, useMemo } from 'react';
import { useStore, cityCenters } from '../store/useStore';
import { MapContainer, TileLayer, CircleMarker, Circle, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PlayCircle, FastForward, CheckCircle2, AlertOctagon, TrendingUp, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component to dynamically alter map view
const MapUpdater: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

export const FraudRiskMap: React.FC = () => {
  const { workers, simulationState, setSimulationState, rainfallEventActive, selectedCity } = useStore();

  const handleTrigger = () => {
    if (simulationState === 'BEFORE') setSimulationState('DURING');
    else if (simulationState === 'DURING') setSimulationState('AFTER');
    else setSimulationState('BEFORE');
  };

  const mapCenter: [number, number] = cityCenters[selectedCity] || cityCenters['All India Districts'];
  const zoomLevel = selectedCity === 'All India Districts' ? 5 : 12;

  // Compute cluster (high risk workers with clusterStatus true)
  const clusterWorkers = workers.filter(w => w.clusterStatus && w.riskScore === 'HIGH');
  const showCluster = rainfallEventActive && clusterWorkers.length >= 3;
  const clusterZoneName = clusterWorkers.length > 0 ? clusterWorkers[0].zone : 'Unknown Area';
  
  // Calculate average position of cluster for circle center
  const clusterCenter: [number, number] | null = showCluster ? [
    clusterWorkers.reduce((sum, w) => sum + w.lat, 0) / clusterWorkers.length,
    clusterWorkers.reduce((sum, w) => sum + w.lng, 0) / clusterWorkers.length
  ] : null;

  // Identify risk zones
  const zoneStats = useMemo(() => {
    const stats: Record<string, { total: number, suspicious: number, high: number }> = {};
    workers.forEach(w => {
      if (!stats[w.zone]) stats[w.zone] = { total: 0, suspicious: 0, high: 0 };
      stats[w.zone].total++;
      if (w.riskScore === 'MEDIUM') stats[w.zone].suspicious++;
      if (w.riskScore === 'HIGH') stats[w.zone].high++;
    });
    return Object.entries(stats).map(([zone, data]) => ({
      zone,
      ...data,
      riskLevel: data.high >= 3 ? 'Critical' : data.high > 0 ? 'High' : data.suspicious > 0 ? 'Medium' : 'Low'
    }));
  }, [workers]);

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 glass-panel rounded-2xl overflow-hidden relative border border-zinc-800 shadow-2xl">
        <MapContainer center={mapCenter} zoom={zoomLevel} zoomControl={false} className="w-full h-full bg-black z-0">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB'
          />
          <MapUpdater center={mapCenter} zoom={zoomLevel} />
          
          {/* Plot workers */}
          {workers.map((w) => {
            const color = w.riskScore === 'HIGH' ? '#ef4444' : w.riskScore === 'MEDIUM' ? '#facc15' : '#10b981';
            return (
              <CircleMarker
                key={w.id}
                center={[w.lat, w.lng]}
                radius={w.riskScore === 'HIGH' ? 8 : 6}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: w.riskScore === 'HIGH' ? 0.9 : 0.6,
                  weight: 2
                }}
              >
                <Popup className="custom-popup">
                  <div className="bg-zinc-900 text-white p-2 rounded-lg border border-zinc-800">
                    <p className="font-bold text-sm mb-1">{w.name}</p>
                    <p className="text-xs text-zinc-400">Zone: <span className="text-zinc-200">{w.zone}</span></p>
                    <p className="text-xs text-zinc-400">Risk: <span style={{color}} className="font-bold">{w.riskScore}</span></p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          {/* Glowing red cluster and nodes connection */}
          {showCluster && clusterCenter && (
            <>
              <Circle
                center={clusterCenter}
                radius={1200}
                pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 1, dashArray: '4 4' }}
                className="animate-pulse"
              />
              <Circle
                center={clusterCenter}
                radius={2400}
                pathOptions={{ color: '#ef4444', fillColor: 'transparent', fillOpacity: 0, weight: 1, opacity: 0.3 }}
                className="animate-ping"
              />
              {/* Connect fraud nodes to cluster center */}
              {clusterWorkers.map(w => (
                <Polyline
                  key={`line-${w.id}`}
                  positions={[clusterCenter, [w.lat, w.lng]]}
                  pathOptions={{ color: '#ef4444', weight: 2, opacity: 0.6, dashArray: '2, 6' }}
                />
              ))}
            </>
          )}
        </MapContainer>

        {/* Map Overlay Badge */}
        <AnimatePresence>
          {showCluster && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/50 backdrop-blur-md px-6 py-3 rounded-full text-red-500 font-bold tracking-widest uppercase flex items-center gap-3 shadow-[0_0_30px_rgba(239,68,68,0.3)] z-[400]"
            >
              <AlertOctagon className="w-5 h-5 animate-pulse" />
              Fraud Ring Detected in {clusterZoneName}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Controls inside map */}
        <div className="absolute bottom-6 left-6 z-[400]">
          <button
            onClick={handleTrigger}
            className="group relative flex items-center justify-center gap-3 bg-gradient-to-br from-zinc-800 to-black hover:from-zinc-700 hover:to-zinc-900 border border-zinc-700 hover:border-indigo-500/50 text-white px-6 py-3 rounded-2xl shadow-xl transition-all duration-300"
          >
            <div className={`absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity ${rainfallEventActive ? 'bg-red-500/20' : ''}`} />
            {simulationState === 'BEFORE' ? (
              <><PlayCircle className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" /> <span className="font-semibold tracking-wide">Trigger Rainfall Event</span></>
            ) : simulationState === 'DURING' ? (
              <><FastForward className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" /> <span className="font-semibold tracking-wide">Advance Time</span></>
            ) : (
              <><CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" /> <span className="font-semibold tracking-wide">Reset</span></>
            )}
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="w-96 flex flex-col gap-6">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-indigo-500 rounded-l-none">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Zone Risk Registry</h2>
          </div>
          <p className="text-zinc-400 text-sm">Real-time geospatial cluster analysis</p>
        </div>

        <div className="flex-1 glass-panel rounded-2xl p-6 overflow-y-auto space-y-4 shadow-xl">
          {zoneStats.map((stat) => (
            <motion.div 
              key={stat.zone}
              layout
              className={`p-4 rounded-xl border relative overflow-hidden group transition-colors ${
                stat.riskLevel === 'Critical' ? 'bg-red-500/5 border-red-500/30' :
                stat.riskLevel === 'High' ? 'bg-amber-500/5 border-amber-500/30' :
                stat.riskLevel === 'Medium' ? 'bg-yellow-500/5 border-yellow-500/30' :
                'bg-emerald-500/5 border-emerald-500/30'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-zinc-100 text-lg">{stat.zone}</h3>
                <span className={`px-3 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold ${
                  stat.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  stat.riskLevel === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  stat.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {stat.riskLevel} Risk
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-3 rounded-lg border border-white/5 group-hover:bg-black/40 transition-colors">
                  <p className="text-xs text-zinc-400 font-medium mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Total Scans</p>
                  <p className="text-xl font-bold font-mono">{stat.total}</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-white/5 group-hover:bg-black/40 transition-colors">
                  <p className="text-xs text-zinc-400 font-medium mb-1 flex items-center gap-1"><AlertOctagon className="w-3 h-3"/> Anomaly</p>
                  <p className={`text-xl font-bold font-mono ${stat.high > 0 || stat.suspicious > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {stat.high + stat.suspicious}
                  </p>
                </div>
              </div>

              {stat.high >= 3 && (
                 <div className="mt-4 pt-3 border-t border-red-500/20 flex items-center justify-between">
                   <span className="text-xs text-red-400/80 font-mono tracking-wide">Sybil pattern detected</span>
                   <span className="flex h-2 w-2 relative">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                   </span>
                 </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
