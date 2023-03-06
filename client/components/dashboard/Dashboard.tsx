import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';


function Dashboard() {
  const [api, setApi] = useState<string>('');
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
      <Navbar apiKey={api} />
    </div>
  );
}

export default Dashboard;
