/* eslint-disable no-restricted-syntax */
import Graph from 'react-graph-vis';
import React, { useState, useEffect } from 'react';


import { Box } from '@mui/material';
import cpIcon from './icons/control-plane-icon.svg';
import nsIcon from './icons/namespace-icon.svg';
import nodeIcon from './icons/node-icon.svg';
import deplIcon from './icons/deployment-icon.svg';
import svcIcon from './icons/service-icon.svg';
import podIcon from './icons/pod-icon.svg';

interface ClusterNode {
  kind: string;
  id: string;
  title: string;
  // label: string | undefined;
  size: number;
  font: {
    color: string;
    size?: number;
  };
  labels?: any;
  matchLabels?: any;
  image: any;
  shape: string;
}
interface clusterGraphData {
  nodes: ClusterNode[];
  edges: ClusterEdge[];
}

interface ClusterEdge {
  from: string;
  to: string;
  length: number;
}

const options = {
  height: '100%',
  width: '100%',
  interaction: {
    hover: true,
  },
  autoResize: true,
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
    color: '#0bc1d1',
  },
};
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
interface ClusterDataResponse {
  nodes: any[];
  pods: any[];
  namespaces: any[];
  services: any[];
  deployments: any[];
  ingresses: any[];
}

interface divInfo {}

// helper function that will take an object
const helperFunc = (obj: { [k: string]: any }): string => {
  const div = document.createElement('div');
  div.className = 'popup';
  const ul = document.createElement('ul');
  div.appendChild(ul);
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      const outerLi = document.createElement('li');
      outerLi.innerText = `${capitalizeFirstLetter(key)}:`;
      const subUl = document.createElement('ul');
      obj[key].forEach((entry: any) => {
        const newLi = document.createElement('li');
        for (const field in entry) {
          newLi.innerText += `${capitalizeFirstLetter(field)}: ${
            entry[field]
          }, `;
        }
        newLi.innerText = newLi.innerText.slice(0, newLi.innerText.length - 2);
        subUl.append(newLi);
      });
      outerLi.appendChild(subUl);
      ul.appendChild(outerLi);
    } else {
      const li = document.createElement('li');
      li.innerText = `${capitalizeFirstLetter(key)}: ${obj[key]}\n`;
      ul.appendChild(li);
    }
  }
  const val = div as unknown as string;
  return val;
};
// create a div
// add an unorder list to the div
// for each key: value pair in object
// add list item to unordered list with corresponding key and value
// return the div

