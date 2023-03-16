import React from 'react';
import TestVis from '../components/visualizer/Visualizer';


function Overview() {
  return (
    <div id="visualizer" data-testid="visualizer">
      <TestVis data-testid='test-vis'/>
    </div>
  );
}

export default Overview;
