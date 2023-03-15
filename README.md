# ClusterWatch

<p align='center'>
<img src = './client/styles/logo-color.png' height='250'>
</p>


<img src ='	https://img.shields.io/badge/kubernetes-326ce5.svg?&style=for-the-badge&logo=kubernetes&logoColor=white'>
<img src ='	https://img.shields.io/badge/Prometheus-000000?style=for-the-badge&logo=prometheus&labelColor=000000'>
<img src ='	https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'>
<img src ='https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white'>
<img src ='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'>
<img src ='https://img.shields.io/badge/Grafana-F2F4F9?style=for-the-badge&logo=grafana&logoColor=orange&labelColor=F2F4F9'>
<img src ='	https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white'>
<img src ='	https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white'>
<img src ='	https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white'>

ClusterWatch is an open-source tool which simplifies and provides an all-in-one hub for Kubernetes cluster monitoring. 
It reduces the need for devops engineers to configure their own Kubernetes monitoring stacks, and automates the process so you can get vital cluster information from various different tools, all in one place, in just a few seconds.  

ClusterWatch provides a clear visualization of kubernetes cluster architecture with detailed descriptions and stats for components within your clusters. ClusterWatch also offers real time metrics data, presented via grafana charts, and built-in support for Prometheus and alert managing. 


## Features

- **Cluster visualization :** The app uses the Vis.js library to create a intuitive cluster visualiation tool, making it easy for users to understand their cluster's *topology* and access key details about each component without running a single kubectl command.

- **User-friendly interface :** Intutive and user-friendly interface makes it easy for users to digest relevant cluster data easily.

- **Prometheus:** Built-in Prometheus integration, allowing users to execute queries, easily monitoring cluster performance and resource usage with zero configuration.

- **Grafana integration:** Zero-setup Grafana integration allows insightful visualizations of valuable cluster data.

- **Redis:** Fast in-memory caching, to store API keys and other sensitive data enables near instantaneous access times and increased security against session hijacking. This way only authorized users have access to the cluster data

- **Alert Manager:** Users can configure alerts directly from ClusterWatch in order to be notified of key cluster events.

- **One-click setup :** You


## Getting Started
1. Clone the repo:
  `git clone https://github.com/oslabs-beta/ClusterWatch.git`

2. Install dependencies:
  `npm install`

