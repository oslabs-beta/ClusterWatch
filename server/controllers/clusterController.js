// eslint-disable-next-line import/no-extraneous-dependencies
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi2 = kc.makeApiClient(k8s.AppsV1Api);
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);

const clusterController = {};

const getNodes = async () => {
  const res = await k8sApi.listNode();
  // console.log(res.body.items[0]);
  const nodes = res.body.items.map((data) => {
    const { name, namespace, uid, creationTimeStamp } = data.metadata;
    const { configSource, providerID } = data.spec;
    const { status } = data;
    const response = {
      name,
      namespace,
      uid,
      creationTimeStamp,
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
};
// getPods();

const getNamespaces = async () => {
  const res = await k8sApi.listNamespace();
  const test = res.body.items
    .filter((namespace) => namespace.metadata.name.slice(0, 4) !== 'kube')
    .map((namespace) => ({
      creationTimeStamp: namespace.creationTimeStamp,
      name: namespace.metadata.name,
      id: namespace.metadata.uid,
    }));
  return test;
};

const getServices = async () => {
  const res = await k8sApi.listServiceForAllNamespaces();
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
};
// getServices();

const getDeployments = async () => {
  const res = await k8sApi2.listDeploymentForAllNamespaces();
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
  } catch (err) {
    return next({
      log: `clusterController.getNamespaces ERROR: ${err}`,
      status: 500,
      message: { err: 'An error occurred in getClusterInfo' },
    });
  }
};

// clusterController.getPods = async (req, res, next) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();

//     const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

//     res.locals.pods = await k8sApi.listNamespacedPod(req.params.namespace);
//     return next();
//   } catch (err) {
//     return next({
//       log: `clusterController.getPods ERROR: ${err}`,
//       message: { err: 'An error occurred' },
//     });
//   }
// };

// clusterController.getServices = async (req, res, next) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();

//     const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

//     res.locals.services = await k8sApi.listNamespacedService(
//       req.params.namespace
//     );
//     return next();
//   } catch (err) {
//     return next({
//       log: `clusterController.getServices ERROR: ${err}`,
//       message: { err: 'An error occurred' },
//     });
//   }
// };

// clusterController.getDeployments = async (req, res, next) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();

//     const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

//     res.locals.deployments = await k8sApi.listNamespacedDeployment(
//       req.params.namespace
//     );
//     return next();
//   } catch (err) {
//     return next({
//       log: `clusterController.getDeployments ERROR: ${err}`,
//       message: { err: 'An error occurred' },
//     });
//   }
// };

// clusterController.getIngresses = async (req, res, next) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();

//     const k8sApi = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

//     res.locals.ingresses = await k8sApi.listNamespacedIngress(
//       req.params.namespace
//     );
//     return next();
//   } catch (err) {
//     return next({
//       log: `clusterController.getIngresses ERROR: ${err}`,
//       message: { err: 'An error occurred' },
//     });
//   }
// };

module.exports = clusterController;
