import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Setup from './Pages/Setup';

//default route is to the Setup page
//other routes lead to dashboard
function App() {
  return (
    <div id="mainApp">
      <Routes>
        <Route path="/Dashboard/*" element={<Dashboard />} />
        <Route path="/" element={<Setup />} />
        <Route
          path="/Dashboard"
          element={<Navigate to="Dashboard/Overview" />}
        />{' '}
        // removed exact from path
      </Routes>
    </div>
  );
}

export default App;
