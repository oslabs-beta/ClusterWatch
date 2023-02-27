import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ClusterUseMethod({ apiKey }) {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/grafana/uid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: apiKey,
        dashboard: 'Node Exporter / USE Method / Cluster',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUid(data);
      });
  }, [apiKey]);
  const url = `http://localhost:3001/d/${uid}/node-exporter-use-method-cluster?orgId=1&refresh=30s&from=1677342018266&to=1677345618266&kiosk=true`;
  return (
    <div className="iframe">
      <iframe src={url} width="100%" height="100%"></iframe>
    </div>
  );
}

export default ClusterUseMethod;
