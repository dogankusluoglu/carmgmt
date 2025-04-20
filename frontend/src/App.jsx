import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleListPage from './pages/VehicleListPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import AddVehicle from './pages/AddVehicle';
import EditVehiclePage from './pages/EditVehiclePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleListPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
        <Route path="/vehicles/new"      element={<AddVehicle />} />
        <Route path="/vehicles/:id/edit" element={<EditVehiclePage />} />
      </Routes>
    </Router>
  );
}

export default App;