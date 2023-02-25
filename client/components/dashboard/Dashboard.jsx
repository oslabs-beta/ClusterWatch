import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';

function Dashboard() {
  return (
    <div className="dashboard">
      <Banner />
      <Navbar />
    </div>
  );
}

export default Dashboard;
