import React from 'react';
import { Link } from 'react-router-dom';

function Nodes() {
  return (
    <div className="iframe">
      <iframe
        src="http://localhost:3001/d/YEPQHRbVz/node-exporter-nodes?orgId=1&refresh=30s&from=1677343210752&to=1677346810752&kiosk=true"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
}

export default Nodes;
