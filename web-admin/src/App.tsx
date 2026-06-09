import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import UploadFloorPlanPage from './pages/UploadFloorPlanPage';
import AnnotateFloorPage from './pages/AnnotateFloorPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>
        <header style={{ marginBottom: 24 }}>
          <h1>Indoor Navigation Admin</h1>
          <nav style={{ display: 'flex', gap: 12 }}>
            <Link to="/">Dashboard</Link>
            <Link to="/upload">Upload floor plan</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/upload" element={<UploadFloorPlanPage />} />
          <Route path="/annotate" element={<AnnotateFloorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

