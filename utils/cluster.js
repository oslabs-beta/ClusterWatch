const fetchClusterNodes = async () => {
  const data = await fetch(
    'http://localhost:9090/api/v1/query?query=kube_node_info',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());
  const nodes = data.data.result.map((result) => {
    return result.metric.node;
  });
  console.log(nodes);
  return nodes;
};
const fetchTotalPods = async () => {
  const data = await fetch(
    'http://localhost:9090/api/v1/query?query=count(kube_pod_created)',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json());
  const totalPods = data.data.result[0].value[1];
  console.log(totalPods);
  return totalPods;
};

fetchClusterNodes();
fetchTotalPods();
