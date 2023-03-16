import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Clusterprops = {
  apiKey: string | any,
}

function Cluster({ apiKey } : Clusterprops) {
  const [uid, setUid] = useState(null);
  const now = new Date().getTime();
  const from = new Date(now - 60 * 60 * 1000).getTime();

  useEffect(() => {
    fetch('http://localhost:3000/grafana/uid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: apiKey,
        dashboard: 'Kubernetes / API server',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('kubernetes-api',data);
        setUid(data);
      });
  }, []);

  const url = `http://localhost:3001/d/${uid}/kubernetes-api-server?orgId=1&refresh=10s&from=${from}&to=${now}&kiosk=true`;

  return (
    <div className="iframe">
      <iframe
        className="frame"
        src={url}
        width="100%"
        height="100%"
        title="embed cluster"
      ></iframe>
    </div>
  );
}

export default Cluster;

// http://localhost:3001/d/${uid}/kubernetes-api-server?orgId=1&refresh=10s&from=1677342274613&to=1677345874613&kiosk=true&theme=light