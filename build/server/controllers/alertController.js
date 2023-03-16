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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
// import { PathOrFileDescriptor } from 'fs-extra';
const createAlert = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, threshold, name } = req.body;
    let filePath;
    let oldText;
    let newText;
    let oldName;
    let command;
    switch (type) {
        case 'CPU':
            filePath = path_1.default.join(__dirname, 'alerts/HighCPUUsage.yaml');
            oldText = /1\b/g;
            newText = `sum(rate(container_cpu_usage_seconds_total{namespace="default"}[5m])) by (pod_name) > ${threshold}`;
            oldName = 'HighCPUUsage';
            command =
                'helm upgrade --reuse-values -f server/controllers/alerts/HighCPUUsage.yaml prometheus prometheus-community/kube-prometheus-stack -n default';
            break;
        case 'Memory':
            filePath = path_1.default.join(__dirname, 'alerts/HighMemoryUsage.yaml');
            oldText =
                'sum(container_memory_working_set_bytes{namespace="default"}) by (pod_name) > 1e+09';
            newText = `sum(container_memory_working_set_bytes{namespace="default"}) by (pod_name) > ${threshold}e+09`;
            oldName = 'HighMemoryUsage';
            command =
                'helm upgrade --reuse-values -f server/controllers/alerts/HighMemoryUsage.yaml prometheus prometheus-community/kube-prometheus-stack -n default';
            break;
        default:
            filePath = path_1.default.join(__dirname, 'alerts/KubeNodeDown.yaml');
            oldText = '';
            newText = '';
            oldName = 'KubeNodeDown';
            command =
                'helm upgrade --reuse-values -f server/controllers/alerts/KubeNodeDown.yaml prometheus prometheus-community/kube-prometheus-stack -n default';
            break;
    }
    fs_1.default.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to read file');
        }
        let newData = type === 'Kube'
            ? data.replace(new RegExp(oldName, 'g'), name)
            : data
                .replace(new RegExp(oldText, 'g'), newText)
                .replace(new RegExp(oldName, 'g'), name);
        fs_1.default.writeFile(filePath, newData, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to write file');
            }
            console.log('File updated successfully!');
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error running command: ${error.message}`);
                    return res.status(500).send('Failed to upgrade Prometheus chart');
                }
                if (stderr) {
                    console.error(`Command error output: ${stderr}`);
                    return res.status(500).send('Failed to upgrade Prometheus chart');
                }
                console.log(`Command output: ${stdout}`);
                const templateFilePath = filePath.replace('.yaml', '-template.yaml');
                fs_1.default.readFile(templateFilePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Failed to read template file');
                    }
                    fs_1.default.writeFile(filePath, data, 'utf8', (err) => {
                        if (err) {
                            console.error(err);
                            return res
                                .status(500)
                                .send('Failed to replace file with template');
                        }
                        console.log('File replaced with template successfully!');
                        return res.status(200).send('Alert created successfully');
                    });
                });
            });
        });
    });
});
const alertController = {
    createAlert,
};
exports.default = alertController;
