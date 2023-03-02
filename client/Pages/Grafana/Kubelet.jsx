import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Kubelet({ apiKey }) {
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
        dashboard: 'Kubernetes / Kubelet',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUid(data);
      });
  }, [apiKey]);
  const url = `http://localhost:3001/d/${uid}/kubernetes-kubelet?orgId=1&refresh=10s&from=${from}&to=${now}&kiosk=true`;

  return (
    <div className="iframe">
      <iframe src={url} width="100%" height="100%"></iframe>
    </div>
  );
}

export default Kubelet;
