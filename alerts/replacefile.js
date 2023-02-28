const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const cpuLimit = '123'; // Replace with desired value

const filePath = path.join(__dirname, '/alert-rules.yaml');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const oldText = ':node_memory_MemAvailable_bytes:sum < 123456789';
  const newText = `:node_memory_MemAvailable_bytes:sum < ${cpuLimit}`;
  const newData = data.replace(new RegExp(oldText, 'g'), newText);

  fs.writeFile(filePath, newData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File updated successfully!');

    const command = 'kubectl get pods';
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Command error output: ${stderr}`);
        return;
      }
      console.log(`Command output: ${stdout}`);
    });
  });
});
//'helm upgrade --reuse-values -f alerts/alert-rules.yaml prometheus prometheus-community/kube-prometheus-stack -n default'
