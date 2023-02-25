// eslint-disable-next-line import/no-extraneous-dependencies
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi2 = kc.makeApiClient(k8s.AppsV1Api);
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);

const clusterController = {};

const getPods = async () => {
  const res = await k8sApi.listPodForAllNamespaces();
  const pods = res.body.items.map((data) => {
    const { name, namespace, uid, creationTimestamp } = data.metadata;
    const { containers, nodeName } = data.spec;
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
      containersInfo,
      nodeName,
      containerStatuses,
      hostIP,
      podIP,
      startTime,
    };
    return response;
  });
  return pods;
};

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
  const results = response.map((data) => {
    const { name, uid, creationTimeStamp } = data.metadata;
    const { ipFamilies, ports, selector, type } = data.spec;
    const result = {
      name,
      uid,
      creationTimeStamp,
      ipFamilies,
      ports,
      selector,
      type,
    };
    return result;
  });
  return results;
};

const getDeployments = async () => {
  const res = await k8sApi2.listDeploymentForAllNamespaces();
  const response = res.body.items;
  const results = response.map((data) => {
    const { name, uid, creationTimeStamp } = data.metadata;
    const { strategy, replicas } = data.spec;
    const { availableReplicas, conditions } = data.status;
    const result = {
      name,
      uid,
      creationTimeStamp,
      strategy,
      replicas,
      availableReplicas,
      conditions,
    };
    return result;
  });
  return results;
};

const getIngresses = async () => {
  const res = await k8sApi3.listIngressForAllNamespaces();
  return res.body.items;
};

clusterController.getClusterInfo = async (req, res, next) => {
  try {
    const pods = await getPods();
    const namespaces = await getNamespaces();
    const services = await getServices();
    const deployments = await getDeployments();
    const ingresses = await getIngresses();
    const clusterInfo = {
      pods,
      namespaces,
      services,
      deployments,
      ingresses,
    };
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
