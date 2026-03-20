
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { FraudRiskMap } from './pages/FraudRiskMap';
import { ClaimManager } from './pages/ClaimManager';
import { PayoutDashboard } from './pages/PayoutDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="map" element={<FraudRiskMap />} />
          <Route path="manager" element={<ClaimManager />} />
          <Route path="payout" element={<PayoutDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
