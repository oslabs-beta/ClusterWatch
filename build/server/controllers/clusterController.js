"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_node_1 = require("@kubernetes/client-node");
const kc = new client_node_1.KubeConfig();
kc.loadFromDefault();
const k8sApi2 = kc.makeApiClient(client_node_1.AppsV1Api);
const k8sApi = kc.makeApiClient(client_node_1.CoreV1Api);
const k8sApi3 = kc.makeApiClient(client_node_1.NetworkingV1Api);
;
const clusterController = {};
const getNodes = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield k8sApi.listNode();
    console.log(res.body.items[0]);
    const nodes = res.body.items.map((data) => {
        const { name, namespace, uid, labels } = data.metadata;
        const creationTimeStamp = data.metadata.creationTimestamp;
        const { configSource, providerID } = data.spec;
        const { status } = data;
        const response = {
            name,
            namespace,
            uid,
            creationTimeStamp,
            labels,
            configSource,
            providerID,
            status,
        };
        // console.log(response);
        return response;
    });
    return nodes;
});
// getNodes();
const getPods = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield k8sApi.listPodForAllNamespaces();
    //console.log(res.body.items[0].metadata.labels);
    const pods = res.body.items.map((data) => {
        const { name, namespace, uid, creationTimestamp, labels } = data.metadata;
        const { containers, nodeName, serviceAccount } = data.spec;
        const { containerStatuses, hostIP, podIP, startTime } = data.status;
        const containersInfo = containers.map((container) => ({
            image: container.image,
            name: container.name,
        }));
        const response = {
            name,
            namespace,
            uid,
            creationTimestamp,
            labels,
            containersInfo,
            nodeName,
            serviceAccount,
            containerStatuses,
            hostIP,
            podIP,
            startTime,
        };
        return response;
    });
    return pods;
});
// getPods();
const getNamespaces = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield k8sApi.listNamespace();
    const test = res.body.items
        .filter((namespace) => namespace.metadata.name.slice(0, 4) !== 'kube')
        .map((namespace) => {
        const { creationTimeStamp } = namespace;
        return {
            creationTimeStamp: creationTimeStamp,
            name: namespace.metadata.name,
            id: namespace.metadata.uid,
        };
    });
    return test;
});
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield k8sApi.listServiceForAllNamespaces();
    const response = res.body.items;
    // //console.log(res.body.items[0]);
    const results = response.map((data) => {
        //console.log('service name:', data.metadata.name);
        const { name, uid, creationTimeStamp, namespace } = data.metadata;
        const { ipFamilies, ports, selector, type } = data.spec;
        const result = {
            name,
            uid,
            creationTimeStamp,
            namespace,
            ipFamilies,
            ports,
            selector,
            type,
        };
        return result;
    });
    // console.log(results);
    return results;
});
// getServices();
const getDeployments = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield k8sApi2.listDeploymentForAllNamespaces();
    const response = res.body.items;
    //console.log(response[0].spec.selector.matchLabels);
    const results = response.map((data) => {
        // console.log(data.spec.template);
        const { name, uid, creationTimeStamp, namespace } = data.metadata;
        const { strategy, replicas, selector: matchLabels } = data.spec;
        const { availableReplicas, conditions } = data.status;
        const result = {
            name,
            uid,
            creationTimeStamp,
            namespace,
            strategy,
            matchLabels,
            replicas,
            availableReplicas,
            conditions,
        };
        return result;
    });
    // console.log(results);
    return results;
});
// getDeployments();
const getIngresses = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield k8sApi3.listIngressForAllNamespaces();
    return res.body.items;
});
clusterController.getClusterInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nodes = yield getNodes();
        const pods = yield getPods();
        const namespaces = yield getNamespaces();
        const services = yield getServices();
        const deployments = yield getDeployments();
        const ingresses = yield getIngresses();
        const clusterInfo = {
            nodes,
            pods,
            namespaces,
            services,
            deployments,
            ingresses,
        };
        //console.log('server side nodes', clusterInfo.nodes);
        res.locals.clusterInfo = clusterInfo;
        return next();
    }
    catch (err) {
        return next({
            log: `clusterController.getNamespaces ERROR: ${err}`,
            status: 500,
            message: { err: 'An error occurred in getClusterInfo' },
        });
    }
});
exports.default = clusterController;
