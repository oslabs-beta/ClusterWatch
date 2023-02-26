import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import Dashboard from './components/dashboard/Dashboard';
// Custom Theme for Material UI

function App() {

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
