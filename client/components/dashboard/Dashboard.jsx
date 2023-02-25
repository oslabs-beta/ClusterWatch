import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import TestVis from '../../testvis';

function Dashboard() {
  return (
    <div className="dashboard">
      <Banner />
      <Navbar />
      <TestVis />
    </div>
  );
}

export default Dashboard;