function Testvis() {
  const [graph, setGraph] = useState<clusterGraphData>({
    nodes: [],
    edges: [],
  });
  let clusterData: ClusterDataResponse;
  useEffect(() => {
    const localGraph: clusterGraphData = {
      nodes: [],
      edges: [],
    };
    const func = async () => {
      try {
        const response = await fetch('http://localhost:3000/clusterdata');
        // alert('finished fetch');
        if (!response.ok)
          throw new Error('failed to fetch data for visualizer');
        const data = await response.json();

        // console.log('data', data);
        // console.log('namespaces', data.namespaces);
        const test = document.createElement('div');
        test.className = 'popup';
        clusterData = data;
        const clusterNodes = data.nodes;

        const { pods, services, deployments, ingresses } = data;
        let controlPlaneId: string;
        // console.log(clusterNodes);
        clusterData.nodes.forEach((node: { [k: string]: any }) => {
          // if (node.name.includes('control-plane')) {
          const {
            name,
            uid,
            status: {
              allocatable,
              capacity,
              conditions,
              nodeInfo: { architecture, operatingSystem, osImage },
            },
          } = node;
          const nodeConditions: {
            'CPU Availability': string;
            'Memory Availability': string;
            'Pod Availability': string;
          } = {
            'CPU Availability': '',
            'Memory Availability': '',
            'Pod Availability': '',
          };
          conditions.forEach((cond: { type: string; status: string }) => {
            nodeConditions[cond.type as keyof typeof nodeConditions] =
              cond.status;
          });
          nodeConditions[
            'CPU Availability'
          ] = `${allocatable.cpu} / ${capacity.cpu}`;
          nodeConditions[
            'Memory Availability'
          ] = `${allocatable.memory} / ${capacity.memory}`;
          nodeConditions[
            'Pod Availability'
          ] = `${allocatable.pods} / ${capacity.pods}`;

          console.log(name, uid);
          test.innerText += `Name: ${name}\nUID: ${uid}`;
          // console.log('found control-plane');
          localGraph.nodes.push({
            kind: 'node',
            id: `${node.name}-node`,
            // label: node.name,
            title: helperFunc({
              name,
              uid,
              architecture,
              operatingSystem,
              osImage,
              ...nodeConditions,
            }),
            //label: 'node',
            size: 100,
            font: { color: '#ffffff', size: 48 },
            image: nodeIcon,
            shape: 'image',
          });
          controlPlaneId = `${node.name}-node`;
          // }
        });
        clusterData.namespaces.forEach((ns) => {
          const nsId = `${ns.name}-ns`;
          localGraph.nodes.push({
            kind: 'namespace',
            id: nsId,
            // label: `Namespace: ${ns.name}`,
            //label: 'ns',
            title: helperFunc({
              nsId,
              id: ns.id,
            }),
            size: 37.5,
            font: { color: '#ffffff', size: 24 },
            image: nsIcon,
            shape: 'image',
          });
          localGraph.edges.push({
            from: controlPlaneId,
            to: nsId,
            length: 500,
          });
          pods.forEach((pod: { [k: string]: any }) => {
            const {
              name,
              namespace,
              creationTimestamp,
              nodeName,
              serviceAccount,
              hostIP,
              podIP,
            } = pod;

            const podName = `${pod.name}-pod`;
            if (pod.namespace === ns.name) {
              localGraph.nodes.push({
                kind: 'pod',
                id: podName,
                // label: `Pod: ${pod.name}`,
                //label: 'pod',
                title: helperFunc({
                  name,
                  namespace,
                  creationTimestamp,
                  nodeName,
                  serviceAccount,
                  hostIP,
                  podIP,
                }),
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
            }
          });
          services.forEach((service: any) => {
            if (service.namespace === ns.name) {
              const { name, namespace, ports, type } = service;
              const serviceInfo: {
                name: string;
                port: string;
                protocol: string;
              }[] = [];
              ports.forEach((port: any) => {
                serviceInfo.push({
                  name: port.name,
                  port: port.port,
                  protocol: port.protocol,
                });
              });
              const serviceName = `${service.name}-service`;
              localGraph.nodes.push({
                kind: 'service',
                id: serviceName,
                // label: `Service: ${service.name}`,
                title: helperFunc({
                  name,
                  namespace,
                  type,
                  ports: serviceInfo,
                }),
                //label: 'svc',
                size: 37.5,
                font: { color: '#ffffff' },
                // nodes: [`${ns.name}-ns`],
                image: svcIcon,
                shape: 'image',
              });
              localGraph.edges.push({
                from: nsId,
                to: serviceName,
                length: 50,
              });
            }
          });

          deployments.forEach((deployment: any) => {
            if (deployment.namespace === ns.name) {
              const {
                name,
                namespace,
                strategy: { type },
                replicas,
                availableReplicas,
              } = deployment;

              const deploymentName = `${deployment.name}-deployment`;
              localGraph.nodes.push({
                kind: 'deployment',
                id: deploymentName,
                // label: `Deployment: ${deployment.name}`,
                // label: 'dpl',
                title: helperFunc({
                  name,
                  namespace,
                  strategy: type,
                  replicas,
                  availableReplicas,
                }),
                matchLabels: deployment.matchLabels,
                size: 37.5,
                font: { color: '#ffffff' },
                image: deplIcon,
                shape: 'image',
                // nodes: [`${ns.name}-ns`],
              });
              localGraph.edges.push({
                from: nsId,
                to: deploymentName,
                length: 50,
              });
              console.log('match labels', deployment.matchLabels);
            }
          });

          ingresses.forEach((ingress: any) => {
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

  return (
    <Graph
      graph={graph}
      options={options}
      // events={events}
      getNetwork={(network) => {
        // ensure that the network eases in to fit the viewport
        setTimeout(
          () =>
            network.fit({
              animation: {
                duration: 2000,
                easingFunction: 'linear',
              },
            }),
          1000
        );
        network.moveTo({ position: { x: 0, y: 0 } });
      }}
    />
  );
}

export default Testvis;
