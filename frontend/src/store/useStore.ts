import { create } from 'zustand';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type Decision = 'Pending' | 'Approved' | 'Rejected';
export type SimulationState = 'BEFORE' | 'DURING' | 'AFTER';

export interface WorkerInfo {
  id: string;
  name: string;
  zone: string;
  lat: number;
  lng: number;
  activity: 'Active' | 'Idle';
  movementPattern: 'Normal' | 'Suspicious' | 'Anomaly';
  networkCondition: 'Stable' | 'Unstable';
  riskScore: RiskLevel;
  status: 'Eligible' | 'Not Eligible';
  clusterStatus: boolean;
  decision: Decision;
  payoutAmount: number;
  signals: string[];
}

// Map real coordinates for centers
export const cityCenters: Record<string, [number, number]> = {
  'Mumbai': [19.060, 72.860],
  'Delhi': [28.6139, 77.2090],
  'Bangalore': [12.9716, 77.5946],
  'All India Districts': [21.0, 78.0]
};

const getCityMetadata = (city: string) => {
  if (city === 'Delhi') return { lat: 28.6139, lng: 77.2090, zones: ['Connaught Place', 'Dwarka', 'South Delhi'], prefix: 'DEL', names: ['Amit D.', 'Rahul G.', 'Priya S.', 'Sandeep Y.', 'Vikas K.', 'Anjali M.', 'Karan R.', 'Nisha T.'] };
  if (city === 'Bangalore') return { lat: 12.9716, lng: 77.5946, zones: ['Koramangala', 'Whitefield', 'Indiranagar'], prefix: 'BLR', names: ['Karthik N.', 'Sneha P.', 'Rahul V.', 'Arun S.', 'Meghana R.', 'Darshan M.', 'Vivek J.', 'Divya C.'] };
  // Default to Mumbai
  return { lat: 19.060, lng: 72.860, zones: ['Mumbai North', 'Dharavi', 'Thane'], prefix: 'MUM', names: ['Ramesh K.', 'Suresh L.', 'Amit P.', 'Ravi M.', 'Deepak T.', 'Anil S.', 'Kiran B.', 'Pooja R.'] };
};

const generateCityData = (city: string): WorkerInfo[] => {
  if (city === 'All India Districts') {
    return [
      ...generateCityData('Mumbai'),
      ...generateCityData('Delhi'),
      ...generateCityData('Bangalore')
    ];
  }
  
  const meta = getCityMetadata(city);
  const z1 = meta.zones[0];
  const z2 = meta.zones[1]; // This will be the fraud cluster zone
  const z3 = meta.zones[2];
  
  return [
    { id: `${meta.prefix}-001`, name: meta.names[0], zone: z1, lat: meta.lat + 0.042, lng: meta.lng + 0.021, activity: 'Active', movementPattern: 'Normal', networkCondition: 'Stable', riskScore: 'LOW', status: 'Eligible', clusterStatus: false, decision: 'Pending', payoutAmount: 500, signals: [] },
    { id: `${meta.prefix}-002`, name: meta.names[1], zone: z1, lat: meta.lat + 0.052, lng: meta.lng + 0.011, activity: 'Active', movementPattern: 'Normal', networkCondition: 'Stable', riskScore: 'LOW', status: 'Eligible', clusterStatus: false, decision: 'Pending', payoutAmount: 500, signals: [] },
    { id: `${meta.prefix}-003`, name: meta.names[2], zone: z2, lat: meta.lat - 0.020, lng: meta.lng - 0.005, activity: 'Active', movementPattern: 'Normal', networkCondition: 'Stable', riskScore: 'LOW', status: 'Eligible', clusterStatus: false, decision: 'Pending', payoutAmount: 500, signals: [] },
    { id: `${meta.prefix}-004`, name: meta.names[3], zone: z2, lat: meta.lat - 0.018, lng: meta.lng - 0.007, activity: 'Active', movementPattern: 'Normal', networkCondition: 'Stable', riskScore: 'LOW', status: 'Eligible', clusterStatus: false, decision: 'Pending', payoutAmount: 500, signals: [] },
    { id: `${meta.prefix}-005`, name: meta.names[4], zone: z2, lat: meta.lat - 0.019, lng: meta.lng - 0.006, activity: 'Active', movementPattern: 'Normal', networkCondition: 'Stable', riskScore: 'LOW', status: 'Eligible', clusterStatus: false, decision: 'Pending', payoutAmount: 500, signals: [] },
    { id: `${meta.prefix}-006`, name: meta.names[5], zone: z2, lat: meta.lat - 0.015, lng: meta.lng - 0.001, activity: 'Active', movementPattern: 'Normal', networkCondition: 'Stable', riskScore: 'LOW', status: 'Eligible', clusterStatus: false, decision: 'Pending', payoutAmount: 500, signals: [] },
    { id: `${meta.prefix}-007`, name: meta.names[6], zone: z3, lat: meta.lat + 0.155, lng: meta.lng + 0.120, activity: 'Active', movementPattern: 'Normal', networkCondition: 'Stable', riskScore: 'LOW', status: 'Eligible', clusterStatus: false, decision: 'Pending', payoutAmount: 500, signals: [] },
    { id: `${meta.prefix}-008`, name: meta.names[7], zone: z3, lat: meta.lat + 0.161, lng: meta.lng + 0.118, activity: 'Active', movementPattern: 'Normal', networkCondition: 'Stable', riskScore: 'LOW', status: 'Eligible', clusterStatus: false, decision: 'Pending', payoutAmount: 700, signals: [] },
  ];
};

