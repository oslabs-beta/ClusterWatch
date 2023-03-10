"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const setupController = {};
// helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
// helm repo update
// helm install prometheus prometheus-community/kube-prometheus-stack
// kubectl port-forward prometheus-grafana-5f98c899f8-tv8gp 3001:3000
setupController.promInit = (req, res, next) => {
    console.log('\n\nPrometheus Setup Starting\n\n');
    (0, child_process_1.spawnSync)('helm repo add prometheus-community https://prometheus-community.github.io/helm-charts', {
        stdio: 'inherit',
        shell: true,
    });
    (0, child_process_1.spawnSync)('helm repo update', {
        stdio: 'inherit',
        shell: true,
    });
    (0, child_process_1.spawnSync)('helm install prometheus prometheus-community/kube-prometheus-stack', {
        stdio: 'inherit',
        shell: true,
    });
    return next();
};
setupController.grafEmbed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('\n\nGrafana Setup Starting\n\n');
    let podName;
    const getter = (0, child_process_1.exec)('kubectl get pods', (err, stdout, stderr) => {
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
        (0, child_process_1.spawnSync)('kubectl apply -f prometheus-grafana.yaml', {
            stdio: 'inherit',
            shell: true,
        });
        (0, child_process_1.spawnSync)(`kubectl delete pod ${podName}`, {
            stdio: 'inherit',
            shell: true,
        });
        // setupController.forwardPort();
        return next();
    });
});
setupController.forwardPorts = (req, res, next) => {
    console.log('\n\nForwarding Ports\n\n');
    let grafPod, promPod, alertPod;
    let podStatus;
    while (podStatus !== 'Running') {
        const abc = (0, child_process_1.execSync)('kubectl get pods');
        abc
            .toString()
            .split('\n')
            .forEach((line) => {
            if (!promPod && line.includes('prometheus-0'))
                [grafPod] = line.split(' ');
            if (!alertPod && line.includes('alertmanager-0'))
                [alertPod] = line.split(' ');
            if (line.includes('prometheus-grafana')) {
                if (line.includes('Running'))
                    podStatus = 'Running';
                [grafPod] = line.split(' ');
            }
        });
    }
    const ports = (0, child_process_1.spawn)(`kubectl port-forward ${grafPod} 3001:3000 && kubectl port-forward ${promPod} 9090 && kubectl port-forward ${alertPod} 9093`, { shell: true, });
    ports.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    ports.stderr.on('data', (data) => {
        console.error(`grafana port forwarding error: ${data}`);
    });
    return next();
};
exports.default = setupController;
