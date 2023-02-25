import React from 'react';
import { Link } from 'react-router-dom';

function CoreDNS() {
  return (
    <div className="iframe">
      <iframe
        src="http://localhost:3001/d/vkQ0UHxik/coredns?orgId=1&refresh=10s&from=1677335209850&to=1677346009850&kiosk=true"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
}

export default CoreDNS;
