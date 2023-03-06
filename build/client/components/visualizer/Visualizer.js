"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-restricted-syntax */
const react_graph_vis_1 = __importDefault(require("react-graph-vis"));
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("./vis-styles.css");
const material_1 = require("@mui/material");
const control_plane_icon_svg_1 = __importDefault(require("./icons/control-plane-icon.svg"));
const namespace_icon_svg_1 = __importDefault(require("./icons/namespace-icon.svg"));
const node_icon_svg_1 = __importDefault(require("./icons/node-icon.svg"));
const deployment_icon_svg_1 = __importDefault(require("./icons/deployment-icon.svg"));
const service_icon_svg_1 = __importDefault(require("./icons/service-icon.svg"));
const pod_icon_svg_1 = __importDefault(require("./icons/pod-icon.svg"));
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
        color: '#8526d3',
    },
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// helper function that will take an object
const helperFunc = (obj) => {
    const div = document.createElement('div');
    div.className = 'popup';
    const ul = document.createElement('ul');
    div.appendChild(ul);
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            const outerLi = document.createElement('li');
            outerLi.innerText = `${capitalizeFirstLetter(key)}:`;
            const subUl = document.createElement('ul');
            obj[key].forEach((entry) => {
                const newLi = document.createElement('li');
                for (const field in entry) {
                    newLi.innerText += `${capitalizeFirstLetter(field)}: ${entry[field]}, `;
                }
                newLi.innerText = newLi.innerText.slice(0, newLi.innerText.length - 2);
                subUl.append(newLi);
            });
            outerLi.appendChild(subUl);
            ul.appendChild(outerLi);
        }
        else {
            const li = document.createElement('li');
            li.innerText = `${capitalizeFirstLetter(key)}: ${obj[key]}\n`;
            ul.appendChild(li);
        }
    }
    return div;
};
// create a div
// add an unorder list to the div
// for each key: value pair in object
// add list item to unordered list with corresponding key and value
// return the div
function Testvis() {
    const [graph, setGraph] = (0, react_1.useState)({
        nodes: [],
        edges: [],
    });
    let clusterData;
    (0, react_1.useEffect)(() => {
        const localGraph = {
            nodes: [],
            edges: [],
        };
        const func = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/clusterdata');
                // alert('finished fetch');
                if (!response.ok)
                    throw new Error('failed to fetch data for visualizer');
                const data = yield response.json();
                // console.log('data', data);
                // console.log('namespaces', data.namespaces);
                const test = document.createElement('div');
                test.className = 'popup';
                clusterData = data;
                const clusterNodes = data.nodes;
                const { pods, services, deployments, ingresses, } = data;
                let controlPlaneId;
                // console.log(clusterNodes);
                clusterData.nodes.forEach((node) => {
                    // if (node.name.includes('control-plane')) {
                    const { name, uid, status: { allocatable, capacity, conditions, nodeInfo: { architecture, operatingSystem, osImage, }, }, } = node;
                    const nodeConditions = {};
                    conditions.forEach((cond) => {
                        nodeConditions[cond.type] = cond.status;
                    });
                    nodeConditions['CPU Availability'] = `${allocatable.cpu} / ${capacity.cpu}`;
                    nodeConditions['Memory Availability'] = `${allocatable.memory} / ${capacity.memory}`;
                    nodeConditions['Pod Availability'] = `${allocatable.pods} / ${capacity.pods}`;
                    console.log(name, uid);
                    test.innerText += `Name: ${name}\nUID: ${uid}`;
                    // console.log('found control-plane');
                    localGraph.nodes.push({
                        kind: 'node',
                        id: `${node.name}-node`,
                        // label: node.name,
                        title: helperFunc(Object.assign({ name,
                            uid,
                            architecture,
                            operatingSystem,
                            osImage }, nodeConditions)),
                        label: 'node',
                        size: 100,
                        font: { color: '#ffffff', size: 48 },
                        image: node_icon_svg_1.default,
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
                        label: 'ns',
                        title: helperFunc({
                            nsId,
                            id: ns.id,
                        }),
                        size: 37.5,
                        font: { color: '#ffffff', size: 24 },
                        image: namespace_icon_svg_1.default,
                        shape: 'image',
                    });
                    localGraph.edges.push({ from: controlPlaneId, to: nsId, length: 500 });
                    pods.forEach((pod) => {
                        const { name, namespace, creationTimestamp, nodeName, serviceAccount, hostIP, podIP, } = pod;
                        const podName = `${pod.name}-pod`;
                        if (pod.namespace === ns.name) {
                            localGraph.nodes.push({
                                kind: 'pod',
                                id: podName,
                                // label: `Pod: ${pod.name}`,
                                label: 'pod',
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
                                image: pod_icon_svg_1.default,
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
                            const { name, namespace, ports, type, } = service;
                            const serviceInfo = [];
                            ports.forEach((port) => {
                                serviceInfo.push({ name: port.name, port: port.port, protocol: port.protocol });
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
                                label: 'svc',
                                size: 37.5,
                                font: { color: '#ffffff' },
                                // nodes: [`${ns.name}-ns`],
                                image: service_icon_svg_1.default,
                                shape: 'image',
                            });
                            localGraph.edges.push({ from: nsId, to: serviceName, length: 50 });
                        }
                    });
                    deployments.forEach((deployment) => {
                        if (deployment.namespace === ns.name) {
                            const { name, namespace, strategy: { type, }, replicas, availableReplicas, } = deployment;
                            const deploymentName = `${deployment.name}-deployment`;
                            localGraph.nodes.push({
                                kind: 'deployment',
                                id: deploymentName,
                                // label: `Deployment: ${deployment.name}`,
                                label: 'dpl',
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
                                image: deployment_icon_svg_1.default,
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
                        if (ingress.namespace === ns.name)
                            return;
                    });
                });
                console.log('local graph', localGraph);
                setGraph(localGraph);
            }
            catch (error) {
                console.log(error);
            }
        });
        func();
    }, []);
    const events = {
        select: ({ nodes, edges }) => {
            console.log('Selected nodes:');
            console.log(nodes);
            console.log('Selected edges:');
            console.log(edges);
            alert(`Selected node: ${nodes}`);
            // asdfasdasdf
        },
    };
    return (react_1.default.createElement(react_graph_vis_1.default, { graph: graph, options: options, events: events, getNetwork: (network) => {
            // ensure that the network eases in to fit the viewport
            setTimeout(() => network.fit({
                animation: {
                    duration: 2000,
                    easingFunction: 'linear',
                },
            }), 1000);
        } }));
}
exports.default = Testvis;
