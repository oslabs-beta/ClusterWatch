import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Setup from './components/SetupButtons';
// Custom Theme for Material UI

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Dashboard/*" element={<Dashboard />} />
        <Route path="/Setup" element={<Setup />} />
        <Route path="/" element={<Setup />} />

        <Route path="/Dashboard" element={<Navigate to="Dashboard/Overview" />} /> // removed exact from path
      </Routes>
    </div>
  );
}

export default App;
