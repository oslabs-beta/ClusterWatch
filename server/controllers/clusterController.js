// eslint-disable-next-line import/no-extraneous-dependencies
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// k8sApi.listNode().then(res => {
//   console.log(res.body.items[0].metadata);
// });
const clusterController = {};

// THIS function will return an array of objects like:
// [{ name: 'default', id: '192e1b4a-d1c0-4e4b-ba97-9b873b210c4a' }]
clusterController.getClusterInfo = async (req, res, next) => {
  try {
    // get namespace name and id first
    const namespaces = await k8sApi.listNamespace()
      .then((data) => data.body.items
        .filter((namespace) => namespace.metadata.name.slice(0, 4) !== 'kube')
        .map((namespace) => ({ name: namespace.metadata.name, id: namespace.metadata.uid })));
    return next();
  } catch (err) {
    return next({
      log: `clusterController.getNamespaces ERROR: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

k8sApi.listPodForAllNamespaces().then(res => console.log(res.body));
// k8sApi.listNamespace().then(res => {
//   test = res.body.items
//     .filter((namespace) => namespace.metadata.name.slice(0, 4) !== 'kube')
//     .map((namespace) => {
//       return { name: namespace.metadata.name, id: namespace.metadata.uid }
//     });
// })

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
