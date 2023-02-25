import React from 'react';
import { Link } from 'react-router-dom';

function Cluster() {
  return (
    <div className="iframe">
      <iframe
        className="frame"
        src="http://localhost:3001/d/09ec8aa1e996d6ffcd6817bbaff4db1b/kubernetes-api-server?orgId=1&refresh=10s&from=1677342274613&to=1677345874613&kiosk=true&theme=light"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default Cluster;
