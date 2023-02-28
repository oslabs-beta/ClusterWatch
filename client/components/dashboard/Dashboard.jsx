import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import TestVis from '../visualizer/Visualizer';

function Dashboard() {
  const [api, setApi] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/grafana/key', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('key', data);
        setApi(data);
      })
      .catch((error) => {
        console.log('error when fetching api key', error);
      });
  }, []);
  return (
    <div className="dashboard">
<<<<<<< HEAD
      <Banner />
      <Navbar />

=======
      <Navbar apiKey={api} />
>>>>>>> dev
    </div>
  );
}

export default Dashboard;
