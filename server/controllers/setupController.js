const { exec, spawn, spawnSync } = require('child_process');

const setupController = {};


// helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
// helm repo update
// helm install prometheus prometheus-community/kube-prometheus-stack
// kubectl port-forward prometheus-grafana-5f98c899f8-tv8gp 3001:3000
setupController.promInit = () => {
  spawnSync('helm repo add prometheus-community https://prometheus-community.github.io/helm-charts', {
    stdio: 'inherit',
    shell: true
  });
  spawnSync('helm repo update', {
    stdio: 'inherit',
    shell: true
  });
  spawnSync('helm install prometheus prometheus-community/kube-prometheus-stack', {
    stdio: 'inherit',
    shell: true
  });
};

setupController.grafanaInit = () => {
  let podName;
  exec('kubectl get pods', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    const output = stdout.split('\n');
    output.forEach((line) => {
      if (line.includes('prometheus-grafana')) {
        [podName] = line.split(' ');
      }
    });
    console.log(podName);
  });

  // const child = spawn('kubectl get pods', {
  //   stdio: 'inherit',
  //   shell: true
  // });

  const grafana = spawn(`kubectl port-forward ${podName} 3001:3000`, {
    shell: true,
  });

  grafana.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  grafana.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  grafana.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

module.exports = setupController;

setupController.init();