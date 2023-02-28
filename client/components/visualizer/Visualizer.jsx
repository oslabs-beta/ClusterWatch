import Graph from 'react-graph-vis';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './vis-styles.css';

import cpIcon from './icons/control-plane-icon.svg';
import nsIcon from './icons/namespace-icon.svg';
import nodeIcon from './icons/node-icon.svg';
import deplIcon from './icons/deployment-icon.svg';
import svcIcon from './icons/service-icon.svg';
import podIcon from './icons/pod-icon.svg';

const options = {
  interaction: {
    hover: true,
  },
  physics: {
    barnesHut: {
      gravitationalConstant: -1000,
      centralGravity: 0,
      springLength: 150,
      springConstant: 0.003,
      damping: 0.09,
      avoidOverlap: 0.2,
    },
  },
  edges: {
    color: '#8526d3',
  },
};


function Testvis() {
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });
  let clusterData;
  useEffect(() => {
    const localGraph = {
      nodes: [],
      edges: [],
    };
    const func = async () => {
      try {
        const response = await fetch('http://localhost:3000/clusterdata');
        if (!response.ok) throw new Error('failed to fetch data for visualizer');
        const data = await response.json();

        // console.log('data', data);
        // console.log('namespaces', data.namespaces);
        clusterData = data;
        const clusterNodes = data.nodes;

        const {
          pods, services, deployments, ingresses,
        } = data;
        let controlPlaneId;
        console.log(clusterNodes);
        clusterData.nodes.forEach((node) => {
          if (node.name.includes('control-plane')) {
            // console.log('found control-plane');
            localGraph.nodes.push({
              kind: 'node',
              id: `${node.name}-node`,
              // label: node.name,
              label: 'node',
              size: 37.5,
              font: { color: '#ffffff', size: 48 },
              image: cpIcon,
              shape: 'image',
            });
            controlPlaneId = `${node.name}-node`;
          }
        });
        clusterData.namespaces.forEach((ns) => {
          const nsId = `${ns.name}-ns`;
          localGraph.nodes.push({
            kind: 'namespace',
            id: nsId,
            // label: `Namespace: ${ns.name}`,
            label: 'ns',
            size: 37.5,
            font: { color: '#ffffff', size: 24 },
            image: nsIcon,
            shape: 'image',
          });
          localGraph.edges.push({ from: controlPlaneId, to: nsId, length: 500 });
          pods.forEach((pod) => {
            const podName = `${pod.name}-pod`;
            if (pod.namespace === ns.name) {
              localGraph.nodes.push({
                kind: 'pod',
                id: podName,
                // label: `Pod: ${pod.name}`,
                label: 'pod',
                labels: pod.labels,
                size: 37.5,
                font: { color: '#ffffff' },
                // nodes: [`${ns.name}-ns`],
                image: podIcon,
                shape: 'image',
              });
              localGraph.edges.push({ from: nsId, to: podName, length: 200 });
            }

            if (pod.serviceAccount) {
              // console.log('service name for pod:', pod.serviceAccount);
              // localGraph.edges.push({ from: `${pod.serviceAccount}-service`, to: podName });
            }
          });
          services.forEach((service) => {
            if (service.namespace === ns.name) {
              const serviceName = `${service.name}-service`;
              localGraph.nodes.push({
                kind: 'service',
                id: serviceName,
                // label: `Service: ${service.name}`,
                label: 'svc',
                size: 37.5,
                font: { color: '#ffffff' },
                // nodes: [`${ns.name}-ns`],
                image: svcIcon,
                shape: 'image',
              });
              localGraph.edges.push({ from: nsId, to: serviceName, length: 50 });
            }
          });

          deployments.forEach((deployment) => {
            if (deployment.namespace === ns.name) {
              const deploymentName = `${deployment.name}-deployment`;
              localGraph.nodes.push({
                kind: 'deployment',
                id: deploymentName,
                // label: `Deployment: ${deployment.name}`,
                label: 'dpl',
                matchLabels: deployment.matchLabels,
                size: 37.5,
                font: { color: '#ffffff' },
                image: deplIcon,
                shape: 'image',
                // nodes: [`${ns.name}-ns`],
              });
              localGraph.edges.push({ from: nsId, to: deploymentName, length: 50 });
              console.log('match labels', deployment.matchLabels);
              // localGraph.nodes.forEach(((node) => {
              //   // if (node.kind === 'pod') console.log('labels', node.labels);
              //   if (node.kind === 'pod' && Object.entries(deployment.matchLabels.matchLabels).some((([label, value]) => node.labels[label] === value))) {
              //     console.log('match, pod:', `${node.name}, deployment: ${deployment.name}`);
              //     localGraph.edges.push({ from: deploymentName, to: node.id });
              //   }
              // }));
            }
          });

          ingresses.forEach((ingress) => {
            if (ingress.namespace === ns.name) return;
          });
        });
        console.log('local graph', localGraph);
        setGraph(localGraph);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);
  const events = {
    select: ({ nodes, edges }) => {
      console.log('Selected nodes:');
      console.log(nodes);
      console.log('Selected edges:');
      console.log(edges);
      alert(`Selected node: ${nodes}`);
    },
  };
  return (
    <div id="visualizer">
      <h1>
        React graph vis
        {' '}
      </h1>
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: '640px' }}
        getNetwork={(network) => {
          // ensure that the network eases in to fit the viewport
          setTimeout(() => network.fit({
            animation: {
              duration: 2000,
              easingFunction: 'linear',
            },
          }), 1000);
        }}
      />
    </div>
  );
}

export default Testvis;
