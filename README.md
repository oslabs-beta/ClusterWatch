# ClusterWatch

ClusterWatch is an open-source tool which simplifies and provides an all-in-one hub for Kubernetes cluster monitoring. It provides a clear visualization of kubernetes cluster architecture with detailed descriptions and stats for components within your clusters. ClusterWatch also offers real time metrics data, presented via grafana charts, and built-in support for Prometheus and alert managing. 

ClusterWatch integrates the industry standard tools that dev ops engineers normally configure on their own, and automates the booting process so that getting important cluster information from various different tools can be done from a single source, within a matter of seconds.

<p align='center'>
<img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXhhn1lEuHSUSQSJNocSJkRIqLGq_Boap5YMhsxjS27A&s'>
</p>

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

2. Make sure you have your kubernetes cluster up and running. If you'd like to set up a cluster to test the application, install docker and minikube or kind to get started.

3. Start the application:
  `npm run dev`

4. Once launched, you'll be redirected to our setup page:
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
The first page of the application will provide a visual overview of your kubernetes cluster. The visualization will show the control plane, namespaces, pods, services, deployments and nodes. Hovering over the components will display a modal displaying information relevant to that specific object.

delete later https://github.com/mushrathc/PRO-README