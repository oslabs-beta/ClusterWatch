import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CoreDNS({ apiKey }) {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/grafana/uid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: apiKey,
        dashboard: 'CoreDNS',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUid(data);
      });
  }, [apiKey]);
  const url = `http://localhost:3001/d/${uid}/coredns?orgId=1&refresh=10s&from=1677335209850&to=1677346009850&kiosk=true`;
  return (
    <div className="iframe">
      <iframe src={url} width="100%" height="100%"></iframe>
    </div>
  );
}

export default CoreDNS;
