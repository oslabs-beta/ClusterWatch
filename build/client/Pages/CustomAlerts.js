"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function CustomAlerts() {
    const [selectedAlertOption, setSelectedAlertOption] = (0, react_1.useState)('');
    const [submittedAlertOption, setSubmittedAlertOption] = (0, react_1.useState)('');
    const [selectedMemory, setSelectedMemory] = (0, react_1.useState)('');
    const [submittedMemory, setsubmittedMemory] = (0, react_1.useState)('');
    const [selectedCPU, setSelectedCPU] = (0, react_1.useState)('');
    const [submittedCPU, setSubmittedCPU] = (0, react_1.useState)('');
    const [alertName, setAlertName] = (0, react_1.useState)('');
    const handleTypeSubmit = (event) => {
        event.preventDefault();
        setSubmittedAlertOption(selectedAlertOption);
    };
    const handleRadioChange = (event) => {
        setSelectedAlertOption(event.target.value);
    };
    const handleMemoryChange = (event) => {
        setSelectedMemory(event.target.value);
    };
    const handleMemorySubmit = (event) => {
        event.preventDefault();
        setsubmittedMemory(selectedMemory);
    };
    const handleCPUChange = (event) => {
        setSelectedCPU(event.target.value);
    };
    const handleCPUSubmit = (event) => {
        event.preventDefault();
        setSubmittedCPU(selectedCPU);
    };
    const handleNameChange = (event) => {
        setAlertName(event.target.value);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        event.preventDefault();
        setSubmittedAlertOption(selectedAlertOption);
        const threshold = submittedAlertOption === 'Memory' ? submittedMemory : submittedCPU;
        const result = { name: alertName, type: submittedAlertOption, threshold };
        setsubmittedMemory('');
        setSelectedMemory('');
        setSubmittedCPU('');
        setSelectedCPU('');
        setAlertName('');
        setSelectedAlertOption('');
        setSubmittedAlertOption('');
        fetch('http://localhost:3000/alerts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        })
            .then((res) => res.json())
            .then((data) => {
            console.log(data);
        })
            .catch((error) => {
            console.error('Error:', error);
        });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("iframe", { src: "https://giphy.com/embed/dWa2rUaiahx1FB3jor", width: "480", height: "480", frameBorder: "0", class: "giphy-embed", allowFullScreen: true }),
        submittedAlertOption === '' && (react_1.default.createElement("div", { className: "add-alert" },
            react_1.default.createElement("h3", null, "type of alerts"),
            react_1.default.createElement("form", { onSubmit: handleTypeSubmit },
                react_1.default.createElement("input", { type: "radio", id: "memory", name: "alertType", value: "Memory", onChange: handleRadioChange }),
                react_1.default.createElement("label", { htmlFor: "memory" }, "Memory Usage"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "radio", id: "cpu", name: "alertType", value: "CPU", onChange: handleRadioChange }),
                react_1.default.createElement("label", { htmlFor: "cpu" }, "CPU Usage"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "radio", id: "kube", name: "alertType", value: "Kube", onChange: handleRadioChange }),
                react_1.default.createElement("label", { htmlFor: "kube" }, "Kube Node Down"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "submit", value: "Next" })))),
        submittedAlertOption === 'Memory' && submittedMemory === '' && (react_1.default.createElement("div", { className: "add-alert" },
            react_1.default.createElement("h3", null, "Memory Threshold"),
            react_1.default.createElement("form", { onSubmit: handleMemorySubmit },
                react_1.default.createElement("label", { htmlFor: "memorythreshold" }, "Alert after memory usage exceeds (in Gigabytes)"),
                react_1.default.createElement("input", { type: "number", id: "memorythreshold", name: "memorythreshold", onChange: handleMemoryChange }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "submit", value: "Next" })))),
        (submittedMemory !== '' ||
            submittedCPU !== '' ||
            submittedAlertOption === 'Kube') && (react_1.default.createElement("div", { className: "add-alert" },
            react_1.default.createElement("h3", null, "Create Alert Name"),
            react_1.default.createElement("form", { onSubmit: handleFormSubmit },
                react_1.default.createElement("label", { htmlFor: "memorythreshold" }, "Enter alert name"),
                react_1.default.createElement("input", { type: "input", id: "alertname", name: "alertname", onChange: handleNameChange }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "submit", value: "Create Alert" })))),
        submittedAlertOption === 'CPU' && submittedCPU === '' && (react_1.default.createElement("div", { className: "add-alert" },
            react_1.default.createElement("h3", null, "CPU Threshold"),
            react_1.default.createElement("form", { onSubmit: handleCPUSubmit },
                react_1.default.createElement("label", { htmlFor: "cputhreshold" }, "Alert after total CPU usage exceeds"),
                react_1.default.createElement("input", { type: "number", id: "cputhreshold", name: "cputhreshold", step: "0.1", onChange: handleCPUChange }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "submit", value: "Next" }))))));
}
exports.default = CustomAlerts;
