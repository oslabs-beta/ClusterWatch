import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cluster({ apiKey }) {
  const [uid, setUid] = useState(null);

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
        console.log(data);
        setUid(data);
      });
  }, []);

  const url = `http://localhost:3001/d/${uid}/kubernetes-api-server?orgId=1&refresh=10s&from=1677342274613&to=1677345874613&kiosk=true&theme=light`;

  return (
    <div className="iframe">
      <iframe
        className="frame"
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default Cluster;
