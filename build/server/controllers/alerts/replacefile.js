const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const req = {};
req.body = { type: 'Kube', threshold: 2, name: 'Kube Node Down' };
const { type, threshold, name } = req.body;
let filePath;
let oldText;
let newText;
let oldName;
let command;
switch (type) {
    case 'CPU':
        filePath = path.join(__dirname, '/HighCPUUsage.yaml');
        oldText = /1\b/g;
        newText = `sum(rate(container_cpu_usage_seconds_total{namespace="default"}[5m])) by (pod_name) > ${threshold}`;
        oldName = 'HighCPUUsage';
        command =
            'helm upgrade --reuse-values -f alerts/HighCPUUsage.yaml prometheus prometheus-community/kube-prometheus-stack -n default';
        break;
    case 'Memory':
        filePath = path.join(__dirname, '/HighMemoryUsage.yaml');
        oldText =
            'sum(container_memory_working_set_bytes{namespace="default"}) by (pod_name) > 1e+09';
        newText = `sum(container_memory_working_set_bytes{namespace="default"}) by (pod_name) > ${threshold}e+09`;
        oldName = 'HighMemoryUsage';
        command =
            'helm upgrade --reuse-values -f alerts/HighMemoryUsage.yaml prometheus prometheus-community/kube-prometheus-stack -n default';
        break;
    default:
        filePath = path.join(__dirname, '/KubeNodeDown.yaml');
        oldText = '';
        newText = '';
        oldName = 'KubeNodeDown';
        command =
            'helm upgrade --reuse-values -f alerts/KubeNodeDown.yaml prometheus prometheus-community/kube-prometheus-stack -n default';
        break;
}
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let newData = type === 'Kube'
        ? data.replace(new RegExp(oldName, 'g'), name)
        : data
            .replace(new RegExp('1', 'g'), threshold)
            .replace(new RegExp(oldName, 'g'), name);
    fs.writeFile(filePath, newData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File updated successfully!');
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
