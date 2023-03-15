
import {
  KubeConfig,
  AppsV1Api,
  CoreV1Api,
  NetworkingV1Api,
} from '@kubernetes/client-node';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const kc = new KubeConfig();
kc.loadFromDefault();

const k8sApi2: AppsV1Api = kc.makeApiClient(AppsV1Api);
const k8sApi: CoreV1Api = kc.makeApiClient(CoreV1Api);
const k8sApi3: NetworkingV1Api = kc.makeApiClient(NetworkingV1Api);

type Controller = {
  getNodes?: RequestHandler;
  getPods?: RequestHandler;
  getNamespaces?: RequestHandler;
  getServices?: RequestHandler;
  getDeployments?: RequestHandler;
  getIngresses?: RequestHandler;
  getClusterInfo?:RequestHandler ;
};

interface Node  {
  name: string;
  namespace: string;
  uid: string;
  creationTimeStamp?: any;
  labels: any;
  configSource: any;
  providerID: string;
  status: any;
};

interface Pod {
  name: string;
  namespace: string;
  uid : string;
  creationTimestamp: any;
  labels: any;
  containersInfo: any;
  nodeName : string;
  serviceAccount: any;
  containerStatuses: any;
  hostIP: string;
  podIP: string;
  startTime :any;
}

interface Test {
  creationTimeStamp: any;
  name: string;
  id: string;
}

interface Service {
  name: string;
  uid: string;
  creationTimeStamp: any;
  namespace: string;
  ipFamilies: any;
  ports: any;
  selector: any;
  type: any;
}

interface Deployment {
  name: string;
  uid: string;
  creationTimeStamp: any;
  namespace: string;
  strategy: any;
  matchLabels: any;
  replicas: any;
  availableReplicas: any;
  conditions: any;
}

interface ClusterInfo {
  nodes: Node[];
  pods: Pod[];
  namespaces: Test[];
  services: Service[];
  deployments: Deployment[];
  ingresses: any[];
}

const clusterController: Controller = {};

const getNodes = async () => {
  const res = await k8sApi.listNode();
  // console.log(res.body.items[0]);
  const nodes: Node[] = res.body.items.map((data) => {
    const { name, namespace, uid, labels } = data.metadata;
    const creationTimeStamp: any = data.metadata.creationTimestamp;
    const { configSource, providerID } = data.spec;
    const { status } = data;
    const response: Node = {
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
};
// getNodes();

const getPods = async () => {
  const res = await k8sApi.listPodForAllNamespaces();
  //console.log(res.body.items[0].metadata.labels);
  const pods: Pod[] = res.body.items.map((data) => {
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
};
// getPods();

const getNamespaces = async () => {
  const res = await k8sApi.listNamespace();
  const test: Test[] = res.body.items
    .filter((namespace) => namespace.metadata.name.slice(0, 4) !== 'kube')
    .map((namespace) => {
      const {creationTimeStamp} = namespace as any;
      return {
        creationTimeStamp: creationTimeStamp,
        name: namespace.metadata.name,
        id: namespace.metadata.uid,
      }
    });
  return test;
};

const getServices = async () => {
  const res = await k8sApi.listServiceForAllNamespaces();
  const response = res.body.items;
  // //console.log(res.body.items[0]);
  const results :Service[] = response.map((data) => {
    //console.log('service name:', data.metadata.name);
    const { name, uid, creationTimeStamp, namespace } = data.metadata as any;
    const { ipFamilies, ports, selector, type } = data.spec;
    const result: Service = {
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
};
// getServices();

const getDeployments = async () => {
  const res = await k8sApi2.listDeploymentForAllNamespaces();
  const response = res.body.items;
  //console.log(response[0].spec.selector.matchLabels);
  const results: Deployment[] = response.map((data) => {
    // console.log(data.spec.template);
    const { name, uid, creationTimeStamp, namespace } = data.metadata as any;
    const { strategy, replicas, selector: matchLabels } = data.spec;
    const { availableReplicas, conditions } = data.status;
    const result: Deployment = {
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
};

// getDeployments();

const getIngresses = async () => {
  const res = await k8sApi3.listIngressForAllNamespaces();
  return res.body.items;
};

clusterController.getClusterInfo = async (req, res, next) => {
  try {
    const nodes = await getNodes();
    const pods = await getPods();
    const namespaces = await getNamespaces();
    const services = await getServices();
    const deployments = await getDeployments();
    const ingresses = await getIngresses();
    const clusterInfo:ClusterInfo = {
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
  } catch (err) {
    return next({
      log: `clusterController.getNamespaces ERROR: ${err}`,
      status: 500,
      message: { err: 'An error occurred in getClusterInfo' },
    });
  }
};


export default clusterController;
