const { exec, execSync, spawn, spawnSync } = require('child_process');

const setupController = {};


// helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
// helm repo update
// helm install prometheus prometheus-community/kube-prometheus-stack
// kubectl port-forward prometheus-grafana-5f98c899f8-tv8gp 3001:3000
setupController.promInit = () => {
  spawnSync('helm repo add prometheus-community https://prometheus-community.github.io/helm-charts', {
    stdio: 'inherit',
    shell: true,
  });
  spawnSync('helm repo update', {
    stdio: 'inherit',
    shell: true,
  });
  spawnSync('helm install prometheus prometheus-community/kube-prometheus-stack', {
    stdio: 'inherit',
    shell: true,
  });
};

setupController.grafEmbed = () => {
  let podName;
  const getter = exec('kubectl get pods', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
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

  // kubectl replace -f prometheus-grafana.yaml
  // execSync(`kubectl delete pod ${podName}`, {
  //   // stdio: 'inherit',
  //   // shell: true
  // });
  getter.once('close', () => {
    spawnSync('kubectl apply -f prometheus-grafana.yaml', {
      stdio: 'inherit',
      shell: true,
    });
    spawnSync(`kubectl delete pod ${podName}`, {
      stdio: 'inherit',
      shell: true,
    });
    setupController.forwardPort();
  });
};

setupController.forwardPort = () => {
  let podName;
  let podStatus;
  while (podStatus !== 'Running') {
    const abc = execSync('kubectl get pods');
    abc.toString().split('\n').forEach((line) => {
      if (line.includes('prometheus-grafana')) {
        if (line.includes('Running')) {
          podStatus = 'Running';
        }
        [podName] = line.split(' ');
        console.log(podName);
      }
    });
  }
  // const abc = execSync('kubectl get pods');
  // console.log(abc.toString());
  // while (podStatus !== 'Running') {
    // exec('kubectl get pods', (err, stdout, stderr) => {
    //   if (err) {
    //     console.error(`exec error: ${err}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.log(`stderr: ${stderr}`);
    //     return;
    //   }
    //   console.log(stdout);
    //   const output = stdout.split('\n');
    //   output.forEach((line) => {
    //     if (line.includes('prometheus-grafana')) {
    //       if (line.includes('Running')) {
    //         podStatus = 'Running';
    //         console.log('omg', podStatus);
    //       }
    //       [podName] = line.split(' ');
    //     }
    //   });
    //   console.log(podName);
    // });
  // }

  // //let forwarding = false
  // //while !forwarding
  //   //attempt to port forward  
  // getter.on('close', () => {
  const grafana = spawn(`kubectl port-forward ${podName} 3001:3000`, {
    shell: true,
    // detached: true,
  });
  // grafana.unref();
  grafana.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  grafana.stderr.on('data', (data) => {
    console.error(`stderr in grafana: ${data}`);
  });

  grafana.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  // });
};
module.exports = setupController;

// setupController.promInit();
// setupController.grafEmbed();