3. Ensure that you [install redis](https://redis.io/docs/getting-started/installation/), if you don't already have it installed on your machine.

4. Make sure you have your kubernetes cluster up and running. If you'd like to set up a cluster to test the application, install docker and minikube or kind to get started.

5. Start the application:
  `npm run dev`

6. Navigate to: `http:/localhost8080`

7. Once launched, you'll be redirected to our setup page:
- If you do not have the prometheus-kube-stack helm chart, (which inlcudes kube-state-metrics, node-exporter, and grafana), utilize the setup button to download, update, and install the repos. Note: this step can take a moment, don't worry.

- If you have grafana, but have not used our applciation previously, hit the grafana setup button to apply our custom grafana configurations.

- If you have used our application before, press the forward ports button and monitor away!

Keep in mind that the application utilizes local ports which must not be occupied on your machine:
  - 3000: server
  - 8080: application page
  - 3001: grafana
  - 9090: prometheus
  - 9093: alert manager
  - 6379: redis

## Usage Guidelines
#### Overview

The first page of the application will provide a visual overview of your kubernetes cluster. The visualization will show the control plane, namespaces, pods, services, deployments and nodes. Hovering over the components will display a modal displaying information relevant to that specific object.
<p align='center'>
<img src = './readme_assets/visualizer.gif' height='500'>
</p>

#### Metrics

The metrics section of the application provides grafana dashboards for various aspects of your kubernetes cluster. This includes:
  - Kubernetes API server: API server request rates and latency, etcd request latency and cache hit rates, and workqueue latencies.
  - Nodes: CPU usage, load average, memory usage, disk I/O, disk usage, network received, network transmitted.
  - Kubelet: Operation and error rates, pod start rates and durations, and more.
  - USE methods for cluster and nodes: Use methods show utilization, saturation, and errors.
  - CoreDNS: requests, responses, and cache sizes/hits for DNS. server to ensure communication and discovery with services.

#### Prometheus Query

Here you can access the Prometheus console from within the app to run customized [queries](https://prometheus.io/docs/prometheus/latest/querying/basics/) and create graphs based on the data. 

#### Alert Manager

Here you can view all the active alerts that are set up for your cluster.

#### Custom Alerts

Configure your own alerts without having to create YAML files.

## Open Source
This product is open source, being actively maintained, and open to contributions. Please inform us of an features or bugs you'd like to see addressed.

#### Testing:
This application utilizes, jest, supertest, react testing library, and cypress for testing. 

To run unit and integration tests, execute the following command in your terminal: `npm run test`

To run end-to-end tests, execute: `npm run cypress`

**Contributing:** If you'd like to contribute to this project:
1. Clone repo and create a new branch: `git checkout https://github.com/ -b name_for_new_branch`
2. Make changes and test
3. Submit a pull request with clear descriptions of changes

**Roadmap:** 
✅ = Ready to use
⏳ = In progress
🙏🏻 = Looking for contributors
|Feature|Status|
|  ---  |  --- |
|Add Prometheus integration | ✅ |
|Add Grafana Integration| ✅ |
|Add Cluster visualizer  | ✅ |
|Add alerts customization | ✅ |
|Add Jest testing | ✅ |
|Add End-to-End cypress testing | ✅ |
|Transform codebase into typescript| ✅ |
|Convert HTTP fetch requests to GraphQL requests | ⏳ |
|Replace Prometheus with VictoriaMetrics| 🙏🏻 |
|Add Authorization | 🙏🏻 |
|Add persiting metrics logs| 🙏🏻 |


## Contributors

- 💻 = Website
- 🖇️ = LinkedIn
- 🐙 = Github

<table>

  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/80185584?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Sheng li</b></sub>
      <br />
      <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=false&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAAnv9wwBJJ9SgtkuND-IT1hQIl6hVS50AJ4&keywords=mike%20masatsugu&origin=RICH_QUERY_SUGGESTION&position=0&searchId=51ea03d4-28fa-431c-b97c-df470d78d606&sid=~Ov">🖇️</a>
      <a href="https://github.com/mikemasatsugu">🐙</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/23042350?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Mushrath Choudhury</b></sub>
      <br />
      <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=false&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAAmzpoUBj471sEqvNBKzc5u79eTMejqPUpw&keywords=laura%20botel&origin=RICH_QUERY_SUGGESTION&position=0&searchId=d580c0ed-1e6b-45ae-a154-7fae088cf9d8&sid=(Vk">🖇️</a>
      <a href="https://github.com/laurabotel">🐙</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/14981545?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Kevin Hendrix</b></sub>
      <br />
      <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=false&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAABsD-xUB8MG250UNDB03Czd4oKeUrPSwBV8&keywords=kyle%20combs&origin=RICH_QUERY_SUGGESTION&position=0&searchId=b49a7987-9a40-4b60-b91d-6334e724b9e7&sid=LHL">🖇️</a>
      <a href="https://github.com/texpatnyc">🐙</a>
    </td>
     <td align="center">
      <img src="https://avatars.githubusercontent.com/u/67646317?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Jordy Gonzalez></sub>
      <br />
      <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=false&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAABNlEJ4B5MlocndBolrL7gxShrn__8CZSW8&keywords=ryan%20mcdaniel&origin=RICH_QUERY_SUGGESTION&position=0&searchId=80c10804-f648-4228-b00a-c4bbcfdc0a97&sid=B2g">🐙</a>
    </td>
     <td align="center">
      <img src="https://avatars.githubusercontent.com/u/98861409?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Larissa Ciancarelli</b></sub>
      <br />
      <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=false&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAADrk-RgBacU_23g56MXaukxem2rebUn0lSs&keywords=larissa%20ciancarelli&origin=RICH_QUERY_SUGGESTION&position=0&searchId=1495aff9-c389-4b74-9bd0-ea1a811e460a&sid=E(p">🖇️</a>
      <a href="https://github.com/larissa-ciancarelli">🐙</a>
    </td>
  </tr>
</table>

## Publications
Check out our medium article
delete later https://github.com/mushrathc/PRO-README