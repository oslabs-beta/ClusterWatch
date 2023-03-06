import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type ClusterUseMethodProps = {
  apiKey: string | any,
}
function ClusterUseMethod({ apiKey } : ClusterUseMethodProps) {
  const [uid, setUid] = useState(null);
  const now = new Date().getTime();
  const from = new Date(now - 4 * 60 * 60 * 1000).getTime();

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
  const url = `http://localhost:3001/d/${uid}/node-exporter-use-method-cluster?orgId=1&refresh=30s&from=${from}&to=${now}&kiosk=true&theme=light`;
  return (
    <div className="iframe">
      <iframe src={url} width="100%" height="100%"></iframe>
    </div>
  );
}

export default ClusterUseMethod;
