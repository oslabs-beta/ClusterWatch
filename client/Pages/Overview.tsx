import React from 'react';
import { Link } from 'react-router-dom';
import TestVis from '../components/visualizer/Visualizer';
import Banner from '../components/dashboard/Banner';

function Overview() {
  return (
    <div id="visualizer" data-testid="visualizer">
      <TestVis data-testid='test-vis'/>
    </div>
  );
}

export default Overview;
