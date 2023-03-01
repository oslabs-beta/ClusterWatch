import React from 'react';
import { Link } from 'react-router-dom';
import TestVis from '../components/visualizer/Visualizer';
import Banner from '../components/dashboard/Banner';

function Overview() {
  return (
    <div id="visualizer">
      <TestVis />
    </div>
    // <div className='iframe'>
    //  <iframe
    //   src="http://localhost:3001/d/YEPQHRbVz/node-exporter-nodes?kiosk&orgId=1&refresh=30s&from=1677163156470&to=1677166756470"
      
    //   width="100%"
    //   height="100%"
     
    // ></iframe>
    // </div>

  );
}

export default Overview;
