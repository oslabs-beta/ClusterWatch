import React from 'react';
import {
  Link,
} from 'react-router-dom';

function Setup() {
  return (
    <div>
      <h2>Fancy Buttons</h2>
      <button onClick={() => fetch('http://localhost:3000/setup/promSetup')} type="button">Setup Prometheus</button>
      <button onClick={() => fetch('http://localhost:3000/setup/grafSetup')} type="button">Setup Grafana</button>
      <button onClick={() => fetch('http://localhost:3000/setup/forwardPorts')} type="button">Start Port Forwarding</button>
      <button type="button"><Link to="/Dashboard">Go to dashboard</Link></button>
    </div>
  );
}

export default Setup;
