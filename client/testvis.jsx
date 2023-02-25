import Graph from 'react-graph-vis';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './vis-styles.css';

const options = {
  interaction: {
    hover: true,
  },
  layout: {
    hierarchical: true,
  },
  edges: {
    color: '#000000',
  },
};

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

function Testvis() {
  const obj_id_counter = 6;
  let ns_counter = 0;
  const dummy_namespaces = [
    {
      title: 'Random information here\nother stuff\nMore',
      id: 0,
      label: 'control_plane',
      color: randomColor(),
      nodes: [1, 2, 3],
    },
    {
      title: 'Random information here\nother stuff\nMore',
      id: 1,
      label: `Namespace ${ns_counter++}`,
      color: randomColor(),
      nodes: [4, 5],
    },
    {
      title: 'Random information here\nother stuff\nMore',
      id: 2,
      label: `Namespace ${ns_counter++}`,
      color: randomColor(),
      nodes: [6, 7],
    },
    {
      title: 'Random information here\nother stuff\nMore',
      id: 3,
      label: `Namespace ${ns_counter++}`,
      color: randomColor(),
      nodes: [8, 9],
    },
  ];
  let node_counter = 0;
  const dummy_nodes = [
    {
      title: 'Random information here\nother stuff\nMore',
      id: 4,
      label: `Node ${node_counter++}`,
      color: randomColor(),
      pods: [],
    },
    {
      title: 'Random information here\nother stuff\nMore',
      id: 5,
      label: `Node ${node_counter++}`,
      color: randomColor(),
      pods: [],
    },
    {
      title: 'Random information here\nother stuff\nMore',
      id: 6,
      label: `Node ${node_counter++}`,
      color: randomColor(),
      pods: [],
    },
    {
      title: 'Random information here\nother stuff\nMore',
      id: 7,
      label: `Node ${node_counter++}`,
      color: randomColor(),
      pods: [],
    },
    {
      title: 'Random information here\nother stuff\nMore',
      id: 8,
      label: `Node ${node_counter++}`,
      color: randomColor(),
      pods: [],
    },
    {
      title: 'Random information here\nother stuff\nMore',
      id: 9,
      label: `Node ${node_counter++}`,
      color: randomColor(),
      pods: [],
    },
  ];
  const edges = [];
  dummy_namespaces.forEach((ns) => {
    ns.nodes.forEach((node) => edges.push({ from: ns.id, to: node }));
  });
  console.log('edges', edges);

  const graph = {
    graph: {
      nodes: [
        ...dummy_namespaces,
        ...dummy_nodes,
      ],
      edges,
    },
  };
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
    <div>
      <h1>React graph vis</h1>
      <Graph graph={graph.graph} options={options} events={events} style={{ height: '640px' }} />
    </div>
  );
}

export default Testvis;