const generateBeforeData = (city: string): WorkerInfo[] => generateCityData(city);

const generateDuringData = (city: string): WorkerInfo[] => {
  const data = generateBeforeData(city);
  return data.map(w => {
    // Determine the fraud cluster zone for the single city, or check if it matches any of the cluster zones
    const isClusterZone = 
      w.zone === 'Dharavi' || 
      w.zone === 'Dwarka' || 
      w.zone === 'Whitefield';

    // Simulate a fraud cluster in the second zone of any selected city
    if (isClusterZone) {
      return {
        ...w,
        activity: 'Idle',
        movementPattern: 'Anomaly',
        networkCondition: 'Unstable',
        riskScore: 'HIGH',
        status: 'Not Eligible',
        clusterStatus: true,
        decision: 'Pending',
        signals: ['Movement anomaly', 'Network instability', 'Activity inconsistency']
      };
    }
    // A lonely suspicious user (the first person in the city's list)
    if (w.id.endsWith('-001')) {
      return {
        ...w,
        status: 'Not Eligible',
        movementPattern: 'Suspicious',
        riskScore: 'MEDIUM',
        decision: 'Rejected',
        signals: ['Activity inconsistency']
      };
    }
    return w;
  });
};

const generateAfterData = (city: string): WorkerInfo[] => {
  const data = generateDuringData(city);
  return data.map(w => {
    if (w.clusterStatus || w.riskScore === 'HIGH') {
      return { ...w, decision: 'Rejected' };
    }
    if (w.riskScore === 'MEDIUM') {
      return { ...w, decision: 'Rejected' };
    }
    return { ...w, decision: 'Approved' };
  });
};

interface AppState {
  simulationState: SimulationState;
  rainfallEventActive: boolean;
  selectedCity: string;
  workers: WorkerInfo[];
  setSimulationState: (state: SimulationState) => void;
  setSelectedCity: (city: string) => void;
  triggerEvent: () => void;
}

export const useStore = create<AppState>((set) => ({
  simulationState: 'BEFORE',
  rainfallEventActive: false,
  selectedCity: 'All India Districts',
  workers: generateBeforeData('All India Districts'),
  
  setSimulationState: (state) => set((prevState) => {
    const city = prevState.selectedCity;
    if (state === 'BEFORE') return { simulationState: state, rainfallEventActive: false, workers: generateBeforeData(city) };
    if (state === 'DURING') return { simulationState: state, rainfallEventActive: true, workers: generateDuringData(city) };
    if (state === 'AFTER') return { simulationState: state, rainfallEventActive: false, workers: generateAfterData(city) };
    return {};
  }),

  setSelectedCity: (city) => set((prevState) => {
    const state = prevState.simulationState;
    if (state === 'BEFORE') return { selectedCity: city, workers: generateBeforeData(city) };
    if (state === 'DURING') return { selectedCity: city, workers: generateDuringData(city) };
    if (state === 'AFTER') return { selectedCity: city, workers: generateAfterData(city) };
    return { selectedCity: city };
  }),

  triggerEvent: () => set((prevState) => ({
    simulationState: 'DURING',
    rainfallEventActive: true,
    workers: generateDuringData(prevState.selectedCity)
  }))
}));
