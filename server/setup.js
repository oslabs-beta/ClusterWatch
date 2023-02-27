const { exec, spawn, spawnSync } = require('child_process');

const setupController = {};


// helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
// helm repo update
// helm install prometheus prometheus-community/kube-prometheus-stack
setupController.init = () => {
  spawnSync('helm repo add prometheus-community https://prometheus-community.github.io/helm-charts', {
    stdio: 'inherit',
    shell: true
  });
  spawnSync('helm repo update', {
    stdio: 'inherit',
    shell: true
  });
  

  exec('kubectl get pods', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }

    let output = stdout.split('\n');
    output.every((line) => {
      if (line.includes('prometheus-grafana')) {
        output = line.split(' ')[0];
        return false;
      }
      return true;
    })
    console.log(output);
  });

  // const child = spawn('kubectl get pods', {
  //   stdio: 'inherit',
  //   shell: true
  // });
  
  
  
  // const test = spawn('kubectl', ['get', 'pods']);

  // test.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });

  // test.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`);
  // });

  // test.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });
};

module.exports = setupController;

setupController.init();