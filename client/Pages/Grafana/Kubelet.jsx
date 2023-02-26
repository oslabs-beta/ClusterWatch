import React from 'react';
import { Link } from 'react-router-dom';

function Kubelet() {
  return (
    <div className="iframe">
      <iframe
        src="http://localhost:3001/d/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&refresh=10s&from=1677341912827&to=1677345512827&kiosk=true"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
}

export default Kubelet;
