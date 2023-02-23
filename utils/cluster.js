// const fetchClusterNodes = async () => {
//   const data = await fetch(
//     'http://localhost:30000/api/v1/query?query=kube_node_info',
//     {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     }
//   ).then((res) => res.json());
//   const nodes = data.data.result.map((result) => {
//     return result.metric.node;
//   });
//   return nodes;
// };

// console.log(await fetchClusterNodes());
