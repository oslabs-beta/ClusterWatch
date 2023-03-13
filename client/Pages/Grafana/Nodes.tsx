import React, { useState, useEffect } from 'react';


type NodesProps = {
  apiKey: string | any,
}

function Nodes({ apiKey } : NodesProps) {
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
        dashboard: 'Node Exporter / Nodes',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('uid',data);
        setUid(data);
      });
  }, [apiKey]);
  const url = `http://localhost:3001/d/${uid}/node-exporter-nodes?orgId=1&refresh=&from=${from}&to=${now}&kiosk=true&theme=light`;
  // http://localhost:3001/d/deq7T0-Vk/node-exporter-nodes?orgId=1&from=1678715225768&to=1678715287956
  //p0W7JA-Vz
  return (
    <div className="iframe">
      <iframe  className="frame" src={url} width="100%" height="100%"></iframe>
    </div>
  );
}

export default Nodes;
